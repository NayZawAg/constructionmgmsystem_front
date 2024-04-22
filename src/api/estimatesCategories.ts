import type { EstimateCategoryMenu } from '@/types/api/estimateMenu';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type EstimatesCategoriesList = {
  large_categories: LargeCategoriesList[];
  estimates_categories: EstimatesCategory[];
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

export type EstimatesCategory = {
  id: number;
  construction_large_category_id: number;
  construction_middle_category_id: number;
};

export type AddEstimatesCategoriesList = {
  large_category: number;
  middle_category: number;
  type: string;
};

/**
 * 清算見積カテゴリー取得
 * @param {number} constructionId
 */
export const getEstimatesCategoriesList = async (constructionId: number) => {
  const response = await api.get<EstimatesCategoriesList>(
    API_URL.estimates.List(constructionId),
  );
  return response;
};

/**
 * 清算見積カテゴリー追加
 * @param {number} constructionId
 * @param {AddEstimatesCategoriesList} data
 */
export const addEstimatesCategoriesList = async (
  constructionId: number,
  data: AddEstimatesCategoriesList[],
) => {
  const response = await api.post<AddEstimatesCategoriesList[]>(
    API_URL.estimates.addCategories(constructionId),
    data,
  );
  return response;
};

/**
 * 清算見積メニュカテゴリー取得
 * @param {number} constructionId
 */
export const getEstimatesMenuList = async (constructionId: number) => {
  const response = await api.get<EstimateCategoryMenu>(
    API_URL.estimates.getEstimateMenu(constructionId),
  );
  return response;
};

/**
 * 小分類カテゴリー削除
 * @param {number} id
 * @param {number} estimate_small_category_id
 */
export const deleteEstimateSmallCategory = async (id: number, estimate_small_category_id: number) => {
  const response = await api.delete(API_URL.estimates.delete_estimate_small_category(id, estimate_small_category_id), {
    id,
    estimate_small_category_id,
  });
  return response;
};