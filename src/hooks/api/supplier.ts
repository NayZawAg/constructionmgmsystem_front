import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { Supplier } from '@/interfaces/supplier';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type SupplierQuery = {
  name?: string;
};

/** 得意先一覧取得 hook **/
export const useSupplierList = (
  query?: SupplierQuery,
  onSuccessCallback?: (data: Supplier[]) => void,
): SWRResponse<Supplier[], CommonErrorResponse> => {
  const result = useSWR<Supplier[]>(
    qs.stringifyUrl({
      url: API_URL.supplier.list,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
