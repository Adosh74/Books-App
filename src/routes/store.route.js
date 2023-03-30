import { Router } from 'express';

import * as controllers from './../controllers/store.controller.js';

const router = Router();

router
  .route('/api/v1/sore')
  .get(controllers.getStoreList)
  .post(controllers.addStore);

export default router;
