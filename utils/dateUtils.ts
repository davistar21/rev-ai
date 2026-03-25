/**
 * Gets a Date object representing `days` ago from now.
 */
export function getPastDate(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

/**
 * Formats an ISO string or Date into a short recognizable string (e.g. 'Mar 15').
 */
export function formatShortDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/**
 * Get an ISO 8601 string for exactly 30 days ago.
 */
export function getLast30DaysISO(): string {
  return getPastDate(30).toISOString();
}
