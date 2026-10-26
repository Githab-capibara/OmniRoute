// Default visibility for the request-log table columns.
//
// History: the Logs table used to boot with every one of its 14 columns on, so
// the first screen was wide enough that Status/Model/Provider/Tokens/TPS/Duration
// shared the viewport with Cache Source, Protocol, Account, API Key, Combo,
// Requested, Time and Conversation. Operators asked for the compact set the
// feature actually needs on first paint, with the rest still one click away in
// the "Columns" chip row.
//
// The defaults live here (not in the component) so the storage reader/writer and
// the tests share one source of truth, mirroring `requestLoggerPreferences.ts`.
// Preferences are stored under a *versioned* key (`...V2`): the previous boot
// state was `all columns visible`, so reading the old key would resurrect that
// state for every existing install and silently cancel the new defaults.
export type LogColumnVisibility = Record<string, boolean>;

export const LOG_COLUMNS_STORAGE_KEY = "loggerVisibleColumnsV2";

export const LOG_DEFAULT_VISIBLE_COLUMNS = [
  "status",
  "model",
  "provider",
  "tokens",
  "tps",
  "duration",
] as const;

type ColumnStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function getBrowserStorage(): ColumnStorage | null {
  if (globalThis.window === undefined) return null;
  return window.localStorage as ColumnStorage;
}

/**
 * Build a visibility map for `keys` where only `visible` is true. Unknown keys
 * in `visible` are ignored — the caller passes the column list it rendered.
 */
export function createDefaultVisibility(
  keys: readonly string[],
  visible: readonly string[] = LOG_DEFAULT_VISIBLE_COLUMNS
): LogColumnVisibility {
  const visibleSet = new Set(visible);
  const result: LogColumnVisibility = {};
  for (const key of keys) {
    result[key] = visibleSet.has(key);
  }
  return result;
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Merge a persisted visibility map over the defaults.
 *
 * Defensive by design: `localStorage` is user-writable (devtools, another tab on
 * an older build, a corrupt write), so anything that is not a `{ key: boolean }`
 * record falls back to the defaults instead of crashing the table. Keys missing
 * from the saved map keep their default, which is what makes adding a new column
 * later a no-op for existing users.
 */
export function normalizeVisibility(
  saved: unknown,
  keys: readonly string[],
  visible: readonly string[] = LOG_DEFAULT_VISIBLE_COLUMNS
): LogColumnVisibility {
  const result = createDefaultVisibility(keys, visible);
  if (!isPlainRecord(saved)) return result;
  for (const key of keys) {
    const value = saved[key];
    if (typeof value === "boolean") result[key] = value;
  }
  return result;
}

/** Single-column read helper — keeps `undefined` and unknown keys false. */
export function isColumnVisible(visibility: LogColumnVisibility | undefined, key: string): boolean {
  return visibility?.[key] === true;
}

/**
 * Read the persisted map, falling back to the defaults on any parse failure.
 * Never throws — a private-mode or quota-exceeded `localStorage` just means the
 * table renders with defaults for this session.
 */
export function readSavedColumnVisibility(
  keys: readonly string[],
  storage: ColumnStorage | null = getBrowserStorage(),
  visible: readonly string[] = LOG_DEFAULT_VISIBLE_COLUMNS
): LogColumnVisibility {
  if (!storage) return createDefaultVisibility(keys, visible);
  try {
    const raw = storage.getItem(LOG_COLUMNS_STORAGE_KEY);
    if (!raw) return createDefaultVisibility(keys, visible);
    return normalizeVisibility(JSON.parse(raw), keys, visible);
  } catch {
    return createDefaultVisibility(keys, visible);
  }
}

/** Persist a map so the choice survives reloads; returns false on failure. */
export function writeSavedColumnVisibility(
  visibility: LogColumnVisibility,
  storage: ColumnStorage | null = getBrowserStorage()
): boolean {
  if (!storage) return false;
  try {
    storage.setItem(LOG_COLUMNS_STORAGE_KEY, JSON.stringify(visibility));
    return true;
  } catch {
    return false;
  }
}

/** Drop the persisted map so the defaults apply again on next read. */
export function clearSavedColumnVisibility(
  storage: ColumnStorage | null = getBrowserStorage()
): boolean {
  if (!storage) return false;
  try {
    storage.removeItem(LOG_COLUMNS_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
