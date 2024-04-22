import useSWR, { SWRResponse } from 'swr';
import { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type SmallCategoriesQuery = {
  middle_category_id?: string;
};

export type SmallCategoriesList = {
  id: number;
  construction_type_name: string;
  code: string;
};

export const useSmallCategoryList = (
  middle_category_id: number,
  onSuccessCallback?: (data: SmallCategoriesList[]) => void,
): SWRResponse<SmallCategoriesList[], CommonErrorResponse> => {
  const result = useSWR<SmallCategoriesList[]>(API_URL.smallcategory.list(middle_category_id),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) }
  );
  return result;
};