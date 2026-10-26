import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { MockInProductionError, ProviderConfigError, type TokenCredentialLike } from '@soyl/ai-core';
import { Deck } from '@soyl/shared/content/index';
import { AzureBlobStore, LocalBlobStore, assertBlobKey, blobStoreFromEnv, defaultBlobDir, parseListBlobs, sha256Hex, type BlobStore } from '../src/blob';
import { OPUS_PRE_SKIP, OPUS_SILENT_PACKET, oggCrc32, oggOpusDurationMs, oggOpusSilence, opusPreSkip, parseOgg } from '../src/tts/ogg-opus';
import {
  AzureSpeechProvider,
  MockSpeechProvider,
  SPEECH_SCOPE,
  VOICES,
  buildSsml,
  estimateDurationMs,
  speechProviderFromEnv,
  voiceFor,
  type SpeechProvider,
} from '../src/tts/speech';
import { audioKey, synthesizeDeck } from '../src/tts/audio';

const RESOURCE_ID = '/subscriptions/0000/resourceGroups/rg-soyl/providers/Microsoft.CognitiveServices/accounts/soyl-speech';
const noSleep = { sleep: async () => undefined, random: () => 0 };

function fakeCredential() {
  const scopes: string[] = [];
  const credential: TokenCredentialLike = {
    async getToken(scope) {
      scopes.push(String(scope));
      return { token: 'tok-123', expiresOnTimestamp: Date.now() + 3_600_000 };
    },
  };
  return { credential, scopes };
}

interface Call {
  url: string;
  method: string;
  headers: Headers;
  body: Uint8Array | string | null;
}

function recordingFetch(handler: (call: Call, n: number) => Response | Promise<Response>) {
  const calls: Call[] = [];
  const fetchImpl = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const body = init.body;
    const call: Call = {
      url: String(input),
      method: init.method ?? 'GET',
      headers: new Headers(init.headers),
      body: body == null ? null : typeof body === 'string' ? body : new Uint8Array(body as Uint8Array),
    };
    calls.push(call);
    return handler(call, calls.length);
  }) as typeof fetch;
  return { fetch: fetchImpl, calls };
}

