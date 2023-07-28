import { RequestHandler } from "express";
import { ParamsDictionary } from 'express-serve-static-core';
import { BaseTecHandlerConfig } from ".";
import { PostTecResponseBody, TecDatabaseDTO, tecDatabasePostDTOSchema } from "./schemas";

export function createPostTecHandler(config: BaseTecHandlerConfig): RequestHandler<ParamsDictionary, PostTecResponseBody> {
  const {
    database,
    collectionName,
  } = config;
  
  return async (request, response) => {
    const { body } = request;

    const parseResult = tecDatabasePostDTOSchema.safeParse(body);
    if (!parseResult.success) return response.status(400).send({ ok: false, error: parseResult.error.message });

    const tecCreationData: TecDatabaseDTO = {
      ...parseResult.data,
      searchName: parseResult.data.title.toUpperCase(),
    };

    try {
      const creationResponse = await database.collection(collectionName).add(tecCreationData);

      return response.status(201).send({ ok: true, data: { id: creationResponse.id } });
    } catch (e) {
      return response.status(500).send({ ok: false, error: JSON.stringify(e) });
    }
  }
}