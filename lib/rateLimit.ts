const requestMap = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 3 * 60 * 60 * 1000;
const MAX_REQUESTS = 3;

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const entry = requestMap.get(ip);

  if (!entry || now > entry.resetAt) {
    requestMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt: now + WINDOW_MS };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.count,
    resetAt: entry.resetAt,
  };
}

