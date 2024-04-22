import type { SWRResponse } from 'swr';
import useSWR from 'swr';
import type { CommonErrorResponse } from '@/types/api/common';
import type { HeaderIconResponse } from '@/types/api/header_icon';
import { API_URL } from '@/utils/constants/api';

/** header_icon 取得 **/
export const useHeaderIcon = (): SWRResponse<
  HeaderIconResponse,
  CommonErrorResponse
> => {
  const response = useSWR<HeaderIconResponse>(API_URL.header_icon);
  return response;
};
