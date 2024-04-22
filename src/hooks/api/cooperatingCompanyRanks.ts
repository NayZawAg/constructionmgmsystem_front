import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { CooperatingCompanyRanks } from '@/interfaces/cooperating_company_ranks';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type MembershipFeeRanksQuery = {
  rank?: number;
  id?: number;
};

export const MembershipFeeRanksQueryList = (
  query?: MembershipFeeRanksQuery,
  onSuccessCallback?: (data: CooperatingCompanyRanks[]) => void,
): SWRResponse<CooperatingCompanyRanks[], CommonErrorResponse> => {
  const result = useSWR<CooperatingCompanyRanks[]>(
    qs.stringifyUrl({
      url: API_URL.cooperatingCompanyRanks.list,
      query: {
        id: query?.id || undefined,
        rank: query?.rank || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};

