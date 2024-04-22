import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { EmployeeList } from '@/interfaces/employee';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type EmployeeQuery = {
  name?: string;
};

/** 得意先一覧取得 hook **/
export const useEmployeeUserIDList = (
  query?: EmployeeQuery,
  onSuccessCallback?: (data: EmployeeList[]) => void,
): SWRResponse<EmployeeList[], CommonErrorResponse> => {
  const result = useSWR<EmployeeList[]>(
    qs.stringifyUrl({
      // url: API_URL.employee.list,
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
