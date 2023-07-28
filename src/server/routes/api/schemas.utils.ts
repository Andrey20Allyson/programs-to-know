import zod from 'zod';

const falseSchema = zod.custom<false>(data => data === false);
const trueSchema = zod.custom<true>(data => data === true);

export function createAPIResponseBodySchema<D extends zod.ZodType, E extends zod.ZodType>(dataSchema: D, errorSchema: E) {
  const failureBody = zod.object({
    ok: falseSchema,
    error: errorSchema,
  })
  
  const successBody = zod.object({
    ok: trueSchema,
    data: dataSchema, 
  });

  return failureBody.or(successBody); 
}