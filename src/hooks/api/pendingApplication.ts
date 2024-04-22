import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { PendingApplicationResult } from '@/api/pendingApplications';
import { Meta } from '@/interfaces/meta';
import { PendingApplication } from '@/interfaces/pendingApplication';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type PendingApplicationData = {
  results: PendingApplicationResult[];
  meta: Meta;
};
export type PendingApplicationQuery = {
  completion_year_month_start?: string;
  completion_year_month_end?: string;
  search_type?: number;
  page?: number;
  per_page?: number;
  sort_by?: string;
};

export type PendingApplicationSPQuery = {
  name?: string;
}

/** 経費申請一覧取得 hook **/
export const usePendingApplicationList = (
  query?: PendingApplicationSPQuery,
): SWRResponse<PendingApplication[], CommonErrorResponse> => {
  const result = useSWR<PendingApplication[]>(
    qs.stringifyUrl({
      url: API_URL.pendingApplication.list,
      query: {
        name: query?.name || undefined,
      },
    }),
  );
  return result;
};

export const usePendingApplication = (
  query?: PendingApplicationQuery,
  onSuccessCallback?: (data: PendingApplicationData) => void,
): SWRResponse<PendingApplicationData, CommonErrorResponse> => {
  const result = useSWR<PendingApplicationData>(
    qs.stringifyUrl({
      url: API_URL.pending_application.list,
      query: {
        completion_year_month_start:
          query?.completion_year_month_start || undefined,
        completion_year_month_end:
          query?.completion_year_month_end || undefined,
        search_type:
          query?.search_type || undefined,
        page:
          query?.page || undefined,
        per_page:
          query?.per_page || undefined,
        sort_by:
          query?.sort_by || undefined,
      },
    },
    {
      skipEmptyString: true,
    },
    ),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};


