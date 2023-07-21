import retry from 'async-retry';
import type { Options } from 'async-retry';

import { client } from './index';

export const DEFAULT_RETRY_CONFIG: Options = {
  retries: 3,
  maxTimeout: 5000,
};

export const DEFAULT_MUTATE_RETRY_CONFIG: Options = {
  ...DEFAULT_RETRY_CONFIG,
  retries: 0,
};

export const queryDatabase = async (
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any[],
  retryConfig = DEFAULT_RETRY_CONFIG
) => {
  return retry(async (_bail) => {
    try {
      const start = Date.now();

      // @ts-ignore
      const res = await client.query(query, params);

      console.log(`elapsed: ${Date.now() - start}`);

      return res;
    } catch (e: unknown) {
      console.error(e);
    }
  }, retryConfig);
};

export const getQuery = async (
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any[],
  retryConfig?: Options
) => {
  const result = await queryDatabase(query, params, retryConfig);

  if (!result?.rowCount) {
    return [];
  }

  return result.rows;
};

export const mutateQuery = async (
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any[],
  retryConfig = DEFAULT_MUTATE_RETRY_CONFIG
) => {
  const result = await queryDatabase(query, params, retryConfig);

  return result;
};
