/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CostManageCategoryMenu } from '@/types/api/costManage';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type SmallCategoriesList = {
  id: number;
  construction_type_name: string;
};

export type CostManageMinorItems = {
  cost_detail_list: CostManageMinorItemsList[];
  total_amount: TypeTotalCostManage;
  category_delete_flag: number;
};
export type CostManageMinorItemsList = {
  small_categories: SmallCategoriesList;
  cost_small_categories: CostSmallCategory;
  cost_details: CostDetail[];
};

export type CostSmallCategory = {
  id: number;
  entry_small_category_name: string;
  remarks: string;
  order_information_id: number;
  order_no: string;
  assessment_status: number;
  disabled: boolean;
};

export type CostDetail = {
  assessment_unit: string;
  assessment_unit_price: number;
  id: number;
  assessment_status: number;
  detail: string;
  specification: string;
  quantity: number;
  unit: string;
  unit_price: number;
  subtotal: number;
  assessment_quantity: number;
  assessed_amount: number;
  remarks: string;
  cooperator_name: string;
  reason_id: string;
  department_id: string;
  close_flag: boolean;
};

export type UpdateCostSmallCategory = {
  remarks: string;
  entry_small_category_name: string;
  cost_small_category_id: number;
};

export type UpdateCostDetailCategory = {
  remarks: string;
  reason_id: string;
  department_id: string;
  cost_detail_id: number;
  detail: string;
  specification: string;
  quantity: number;
  unit: string;
  unit_price: number;
  subtotal: number;
};

export type AddCostSmallCategory = {
  construction_small_category_id: number;
  entry_small_category_name: string;
  remarks: string;
};

export type AddCostDetail = {
  construction_small_category_id: number;
  detail: string;
  specification: string;
  quantity: number;
  unit: string;
  unit_price: number;
  subtotal: number;
  // assessment_quantity: number;
  // assessment_unit: string;
  // assessment_unit_price: number;
  // assessed_amount: number;
  remarks: string;
  reason_id: string;
  department_id: string;
};

export type addCostDetailType = {
  cost_small_categories: AddCostSmallCategory;
  cost_details: AddCostDetail[];
};

export type convertDataType = {
  add_data: addCostDetailType[];
  update_data: UpdateCostSmallCategory[];
};

export type TypeTotalCostManage = {
  total_cost_manage: {
    working_budget: number;
  };
  overall_cost_manage: {
    overall_sold: number;
    overall_expected_cost: number;
  };
};

/**
 * 清算見積メニュカテゴリー取得
 * @param {number} constructionId
 */
export const getCostManageMenuList = async (constructionId: number) => {
  const response = await api.get<CostManageCategoryMenu>(
    API_URL.costs.getCostManageMenu(constructionId),
  );
  return response;
};

/**
 * 原価小分類カテゴリー取得
 * @param {number} middle_category_id
 */
export const getMiddleCategoryList = async (middle_category_id: number) => {
  const response = await api.get<SmallCategoriesList[]>(
    API_URL.smallcategory.list(middle_category_id),
  );
  return response;
};
/**
 * 精算見積-サマリー
 * @param {number} constructionId
 */
export const getCostsManageItems = async (
  constructionId: number,
  costCategoryId: number,
  middleCategoryId: number,
) => {
  const response = await api.get<CostManageMinorItems>(
    API_URL.costs.getCostManage(
      constructionId,
      costCategoryId,
      middleCategoryId,
    ),
  );
  return response;
};

export const addCostDetailsData = async (
  constructionId: number,
  costCategoryId: number,
  data: any[],
  update_data: {
    cost_samll_categories: UpdateCostSmallCategory[];
    cost_details: UpdateCostDetailCategory[];
  },
  delteData: number[],
  addDetailsData: any[],
  costSmallCategoryId: number[]
) => {
  const convertData = convertDetailDataFormat(
    data,
    update_data,
    delteData,
    addDetailsData,
    costSmallCategoryId
  );
  const response = await api.post<convertDataType[]>(
    API_URL.costs.addCostDetails(constructionId, costCategoryId),
    convertData,
  );
  return response;
};

const convertDetailDataFormat = (
  detailData: any,
  updateData: {
    cost_samll_categories: UpdateCostSmallCategory[];
    cost_details: UpdateCostDetailCategory[];
  },
  delteData: number[],
  addDetailsData: any[],
  costSmallCategoryId: number[]
) => {
  const conData: addCostDetailType[] = [];
  const conAddDetailsData: any[] = [];
  const subData = detailData.filter((item: any) =>
    item.rowLevel.includes('subTotal-'),
  );
  subData.map((item: any) => {
    const index = item.rowLevel.split('-')[1];
    const itemData: AddCostDetail[] = [];
    detailData.map((item: any) => {
      if (item.rowLevel == 'item-' + index) {
        itemData.push({
          construction_small_category_id: item.small_category_id,
          detail: item.construction_type_name,
          specification: item.specification,
          quantity: item.quantity,
          unit: item.unit,
          unit_price: item.unit_price,
          subtotal: item.subtotal,
          remarks: item.remarks,
          reason_id: item.reason_id,
          department_id: item.department_id,
        });
      }
    });
    conData.push({
      cost_small_categories: {
        construction_small_category_id: item.small_category_id,
        entry_small_category_name: item.entry_small_category_name,
        remarks: item.remarks,
      },
      cost_details: itemData,
    });
  });

  // change type to add details data
  addDetailsData.map((item) => {
    conAddDetailsData.push({
      construction_small_category_id: item.small_category_id,
      detail: item.construction_type_name,
      specification: item.specification,
      quantity: item.quantity,
      unit: item.unit,
      unit_price: item.unit_price,
      subtotal: item.subtotal,
      remarks: item.remarks,
      reason_id: item.reason_id,
      department_id: item.department_id,
      cost_small_category_id: item.cost_small_category_id,
    });
  });
  const response = {
    add_data: conData,
    update_data: updateData,
    delete_detils_data: delteData,
    add_detils_data: conAddDetailsData,
    cost_small_category_ids: costSmallCategoryId,
  };
  return response;
};

export const getTotalCostsManageItems = async (
  constructionId: number,
  middelCategoryId: number,
) => {
  const response = await api.get<TypeTotalCostManage>(
    API_URL.costs.getTotalCostManage(constructionId, middelCategoryId),
  );
  return response;
}
