import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { OrganizationList } from '@/interfaces/organization';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type OrganizationQuery = {
  name?: string;
};

/** 費用負担部署 hook **/
export const useOrganizationList = (
  query?: OrganizationQuery,
  onSuccessCallback?: (data: OrganizationList[]) => void,
): SWRResponse<OrganizationList[], CommonErrorResponse> => {
  const result = useSWR<OrganizationList[]>(
    qs.stringifyUrl({
      url: API_URL.organization.list,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
