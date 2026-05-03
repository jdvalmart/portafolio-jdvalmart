import { describe, it, expect, vi } from 'vitest'
import {
  cosineSimilarity,
  searchChunks,
  generateResponse,
} from '../rag'
import type { KnowledgeChunk } from '../rag'

describe('cosineSimilarity', () => {
  it('returns 0 for orthogonal vectors [1,0] and [0,1]', () => {
    expect(cosineSimilarity([1, 0], [0, 1])).toBe(0)
  })

  it('returns 1 for identical vectors [1,0] and [1,0]', () => {
    expect(cosineSimilarity([1, 0], [1, 0])).toBe(1)
  })

  it('returns 1 for identical multi-dimensional vectors', () => {
    expect(cosineSimilarity([0.5, 0.3, 0.2], [0.5, 0.3, 0.2])).toBeCloseTo(1, 5)
  })

  it('returns 0 for zero vectors', () => {
    expect(cosineSimilarity([0, 0], [0, 0])).toBe(0)
  })

  it('throws on length mismatch', () => {
    expect(() => cosineSimilarity([1, 0], [1, 0, 0])).toThrow(
      'Vector length mismatch',
    )
  })

  it('returns negative for opposite vectors', () => {
    expect(cosineSimilarity([1, 0], [-1, 0])).toBe(-1)
  })
})

describe('searchChunks', () => {
  const chunks: KnowledgeChunk[] = [
    {
      id: '1',
      content: 'Juan David is an AI Engineer specializing in NLP and Transformers',
      embedding: [],
    },
    {
      id: '2',
      content: 'He completed a 20-week Bootcamp IA with MINTIC',
      embedding: [],
    },
    {
      id: '3',
      content: 'He built Pequelectores, a children reading tracker with FastAPI',
      embedding: [],
    },
    {
      id: '4',
      content: 'Python and TypeScript are his primary programming languages',
      embedding: [],
    },
  ]

  it('returns top-3 chunks matching keyword "FastAPI"', () => {
    const results = searchChunks('FastAPI', chunks)
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('3')
  })

  it('returns chunks matching keyword "NLP"', () => {
    const results = searchChunks('NLP', chunks)
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('1')
  })

  it('returns multiple chunks for broad query', () => {
    const results = searchChunks('AI Engineer', chunks)
    // "AI" matches chunk 1 content, "Engineer" matches chunk 1
    expect(results.length).toBeGreaterThanOrEqual(1)
    expect(results[0].id).toBe('1')
  })

  it('returns empty array for query with no matches', () => {
    const results = searchChunks('rocket science', chunks)
    expect(results).toHaveLength(0)
  })

  it('deduplicates results (each chunk appears only once)', () => {
    const results = searchChunks('Bootcamp MINTIC', chunks)
    const ids = results.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('generateResponse', () => {
  it('returns generated text on successful API response', async () => {
    const mockResponse = [{ generated_text: 'Hello! I am the portfolio assistant.' }]
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
    })

    const result = await generateResponse('Some context', 'Who are you?')
    expect(result).toBe('Hello! I am the portfolio assistant.')
  })

  it('returns null on 429 rate limit', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
    })

    const result = await generateResponse('Some context', 'Who are you?')
    expect(result).toBeNull()
  })

  it('returns null on 5xx server error', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
    })

    const result = await generateResponse('Some context', 'Who are you?')
    expect(result).toBeNull()
  })

  it('returns null on network error', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network failure'))

    const result = await generateResponse('Some context', 'Who are you?')
    expect(result).toBeNull()
  })
})
