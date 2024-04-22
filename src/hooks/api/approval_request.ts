import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { ApprovalRequest } from '@/interfaces/approval_request';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type ApprovalRequestQuery = {
  name?: string;
};

export const useApprovalRequestlist = (
  query?: ApprovalRequestQuery,
  onSuccessCallback?: (data: ApprovalRequest[]) => void,
): SWRResponse<ApprovalRequest[], CommonErrorResponse> => {
  const result = useSWR<ApprovalRequest[]>(
    qs.stringifyUrl({
      url: API_URL.approval_request.list,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
