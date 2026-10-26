/**
 * Stub for `src/lib/zed-oauth/keychain-reader.ts` activated by
 * `OMNIROUTE_BUILD_PROFILE=minimal`. The keychain-read code path is removed
 * from the built bundle. See 03-security-policy.md and
 * docs/security/14-socket-dev-findings.md.
 */
import { featureDisabledError } from "@/lib/build-profile/featureDisabled";

const FEATURE = "zed-keychain-import";

export interface ZedCredential {
  provider: string;
  service: string;
  account: string;
  token: string;
}

export async function discoverZedCredentials(): Promise<ZedCredential[]> {
  throw featureDisabledError(FEATURE);
}

export async function getZedCredential(_provider: string): Promise<ZedCredential | null> {
  throw featureDisabledError(FEATURE);
}

export async function isZedInstalled(): Promise<boolean> {
  return false;
}
