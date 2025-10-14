export function parsePage(value?: string) {
  const n = parseInt(value || "1", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export function parseLimit(value?: string, max = 100) {
  const n = parseInt(value || "10", 10);
  if (!Number.isFinite(n) || n <= 0) return 10;
  return Math.min(n, max);
}
