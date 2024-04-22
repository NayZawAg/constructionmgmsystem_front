import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { ConstructionOverview } from '@/interfaces/constructionOverview';
import type { CommonErrorResponse } from '@/types/api/common';
import type {
  ConstructionOverviewCreate,
} from '@/types/api/constructionOverview';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

/** 工事概要詳細取得 hook **/
export const useConstructionOverviewDetail = (
  id: number,
  o_id: number,
): SWRResponse<ConstructionOverview, CommonErrorResponse> => {
  const result = useSWR<ConstructionOverview>(
    API_URL.construction_overview.detail(id, o_id),
    fetcher,
  );
  return result;
};

export const useOverviewList = (
  id: number,
): SWRResponse<ConstructionOverviewCreate, CommonErrorResponse> => {
  const result = useSWR<ConstructionOverviewCreate>(API_URL.construction_overview.list(id),fetcher);
  return result;
};
