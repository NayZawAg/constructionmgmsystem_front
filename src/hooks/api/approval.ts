import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { Approval } from '@/interfaces/approval';
import type { CommonErrorResponse } from '@/types/api/common';
import { API_URL } from '@/utils/constants/api';

export type ApprovalQuery = {
  name?: string;
};

/** 経費申請一覧取得 hook **/
export const useApprovalList = (
  query?: ApprovalQuery,
): SWRResponse<Approval[], CommonErrorResponse> => {
  const result = useSWR<Approval[]>(
    qs.stringifyUrl({
      url: API_URL.approval.list,
      query: {
        name: query?.name || undefined,
      },
    }),
  );
  return result;
};



