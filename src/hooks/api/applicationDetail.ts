import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { ApplicationDetail } from '@/interfaces/applicationDetail';
import type { CommonErrorResponse } from '@/types/api/common';
import { API_URL } from '@/utils/constants/api';

export type ApplicationQuery = {
  name?: string;
};

/** 経費申請一覧取得 hook **/
export const useApplicationDetailList = (
  query?: ApplicationQuery,
): SWRResponse<ApplicationDetail[], CommonErrorResponse> => {
  const result = useSWR<ApplicationDetail[]>(
    qs.stringifyUrl({
      url: API_URL.applicationDetail.list,
      query: {
        name: query?.name || undefined,
      },
    }),
  );
  return result;
};
