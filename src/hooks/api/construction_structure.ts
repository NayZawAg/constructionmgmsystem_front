import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { ConstructionStructureList } from '@/interfaces/constructionStructure';
import type { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type EmployeeQuery = {
  name?: string;
};

/** 工事体制一覧取得 hook **/
export const useConstructionStructureList = (
  id: number,
  onSuccessCallback?: (data: ConstructionStructureList[]) => void,
): SWRResponse<ConstructionStructureList[], CommonErrorResponse> => {
  const result = useSWR<ConstructionStructureList[]>(
    API_URL.construction_structure.List(id),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
