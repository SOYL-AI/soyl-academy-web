import { z } from 'zod';

/** The parts of a Razorpay webhook event the Future Builders safety net reads. */
const eventSchema = z.object({
  event: z.string(),
  payload: z
    .object({
      payment: z.object({ entity: z.object({ id: z.string(), order_id: z.string().nullable().optional() }) }).optional(),
      order: z.object({ entity: z.object({ id: z.string() }) }).optional(),
    })
    .passthrough(),
});

export type WebhookEvent = z.infer<typeof eventSchema>;

export function parseWebhookEvent(json: unknown): WebhookEvent | null {
  const parsed = eventSchema.safeParse(json);
  return parsed.success ? parsed.data : null;
}

/** Events acted on; everything else is acknowledged and ignored. */
export const HANDLED_EVENTS = ['payment.captured', 'order.paid'] as const;

/** The order and payment an event is about, or null for events we don't act on. */
export function paymentRef(event: WebhookEvent): { orderId: string; paymentId: string } | null {
  if (!(HANDLED_EVENTS as readonly string[]).includes(event.event)) return null;
  const paymentId = event.payload.payment?.entity.id;
  const orderId = event.payload.order?.entity.id ?? event.payload.payment?.entity.order_id ?? undefined;
  return paymentId && orderId ? { orderId, paymentId } : null;
}
