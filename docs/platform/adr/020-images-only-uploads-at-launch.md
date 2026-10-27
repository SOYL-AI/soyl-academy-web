# ADR-020: Images only for AI uploads at launch (PDF uploads off)

Status: accepted (backend-api / ai-gateway, 2026-10-28)
Related: S6-M01 (M6 security review), F-013, ADR-013 (AI gateway, uploads), AC-16, ASVS 5.2.x, D-034 (paper-from-upload price).

## Context

Photo doubts and "papers like my school's" accept uploads straight to Blob storage (D-018). Images are
rebuilt from their image data (metadata and trailing payloads dropped). PDFs were checked with regular
expressions (`media.ts` `checkPdf`: page objects and `/Count`, a deny-list of action names) and then sent
to the model byte-for-byte.

The M6 review (PoC-2) showed the regex checks are bypassable:

- hex-escaped names (`/J#61vaScript`), actions missing from the list (`/OpenAction`, `/AA`, `/URI`) and
  anything inside a compressed object stream (`/ObjStm`, FlateDecode) pass;
- page objects and the page tree inside an object stream are invisible, so a 200-page paper counts as 1
  page. The 10-page cap — and with it the priced cost of `paper-from-upload` (₹6.10 against ₹6.00 of
  credits, D-034) — can be exceeded within the 10 MB limit, amplifying model spend on the global cap.

## Options

1. **Parse PDFs with a real parser in the worker and rasterise pages to images** (pdf.js / pdf-lib /
   MuPDF in a sandboxed job with CPU, memory and time limits): decode object streams, count pages from the
   resolved page tree, reject on parse failure, reject any action dictionary after name normalisation,
   render ≤ 10 pages to images and send images only; meter by real pages.
   Cost: a new runtime dependency with a large attack surface of its own (pdf.js needs a canvas
   implementation in Node; MuPDF is native/WASM and AGPL), a sandbox for it, worker image changes, and
   multi-image prompts for the blueprint. Not small, and not something to add in a security-fix pass.
2. **Disable PDF uploads at launch: images only**, for photo doubts and sample papers alike. Students
   photograph the paper (the web already compresses and re-encodes photos, HEIC included).

## Decision

Option 2 now; option 1 is the follow-up before PDFs return.

- Config: `AI_UPLOADS.contentTypes` (`platform/shared/config/ai-actions.ts`) is
  `['image/jpeg', 'image/png', 'image/webp']`. A shared config test pins it.
- API: `POST /v1/ai/uploads` validates `contentType` against that list (`400 validation_failed` for
  `application/pdf`; the generated client type no longer offers it).
- Processing (`media.ts` `validateAndClean`): a sniffed PDF is refused as `unsupported_type`
  **whatever the config says** — re-adding `'application/pdf'` to the config alone cannot bring back the
  regex path. `checkPdf` stays only as a documented non-boundary pre-filter for option 1. A PDF row created
  before this change is refused when it is processed.
- Use: `Preflight.readyUpload` refuses an upload whose processed type is not accepted any more
  (`422 upload_rejected`), and the `paper-from-upload` job refuses it as `upload_type_disabled` (refunded).
  So a PDF that was processed before the switch can never reach a model; this closes the page-count cost
  bypass. Images are one page each; the model only ever receives images.
- Web: `prepareFile` refuses PDFs before anything is uploaded ("PDFs cannot be uploaded yet. Take a clear
  photo of the page instead"); the sample-paper file input accepts `AI_UPLOADS.contentTypes` only.

## Consequences

- A student with a PDF sample paper has to photograph it (one page per upload today). A multi-photo
  sample paper is a product follow-up together with option 1.
- To bring PDFs back: implement option 1 in the worker (real parser, page-tree count, action rejection
  after normalisation, rasterise ≤ `AI_UPLOADS.maxPdfPages` pages, send images only, meter by pages),
  remove the unconditional PDF refusal in `validateAndClean`, add `'application/pdf'` to the config and
  update this ADR and the config test.
- Tests: `api/test/ai-uploads.test.ts` (PDF refused at create for both kinds; every PoC-2 variant refused
  in processing; a legacy ready PDF refused for paper-from-upload without charge), `api/test/ai-unit.test.ts`
  (`validateAndClean` refuses PDFs), `shared/config/ai-actions.test.ts`, web `m4-ai-logic.test.ts`.
