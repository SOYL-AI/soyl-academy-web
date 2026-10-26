/**
 * Narration text-to-speech (pipeline stage 8, Azure AI Speech).
 *
 * - AzureSpeechProvider: REST `POST /cognitiveservices/v1` with SSML, keyless Entra auth
 *   (`Authorization: Bearer aad#{resourceId}#{token}`, token scope cognitiveservices.azure.com).
 *   The identity needs "Cognitive Services Speech User" on the Speech resource.
 * - MockSpeechProvider: deterministic Ogg Opus silence of the estimated duration; refuses
 *   production (GEN-3).
 *
 * Duration: the TTS REST response carries no duration, so the Azure provider measures the returned
 * Ogg stream (last granule position − pre-skip, 48 kHz) and falls back to `estimateDurationMs` when
 * the stream cannot be parsed. The mock's silence is exactly the estimate.
 */
import {
  HttpError,
  ProviderConfigError,
  assertMockAllowed,
  withRetry,
  type Env,
  type RetryOptions,
  type TokenCredentialLike,
} from '@soyl/ai-core';
import { BearerTokenCache, defaultAzureCredential } from '../blob';
import { oggOpusDurationMs, oggOpusSilence } from './ogg-opus';

export const SPEECH_SCOPE = 'https://cognitiveservices.azure.com/.default';

export interface SpeechRequest {
  text: string;
  /** Content language code: en, hi, bn, … */
  language: string;
  /** Override the configured voice for the language. */
  voice?: string;
  /** For logs and errors only. */
  slideId?: string;
}

export interface SpeechResult {
  audio: Uint8Array;
  contentType: string;
  durationMs: number;
  voice: string;
  format: SpeechOutputFormat;
}

export interface SpeechProvider {
  readonly name: string;
  readonly simulated: boolean;
  synthesize(req: SpeechRequest): Promise<SpeechResult>;
}

// ---------------------------------------------------------------------------------------------
// Voices

export interface VoiceConfig {
  /** Azure neural voice name. */
  voice: string;
  /** BCP-47 locale for xml:lang. */
  locale: string;
  /** True when the language has no verified voice and this is the en-IN/hi-IN stand-in. */
  fallback: boolean;
}

const v = (voice: string, fallback = false): VoiceConfig => ({ voice, locale: voice.split('-').slice(0, 2).join('-'), fallback });

/**
 * Female neural voices per content language. Every non-fallback name is a long-standing Azure
 * neural voice. pa/or/as: Azure lists pa-IN-VaaniNeural, or-IN-SubhasiniNeural and
 * as-IN-YashicaNeural in recent releases, but they are not verified for this project yet, so those
 * languages fall back to hi-IN-SwaraNeural (closest Indic prosody). A Hindi voice cannot read
 * Gurmukhi/Odia/Bengali-Assamese script well: verify the candidate names against
 * `GET https://{region}.tts.speech.microsoft.com/cognitiveservices/voices/list` and switch before
 * producing audio in those languages.
 */
export const VOICES: Record<string, VoiceConfig> = {
  en: v('en-IN-NeerjaNeural'),
  hi: v('hi-IN-SwaraNeural'),
  bn: v('bn-IN-TanishaaNeural'),
  ta: v('ta-IN-PallaviNeural'),
  te: v('te-IN-ShrutiNeural'),
  kn: v('kn-IN-SapnaNeural'),
  ml: v('ml-IN-SobhanaNeural'),
  gu: v('gu-IN-DhwaniNeural'),
  mr: v('mr-IN-AarohiNeural'),
  ur: v('ur-IN-GulNeural'),
  pa: v('hi-IN-SwaraNeural', true), // candidate: pa-IN-VaaniNeural
  or: v('hi-IN-SwaraNeural', true), // candidate: or-IN-SubhasiniNeural
  as: v('hi-IN-SwaraNeural', true), // candidate: as-IN-YashicaNeural
};

/** Devanagari-script languages without their own voice (sa, ne, kok, mai, …) use hi-IN; anything else en-IN. */
const DEVANAGARI_FALLBACK = new Set(['sa', 'ne', 'kok', 'mai', 'doi', 'bho']);

export function voiceFor(language: string): VoiceConfig {
  const known = VOICES[language];
  if (known) return known;
  return DEVANAGARI_FALLBACK.has(language) ? { ...VOICES.hi!, fallback: true } : { ...VOICES.en!, fallback: true };
}

/** Locale of a voice name such as hi-IN-SwaraNeural → hi-IN. */
export function voiceLocale(voice: string): string {
  const m = /^([a-z]{2,3}-[A-Z]{2})-/.exec(voice);
  if (!m) throw new Error(`unrecognised voice name "${voice}" (expected e.g. en-IN-NeerjaNeural)`);
  return m[1]!;
}

// ---------------------------------------------------------------------------------------------
// Duration estimate and SSML

