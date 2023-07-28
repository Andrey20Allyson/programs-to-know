import { RequestHandler } from "express";
import { ParamsDictionary } from 'express-serve-static-core';
import { BaseTecHandlerConfig } from ".";
import { PutTecResponseBody, TecDatabaseDTO, tecDTOSchema } from "./schemas";

export function createPutTecHandler(config: BaseTecHandlerConfig): RequestHandler<ParamsDictionary, PutTecResponseBody> {
  const {
    collectionName,
    database,
  } = config;

  return async (request, response) => {
    const bodyParseResult = tecDTOSchema.safeParse(request.body);
    if (!bodyParseResult.success) return response.status(400).send({ ok: false, error: 'Bad Request: invalid body' });

    const {
      architecture,
      dependences,
      description,
      downloadUrl,
      searchName,
      imageUrl,
      title,
      id,
    } = bodyParseResult.data;

    const tecDatabaseDTO: TecDatabaseDTO = {
      architecture,
      dependences,
      description,
      downloadUrl,
      searchName,
      imageUrl,
      title,
    };

    try {
      await database.collection(collectionName).doc(id).update(tecDatabaseDTO);

      return response.status(200).send({ ok: true, data: { id } });
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : JSON.stringify(err);

      return response.status(500).send({ ok: false, error: message });
    }
  }
}