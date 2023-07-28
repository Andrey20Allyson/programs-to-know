import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ZodError } from 'zod';
import { BaseTecHandlerConfig } from '.';
import { Result } from '../../utils';
import { GetTecResponseBody, TecDTO, TecDatabaseDTO, tecDatabaseDTOSchema } from './schemas';

export type ParseQueryResult = Result<TecDTO[], ZodError<TecDatabaseDTO>>;

export type TecGetCacheValue = {
  lifeTime: number;
  data: TecDTO[];
};

export interface GetTecHandlerConfig extends BaseTecHandlerConfig {
  /**@default true */
  cache?: boolean;
}

export function createGetTecHandler(config: GetTecHandlerConfig): RequestHandler<ParamsDictionary, GetTecResponseBody> {
  const {
    database,
    collectionName,
    cache: isCacheActived = true,
  } = config;

  const cache = isCacheActived ? new Map<string, TecGetCacheValue>() : undefined;

  return async (request, response) => {
    const { titleQ } = request.query;

    if (titleQ === undefined || typeof titleQ !== 'string') return response.status(400).send({ ok: false, error: 'invalid request query' });

    const upperCaseTitle = titleQ.toUpperCase();
    const sufixedUpperCaseTitle = titleQ.toUpperCase() + '\uf8ff';

    const cachedData = cache?.get(upperCaseTitle);

    if (cachedData && cachedData.lifeTime > Date.now()) {
      const { data } = cachedData;

      return response.status(200).send({ ok: true, data });
    }

    try {
      const query = await database.collection(collectionName)
        .where('searchName', '>=', upperCaseTitle)
        .where('searchName', '<=', sufixedUpperCaseTitle)
        .limit(10)
        .get();

      const tecResult = parseGetQuery(query);
      if (!tecResult.ok) return response.status(500).send({ ok: false, error: tecResult.error.message });

      cache?.set(upperCaseTitle, {
        lifeTime: Date.now() + 1000 * 30,
        data: tecResult.data,
      });

      return response.status(200).send({ ok: true, data: tecResult.data });
    } catch (e) {
      return response.status(500).send({ ok: false, error: JSON.stringify(e) });
    }
  };
}

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