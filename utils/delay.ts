/**
 * Utility to simulate network latency for a more realistic application feel.
 * Implements a random delay between minMs and maxMs.
 */
export async function simulateLatency(minMs: number = 300, maxMs: number = 1000): Promise<void> {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, delay));
}
