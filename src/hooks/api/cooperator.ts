import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { CooperatorsCompanyListItemType } from '@/pages/api/cooperators';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type CooperatorCompanyQuery = {
  name?: string;
};

/** 協力会社情報取得 hook **/
export const useCooperatorCompanyList = (
  query?: CooperatorCompanyQuery,
): SWRResponse<CooperatorsCompanyListItemType[], CommonErrorResponse> => {
  const result = useSWR<CooperatorsCompanyListItemType[]>(
    qs.stringifyUrl({
      url: API_URL.cooperators.list,
      query: {
        name: query?.name || undefined,
      },
    }),
  );
  return result;
};

export const useCooperatorCompanyDetailList = (
  id: number,
): SWRResponse<CooperatorsCompanyListItemType, CommonErrorResponse> => {
  const result = useSWR<CooperatorsCompanyListItemType>(
    API_URL.cooperators.detail(id),
    fetcher,
  );
  return result;
};
