import {SECURITY_CONFIG} from '../../config/security';
import {LivenessChallenge} from './challenges';

export type LivenessObservation = {
  challenge: LivenessChallenge;
  leftEyeOpen: number;
  rightEyeOpen: number;
  smiling: number;
  yaw: number;
  textureScore: number;
  replayRisk: number;
};

export type LivenessResult = {
  passed: boolean;
  score: number;
  challengeScores: Record<LivenessChallenge, number>;
  reasons: string[];
};

export class LivenessEngine {
  constructor(
    private readonly challenges: LivenessChallenge[],
    private readonly threshold = SECURITY_CONFIG.livenessPassThreshold,
  ) {}

  evaluate(observations: LivenessObservation[]): LivenessResult {
    const challengeScores = {} as Record<LivenessChallenge, number>;
    const reasons: string[] = [];

    for (const challenge of this.challenges) {
      const observation = observations.find(item => item.challenge === challenge);
      if (!observation) {
        challengeScores[challenge] = 0;
        reasons.push(`Missing ${challenge} observation`);
        continue;
      }
      challengeScores[challenge] = this.scoreChallenge(observation);
    }

    const antiSpoofScores = observations.map(item => this.scoreAntiSpoof(item));
    const challengeAverage = average(Object.values(challengeScores));
    const antiSpoofAverage = antiSpoofScores.length > 0 ? average(antiSpoofScores) : 0;
    const score = challengeAverage * 0.72 + antiSpoofAverage * 0.28;

    if (antiSpoofAverage < 0.62) {
      reasons.push('Anti-spoof signal below threshold');
    }

    return {
      passed: score >= this.threshold && reasons.length === 0,
      score,
      challengeScores,
      reasons,
    };
  }

  private scoreChallenge(observation: LivenessObservation): number {
    switch (observation.challenge) {
      case 'BLINK':
        return clamp01(1 - (observation.leftEyeOpen + observation.rightEyeOpen) / 2);
      case 'SMILE':
        return clamp01(observation.smiling);
      case 'TURN_LEFT':
        return clamp01(Math.abs(Math.min(observation.yaw, 0)) / 18);
      case 'TURN_RIGHT':
        return clamp01(Math.max(observation.yaw, 0) / 18);
    }
  }

  private scoreAntiSpoof(observation: LivenessObservation): number {
    const replayPenalty = 1 - clamp01(observation.replayRisk);
    return clamp01(observation.textureScore * 0.65 + replayPenalty * 0.35);
  }
}

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}
