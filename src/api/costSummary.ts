import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type CostsSummaryList = {
  categories: LargeCategoriesList[];
  // large_categories: LargeCategoriesList;
}
export type LargeCategoriesList = {
  id: number;
  construction_type_name: string;
  middle_categories: MiddleCategoriesList[];
}
export type MiddleCategoriesList = {
  id: number,
  construction_type_name: string,
  cost_category_id: number,
  estimate_subtotal: number,
  working_budget: number,
  cost_details_subtotal: number
}
/**
 * 精算見積-サマリー
 * @param {number} constructionId
 */
export const getCostsSummaryList = async (constructionId: number) => {
  const response = await api.get<CostsSummaryList>(
    API_URL.costs.summary(constructionId),
  );
  return response;
}