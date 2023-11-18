import { error } from '@sveltejs/kit';
import type { ZodSchema } from 'zod';

export const parseOrThrow422 = <T>(schema: ZodSchema<T>, data: unknown) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.log(result.error);

    throw error(422, 'bad input');
  }

  return result.data;
};
