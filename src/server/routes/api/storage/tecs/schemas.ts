import zod from 'zod';
import { createAPIResponseBodySchema } from '../../schemas.utils';

export const tecDatabasePostDTOSchema = zod.object({
  title: zod.string(),
  imageUrl: zod.string().optional(),
  dependences: zod.string().array(),
  description: zod.string().optional(),
  downloadUrl: zod.string().optional(),
  architecture: zod.enum(['64', '86']).optional(),
}); 

export const tecDatabaseDTOSchema = zod.object({
  ...tecDatabasePostDTOSchema.shape,
  searchName: zod.string(),
});
export const tecDatabaseDTOArraySchema = tecDatabaseDTOSchema.array();

export const tecDTOSchema = zod.object({
  ...tecDatabaseDTOSchema.shape,
  id: zod.string(),
});
export const tecDTOArraySchema = tecDTOSchema.array();

export const getTecResponseBody = createAPIResponseBodySchema(
  tecDTOArraySchema,
  zod.string(),
);

export const postTecResponseBody = createAPIResponseBodySchema(
  zod.object({
    id: zod.string(),
  }),
  zod.string(),
);

export const putTecResponseBody = createAPIResponseBodySchema(
  zod.object({
    id: zod.string(),
  }),
  zod.string(),
);

export const deleteTecResponseBody = createAPIResponseBodySchema(
  zod.object({
    deleted: zod.boolean(),
  }),
  zod.string(),
);

export type TecDTO = zod.infer<typeof tecDTOSchema>;
export type TecDatabaseDTO = zod.infer<typeof tecDatabaseDTOSchema>;
export type TecDatabasePostDTO = zod.infer<typeof tecDatabasePostDTOSchema>;

export type GetTecResponseBody = zod.infer<typeof getTecResponseBody>;
export type PostTecResponseBody = zod.infer<typeof postTecResponseBody>;
export type PutTecResponseBody = zod.infer<typeof putTecResponseBody>;
export type DeleteTecResponseBody = zod.infer<typeof deleteTecResponseBody>;