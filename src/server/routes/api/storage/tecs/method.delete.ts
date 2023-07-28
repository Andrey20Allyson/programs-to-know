import { RequestHandler } from "express";
import { ParamsDictionary } from 'express-serve-static-core';
import { BaseTecHandlerConfig } from ".";
import { DeleteTecResponseBody } from "./schemas";

export function createDeleteTecHandler(config: BaseTecHandlerConfig): RequestHandler<ParamsDictionary, DeleteTecResponseBody> {
  const {
    collectionName,
    database,
  } = config;

  return async (request, response) => {
    const { id } = request.query;

    if (!id || typeof id !== 'string') return response.status(400).send({
      error: 'Bad reqeust: expected the \'id\' query param',
      ok: false,
    });

    try {
      await database.collection(collectionName).doc(id).delete();

      return response.status(200).send({ ok: true, data: { deleted: true } });
    } catch (err) {
      const message = err instanceof Error ? err.message : JSON.stringify(err);

      return response.status(500).send({
        error: message,
        ok: false,
      });
    }
  }
}