const WORDS_PER_MINUTE: Record<string, number> = { en: 150 };
const INDIC_WPM = 130;
const MIN_SPEECH_MS = 1_000;
const LEAD_TAIL_MS = 400;

/** Spoken length estimate: en 150 wpm, Indic (and other) languages 130 wpm; at least 1 s, plus 400 ms lead/tail. */
export function estimateDurationMs(text: string, language: string): number {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/u).length : 0;
  const wpm = WORDS_PER_MINUTE[language] ?? INDIC_WPM;
  return Math.max(MIN_SPEECH_MS, Math.round((words / wpm) * 60_000)) + LEAD_TAIL_MS;
}

export function xmlEscape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]!);
}

/** SSML for one narration; every interpolated value is XML-escaped, so narration cannot inject markup. */
export function buildSsml(text: string, voice: string, locale: string): string {
  // Control characters other than tab/newline are not allowed in XML 1.0 and make Azure reject the request.
  // eslint-disable-next-line no-control-regex
  const clean = text.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f￾￿]/g, ' ');
  return (
    `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${xmlEscape(locale)}">` +
    `<voice name="${xmlEscape(voice)}"><prosody rate="-5%">${xmlEscape(clean)}</prosody></voice></speak>`
  );
}

// ---------------------------------------------------------------------------------------------
// Output formats

/**
 * Allowed X-Microsoft-OutputFormat values: Ogg Opus only. Azure does not state a bitrate for these
 * three (its encoder targets speech-grade bitrates). Excluded:
 * - webm-*-opus and audio-*-opus: Opus, but not in the Ogg container that the `.ogg` keys,
 *   `audio/ogg` content type and the player assume (audio-24khz-16bit-48kbps-mono-opus is also > 32 kbps);
 * - every MP3/RIFF/raw PCM/AMR/G.722 format (not Opus/AAC); Azure TTS offers no AAC output.
 */
export const SPEECH_OUTPUT_FORMATS = ['ogg-16khz-16bit-mono-opus', 'ogg-24khz-16bit-mono-opus', 'ogg-48khz-16bit-mono-opus'] as const;
export type SpeechOutputFormat = (typeof SPEECH_OUTPUT_FORMATS)[number];
export const DEFAULT_OUTPUT_FORMAT: SpeechOutputFormat = 'ogg-24khz-16bit-mono-opus';
export const SPEECH_CONTENT_TYPE = 'audio/ogg';

export function assertOutputFormat(format: string): SpeechOutputFormat {
  if (!(SPEECH_OUTPUT_FORMATS as readonly string[]).includes(format))
    throw new ProviderConfigError(`speech output format "${format}" is not allowed (use one of ${SPEECH_OUTPUT_FORMATS.join(', ')})`);
  return format as SpeechOutputFormat;
}

// ---------------------------------------------------------------------------------------------
// Azure

export interface AzureSpeechConfig {
  /** e.g. centralindia → https://centralindia.tts.speech.microsoft.com. */
  region?: string;
  /** Overrides region, e.g. a custom-domain endpoint. https only, no path. */
  endpoint?: string;
  /** ARM resource ID of the Speech resource (required for Entra auth). */
  resourceId: string;
  /** Defaults to DefaultAzureCredential (lazily loaded). */
  credential?: TokenCredentialLike;
  fetch?: typeof fetch;
  outputFormat?: string;
  retry?: Partial<RetryOptions>;
  timeoutMs?: number;
}

export class AzureSpeechProvider implements SpeechProvider {
  readonly name = 'azure-speech';
  readonly simulated = false;
  readonly url: string;
  readonly outputFormat: SpeechOutputFormat;
  private readonly fetchImpl: typeof fetch;
  private readonly tokens: BearerTokenCache;

