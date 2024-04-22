import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { ApprovalDetails } from '@/interfaces/approvalDetails'
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type approvalDetailsQuery = {
  name?: string;
};

export const useApprovalDeatilsList = (
  id: number,
): SWRResponse<ApprovalDetails, CommonErrorResponse> => {
  const result = useSWR<ApprovalDetails>(
    API_URL.approvaldetails.detail(id),
    fetcher
  );
  return result;
};