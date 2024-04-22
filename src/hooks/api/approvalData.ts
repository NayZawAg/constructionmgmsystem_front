import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { ApprovalDataList } from '@/interfaces/approvalData';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type EmployeeQuery = {
  name?: string;
};

/** 稟議名取得 hook **/
export const useApprovalDataList = (
  query?: EmployeeQuery,
  onSuccessCallback?: (data: ApprovalDataList[]) => void,
): SWRResponse<ApprovalDataList[], CommonErrorResponse> => {
  const result = useSWR<ApprovalDataList[]>(
    qs.stringifyUrl({
      url: API_URL.approvalData.list,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
