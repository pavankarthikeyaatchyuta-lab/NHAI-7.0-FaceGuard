import {describe, expect, it} from 'vitest';
import {LivenessEngine} from '../src/services/liveness/LivenessEngine';
import {defaultChallengeSet} from '../src/services/liveness/challenges';

describe('LivenessEngine', () => {
  it('passes when all challenge and anti-spoof signals are strong', () => {
    const engine = new LivenessEngine(defaultChallengeSet);
    const result = engine.evaluate([
      {challenge: 'BLINK', leftEyeOpen: 0.1, rightEyeOpen: 0.1, smiling: 0, yaw: 0, textureScore: 0.9, replayRisk: 0.05},
      {challenge: 'SMILE', leftEyeOpen: 0.8, rightEyeOpen: 0.8, smiling: 0.9, yaw: 0, textureScore: 0.9, replayRisk: 0.05},
      {challenge: 'TURN_LEFT', leftEyeOpen: 0.8, rightEyeOpen: 0.8, smiling: 0.2, yaw: -22, textureScore: 0.86, replayRisk: 0.08},
      {challenge: 'TURN_RIGHT', leftEyeOpen: 0.8, rightEyeOpen: 0.8, smiling: 0.2, yaw: 22, textureScore: 0.86, replayRisk: 0.08},
    ]);
    expect(result.passed).toBe(true);
    expect(result.score).toBeGreaterThan(0.74);
  });

  it('fails when replay risk is high', () => {
    const engine = new LivenessEngine(defaultChallengeSet);
    const result = engine.evaluate([
      {challenge: 'BLINK', leftEyeOpen: 0.1, rightEyeOpen: 0.1, smiling: 0, yaw: 0, textureScore: 0.2, replayRisk: 0.95},
    ]);
    expect(result.passed).toBe(false);
    expect(result.reasons).toContain('Anti-spoof signal below threshold');
  });
});
