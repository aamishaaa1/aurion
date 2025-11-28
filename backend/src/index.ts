import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import dotenv from 'dotenv';
import { verifyRoutes } from './api/verify';
import { publishRoutes } from './api/publish';
import { consensusRoutes } from './api/consensus';

dotenv.config();

const fastify = Fastify({
  logger: true
});

const start = async () => {
  try {
    await fastify.register(cors, {
      origin: true
    });

    await fastify.register(multipart, {
      limits: {
        fileSize: 100 * 1024 * 1024 // 100MB
      }
    });

    // Health check
    fastify.get('/health', async () => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    });

    // Register routes
    await fastify.register(verifyRoutes, { prefix: '/verify' });
    await fastify.register(publishRoutes, { prefix: '/publish' });
    await fastify.register(consensusRoutes, { prefix: '/consensus' });

    const port = parseInt(process.env.BACKEND_PORT || '3001');
    const host = process.env.BACKEND_HOST || 'localhost';

    await fastify.listen({ port, host });
    console.log(`🚀 Aurion Backend running on http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
