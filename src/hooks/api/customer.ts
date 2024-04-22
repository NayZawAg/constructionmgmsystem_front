import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { Customer } from '@/interfaces/customer';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type CustomerQuery = {
  name?: string;
};

/** 経費申請一覧取得 hook **/

export const useCustomerList = (
  query?: CustomerQuery,
  onSuccessCallback?: (data: Customer[]) => void,
): SWRResponse<Customer[], CommonErrorResponse> => {
  const result = useSWR<Customer[]>(
    qs.stringifyUrl({
      url: API_URL.customer.list,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};

export const useCustomerDeatilList = (
  id: number,
): SWRResponse<Customer, CommonErrorResponse> => {
  const result = useSWR<Customer>(API_URL.customer.detail(id), fetcher);
  return result;
};
