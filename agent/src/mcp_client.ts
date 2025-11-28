import axios from 'axios';

export interface MCPMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface MCPSession {
  sessionId: string;
  messages: MCPMessage[];
  context: Record<string, any>;
}

export class MCPClient {
  private baseUrl: string;
  private sessions: Map<string, MCPSession>;

  constructor(baseUrl: string = 'http://localhost:8080') {
    this.baseUrl = baseUrl;
    this.sessions = new Map();
  }

  async createSession(context?: Record<string, any>): Promise<string> {
    const sessionId = `mcp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    this.sessions.set(sessionId, {
      sessionId,
      messages: [],
      context: context || {}
    });

    return sessionId;
  }

  async sendMessage(sessionId: string, content: string, role: 'user' | 'assistant' = 'user'): Promise<MCPMessage> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const message: MCPMessage = {
      role,
      content,
      timestamp: new Date().toISOString()
    };

    session.messages.push(message);

    return message;
  }

  async getSession(sessionId: string): Promise<MCPSession | undefined> {
    return this.sessions.get(sessionId);
  }

  async closeSession(sessionId: string): Promise<void> {
    this.sessions.delete(sessionId);
  }
}

export const mcpClient = new MCPClient();
