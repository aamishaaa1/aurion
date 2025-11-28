export interface ReputationScore {
  userId: string;
  score: number;
  verificationsCount: number;
  accuracyRate: number;
  lastUpdated: string;
}

export class ReputationSystem {
  private scores: Map<string, ReputationScore>;

  constructor() {
    this.scores = new Map();
  }

  getScore(userId: string): ReputationScore {
    if (!this.scores.has(userId)) {
      this.scores.set(userId, {
        userId,
        score: 50,
        verificationsCount: 0,
        accuracyRate: 0,
        lastUpdated: new Date().toISOString()
      });
    }
    return this.scores.get(userId)!;
  }

  updateScore(userId: string, verificationAccurate: boolean): ReputationScore {
    const current = this.getScore(userId);
    
    current.verificationsCount += 1;
    current.accuracyRate = 
      (current.accuracyRate * (current.verificationsCount - 1) + (verificationAccurate ? 100 : 0)) 
      / current.verificationsCount;
    
    current.score = Math.min(100, Math.max(0, 
      current.score + (verificationAccurate ? 2 : -5)
    ));
    
    current.lastUpdated = new Date().toISOString();
    
    return current;
  }

  getAllScores(): ReputationScore[] {
    return Array.from(this.scores.values());
  }
}

export const reputationSystem = new ReputationSystem();
