import {describe, expect, it} from 'vitest';
import {SimilarityService} from '../src/services/face/SimilarityService';

describe('SimilarityService', () => {
  it('accepts matching embeddings from the same model', () => {
    const service = new SimilarityService(0.8);
    const result = service.compare(
      {modelId: 'm1', vector: [1, 0, 0], createdAt: '2026-01-01T00:00:00.000Z'},
      {modelId: 'm1', vector: [1, 0, 0], createdAt: '2026-01-01T00:00:00.000Z'},
    );
    expect(result.matched).toBe(true);
    expect(result.score).toBeCloseTo(1);
  });

  it('rejects mismatched embeddings', () => {
    const service = new SimilarityService(0.8);
    const result = service.compare(
      {modelId: 'm1', vector: [1, 0, 0], createdAt: '2026-01-01T00:00:00.000Z'},
      {modelId: 'm1', vector: [0, 1, 0], createdAt: '2026-01-01T00:00:00.000Z'},
    );
    expect(result.matched).toBe(false);
    expect(result.score).toBeCloseTo(0);
  });
});
