import qs from 'query-string';
import useSWR, { SWRResponse } from 'swr';
import { AccountTitle } from '@/interfaces/account';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type AccountQuery = {
  name?: string;
};

export const useAccountList = (
  query?: AccountQuery,
  onSuccessCallback?: (data: AccountTitle[]) => void,
): SWRResponse<AccountTitle[], CommonErrorResponse> => {
  const result = useSWR<AccountTitle[]>(
    qs.stringifyUrl({
      url: API_URL.account.list,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
