/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type CostCategoriesList = {
  large_categories: LargeCategoriesList[];
  cost_categories: CostCategory[];
  status: CostCategoryApplicationStatusList[];
  detail_flag: CostDetailDeleteFlagList[];
};

export type LargeCategoriesList = {
  id: number;
  construction_type_name: string;
  middle_categories: MiddleCategoriesList[];
};

export type MiddleCategoriesList = {
  id: number;
  large_category_id: number;
  construction_type_name: string;
};

export type CostCategory = {
  id: number;
  construction_large_category_id: number;
  construction_middle_category_id: number;
  working_budget: number;
};

export type CostCategoryApplicationStatusList = {
  status: number;
  construction_middle_category_id: number;
};

export type CostDetailDeleteFlagList = {
  construction_middle_category_id: number;
  detail_flag: number;
};

export type AddCostCategoriesList = {
  large_category: number;
  middle_category: number;
  working_budget: any;
  type: string;
};

/**
 * 原価カテゴリー取得
 * @param {number} constructionId
 */
export const getCostCategoriesList = async (constructionId: number) => {
  const response = await api.get<CostCategoriesList>(
    API_URL.costs.costCategoriesList(constructionId),
  );
  return response;
};

/**
 * 原価カテゴリー追加
 * @param {number} constructionId
 * @param {AddEstimatesCategoriesList} data
 */
export const addCostCategoriesList = async (
  constructionId: number,
  data: AddCostCategoriesList[],
) => {
  const response = await api.post<AddCostCategoriesList[]>(
    API_URL.costs.addCostCategories(constructionId),
    data,
  );
  return response;
};
