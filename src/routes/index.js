import { Router } from 'express';
import storeRoutes from './APIs/store.routes.js';
import bookRoutes from './APIs/books.routes.js';

const routes = Router();

routes.use('/api/v1/sore', storeRoutes);

routes.use('/api/v1/book', bookRoutes);

export default routes;
