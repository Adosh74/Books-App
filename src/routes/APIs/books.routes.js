import { Router } from 'express';
import * as booksControllers from './../../controllers/books.controller.js';

const routes = Router();

routes.route('/').get(booksControllers.getBooks);

export default routes;
