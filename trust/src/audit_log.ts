export interface AuditEntry {
  id: string;
  timestamp: string;
  userId?: string;
  action: string;
  contentHash: string;
  result: any;
  metadata?: Record<string, any>;
}

export class AuditLog {
  private entries: AuditEntry[];

  constructor() {
    this.entries = [];
  }

  log(
    action: string,
    contentHash: string,
    result: any,
    userId?: string,
    metadata?: Record<string, any>
  ): AuditEntry {
    const entry: AuditEntry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      userId,
      action,
      contentHash,
      result,
      metadata
    };

    this.entries.push(entry);
    return entry;
  }

  getEntries(filter?: {
    userId?: string;
    action?: string;
    startDate?: string;
    endDate?: string;
  }): AuditEntry[] {
    let filtered = this.entries;

    if (filter) {
      if (filter.userId) {
        filtered = filtered.filter(e => e.userId === filter.userId);
      }
      if (filter.action) {
        filtered = filtered.filter(e => e.action === filter.action);
      }
      if (filter.startDate) {
        filtered = filtered.filter(e => e.timestamp >= filter.startDate!);
      }
      if (filter.endDate) {
        filtered = filtered.filter(e => e.timestamp <= filter.endDate!);
      }
    }

    return filtered;
  }

  getEntry(id: string): AuditEntry | undefined {
    return this.entries.find(e => e.id === id);
  }
}

export const auditLog = new AuditLog();
