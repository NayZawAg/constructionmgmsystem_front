import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { CostCategoriesType } from "@/pages/api/constructions/costCategories";
import type { CommonErrorResponse } from '@/types/api/common';
import { API_URL } from '@/utils/constants/api';

export type CostCategoriesQuery = {
  name?: string;
};

/** 原価カテゴリー取得 hook **/
export const useCostCategoriesList = (
  query?: CostCategoriesQuery,
): SWRResponse<CostCategoriesType[], CommonErrorResponse> => {
  const result = useSWR<CostCategoriesType[]>(
    qs.stringifyUrl({
      url: API_URL.costCategories.list,
      query: {
        name: query?.name || undefined,
      },
    }),
  );
  return result;
};