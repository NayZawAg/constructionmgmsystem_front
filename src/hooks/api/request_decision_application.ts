import qs from 'query-string';
import useSWR, { SWRResponse } from 'swr';
import { RequestDecisionApp } from '@/interfaces/requestDecisionApplication';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type AccountQuery = {
  name?: string;
};

export const useRequestAppList = (
  query?: AccountQuery,
  onSuccessCallback?: (data: RequestDecisionApp[]) => void,
): SWRResponse<RequestDecisionApp[], CommonErrorResponse> => {
  const result = useSWR<RequestDecisionApp[]>(
    qs.stringifyUrl({
      url: API_URL.request.list,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
