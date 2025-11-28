import { verifyText } from './verifier_text';
import { verifyImage } from './verifier_image';
import { verifyVideo } from './verifier_video';
import { mcpClient } from './mcp_client';

export type ContentType = 'text' | 'image' | 'video';

export interface AgentRunConfig {
  contentType: ContentType;
  content: string | Buffer;
  userId?: string;
  mcpEnabled?: boolean;
}

export async function runAgentPipeline(config: AgentRunConfig) {
  const { contentType, content, userId, mcpEnabled } = config;

  let sessionId: string | undefined;
  if (mcpEnabled) {
    sessionId = await mcpClient.createSession({
      contentType,
      userId,
      startTime: new Date().toISOString()
    });
  }

  let result: any;

  try {
    switch (contentType) {
      case 'text':
        result = await verifyText(content as string, userId);
        break;
      case 'image':
        result = await verifyImage(content as Buffer, 'image/png');
        break;
      case 'video':
        result = await verifyVideo(content as Buffer, 'video/mp4');
        break;
      default:
        throw new Error(`Unknown content type: ${contentType}`);
    }

    if (sessionId) {
      await mcpClient.sendMessage(
        sessionId,
        `Verification complete: ${result.consensus.finalVerdict}`,
        'assistant'
      );
    }

    return {
      ...result,
      sessionId
    };
  } catch (error) {
    if (sessionId) {
      await mcpClient.closeSession(sessionId);
    }
    throw error;
  }
}
