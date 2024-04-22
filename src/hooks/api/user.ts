import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { UserList } from '@/interfaces/user';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type UserQuery = {
  name?: string;
};

/** ユーザ一覧取得 hook **/
export const useUserList = (
  query?: UserQuery,
  onSuccessCallback?: (data: UserList[]) => void,
): SWRResponse<UserList[], CommonErrorResponse> => {
  const result = useSWR<UserList[]>(
    qs.stringifyUrl({
      url: API_URL.user.list,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