const dirs: string[] = [];
function tempDir(): string {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'soyl-blob-'));
  dirs.push(d);
  return d;
}
afterAll(() => {
  for (const d of dirs) fs.rmSync(d, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------------------------

describe('Ogg Opus silence', () => {
  it('writes pages with valid CRCs, BOS/EOS, OpusHead and OpusTags', () => {
    const bytes = oggOpusSilence(2_500);
    const ogg = parseOgg(bytes); // throws on a bad capture pattern or CRC
    expect(ogg.pages.length).toBeGreaterThanOrEqual(4);
    expect(ogg.pages[0]!.bos).toBe(true);
    expect(ogg.pages.slice(1).every((p) => !p.bos)).toBe(true);
    expect(ogg.pages.at(-1)!.eos).toBe(true);
    expect(ogg.pages.slice(0, -1).every((p) => !p.eos)).toBe(true);
    expect(ogg.pages.map((p) => p.sequence)).toEqual(ogg.pages.map((_, i) => i));
    expect(new Set(ogg.pages.map((p) => p.serial)).size).toBe(1);
    expect(ogg.pages[0]!.granule).toBe(0);
    expect(ogg.pages[1]!.granule).toBe(0);

    const head = ogg.packets[0]!;
    expect(new TextDecoder().decode(head.subarray(0, 8))).toBe('OpusHead');
    const view = new DataView(head.buffer, head.byteOffset, head.byteLength);
    expect(head[8]).toBe(1); // version
    expect(head[9]).toBe(1); // channels
    expect(view.getUint16(10, true)).toBe(312);
    expect(view.getUint32(12, true)).toBe(48_000);
    expect(head[18]).toBe(0);
    expect(opusPreSkip(head)).toBe(OPUS_PRE_SKIP);
    expect(new TextDecoder().decode(ogg.packets[1]!.subarray(0, 8))).toBe('OpusTags');
    // OpusHead and OpusTags each alone on their page; audio starts on page 2.
    expect(ogg.pages[0]!.segments).toEqual([19]);
    expect(ogg.pages[2]!.segments.every((s) => s === 3)).toBe(true);

    const audio = ogg.packets.slice(2);
    expect(audio.every((p) => p.length === 3 && p[0] === 0xf8 && p[1] === 0xff && p[2] === 0xfe)).toBe(true);
    expect(OPUS_SILENT_PACKET).toEqual([0xf8, 0xff, 0xfe]);
    // Enough 20 ms packets to cover pre-skip + duration, and no more than one extra.
    expect(audio.length).toBe(Math.ceil((OPUS_PRE_SKIP + 2.5 * 48_000) / 960));
  });

  it('granule = pre-skip + duration samples; intermediate pages count whole packets', () => {
    for (const ms of [20, 999, 1_000, 7_340, 61_000]) {
      const ogg = parseOgg(oggOpusSilence(ms));
      expect(ogg.granule).toBe(OPUS_PRE_SKIP + ms * 48);
      expect(oggOpusDurationMs(oggOpusSilence(ms))).toBe(ms);
      const granules = ogg.pages.slice(2).map((p) => p.granule);
      for (let i = 1; i < granules.length; i++) expect(granules[i]!).toBeGreaterThan(granules[i - 1]!);
      for (const p of ogg.pages.slice(2, -1)) expect(p.granule % 960).toBe(0);
    }
  });

  it('is deterministic and rejects bad input; parseOgg rejects corruption', () => {
    expect(oggOpusSilence(1_234)).toEqual(oggOpusSilence(1_234));
    expect(() => oggOpusSilence(0)).toThrow();
    const bytes = oggOpusSilence(1_000);
    const flipped = bytes.slice();
    flipped[bytes.length - 1]! ^= 0x01;
    expect(() => parseOgg(flipped)).toThrow(/CRC mismatch/);
    const noMagic = bytes.slice();
    noMagic[0] = 0x00;
    expect(() => parseOgg(noMagic)).toThrow(/capture pattern/);
    expect(oggOpusDurationMs(new Uint8Array([1, 2, 3]))).toBeNull();
  });

  it('uses the Ogg CRC-32 (poly 0x04c11db7, unreflected, init 0)', () => {
    expect(oggCrc32(new Uint8Array())).toBe(0);
    // CRC-32/POSIX (cksum) check value 0x765e7680 without its final xor 0xffffffff.
    expect(oggCrc32(new TextEncoder().encode('123456789'))).toBe(0x89a1897f);
  });
});

// ---------------------------------------------------------------------------------------------

describe('speech helpers', () => {
  it('estimates duration from words per minute with a floor and lead/tail', () => {
    expect(estimateDurationMs('', 'en')).toBe(1_400);
    expect(estimateDurationMs('one', 'en')).toBe(1_400); // 400 ms of speech → 1 s floor
    expect(estimateDurationMs('one two three', 'en')).toBe(1_600);
    expect(estimateDurationMs(Array(150).fill('word').join(' '), 'en')).toBe(60_400);
    expect(estimateDurationMs(Array(130).fill('शब्द').join(' '), 'hi')).toBe(60_400);
    expect(estimateDurationMs(Array(130).fill('w').join(' '), 'ta')).toBe(60_400);
    expect(estimateDurationMs(Array(13).fill('w').join('\n  '), 'bn')).toBe(6_400);
  });

  it('escapes narration so it cannot inject SSML', () => {
    const ssml = buildSsml(`Tom & Jerry's "<b>" </voice><voice name="x">evil`, 'en-IN-NeerjaNeural', 'en-IN');
    expect(ssml).toBe(
      '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-IN"><voice name="en-IN-NeerjaNeural"><prosody rate="-5%">' +
        'Tom &amp; Jerry&apos;s &quot;&lt;b&gt;&quot; &lt;/voice&gt;&lt;voice name=&quot;x&quot;&gt;evil' +
        '</prosody></voice></speak>',
    );
    expect(ssml.match(/<voice /g)).toHaveLength(1);
  });

  it('has a voice for every configured language and falls back for the rest', () => {
    expect(VOICES.en!.voice).toBe('en-IN-NeerjaNeural');
    expect(VOICES.hi!.voice).toBe('hi-IN-SwaraNeural');
    for (const lang of ['bn', 'ta', 'te', 'kn', 'ml', 'gu', 'mr', 'pa', 'ur', 'or', 'as']) expect(VOICES[lang]).toBeDefined();
    expect(voiceFor('sa')).toMatchObject({ voice: 'hi-IN-SwaraNeural', fallback: true });
    expect(voiceFor('fr')).toMatchObject({ voice: 'en-IN-NeerjaNeural', fallback: true });
    expect(voiceFor('ta')).toMatchObject({ voice: 'ta-IN-PallaviNeural', locale: 'ta-IN', fallback: false });
  });
});

describe('AzureSpeechProvider', () => {
  const okOgg = () => new Response(oggOpusSilence(3_000), { status: 200, headers: { 'content-type': 'audio/ogg' } });

  it('posts SSML with keyless aad# bearer auth and the output format', async () => {
    const { credential, scopes } = fakeCredential();
    const { fetch, calls } = recordingFetch(okOgg);
    const p = new AzureSpeechProvider({ region: 'centralindia', resourceId: RESOURCE_ID, credential, fetch, retry: noSleep });
    const r = await p.synthesize({ text: 'नमस्ते <दुनिया>', language: 'hi', slideId: 's01' });

    expect(calls).toHaveLength(1);
    const c = calls[0]!;
    expect(c.url).toBe('https://centralindia.tts.speech.microsoft.com/cognitiveservices/v1');
    expect(c.method).toBe('POST');
    expect(c.headers.get('content-type')).toBe('application/ssml+xml');
    expect(c.headers.get('x-microsoft-outputformat')).toBe('ogg-24khz-16bit-mono-opus');
    expect(c.headers.get('user-agent')).toBe('soyl-content-pipeline');
    expect(c.headers.get('authorization')).toBe(`Bearer aad#${RESOURCE_ID}#tok-123`);
    expect(c.headers.has('ocp-apim-subscription-key')).toBe(false);
    expect(scopes).toEqual([SPEECH_SCOPE]);
    expect(SPEECH_SCOPE).toBe('https://cognitiveservices.azure.com/.default');
    expect(c.body).toBe(buildSsml('नमस्ते <दुनिया>', 'hi-IN-SwaraNeural', 'hi-IN'));
    expect(String(c.body)).toContain('xml:lang="hi-IN"');

    expect(r).toMatchObject({ contentType: 'audio/ogg', voice: 'hi-IN-SwaraNeural', format: 'ogg-24khz-16bit-mono-opus', durationMs: 3_000 });
    expect(r.audio.length).toBeGreaterThan(0);
  });

  it('uses a custom endpoint and voice override; caches the token', async () => {
    const { credential, scopes } = fakeCredential();
    const { fetch, calls } = recordingFetch(okOgg);
    const p = new AzureSpeechProvider({
      endpoint: 'https://soyl-speech.cognitiveservices.azure.com/',
      resourceId: RESOURCE_ID,
      credential,
      fetch,
      outputFormat: 'ogg-48khz-16bit-mono-opus',
    });
    await p.synthesize({ text: 'a', language: 'en', voice: 'en-IN-AashiNeural' });
    await p.synthesize({ text: 'b', language: 'en' });
    expect(calls[0]!.url).toBe('https://soyl-speech.cognitiveservices.azure.com/cognitiveservices/v1');
    expect(calls[0]!.headers.get('x-microsoft-outputformat')).toBe('ogg-48khz-16bit-mono-opus');
    expect(String(calls[0]!.body)).toContain('<voice name="en-IN-AashiNeural">');
    expect(String(calls[1]!.body)).toContain('<voice name="en-IN-NeerjaNeural">');
    expect(scopes).toHaveLength(1);
  });

  it('retries 429 honouring retry-after, then succeeds', async () => {
    const { credential } = fakeCredential();
    const delays: number[] = [];
    const { fetch, calls } = recordingFetch((_c, n) =>
      n === 1 ? new Response('busy', { status: 429, headers: { 'retry-after': '2' } }) : n === 2 ? new Response('oops', { status: 503 }) : okOgg(),
    );
    const p = new AzureSpeechProvider({
      region: 'centralindia',
      resourceId: RESOURCE_ID,
      credential,
      fetch,
      retry: { ...noSleep, sleep: async (ms) => void delays.push(ms) },
    });
    const r = await p.synthesize({ text: 'hello', language: 'en' });
    expect(calls).toHaveLength(3);
    expect(delays[0]).toBe(2_000);
    expect(r.durationMs).toBe(3_000);
  });

  it('does not retry 400 and rejects a non-Ogg body', async () => {
    const { credential } = fakeCredential();
    const bad = recordingFetch(() => new Response('bad ssml', { status: 400 }));
    await expect(
      new AzureSpeechProvider({ region: 'centralindia', resourceId: RESOURCE_ID, credential, fetch: bad.fetch, retry: noSleep }).synthesize({ text: 'x', language: 'en' }),
    ).rejects.toThrow(/HTTP 400/);
    expect(bad.calls).toHaveLength(1);
    const html = recordingFetch(() => new Response('<html>', { status: 200 }));
    await expect(
      new AzureSpeechProvider({ region: 'centralindia', resourceId: RESOURCE_ID, credential, fetch: html.fetch }).synthesize({ text: 'x', language: 'en' }),
    ).rejects.toThrow(/not an Ogg stream/);
  });

  it('rejects disallowed output formats and bad config', () => {
    const { credential } = fakeCredential();
    for (const outputFormat of ['audio-24khz-48kbitrate-mono-mp3', 'riff-24khz-16bit-mono-pcm', 'audio-24khz-16bit-48kbps-mono-opus', 'webm-24khz-16bit-mono-opus'])
      expect(() => new AzureSpeechProvider({ region: 'centralindia', resourceId: RESOURCE_ID, credential, outputFormat })).toThrow(ProviderConfigError);
    expect(() => new AzureSpeechProvider({ resourceId: RESOURCE_ID, credential })).toThrow(/region or endpoint/);
    expect(() => new AzureSpeechProvider({ region: 'centralindia', resourceId: 'abc', credential })).toThrow(/resourceId/);
    expect(() => new AzureSpeechProvider({ endpoint: 'http://x.example', resourceId: RESOURCE_ID, credential })).toThrow(/https/);
  });
});

describe('speechProviderFromEnv / MockSpeechProvider', () => {
  it('lists every missing Azure env var', async () => {
    const err = await speechProviderFromEnv({ provider: 'azure', env: {}, credential: fakeCredential().credential }).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ProviderConfigError);
    expect((err as Error).message).toContain('AZURE_SPEECH_REGION');
    expect((err as Error).message).toContain('AZURE_SPEECH_ENDPOINT');
    expect((err as Error).message).toContain('AZURE_SPEECH_RESOURCE_ID');
    const onlyId = await speechProviderFromEnv({ provider: 'azure', env: { AZURE_SPEECH_REGION: 'centralindia' } }).catch((e: unknown) => e);
    expect((onlyId as Error).message).toMatch(/set AZURE_SPEECH_RESOURCE_ID\./);
  });

  it('builds Azure from env and validates the output format', async () => {
    const { credential } = fakeCredential();
    const env = { AZURE_SPEECH_REGION: 'centralindia', AZURE_SPEECH_RESOURCE_ID: RESOURCE_ID };
    const p = await speechProviderFromEnv({ provider: 'azure', env, credential });
    expect(p).toBeInstanceOf(AzureSpeechProvider);
    expect((p as AzureSpeechProvider).outputFormat).toBe('ogg-24khz-16bit-mono-opus');
    await expect(
      speechProviderFromEnv({ provider: 'azure', env: { ...env, AZURE_SPEECH_OUTPUT_FORMAT: 'audio-48khz-192kbitrate-mono-mp3' }, credential }),
    ).rejects.toThrow(ProviderConfigError);
  });

  it('mock is deterministic silence of the estimated duration and refuses production', async () => {
    const m = await speechProviderFromEnv({ provider: 'mock', env: { NODE_ENV: 'test' } });
    expect(m.simulated).toBe(true);
    const r = await m.synthesize({ text: 'one two three four five', language: 'en' });
    expect(r.durationMs).toBe(estimateDurationMs('one two three four five', 'en'));
    expect(oggOpusDurationMs(r.audio)).toBe(r.durationMs);
    expect(r.audio).toEqual((await m.synthesize({ text: 'one two three four five', language: 'en' })).audio);
    expect(() => new MockSpeechProvider({ env: { NODE_ENV: 'production' } })).toThrow(MockInProductionError);
    expect(() => new MockSpeechProvider({ env: { APP_ENV: 'prod' } })).toThrow(MockInProductionError);
    await expect(speechProviderFromEnv({ provider: 'mock', env: { APP_ENV: 'prod' } })).rejects.toThrow(MockInProductionError);
  });
});

// ---------------------------------------------------------------------------------------------

describe('LocalBlobStore', () => {
  it('put/get/exists/list round-trip with atomic writes', async () => {
    const root = tempDir();
    const s = new LocalBlobStore(root);
    const bytes = new Uint8Array([1, 2, 3, 4]);
    const put = await s.put('audio/u1/deck/s01-abc.ogg', bytes, 'audio/ogg');
    expect(put).toEqual({ key: 'audio/u1/deck/s01-abc.ogg', bytes: 4, sha256: sha256Hex(bytes) });
    await s.put('audio/u1/deck/s02-def.ogg', new Uint8Array([9]), 'audio/ogg');
    await s.put('audio/u2/deck/s01-xyz.ogg', new Uint8Array([7]), 'audio/ogg');
    await s.put('audio/u1/deck/s01-abc.ogg', new Uint8Array([5, 6]), 'audio/ogg'); // overwrite

    expect(await s.get('audio/u1/deck/s01-abc.ogg')).toEqual(new Uint8Array([5, 6]));
    expect(await s.get('audio/u1/deck/missing.ogg')).toBeNull();
    expect(await s.exists('audio/u1/deck/s02-def.ogg')).toBe(true);
    expect(await s.exists('audio/u1/deck')).toBe(false); // a directory is not a blob
    expect(await s.exists('audio/nope.ogg')).toBe(false);
    expect(await s.list('audio/u1/')).toEqual(['audio/u1/deck/s01-abc.ogg', 'audio/u1/deck/s02-def.ogg']);
    expect(await s.list('audio/u')).toHaveLength(3);
    expect(await s.list('')).toHaveLength(3);
    expect(await s.list('audio/u1/deck/s01')).toEqual(['audio/u1/deck/s01-abc.ogg']);
    expect(await s.list('nothing/')).toEqual([]);
    // No temp files left in the data tree.
    expect(fs.readdirSync(path.join(root, '.tmp'))).toEqual([]);
    expect(s.kind).toBe('local');
    expect(s.describe()).toBe(`local:${path.resolve(root)}`);
  });

  it('rejects unsafe keys', async () => {
    const s = new LocalBlobStore(tempDir());
    for (const key of ['../x', '/abs', 'A_Upper', 'a/../b', 'a//b', 'a/./b', 'a/', '', 'a\\b', 'C:/x', '.hidden'])
      await expect(s.put(key, new Uint8Array([1]), 'x/y'), key).rejects.toThrow(/invalid blob key/);
    await expect(s.get('../x')).rejects.toThrow(/invalid blob key/);
    await expect(s.exists('/abs')).rejects.toThrow(/invalid blob key/);
    await expect(s.list('../')).rejects.toThrow(/invalid blob key/);
    expect(assertBlobKey('audio/cbse-10-science-ch01/deck/s01-0123456789ab.ogg')).toBeTruthy();
  });

  it('blobStoreFromEnv picks local by default and Azure with an account URL', () => {
    const local = blobStoreFromEnv({});
    expect(local.kind).toBe('local');
    expect(local.describe()).toBe(`local:${defaultBlobDir()}`);
    expect(defaultBlobDir().replace(/\\/g, '/')).toMatch(/content-pipeline\/out\/blob$/);
    const dir = tempDir();
    expect(blobStoreFromEnv({ CONTENT_BLOB_DIR: dir }).describe()).toBe(`local:${path.resolve(dir)}`);
    const az = blobStoreFromEnv({ CONTENT_BLOB_ACCOUNT_URL: 'https://soylcontent.blob.core.windows.net' }, { credential: fakeCredential().credential });
    expect(az.kind).toBe('azure');
    expect(az.describe()).toBe('azure:https://soylcontent.blob.core.windows.net/content');
    expect(
      blobStoreFromEnv({ CONTENT_BLOB_ACCOUNT_URL: 'https://a.blob.core.windows.net/', CONTENT_BLOB_CONTAINER: 'media' }).describe(),
    ).toBe('azure:https://a.blob.core.windows.net/media');
  });
});

/** In-memory fake of the Blob service: enough of PUT/GET/HEAD/List Blobs for the store. */
function fakeBlobService(opts: { pageSize?: number; failFirst?: number } = {}) {
  const blobs = new Map<string, { bytes: Uint8Array; contentType: string; meta: string | null }>();
  let failures = opts.failFirst ?? 0;
  const rec = recordingFetch((c) => {
    if (failures > 0) {
      failures--;
      return new Response('throttled', { status: 503 });
    }
    const u = new URL(c.url);
    const [, container, ...rest] = u.pathname.split('/');
    expect(container).toBe('content');
    if (u.searchParams.get('comp') === 'list') {
      const prefix = u.searchParams.get('prefix') ?? '';
      const names = [...blobs.keys()].filter((k) => k.startsWith(prefix)).sort();
      const start = Number(u.searchParams.get('marker') ?? 0);
      const size = opts.pageSize ?? 1000;
      const page = names.slice(start, start + size);
      const next = start + size < names.length ? String(start + size) : '';
      const xml =
        '\uFEFF<?xml version="1.0" encoding="utf-8"?><EnumerationResults ServiceEndpoint="https://a/" ContainerName="content">' +
        `<Prefix>${prefix}</Prefix><Blobs>` +
        page.map((n) => `<Blob><Name>${n}</Name><Properties><Content-Length>1</Content-Length></Properties></Blob>`).join('') +
        `</Blobs>${next ? `<NextMarker>${next}</NextMarker>` : '<NextMarker />'}</EnumerationResults>`;
      return new Response(xml, { status: 200, headers: { 'content-type': 'application/xml' } });
    }
    const key = rest.map(decodeURIComponent).join('/');
    if (c.method === 'PUT') {
      blobs.set(key, { bytes: c.body as Uint8Array, contentType: c.headers.get('content-type') ?? '', meta: c.headers.get('x-ms-meta-sha256') });
      return new Response(null, { status: 201 });
    }
    const blob = blobs.get(key);
    if (!blob) return new Response(c.method === 'HEAD' ? null : '<Error><Code>BlobNotFound</Code></Error>', { status: 404 });
    if (c.method === 'HEAD') return new Response(null, { status: 200 });
    return new Response(blob.bytes.slice(), { status: 200, headers: { 'content-type': blob.contentType } });
  });
  return { ...rec, blobs };
}

describe('AzureBlobStore', () => {
  const ACCOUNT = 'https://soylcontent.blob.core.windows.net';

  it('PUT BlockBlob with keyless bearer auth and API version', async () => {
    const { credential, scopes } = fakeCredential();
    const svc = fakeBlobService();
    const s = new AzureBlobStore({ accountUrl: ACCOUNT, container: 'content', credential, fetch: svc.fetch, retry: noSleep });
    const bytes = oggOpusSilence(1_000);
    const r = await s.put('audio/u1/deck/s01-abc.ogg', bytes, 'audio/ogg');
    expect(r).toEqual({ key: 'audio/u1/deck/s01-abc.ogg', bytes: bytes.length, sha256: sha256Hex(bytes) });
    const c = svc.calls[0]!;
    expect(c.method).toBe('PUT');
    expect(c.url).toBe(`${ACCOUNT}/content/audio/u1/deck/s01-abc.ogg`);
    expect(c.headers.get('x-ms-blob-type')).toBe('BlockBlob');
    expect(c.headers.get('x-ms-version')).toBe('2025-01-05');
    expect(c.headers.get('content-type')).toBe('audio/ogg');
    expect(Date.parse(c.headers.get('x-ms-date')!)).not.toBeNaN();
    expect(c.headers.get('authorization')).toBe('Bearer tok-123');
    expect(c.headers.get('x-ms-meta-sha256')).toBe(r.sha256);
    expect(c.body).toEqual(bytes);
    expect(scopes).toEqual(['https://storage.azure.com/.default']);
  });

  it('GET/HEAD/list (following NextMarker) against the fake service, with retries on 5xx', async () => {
    const { credential, scopes } = fakeCredential();
    const svc = fakeBlobService({ pageSize: 2, failFirst: 1 });
    const s = new AzureBlobStore({ accountUrl: `${ACCOUNT}/`, container: 'content', credential, fetch: svc.fetch, retry: noSleep });
    for (const k of ['audio/u1/deck/s01-a.ogg', 'audio/u1/deck/s02-b.ogg', 'audio/u1/deck/s03-c.ogg', 'audio/u2/deck/s01-d.ogg', 'images/x.svg'])
      await s.put(k, new TextEncoder().encode(k), 'application/octet-stream');
    expect(svc.calls[0]!.method).toBe('PUT'); // the 503
    expect(svc.calls[1]!.method).toBe('PUT'); // its retry

    expect(new TextDecoder().decode((await s.get('audio/u1/deck/s02-b.ogg'))!)).toBe('audio/u1/deck/s02-b.ogg');
    expect(await s.get('audio/none.ogg')).toBeNull();
    expect(await s.exists('audio/u1/deck/s01-a.ogg')).toBe(true);
    expect(await s.exists('audio/none.ogg')).toBe(false);
    expect(svc.calls.filter((c) => c.method === 'HEAD')).toHaveLength(2);

    const before = svc.calls.length;
    expect(await s.list('audio/')).toEqual([
      'audio/u1/deck/s01-a.ogg',
      'audio/u1/deck/s02-b.ogg',
      'audio/u1/deck/s03-c.ogg',
      'audio/u2/deck/s01-d.ogg',
    ]);
    const listCalls = svc.calls.slice(before);
    expect(listCalls).toHaveLength(2);
    const first = new URL(listCalls[0]!.url);
    expect(first.origin + first.pathname).toBe(`${ACCOUNT}/content`);
    expect(first.searchParams.get('restype')).toBe('container');
    expect(first.searchParams.get('comp')).toBe('list');
    expect(first.searchParams.get('prefix')).toBe('audio/');
    expect(first.searchParams.has('marker')).toBe(false);
    expect(new URL(listCalls[1]!.url).searchParams.get('marker')).toBe('2');
    expect(await s.list('')).toHaveLength(5);
    expect(scopes).toHaveLength(1); // token cached
    expect(svc.calls.every((c) => c.headers.get('authorization') === 'Bearer tok-123' && c.headers.get('x-ms-version') === '2025-01-05')).toBe(true);
  });

  it('throws on non-retryable errors and validates config and keys', async () => {
    const { credential } = fakeCredential();
    const denied = recordingFetch(() => new Response('AuthorizationPermissionMismatch', { status: 403 }));
    const s = new AzureBlobStore({ accountUrl: ACCOUNT, container: 'content', credential, fetch: denied.fetch, retry: noSleep });
    await expect(s.get('a.ogg')).rejects.toThrow(/HTTP 403/);
    expect(denied.calls).toHaveLength(1);
    await expect(s.put('../x', new Uint8Array(), 'x/y')).rejects.toThrow(/invalid blob key/);
    expect(() => new AzureBlobStore({ accountUrl: 'http://insecure', container: 'content', credential })).toThrow(/https/);
    expect(() => new AzureBlobStore({ accountUrl: `${ACCOUNT}/content`, container: 'content', credential })).toThrow(/no path/);
    expect(() => new AzureBlobStore({ accountUrl: ACCOUNT, container: 'Bad_Name', credential })).toThrow(/container/);
  });

  it('parses List Blobs XML with entities and empty markers', () => {
    expect(parseListBlobs('<EnumerationResults><Blobs><Blob><Name>a&amp;b.txt</Name></Blob></Blobs><NextMarker/></EnumerationResults>')).toEqual({
      names: ['a&b.txt'],
      nextMarker: null,
    });
    expect(parseListBlobs('<Blobs></Blobs><NextMarker>2!8!abc</NextMarker>').nextMarker).toBe('2!8!abc');
  });
});

// ---------------------------------------------------------------------------------------------

function testDeck(): Deck {
  return Deck.parse({
    unit: 'cbse-10-science-ch01',
    title: 'Chemical reactions',
    goals: ['Recognise a chemical reaction'],
    slides: [
      { id: 's01', layout: 'title', heading: 'Chemical reactions', narration: 'Today we look at chemical reactions.' },
      { id: 's02', layout: 'concept', heading: 'Signs', narration: 'A colour change, a gas, heat or a precipitate tell us a reaction happened.' },
      { id: 's03', layout: 'summary', heading: 'Summary', narration: 'Reactions make new substances.' },
    ],
  });
}

function countingSpeech(inner: SpeechProvider) {
  const texts: string[] = [];
  const speech: SpeechProvider = {
    name: inner.name,
    simulated: inner.simulated,
    async synthesize(req) {
      texts.push(req.text);
      return inner.synthesize(req);
    },
  };
  return { speech, texts };
}

describe('synthesizeDeck', () => {
  it('content-addresses keys by voice and text', () => {
    const k = audioKey('cbse-10-science-ch01', 'deck', 's01', 'hello', 'en-IN-NeerjaNeural');
    expect(k).toMatch(/^audio\/cbse-10-science-ch01\/deck\/s01-[0-9a-f]{12}\.ogg$/);
    expect(audioKey('cbse-10-science-ch01', 'deck', 's01', 'hello', 'en-IN-NeerjaNeural')).toBe(k);
    expect(audioKey('cbse-10-science-ch01', 'deck', 's01', 'hello!', 'en-IN-NeerjaNeural')).not.toBe(k);
    expect(audioKey('cbse-10-science-ch01', 'deck', 's01', 'hello', 'hi-IN-SwaraNeural')).not.toBe(k);
    expect(() => audioKey('../evil', 'deck', 's01', 'x', 'v')).toThrow(/invalid blob key/);
  });

  it('fills audio, then skips unchanged slides and re-synthesises only changed narration', async () => {
    const blob: BlobStore = new LocalBlobStore(tempDir());
    const { speech, texts } = countingSpeech(new MockSpeechProvider({ env: { NODE_ENV: 'test' } }));
    const opts = { unit: 'cbse-10-science-ch01', deckKey: 'deck', language: 'en', speech, blob };
    const deck = testDeck();

    const first = await synthesizeDeck(deck, opts);
    expect(first).toMatchObject({ synthesized: 3, skipped: 0 });
    expect(first.bytes).toBeGreaterThan(0);
    expect(deck.slides.every((s) => s.audio === null)).toBe(true); // input not mutated
    for (const s of first.deck.slides) {
      expect(s.audio!.key).toBe(audioKey('cbse-10-science-ch01', 'deck', s.id, s.narration, 'en-IN-NeerjaNeural#simulated'));
      expect(s.audio!.duration_ms).toBe(estimateDurationMs(s.narration, 'en'));
      expect(await blob.exists(s.audio!.key)).toBe(true);
    }
    expect(Deck.parse(first.deck)).toBeTruthy(); // still a valid deck

    const second = await synthesizeDeck(first.deck, opts);
    expect(second).toMatchObject({ synthesized: 0, skipped: 3, bytes: 0 });
    expect(second.deck).toEqual(first.deck);
    expect(texts).toHaveLength(3);

    const edited = structuredClone(first.deck);
    edited.slides[1]!.narration = 'Bubbles of gas are one sign of a reaction.';
    const third = await synthesizeDeck(edited, opts);
    expect(third).toMatchObject({ synthesized: 1, skipped: 2 });
    expect(texts.at(-1)).toBe('Bubbles of gas are one sign of a reaction.');
    expect(third.deck.slides[1]!.audio!.key).not.toBe(first.deck.slides[1]!.audio!.key);

    // A regenerated deck (audio stripped) with the same narration reuses the stored blobs.
    const regenerated = await synthesizeDeck(testDeck(), opts);
    expect(regenerated).toMatchObject({ synthesized: 0, skipped: 3 });
    expect(regenerated.slides.map((s) => s.status)).toEqual(['reused', 'reused', 'reused']);
    expect(regenerated.deck.slides[0]!.audio).toEqual(first.deck.slides[0]!.audio);

    const forced = await synthesizeDeck(first.deck, { ...opts, force: true });
    expect(forced.synthesized).toBe(3);
    expect(texts).toHaveLength(7);
  });

  it('re-synthesises when the blob is missing and keeps mock and real audio apart', async () => {
    const root = tempDir();
    const blob = new LocalBlobStore(root);
    const mock = new MockSpeechProvider({ env: { NODE_ENV: 'test' } });
    const opts = { unit: 'cbse-10-science-ch01', deckKey: 'deck', language: 'en', speech: mock, blob };
    const first = await synthesizeDeck(testDeck(), opts);
    fs.rmSync(path.join(root, ...first.deck.slides[0]!.audio!.key.split('/')));
    const again = await synthesizeDeck(first.deck, opts);
    expect(again).toMatchObject({ synthesized: 1, skipped: 2 });

    const { credential } = fakeCredential();
    const { fetch, calls } = recordingFetch(() => new Response(oggOpusSilence(2_000), { status: 200 }));
    const azure = new AzureSpeechProvider({ region: 'centralindia', resourceId: RESOURCE_ID, credential, fetch });
    const real = await synthesizeDeck(again.deck, { ...opts, speech: azure });
    expect(real.synthesized).toBe(3); // mock silence never counts as real narration
    expect(calls).toHaveLength(3);
    expect(real.deck.slides.every((s) => s.audio!.duration_ms === 2_000)).toBe(true);
  });
});
