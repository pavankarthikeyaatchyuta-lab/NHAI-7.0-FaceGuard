import {SECURITY_CONFIG} from '../../config/security';
import {FaceEmbedding} from '../../types/face';
import {cosineSimilarity} from './VectorMath';

export type VerificationResult = {
  matched: boolean;
  score: number;
  threshold: number;
};

export class SimilarityService {
  constructor(private readonly threshold = SECURITY_CONFIG.embeddingThreshold) {}

  compare(probe: FaceEmbedding, reference: FaceEmbedding): VerificationResult {
    if (probe.modelId !== reference.modelId) {
      throw new Error(`Embedding model mismatch: ${probe.modelId} !== ${reference.modelId}`);
    }
    const score = cosineSimilarity(probe.vector, reference.vector);
    return {
      matched: score >= this.threshold,
      score,
      threshold: this.threshold,
    };
  }
}
