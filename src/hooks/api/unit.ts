import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type UnitQuery = {
  name?: string;
};

export type UnitList = {
  id: number;
  name: string;
}

/** hook **/
export const useUnitList = (
  query?: UnitQuery,
  onSuccessCallback?: (data: UnitList[]) => void,
): SWRResponse<UnitList[], CommonErrorResponse> => {
  const result = useSWR<UnitList[]>(
    qs.stringifyUrl({
      url: API_URL.units.list,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
