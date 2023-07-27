import { Request, Router } from 'express';

export interface DBFields {
  [k: string]: string;
}

import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import zod from 'zod';

const serviceAccount = require('./programs-to-know-api-firebase-adminsdk.json');

const app = admin.initializeApp({
  credential: cert(serviceAccount),
});

const db = app.firestore();

export const tecDatabaseSchema = zod.object({
  title: zod.string(),
  dependences: zod.string().array(),
  description: zod.string().optional(),
  downloadUrl: zod.string().optional(),
  imageUrl: zod.string().optional(),
  architecture: zod.enum(['64', '86']).optional(),
});

export const tecArrayDatabaseSchema = tecDatabaseSchema.array();

export type TecDatabaseDTO = zod.infer<typeof tecDatabaseSchema>;

export const tecDTOSchema = zod.object({
  ...tecDatabaseSchema.shape,
  id: zod.string(),
});

export const tecDTOArraySchema = tecDTOSchema.array();

export type TecDTO = zod.infer<typeof tecDTOSchema>;

const TEC_COLLECTION_NAME = 'tec-storage';

export function StorageRoute() {
  const router = Router();

  router.get('/tecs', async (req, res) => {
    const { titleQ } = req.query;

    if (!titleQ || typeof titleQ !== 'string') return res.status(400).send({ ok: false, error: 'invalid request query' });

    try {
      const query = await db.collection(TEC_COLLECTION_NAME).where('title', '>=', titleQ.toUpperCase()).limit(10).get();

      const tecsParseResult = tecArrayDatabaseSchema.safeParse(query.docs.map(doc => doc.data()));
      if (!tecsParseResult.success) return res.status(500).send({ ok: false, error: tecsParseResult.error.toString() });

      const tecs = tecsParseResult.data;

      return res.status(200).send({ ok: true, data: tecs });
    } catch (e) {
      return res.status(500).send({ ok: false, error: JSON.stringify(e) });
    }
  });

  router.post('/tecs', async (req, res) => {
    const { body } = req;

    const parseResult = tecDatabaseSchema.safeParse(body);
    if (!parseResult.success) return res.status(400).send(parseResult.error.toString());

    const tecCreationData = parseResult.data;

    try {
      const creationResponse = await db.collection(TEC_COLLECTION_NAME).add(tecCreationData);

      return res.status(201).send({ ok: true, data: { id: creationResponse.id } });
    } catch (e) {
      return res.status(500).send({ ok: false, error: JSON.stringify(e) });
    }
  });

  return router;
}