  constructor(private readonly config: AzureSpeechConfig) {
    let base: string;
    if (config.endpoint) {
      if (!/^https:\/\/[^/?#]+\/?$/.test(config.endpoint)) throw new ProviderConfigError('AzureSpeechProvider: endpoint must be an https URL with no path');
      base = config.endpoint.replace(/\/+$/, '');
    } else if (config.region) {
      if (!/^[a-z0-9]+$/.test(config.region)) throw new ProviderConfigError(`AzureSpeechProvider: invalid region "${config.region}"`);
      base = `https://${config.region}.tts.speech.microsoft.com`;
    } else throw new ProviderConfigError('AzureSpeechProvider: region or endpoint is required');
    if (!/^\/subscriptions\/[^/]+\/resourceGroups\/[^/]+\/providers\/Microsoft\.CognitiveServices\/accounts\/[^/]+$/i.test(config.resourceId))
      throw new ProviderConfigError(
        'AzureSpeechProvider: resourceId must be the Speech resource ID (/subscriptions/…/resourceGroups/…/providers/Microsoft.CognitiveServices/accounts/…)',
      );
    this.url = `${base}/cognitiveservices/v1`;
    this.outputFormat = assertOutputFormat(config.outputFormat ?? DEFAULT_OUTPUT_FORMAT);
    this.fetchImpl = config.fetch ?? globalThis.fetch;
    this.tokens = new BearerTokenCache(SPEECH_SCOPE, config.credential, 'AzureSpeechProvider');
  }

  async synthesize(req: SpeechRequest): Promise<SpeechResult> {
    if (!req.text.trim()) throw new Error(`AzureSpeechProvider: empty narration${req.slideId ? ` (${req.slideId})` : ''}`);
    const voice = req.voice ?? voiceFor(req.language).voice;
    const ssml = buildSsml(req.text, voice, voiceLocale(voice));
    const audio = await withRetry(async () => {
      const res = await this.fetchImpl(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': this.outputFormat,
          'User-Agent': 'soyl-content-pipeline',
          Authorization: `Bearer aad#${this.config.resourceId}#${await this.tokens.get()}`,
        },
        body: ssml,
        signal: AbortSignal.timeout(this.config.timeoutMs ?? 120_000),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new HttpError(res.status, `Azure Speech${req.slideId ? ` ${req.slideId}` : ''} → HTTP ${res.status}: ${text.slice(0, 500)}`, res.headers, text);
      }
      return new Uint8Array(await res.arrayBuffer());
    }, this.config.retry);
    if (audio.length < 4 || audio[0] !== 0x4f || audio[1] !== 0x67 || audio[2] !== 0x67 || audio[3] !== 0x53)
      throw new Error(`Azure Speech${req.slideId ? ` ${req.slideId}` : ''}: response is not an Ogg stream (${audio.length} bytes)`);
    return {
      audio,
      contentType: SPEECH_CONTENT_TYPE,
      durationMs: oggOpusDurationMs(audio) ?? estimateDurationMs(req.text, req.language),
      voice,
      format: this.outputFormat,
    };
  }
}

// ---------------------------------------------------------------------------------------------
// Mock

export class MockSpeechProvider implements SpeechProvider {
  readonly name = 'mock-speech';
  readonly simulated = true;

  constructor(opts: { env?: Env; unsafeAllowInProduction?: boolean } = {}) {
    assertMockAllowed('MockSpeechProvider', opts.env ?? process.env, opts.unsafeAllowInProduction);
  }

  async synthesize(req: SpeechRequest): Promise<SpeechResult> {
    const durationMs = estimateDurationMs(req.text, req.language);
    return {
      audio: oggOpusSilence(durationMs),
      contentType: SPEECH_CONTENT_TYPE,
      durationMs,
      voice: req.voice ?? voiceFor(req.language).voice,
      format: 'ogg-48khz-16bit-mono-opus',
    };
  }
}

// ---------------------------------------------------------------------------------------------
// Factory

export const SPEECH_ENV = {
  region: 'AZURE_SPEECH_REGION',
  endpoint: 'AZURE_SPEECH_ENDPOINT',
  resourceId: 'AZURE_SPEECH_RESOURCE_ID',
  outputFormat: 'AZURE_SPEECH_OUTPUT_FORMAT',
} as const;

export interface SpeechProviderOptions {
  provider: 'mock' | 'azure';
  env?: Env;
  credential?: TokenCredentialLike;
  fetch?: typeof fetch;
  retry?: Partial<RetryOptions>;
}

/** Async because the Azure path loads DefaultAzureCredential up front, so a missing @azure/identity fails early. */
export async function speechProviderFromEnv(opts: SpeechProviderOptions): Promise<SpeechProvider> {
  const env = opts.env ?? process.env;
  if (opts.provider === 'mock') return new MockSpeechProvider({ env });
  if (opts.provider === 'azure') {
    const region = env[SPEECH_ENV.region]?.trim();
    const endpoint = env[SPEECH_ENV.endpoint]?.trim();
    const resourceId = env[SPEECH_ENV.resourceId]?.trim();
    const missing: string[] = [];
    if (!region && !endpoint) missing.push(`${SPEECH_ENV.region} (or ${SPEECH_ENV.endpoint})`);
    if (!resourceId) missing.push(SPEECH_ENV.resourceId);
    if (missing.length) throw new ProviderConfigError(`Azure AI Speech is not configured: set ${missing.join(', ')}. Until then use the mock speech provider.`);
    const outputFormat = env[SPEECH_ENV.outputFormat]?.trim() || undefined;
    if (outputFormat) assertOutputFormat(outputFormat);
    return new AzureSpeechProvider({
      region,
      endpoint,
      resourceId: resourceId!,
      credential: opts.credential ?? (await defaultAzureCredential()),
      fetch: opts.fetch,
      outputFormat,
      retry: opts.retry,
    });
  }
  throw new ProviderConfigError(`unknown speech provider "${String(opts.provider)}" (expected mock or azure)`);
}
