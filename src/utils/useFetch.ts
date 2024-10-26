import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosResponse } from 'axios';
import type ResponseError from './errors';
import defaultConfig from './reactQuery';

export type BaseFetchOptions = { cacheKey: string };
export type KeyParams<FetchOptions = {}> = BaseFetchOptions & (FetchOptions | null | undefined);
export type RequestFunctionReturn<TResult> = Promise<TResult> | null;
export type RequestFunction<TResult> = (...params: any) => RequestFunctionReturn<TResult>;

const useFetch = <FetchOptions, TResult extends {} | null>(
  params: KeyParams<FetchOptions>,
  requestFunction: RequestFunction<TResult>,
  config?: UseQueryOptions<AxiosResponse<TResult>> | undefined,
) => {
  const response = useQuery<TResult | null, ResponseError>(
    Object.values(params),
    () => requestFunction(params),
    config ? { ...defaultConfig, ...config } : defaultConfig,
  );

  const {
    status,
    isFetching,
    isLoading,
    data,
    error,
    refetch,
  } = response;

  return {
    status,
    isFetching,
    isLoading,
    data,
    error,
    refetch,
  };
};

export default useFetch;
