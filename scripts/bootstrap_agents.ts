import { callLLM } from '../agent/src/llm/provider';
import { mcpClient } from '../agent/src/mcp_client';

async function bootstrapAgents() {
  console.log('Bootstrapping Aurion Agents...\n');

  // Test each LLM provider
  const providers = ['anthropic', 'groq', 'mistral', 'google', 'xai'] as const;

  for (const provider of providers) {
    try {
      console.log(`Testing ${provider}...`);
      const response = await callLLM(
        provider,
        'Say "Hello from Aurion" in one sentence.',
        'You are a helpful AI assistant.'
      );
      console.log(`[OK] ${provider}: ${response.content.substring(0, 50)}...\n`);
    } catch (error: any) {
      console.log(`[FAIL] ${provider}: ${error.message}\n`);
    }
  }

  // Test MCP client
  console.log('Testing MCP client...');
  const sessionId = await mcpClient.createSession({ test: true });
  await mcpClient.sendMessage(sessionId, 'Test message');
  const session = await mcpClient.getSession(sessionId);
  console.log(`[OK] MCP session created: ${sessionId}`);
  console.log(`     Messages: ${session?.messages.length}\n`);

  console.log('[COMPLETE] Bootstrap finished successfully!');
}

bootstrapAgents().catch(console.error);
