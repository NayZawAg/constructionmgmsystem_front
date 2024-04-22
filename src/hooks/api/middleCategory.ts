import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { MiddleCategory } from '@/interfaces/middleCategories';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type MiddleCategoryQuery = {
  name?: string;
};

/** ブランド取得 hook **/
export const useMiddleCategoryList = (
  query?: MiddleCategoryQuery,
  onSuccessCallback?: (data: MiddleCategory[]) => void,
): SWRResponse<MiddleCategory[], CommonErrorResponse> => {
  const result = useSWR<MiddleCategory[]>(
    qs.stringifyUrl({
      url: API_URL.middleCategory.list,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
