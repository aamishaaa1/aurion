import { FastifyInstance } from 'fastify';
import { verifyText } from '../../../agent/src/verifier_text';
import { verifyImage } from '../../../agent/src/verifier_image';
import { verifyVideo } from '../../../agent/src/verifier_video';
import { buildConsensus } from '../../../agent/src/consensus';

export async function verifyRoutes(fastify: FastifyInstance) {
  fastify.post('/text', async (request, reply) => {
    const { text, userId } = request.body as { text: string; userId?: string };

    if (!text) {
      return reply.code(400).send({ error: 'Text is required' });
    }

    try {
      const result = await verifyText(text, userId);
      return result;
    } catch (error: any) {
      fastify.log.error(error);
      return reply.code(500).send({ error: error.message });
    }
  });

  fastify.post('/image', async (request, reply) => {
    try {
      const data = await request.file();
      
      if (!data) {
        return reply.code(400).send({ error: 'Image file is required' });
      }

      const buffer = await data.toBuffer();
      const result = await verifyImage(buffer, data.mimetype);
      
      return result;
    } catch (error: any) {
      fastify.log.error(error);
      return reply.code(500).send({ error: error.message });
    }
  });

  fastify.post('/video', async (request, reply) => {
    try {
      const data = await request.file();
      
      if (!data) {
        return reply.code(400).send({ error: 'Video file is required' });
      }

      const buffer = await data.toBuffer();
      const result = await verifyVideo(buffer, data.mimetype);
      
      return result;
    } catch (error: any) {
      fastify.log.error(error);
      return reply.code(500).send({ error: error.message });
    }
  });
}
