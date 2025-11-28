import axios from 'axios';

export interface X402Payment {
  paymentId: string;
  amount: number;
  currency: string;
  sender: string;
  recipient: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface X402Session {
  sessionId: string;
  totalCost: number;
  payments: X402Payment[];
}

export class X402Gateway {
  private baseUrl: string;
  private sessions: Map<string, X402Session>;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || process.env.X402_GATEWAY_URL || 'http://localhost:8402';
    this.sessions = new Map();
  }

  async createSession(userId: string): Promise<string> {
    const sessionId = `x402-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    this.sessions.set(sessionId, {
      sessionId,
      totalCost: 0,
      payments: []
    });

    return sessionId;
  }

  async recordUsage(sessionId: string, operation: string, cost: number): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    session.totalCost += cost;
  }

  async initiatePayment(
    sessionId: string,
    sender: string,
    recipient: string
  ): Promise<X402Payment> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const payment: X402Payment = {
      paymentId: `pay-${Date.now()}`,
      amount: session.totalCost,
      currency: 'NEURO',
      sender,
      recipient,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    session.payments.push(payment);

    // Simulate payment processing
    setTimeout(() => {
      payment.status = 'completed';
    }, 1000);

    return payment;
  }

  async getSession(sessionId: string): Promise<X402Session | undefined> {
    return this.sessions.get(sessionId);
  }

  async closeSession(sessionId: string): Promise<X402Session | undefined> {
    const session = this.sessions.get(sessionId);
    this.sessions.delete(sessionId);
    return session;
  }
}

export const x402Gateway = new X402Gateway();
