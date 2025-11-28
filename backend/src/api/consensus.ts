import { FastifyInstance } from 'fastify';
import { buildConsensus } from '../../../agent/src/consensus';

export async function consensusRoutes(fastify: FastifyInstance) {
  fastify.post('/score', async (request, reply) => {
    const { assessments } = request.body as { assessments: any[] };

    if (!assessments || !Array.isArray(assessments)) {
      return reply.code(400).send({ error: 'Assessments array is required' });
    }

    try {
      const result = buildConsensus(assessments);
      return result;
    } catch (error: any) {
      fastify.log.error(error);
      return reply.code(500).send({ error: error.message });
    }
  });
}
