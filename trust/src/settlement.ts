import { X402Payment, x402Gateway } from './x402_gateway';

export interface Settlement {
  settlementId: string;
  sessionId: string;
  totalAmount: number;
  payments: X402Payment[];
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
}

export class SettlementEngine {
  private settlements: Map<string, Settlement>;

  constructor() {
    this.settlements = new Map();
  }

  async createSettlement(sessionId: string): Promise<Settlement> {
    const session = await x402Gateway.getSession(sessionId);
    
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const settlement: Settlement = {
      settlementId: `settle-${Date.now()}`,
      sessionId,
      totalAmount: session.totalCost,
      payments: session.payments,
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    this.settlements.set(settlement.settlementId, settlement);

    // Auto-complete if all payments are completed
    const allCompleted = session.payments.every(p => p.status === 'completed');
    if (allCompleted) {
      settlement.status = 'completed';
    }

    return settlement;
  }

  getSettlement(settlementId: string): Settlement | undefined {
    return this.settlements.get(settlementId);
  }

  getAllSettlements(): Settlement[] {
    return Array.from(this.settlements.values());
  }
}

export const settlementEngine = new SettlementEngine();
