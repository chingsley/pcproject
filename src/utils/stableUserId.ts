/**
 * Deterministic id from email for future record ownership (same normalized email → same id).
 * Not for security; replace with server-issued ids when wiring a real backend.
 */
export function stableUserIdFromEmail(email: string): string {
  const normalized = email.trim().toLowerCase();
  let h = 2166136261;
  for (let i = 0; i < normalized.length; i++) {
    h ^= normalized.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `uid_${(h >>> 0).toString(16)}`;
}
