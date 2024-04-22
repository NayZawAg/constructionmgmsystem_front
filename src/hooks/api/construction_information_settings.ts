import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { InformationSettings } from '@/interfaces/informationSettings';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';
/** 工事詳細取得 hook **/
export const useConstructionInformationSettingsDetail = (
  id: number,
): SWRResponse<InformationSettings, CommonErrorResponse> => {
  const result = useSWR<InformationSettings>(
    API_URL.construction.informationsettings(id),
    fetcher
  );
  return result;
};