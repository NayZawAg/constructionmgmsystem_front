import qs from 'query-string';
import useSWR, { SWRResponse } from 'swr';
import {} from '@/interfaces/department';
import { Transportation } from '@/interfaces/transportation';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type TransportationQuery = {
  name?: string;
};

export const useTransportationList = (
  query?: TransportationQuery,
  onSuccessCallback?: (data: Transportation[]) => void,
): SWRResponse<Transportation[], CommonErrorResponse> => {
  const result = useSWR<Transportation[]>(
    qs.stringifyUrl({
      url: API_URL.transportation.list,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
