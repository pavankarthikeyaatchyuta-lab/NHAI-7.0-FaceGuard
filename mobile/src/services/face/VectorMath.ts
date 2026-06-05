export function normalize(vector: number[]): number[] {
  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
  if (magnitude === 0) {
    throw new Error('Cannot normalize a zero vector');
  }
  return vector.map(value => value / magnitude);
}

export function cosineSimilarity(left: number[], right: number[]): number {
  if (left.length !== right.length) {
    throw new Error(`Vector length mismatch: ${left.length} !== ${right.length}`);
  }
  const leftNorm = normalize(left);
  const rightNorm = normalize(right);
  return leftNorm.reduce((sum, value, index) => sum + value * rightNorm[index], 0);
}

export function averageVectors(vectors: number[][]): number[] {
  if (vectors.length === 0) {
    throw new Error('At least one vector is required');
  }
  const dimension = vectors[0].length;
  const totals = new Array<number>(dimension).fill(0);
  for (const vector of vectors) {
    if (vector.length !== dimension) {
      throw new Error('All vectors must have the same dimension');
    }
    vector.forEach((value, index) => {
      totals[index] += value;
    });
  }
  return normalize(totals.map(value => value / vectors.length));
}
