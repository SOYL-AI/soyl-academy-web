/**
 * The no-flash theme script (ADR-023): a server component that prints THEME_BOOT_SCRIPT as the first child of
 * the platform root. Constant text, no user input; allowed by its hash on nonce routes (security-headers.ts).
 */
import { THEME_BOOT_SCRIPT } from './theme';

export function ThemeBootScript() {
  // eslint-disable-next-line react/no-danger -- constant script, no user data; CSP hash-allowed (ADR-023, WEB-6 exception)
  return <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />;
}
