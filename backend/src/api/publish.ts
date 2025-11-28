import { FastifyInstance } from 'fastify';
import { publishAsset } from '../../../dkg/src/publish';
import { queryAsset } from '../../../dkg/src/query';

export async function publishRoutes(fastify: FastifyInstance) {
  fastify.post('/', async (request, reply) => {
    const { asset, userId } = request.body as { asset: any; userId?: string };

    if (!asset) {
      return reply.code(400).send({ error: 'Asset is required' });
    }

    try {
      const result = await publishAsset(asset, userId);
      return result;
    } catch (error: any) {
      fastify.log.error(error);
      return reply.code(500).send({ error: error.message });
    }
  });

  fastify.get('/:ual', async (request, reply) => {
    const { ual } = request.params as { ual: string };

    try {
      const result = await queryAsset(ual);
      return result;
    } catch (error: any) {
      fastify.log.error(error);
      return reply.code(500).send({ error: error.message });
    }
  });
}
