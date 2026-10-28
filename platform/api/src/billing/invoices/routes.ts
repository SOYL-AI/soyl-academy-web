/**
 * Invoice routes (ADR-024).
 *
 *   GET  /v1/me/invoices                   member: own invoices and credit notes (empty until a payment)
 *   GET  /v1/me/invoices/:id/pdf           member: the PDF of one's own document (another user's: 404)
 *   GET  /v1/admin/invoices?from&to        admin (two-step verified): documents issued on IST dates from..to
 *   GET  /v1/admin/invoices/export?from&to admin: the same as CSV with GSTR-1 style columns (for the accountant)
 *   POST /v1/admin/invoices/:id/resend     admin: email the document again now
 *
 * Reads never depend on BILLING_ENABLED: with billing off there are simply no invoices.
 * TODO(integration): switch the admin routes to the superadmin role once it exists (D-043 follow-up).
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { ApiProblem } from '../../errors';
import { policies, type RoutePolicy } from '../../policy';
import { withProblems } from '../../schemas';
import type { InvoiceService } from './service';

const IsoDate = z.iso.date();
const MAX_RANGE_DAYS = 366;

export const InvoiceView = z
  .object({
    id: z.uuid(),
    number: z.string(),
    type: z.enum(['tax_invoice', 'credit_note']),
    title: z.string(),
    issueDate: IsoDate,
    totalPaise: z.number().int(),
    totalLabel: z.string(),
    description: z.string(),
    planName: z.string(),
    originalNumber: z.string().nullable(),
    gstRegistered: z.boolean(),
  })
  .meta({ id: 'Invoice', description: 'An invoice (type tax_invoice; titled "Invoice" while the seller is not GST-registered) or a credit note.' });

const MyInvoices = z.object({ invoices: z.array(InvoiceView) }).meta({ id: 'MyInvoices' });

const AdminInvoice = InvoiceView.extend({
  placeOfSupply: z.string(),
  placeOfSupplyName: z.string(),
  taxablePaise: z.number().int(),
  cgstPaise: z.number().int(),
  sgstPaise: z.number().int(),
  igstPaise: z.number().int(),
  ratePercent: z.number(),
  sac: z.string(),
  razorpayPaymentId: z.string(),
  sentAt: z.iso.datetime().nullable(),
  emailAttempts: z.number().int(),
  buyerErased: z.boolean(),
  originalIssueDate: IsoDate.nullable(),
}).meta({ id: 'AdminInvoice' });

const AdminInvoices = z.object({ from: IsoDate, to: IsoDate, invoices: z.array(AdminInvoice) }).meta({ id: 'AdminInvoices' });
const RangeQuery = z.strictObject({ from: IsoDate, to: IsoDate });
const IdParams = z.strictObject({ id: z.uuid() });
const EmptyBody = z.strictObject({}).nullish();
const ResendResult = z.object({ status: z.enum(['sent', 'failed', 'no_email']) }).meta({ id: 'InvoiceResendResult' });

const adminPolicy = (): RoutePolicy => ({ roles: ['admin'], csrf: true, rateLimit: { buckets: [] }, consent: false, mfa: true });

function checkRange(q: { from: string; to: string }): void {
  const days = (Date.parse(`${q.to}T00:00:00Z`) - Date.parse(`${q.from}T00:00:00Z`)) / 86_400_000;
  if (days < 0) throw new ApiProblem('validation_failed', { errors: [{ path: 'querystring.to', message: 'must not be before from' }] });
  if (days > MAX_RANGE_DAYS) throw new ApiProblem('validation_failed', { errors: [{ path: 'querystring.to', message: `at most ${MAX_RANGE_DAYS} days after from` }] });
}

export function registerInvoiceRoutes(appIn: FastifyInstance, invoices: InvoiceService): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();

  app.get('/v1/me/invoices', {
    config: { policy: policies.member() },
    schema: { tags: ['billing'], summary: 'My invoices and credit notes (newest first)', response: withProblems({ 200: MyInvoices }) },
    handler: async (request) => ({ invoices: await invoices.listForUser(request.auth!.user.id) }),
  });

  app.get('/v1/me/invoices/:id/pdf', {
    config: { policy: policies.member() },
    schema: {
      tags: ['billing'],
      summary: 'Download one of my invoices or credit notes (application/pdf)',
      params: IdParams,
      response: withProblems({ 200: z.string().meta({ description: 'The PDF bytes (Content-Type: application/pdf).' }) }),
    },
    handler: async (request, reply) => {
      const out = await invoices.pdfForUser(request.auth!.user.id, request.params.id);
      if (!out) throw new ApiProblem('not_found');
      return reply
        .header('content-type', 'application/pdf')
        .header('content-disposition', `attachment; filename="${out.fileName}"`)
        // A Buffer is sent as-is (Fastify serialises only objects); the schema documents it as a string.
        .send(out.pdf as unknown as string);
    },
  });

  app.get('/v1/admin/invoices', {
    config: { policy: adminPolicy() },
    schema: { tags: ['billing', 'admin'], summary: 'Invoices and credit notes issued between two IST dates (inclusive)', querystring: RangeQuery, response: withProblems({ 200: AdminInvoices }) },
    handler: async (request) => {
      checkRange(request.query);
      return { from: request.query.from, to: request.query.to, invoices: await invoices.adminList(request.query) };
    },
  });

  app.get('/v1/admin/invoices/export', {
    config: { policy: adminPolicy() },
    schema: {
      tags: ['billing', 'admin'],
      summary: 'The same documents as CSV for the accountant (GSTR-1 style columns)',
      querystring: RangeQuery,
      response: withProblems({ 200: z.string().meta({ description: 'text/csv; charset=utf-8' }) }),
    },
    handler: async (request, reply) => {
      checkRange(request.query);
      const csv = await invoices.adminCsv(request.query);
      return reply
        .header('content-type', 'text/csv; charset=utf-8')
        .header('content-disposition', `attachment; filename="soyl-invoices-${request.query.from}-to-${request.query.to}.csv"`)
        .send(csv);
    },
  });

  app.post('/v1/admin/invoices/:id/resend', {
    config: { policy: adminPolicy() },
    schema: { tags: ['billing', 'admin'], summary: 'Email an invoice or credit note to the buyer again', params: IdParams, body: EmptyBody, response: withProblems({ 200: ResendResult }) },
    handler: async (request) => {
      const r = await invoices.resend(request.params.id, { userId: request.auth!.user.id, role: request.auth!.user.role, requestId: String(request.id) });
      if (!r) throw new ApiProblem('not_found');
      return r;
    },
  });
}
