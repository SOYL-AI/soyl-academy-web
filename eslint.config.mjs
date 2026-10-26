import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Platform services have their own toolchain (platform/package.json, ADR-001).
    "platform/**",
  ]),
  // WEB-6 (ADR-011): platform code never injects HTML, except the reviewed, sanitising renderers.
  // Scoped to platform paths only; marketing files are unaffected.
  {
    files: ["app/(platform)/**", "components/platform/**", "proxy.ts"],
    rules: { "react/no-danger": "error" },
  },
  {
    files: ["components/platform/ui/render/**"],
    rules: { "react/no-danger": "off" },
  },
]);

export default eslintConfig;
