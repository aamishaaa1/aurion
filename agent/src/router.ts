import { runAgentPipeline, ContentType } from './agent_runner';

export interface RoutingDecision {
  contentType: ContentType;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: number;
  agentsRequired: string[];
}

export function routeContent(content: string | Buffer, metadata?: any): RoutingDecision {
  let contentType: ContentType = 'text';
  
  if (Buffer.isBuffer(content)) {
    const header = content.slice(0, 4);
    if (header[0] === 0xFF && header[1] === 0xD8) {
      contentType = 'image';
    } else if (header.toString('hex').startsWith('000000')) {
      contentType = 'video';
    }
  }

  const agentsRequired = ['anthropic', 'groq', 'mistral', 'google', 'xai'];
  
  let priority: 'high' | 'medium' | 'low' = 'medium';
  let estimatedTime = 5000;

  if (contentType === 'video') {
    priority = 'high';
    estimatedTime = 15000;
  } else if (contentType === 'image') {
    estimatedTime = 8000;
  }

  return {
    contentType,
    priority,
    estimatedTime,
    agentsRequired
  };
}

export async function executeRoute(
  content: string | Buffer,
  userId?: string,
  mcpEnabled: boolean = true
) {
  const routing = routeContent(content);
  
  return runAgentPipeline({
    contentType: routing.contentType,
    content,
    userId,
    mcpEnabled
  });
}
