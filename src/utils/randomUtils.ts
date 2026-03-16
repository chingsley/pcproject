/**
 * Returns a random integer between start (inclusive) and end (inclusive).
 */
export function getRandomValue(start = 0, end = 5): number {
  const min = Math.ceil(Math.min(start, end));
  const max = Math.floor(Math.max(start, end));
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
