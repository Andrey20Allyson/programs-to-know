import { Router } from 'express';
import { TEC_COLLECTION_NAME, firestore } from '../../../../firebase-admin/firestore';
import { createGetTecHandler } from './method.get';
import { createPostTecHandler } from './method.post';
import { Firestore } from 'firebase-admin/firestore';
import { createDeleteTecHandler } from './method.delete';
import { createPutTecHandler } from './method.put';

export interface BaseTecHandlerConfig {
  collectionName: string;
  database: Firestore;
}

export function TecStorageRoute() {
  const router = Router();

  const database = firestore;
  const collectionName = TEC_COLLECTION_NAME;

  const path = '/tecs';

  router.get(path, createGetTecHandler({ database, collectionName }));
  router.put(path, createPutTecHandler({ database, collectionName }));
  router.post(path, createPostTecHandler({ database, collectionName }));
  router.delete(path, createDeleteTecHandler({ database, collectionName }));

  return router;
}