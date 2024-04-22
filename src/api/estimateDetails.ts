/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type AddEstimateDetailsRequest = {
  construction_id: number;
  estimate_category_id: number;
  estimate_small_category_id: number;
  detail: string;
  specification: string;
  quantity: number;
  unit: string;
  unit_price: number;
  subtotal: number;
  remarks: string;
};

export type GetEstimateDetails = {
  small_categories: {
    id: number,
    construction_type_name: string
  },
  estimate_small_categories: {
    id: number,
    entry_small_category_name: string,
    remarks: string
  },
  estimate_details: {
    id: number,
    detail: string,
    quantity: number,
    unit: string,
    unit_price: number,
    specification: string,
    subtotal: number,
    remarks: string
  }[]
};
export type UpdateEstimateDetails = {
  entry_small_category_name: string,
  estimate_small_category_id: number
}

/**
 * 担当者複数案件追加
 * @param {number} constructionId
 * @param {AddEstimateDetailsRequest} data
 */
export const addEstimateDetails = async (
  constructionId: number,
  data: AddEstimateDetailsRequest[],
) => {
  const response = await api.post<AddEstimateDetailsRequest[]>(
    API_URL.construction.estimatedetails(constructionId),
    data,
  );
  return response;
};

/**
 * 清算見積カテゴリー取得
 * @param {number} constructionId
 * @param {number} estimateCategoryId
 */
export const getEstimateDetails = async (constructionId: number, estimateCategoryId: number) => {
  const response = await api.get<GetEstimateDetails[]>(
    API_URL.construction.estimatedetailswithcategoryid(constructionId, estimateCategoryId),
  );
  return response;
};

/**
 * 清算見積明細取得
 * @param {number} constructionId
 * @param {number} estimateCategoryId
 */
export const getEstimateDetailsWithMiidle = async (constructionId: number, middleCategoryId: number) => {
  const response = await api.get<GetEstimateDetails[]>(
    API_URL.construction.estimateDetailsWithMiddleCategoryId(constructionId, middleCategoryId),
  );
  return response;
};

export const updateEstimateDetails = async (constructionId: number, entry_small_category_name: string, estimate_small_category_id: number) => {
  const response = await api.put<UpdateEstimateDetails>(
    API_URL.estimates.updateSmallCategoryName(constructionId, entry_small_category_name, estimate_small_category_id),
    ""
  );
  return response;
};