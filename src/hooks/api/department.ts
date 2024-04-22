import qs from 'query-string';
import useSWR, { SWRResponse } from 'swr';
import { Department } from '@/interfaces/department';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type DepartmentQuery = {
  name?: string;
};

export const useDepartmentList = (
  query?: DepartmentQuery,
  onSuccessCallback?: (data: Department[]) => void,
): SWRResponse<Department[], CommonErrorResponse> => {
  const result = useSWR<Department[]>(
    qs.stringifyUrl({
      url: API_URL.department.list,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
