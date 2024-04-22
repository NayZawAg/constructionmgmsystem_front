import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { Brand } from '@/interfaces/brand';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type EmployeeQuery = {
  name?: string;
};

/** ブランド取得 hook **/
export const useBrandList = (
  query?: EmployeeQuery,
  onSuccessCallback?: (data: Brand[]) => void,
): SWRResponse<Brand[], CommonErrorResponse> => {
  const result = useSWR<Brand[]>(
    qs.stringifyUrl({
      url: API_URL.brand.list,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
