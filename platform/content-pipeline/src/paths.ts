import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

/** platform/content-pipeline */
export const PACKAGE_DIR = path.resolve(here, '..');
/** platform/ */
export const PLATFORM_DIR = path.resolve(PACKAGE_DIR, '..');

export interface PipelinePaths {
  catalogDir: string;
  templatesDir: string;
  fallbackTemplatesDir: string;
  stateDir: string;
  outDir: string;
  /** Hand-authored production chapters (D-026): content/authored/<family>/<unit>/. */
  authoredDir: string;
  /** Owner-supplied reference texts for the originality stage (gitignored; may not exist). */
  referenceDir: string;
}

export function defaultPaths(env: Record<string, string | undefined> = process.env): PipelinePaths {
  return {
    catalogDir: env.CONTENT_CATALOG_DIR ?? path.join(PLATFORM_DIR, 'catalog'),
    templatesDir: env.CONTENT_TEMPLATES_DIR ?? path.join(PLATFORM_DIR, 'content-templates'),
    fallbackTemplatesDir: path.join(PACKAGE_DIR, 'templates'),
    stateDir: env.CONTENT_PIPELINE_STATE_DIR ?? path.join(PACKAGE_DIR, '.state'),
    outDir: env.CONTENT_PIPELINE_OUT_DIR ?? path.join(PACKAGE_DIR, 'out'),
    authoredDir: env.CONTENT_AUTHORED_DIR ?? path.join(PLATFORM_DIR, 'content', 'authored'),
    referenceDir: env.CONTENT_REFERENCE_DIR ?? path.join(PLATFORM_DIR, 'catalog', 'sources', 'reference'),
  };
}

/** Where a unit's artefacts live: out/<unit>/ */
export function unitOutDir(outDir: string, unit: string): string {
  return path.join(outDir, unit);
}
