import { register } from './controllers/User';
import { FastifyInstance } from 'fastify';

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register);
}