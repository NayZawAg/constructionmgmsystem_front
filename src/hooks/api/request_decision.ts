import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { Meta } from '@/interfaces/meta';
import { RequestDecisionList } from '@/interfaces/requestDecisionList';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type requestDecisionList = {
  results: RequestDecisionList[];
  meta: Meta;
};

export type RequestDecisionListQuery = {
  search_type?: number;
  status?: number;
  employee_id?: number;
  request_decision_name?: string;
  completion_year_month_from?: string;
  completion_year_month_to?: string;
  page?: number;
  per_page?: number;
};

/**   稟議申請取得 hook **/
export const useRequestDesicionList = (
  query?: RequestDecisionListQuery,
  onSuccessCallback?: (data: requestDecisionList) => void,
): SWRResponse<requestDecisionList, CommonErrorResponse> => {
  const result = useSWR<requestDecisionList>(
    qs.stringifyUrl(
      {
        url: API_URL.request_decision.list,
        query: {
          search_type: query?.search_type || '',
          status: query?.status || '',
          employee_id: query?.employee_id || '',
          request_decision_name: query?.request_decision_name || '',
          completion_year_month_from: query?.completion_year_month_from || '',
          completion_year_month_to: query?.completion_year_month_to || '',
          page: query?.page || '',
          per_page: query?.per_page || '',
        },
      },
    ),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
