import qs from 'query-string';
import useSWR from 'swr';
import { SWRResponse } from 'swr/dist/types';
import { ExpenseType } from '@/interfaces/expense';
import { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type ExpenseQuery = {
  name?: string;
};

export const useExpenseList = (
  query?: ExpenseQuery,
  onSuccessCallback?: (data: ExpenseType[]) => void,
): SWRResponse<ExpenseType[], CommonErrorResponse> => {
  const result = useSWR<ExpenseType[]>(
    qs.stringifyUrl({
      url: API_URL.expense.list,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
