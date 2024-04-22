import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { Application } from '@/interfaces/application';
import type { CommonErrorResponse } from '@/types/api/common';
import { API_URL } from '@/utils/constants/api';

export type ApplicationQuery = {
  name?: string;
};

/** 経費申請一覧取得 hook **/
export const useApplicationList = (
  query?: ApplicationQuery,
): SWRResponse<Application[], CommonErrorResponse> => {
  const result = useSWR<Application[]>(
    qs.stringifyUrl({
      url: API_URL.application.list,
      query: {
        name: query?.name || undefined,
      },
    }),
  );
  return result;
};



