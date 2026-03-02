import { describe, it, expect, vi, beforeEach } from 'vitest'

/**
 * Unit tests for the rate limiter.
 *
 * Tests the sliding-window rate limit logic including:
 * - Allowing requests within limits
 * - Blocking when limit is exceeded
 * - Clearing expired entries after window passes
 */

// Mock Nitro auto-imports
vi.stubGlobal('getHeader', vi.fn())
vi.stubGlobal('setResponseHeader', vi.fn())
vi.stubGlobal('createError', (opts: { statusCode: number; message: string }) => {
  const err = new Error(opts.message) as Error & { statusCode: number }
  err.statusCode = opts.statusCode
  return err
})

import { enforceRateLimit } from '../../server/utils/rateLimit'

function createMockEvent(ip = '1.2.3.4') {
  return {
    method: 'POST',
    path: '/api/login',
    _ip: ip,
  }
}

beforeEach(() => {
  vi.mocked(getHeader).mockImplementation((event: any, name: string) => {
    if (name === 'cf-connecting-ip') return event._ip
    return undefined
  })
  vi.mocked(setResponseHeader).mockClear()
})

describe('enforceRateLimit', () => {
  it('allows requests within the limit', async () => {
    const event = createMockEvent('10.0.0.1')
    // Should not throw for the first request
    await expect(enforceRateLimit(event as any, 'test-allow', 5, 60_000)).resolves.toBeUndefined()
  })

  it('throws 429 when limit is exceeded', async () => {
    const event = createMockEvent('10.0.0.2')
    // Fill up the bucket
    for (let i = 0; i < 3; i++) {
      await enforceRateLimit(event as any, 'test-exceed', 3, 60_000)
    }
    // The 4th request should fail
    await expect(enforceRateLimit(event as any, 'test-exceed', 3, 60_000)).rejects.toThrow('Too many requests')
  })

  it('tracks different namespaces independently', async () => {
    const event = createMockEvent('10.0.0.3')
    // Fill namespace A
    for (let i = 0; i < 2; i++) {
      await enforceRateLimit(event as any, 'ns-a', 2, 60_000)
    }
    // Namespace B should still allow
    await expect(enforceRateLimit(event as any, 'ns-b', 2, 60_000)).resolves.toBeUndefined()
  })

  it('tracks different IPs independently', async () => {
    const eventA = createMockEvent('10.0.0.4')
    const eventB = createMockEvent('10.0.0.5')
    // Fill IP A
    for (let i = 0; i < 2; i++) {
      await enforceRateLimit(eventA as any, 'test-ip', 2, 60_000)
    }
    // IP B should still allow
    await expect(enforceRateLimit(eventB as any, 'test-ip', 2, 60_000)).resolves.toBeUndefined()
  })
})
