import { Response, Router } from 'express';
import { ZodError } from 'zod';
import { TEC_COLLECTION_NAME, firestore } from '../../../../firebase-admin/firestore';
import { Result } from '../../utils';
import { GetTecResponseBody, PostTecResponseBody, TecDTO, TecDatabaseDTO, tecDatabaseDTOSchema, tecDatabasePostDTOSchema } from './schemas';

export type ParseQueryResult = Result<TecDTO[], ZodError<TecDatabaseDTO>>;

export function parseGetQuery(query: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>): ParseQueryResult {
  const data: TecDTO[] = [];

  for (const doc of query.docs) {
    const parseResult = tecDatabaseDTOSchema.safeParse(doc.data());
    if (!parseResult.success) return { ok: false, error: parseResult.error };

    data.push({
      ...parseResult.data,
      id: doc.id,
    });
  }

  return { ok: true, data };
}

type TecGetCacheValue = {
  lifeTime: number;
  data: TecDTO[];
};

export function StorageRoute() {
  const router = Router();
  const tecGETCache = new Map<string, TecGetCacheValue>();

  router.get('/tecs', async (req, res: Response<GetTecResponseBody>) => {
    const { titleQ } = req.query;

    if (titleQ === undefined || typeof titleQ !== 'string') return res.status(400).send({ ok: false, error: 'invalid request query' });

    const upperCaseTitle = titleQ.toUpperCase();
    const sufixedUpperCaseTitle = titleQ.toUpperCase() + '\uf8ff';

    const cache = tecGETCache.get(upperCaseTitle);

    if (cache && cache.lifeTime > Date.now()) {
      return res.status(200).send({ ok: true, data: cache.data });
    }

    try {
      const query = await firestore.collection(TEC_COLLECTION_NAME)
        .where('searchName', '>=', upperCaseTitle)
        .where('searchName', '<=', sufixedUpperCaseTitle)
        .limit(10)
        .get();

      const tecResult = parseGetQuery(query);
      if (!tecResult.ok) return res.status(500).send({ ok: false, error: tecResult.error.message });

      tecGETCache.set(upperCaseTitle, {
        lifeTime: Date.now() + 1000 * 30,
        data: tecResult.data,
      });

      return res.status(200).send({ ok: true, data: tecResult.data });
    } catch (e) {
      return res.status(500).send({ ok: false, error: JSON.stringify(e) });
    }
  });

  router.post('/tecs', async (req, res: Response<PostTecResponseBody>) => {
    const { body } = req;

    const parseResult = tecDatabasePostDTOSchema.safeParse(body);
    if (!parseResult.success) return res.status(400).send({ ok: false, error: parseResult.error.message });

    const tecCreationData: TecDatabaseDTO = {
      ...parseResult.data,
      searchName: parseResult.data.title.toUpperCase(),
    };

    try {
      const creationResponse = await firestore.collection(TEC_COLLECTION_NAME).add(tecCreationData);

      return res.status(201).send({ ok: true, data: { id: creationResponse.id } });
    } catch (e) {
      return res.status(500).send({ ok: false, error: JSON.stringify(e) });
    }
  });

  return router
}