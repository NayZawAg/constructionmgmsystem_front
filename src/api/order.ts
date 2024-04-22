import { orderList } from '@/pages/orders';
import { Construction, Cooperator, OrderList } from '@/types/api/order';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

// 協力会社検索
export const getCooperator = async (
  // id: number,
  // small_category_ids: number[],
  middle_category_id: number,
  cooperator_name: string,
) => {
  const response = await api.get<Cooperator>(
    // API_URL.get_cooperator(id, small_category_ids, cooperator_name),
    API_URL.get_cooperator(middle_category_id, cooperator_name),
  );
  return response;
};

// 協力会社検索／工事
export const getConstructionData = async (
  // id: number,
  cooperator_id: number,
) => {
  console.log('COOPERATOR', cooperator_id);
  const response = await api.get<Construction>(
    // API_URL.get_construction(id, cooperator_id),
    API_URL.get_construction(cooperator_id),
  );
  return response;
};

// 発注一覧
export const getOrder = async (
  construction_code: string,
  construction_name: string,
  middle_category_name: string,
  cooperator_name: string,
) => {
  const response = await api.get<OrderList>(
    API_URL.get_order(
      construction_code,
      construction_name,
      middle_category_name,
      cooperator_name,
    ),
  );
  return response;
};

export const OrderListApi = async (
  construction_code: string,
  construction_name: string,
  middle_category_name: string,
  order_no: string,
  cooperator_name: string,
  order_year_month_from: string,
  order_year_month_to: string,
  page: number,
  per_page: number,
) => {
  const response = await api.get<orderList>(
    API_URL.order.orderConditionlist(
      construction_code,
      construction_name,
      middle_category_name,
      order_no,
      cooperator_name,
      order_year_month_from,
      order_year_month_to,
      page,
      per_page,
    ),
  );
  return response;
};

export type OrderlistUpdateParam = {
  order_data: OrderData;
  small_category_data: TypeOrderList[];
};

export type TypeOrderList = {
  small_categories: SmallCategoriesList;
  cost_small_categories: CostSmallCategoriesList;
  cost_details: CostdetailsList[];
};
export type SmallCategoriesList = {
  id: number;
  construction_type_name: string;
  cost_small_categories: CostSmallCategoriesList[];
};
export type OrderData = {
  id: number;
  sch_con_start_date: Date;
  sch_con_end_date: Date;
  cooperator_name: string;
  order_condition_remarks: string;
};
export type CostSmallCategoriesList = {
  id: number;
  construction_small_category_id: number;
  entry_small_category_name: string;
  remarks: string;
};
export type CostdetailsList = {
  assessment_status: number;
  id: number;
  detail: string;
  quantity: number;
  unit: string;
  unit_price: number;
  specification: string;
  subtotal: number;
  remarks: string;
};

export const getCostDetailsList = async (
  constructionId: number,
  cost_category_id: number,
) => {
  const response = await api.get<TypeOrderList[]>(
    API_URL.costManage.list(constructionId, cost_category_id),
  );
  return response;
};

export type orderIds = {
  cost_detail_id: number;
  subtotal: number;
};

export type smallCategoryIds = {
  cost_small_category_id: number;
};

export type OrderParams = {
  order_amount: number;
  middle_category_id: number;
  sch_con_start_date: string;
  sch_con_end_date: string;
  cooperator_id: number;
  cooperator_name: string;
  order_condition_remarks: string;
  order_details: orderIds[];
  smallcategoriesId: smallCategoryIds[];
  order_application_id: number;
};

export type Order = {
  sch_con_start_date: string;
  sch_con_end_date: string;
  cooperator_id: string | number;
  order_condition_remarks: string;
};

/**
 * 工事概要追加
 * @param {number} construction_id
 * @param {OrderParams} data
 */
export const addOrder = async (
  construction_id: number,
  cost_id: number,
  data: OrderParams,
) => {
  const response = await api.post<OrderParams>(
    API_URL.costManage.addOrder(construction_id, cost_id),
    { ...data },
  );
  return response;
};

export const getAllCostDetailsList = async (
  constructionId: number,
  cost_category_id: number,
  order_no: number,
  assessment_status: number,
) => {
  const response = await api.get<OrderlistUpdateParam>(
    API_URL.costManage.alllist(
      constructionId,
      cost_category_id,
      order_no,
      assessment_status,
    ),
  );
  return response;
};

export const updateOrder = async (
  construction_id: number,
  cost_id: number,
  data: OrderParams,
) => {
  const response = await api.put<OrderParams>(
    API_URL.costManage.updateOrder(construction_id, cost_id),
    { ...data },
  );
  return response;
};
