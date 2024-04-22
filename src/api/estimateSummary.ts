import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';
// import { LargeCategoriesList, MiddleCategoriesList } from './estimatesCategories';

export type EstimatesSummaryList = {
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
  estimate_category_id: number,
  middle_total_amount: number
}
export type EstimateApplication = {
  id: number,
  construction_id: number,
  workflow_no: string,
  created_at: Date,
  updated_at: Date
}
/**
 * 精算見積-サマリー
 * @param {number} constructionId
 */
export const getEstimatesSummaryList = async (constructionId: number) => {
  const response = await api.get<EstimatesSummaryList>(
    API_URL.estimates.summary(constructionId),
  );
  return response;
}
/**
 * 精算見積-サマリー
 * @param {number} constructionId
 */
export const estimatesAppWorkflowNo = async (constructionId: number) => {
  const response = await api.post<EstimateApplication>(
    API_URL.estimates.application(constructionId),
    ""
  );
  return response;
}
