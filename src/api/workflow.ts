/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta } from '@/interfaces/meta';
import { TypeBrand } from '@/types/api/brand';
// import { TypeConstructionDetail } from '@/types/api/construction';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type TypeWorkflowApplicationData = {
  workflow_application: WorkflowData[];
  meta: Meta;
};

export type TypeWorkflowApprovalData = {
  workflow_approval: WorkflowData[];
  meta: Meta;
};

export type TypeWorkflowManageData = {
  workflow_manage: WorkflowData[];
  meta: Meta;
};

export type WorkflowData = {
  id: number;
  workflow_type: number;
  workflow_no: string;
  condition_branch_id: number;
  application_date: string;
  status: number;
  return_reason: string;
  updated_at: string;
  first_approval_user: number;
  first_approval_situation: number;
  second_approval_user: number;
  second_approval_situation: number;
  third_approval_user: number;
  third_approval_situation: number;
  user_id: number;
  workflow_type_name: string;
  user_name: string;
  first_app_user_name: string;
  second_app_user_name: string;
  third_app_user_name: string;
  construction_code: string;
  construction_name: string;
  order_estimate_amount: number;
  cost: number;
  included_all_approval?: number;
  construction_id: number;
  application_no: string;
  current_app_user_id: string;
  current_app_user_name: string;
};

export type WorkFlowListQuery = {
  workflow_name?: string;
  construction_code?: string;
  construction_name?: string;
  approval_user?: number;
  start_year_month?: string;
  completion_year_month?: string;
  included_all_approval?: boolean;
  page?: number;
  per_page?: number;
};

export type TypeApprovalRequest = {
  workflow_type?: number;
  workflow_no?: string;
  confirm_type?: string;
  return_reason?: string;
  isManage?: boolean;
};

// 得意先
export type TypeCustomer = {
  id: number;
  customer_code: string;
  collection_code: string;
  corporation_no: string;
  company_name: string;
  company_name_kana: string;
  zipcode: string;
  prefecture: string;
  municipality: string;
  address_1: string;
  address_2: string;
  phone_no: string;
  email: string;
  fax: string;
  url: string;
  representative_name: string;
};

// 追加増減
export type TypeAddIncDec = {
  id: number;
  construction_id: number;
  subject: string;
  estimate_amount: number;
  assumed_cost: number;
  remarks: string;
  updated_at: string;
  add_inc_dec_status: number;
};

// 見積確定
export type TypeEstimate = {
  customer_data: CustomerData;
  estimate_detail: EstimateDetail[];
};

export type CustomerData = {
  customer_company_name: string;
  customer_department_name: string;
  customer_id: number;
};

export type EstimateDetail = {
  large_category_id: number;
  large_category_name: string;
  middle_category_id: number;
  middle_category_name: string;
  total_amount: number;
};

// 実行予算確定
export type TypeCost = {
  customer_data: CustomerData;
  cost_categories: CostCategory[];
};

export type CostCategory = {
  id: number;
  construction_id: number;
  construction_large_category_id: number;
  construction_middle_category_id: number;
  working_budget: number;
  workflow_no: string;
  updated_at: string;
  status: number;
  delete_flag: boolean;
  old_working_budget: number;
  large_category_name: string;
  middle_category_name: string;
};

// 工事申請
export type TypeConstruction = {
  id: number;
  construction_code: string;
  construction_name: string;
  construction_content: string;
  product: string;
  east_west_division: number;
  main_brand_id: string;
  sub_brand1_id: string;
  sub_brand2_id: string;
  site_area: number;
  building_area: number;
  total_floor_area: number;
  structure_rc: boolean;
  structure_s: boolean;
  structure_src: boolean;
  structure_wooden: boolean;
  ground_floor: number;
  underground_floor: number;
  zipcode: string;
  prefecture: string;
  municipality: string;
  address_1: string;
  address_2: string;
  phone_no: string;
  customer_id: string;
  customer_department_name: string;
  contractor_name: string;
  contract_email_address: string;
  order_amount: number;
  estimated_amount: number;
  consumption_tax: number;
  estimated_assumption_cost: number;
  order_assumption_cost: number;
  final_expected_cost: number;
  working_budget: number;
  assumption_artificial: number;
  cost_real_time: number;
  assessment_amount: number;
  remaining_budget: number;
  gross_profit_amount_1: number;
  gross_profit_rate_1: number;
  gross_profit_amount_2: number;
  gross_profit_rate_2: number;
  gross_profit_amount_3: number;
  gross_profit_rate_3: number;
  gross_profit_amount_4: number;
  gross_profit_rate_4: number;
  gross_profit_amount_5: number;
  gross_profit_rate_5: number;
  status: string;
  estimated_date: string;
  order_date: string;
  contract_date: string;
  schedule_construction_start_date: Date;
  schedule_construction_end_date: Date;
  construction_started_date: string;
  confirmation_application: string;
  fire_inspection_date: string;
  dr0: string;
  dr1: string;
  dr2: string;
  work_place_score: number;
  user_review: string;
  construction_completion_date: string;
  old_construction_code: string;
  new_repair_division: number;
  sales_amount: number;
  additional_increase_decrease: number;
  existing_order_amount: number;
  unordered_budget: number;
  expenses: number;
  total_expenses: number;
  assessment_turnover: number;
  assumption_gross_profit: number;
  company_name: string;
  updated_at: string;
  customer: TypeCustomer;
  main_brand: TypeBrand;
  sub_brand1: TypeBrand;
  sub_brand2: TypeBrand;
  application_status: number;
  add_inc_dec_sum?: TypeAddIncDecSum;
};

export type TypeAddIncDecSum = {
  estimate_amount: number;
};

// 発注
export type TypeOrder = {
  order_application: OrderApplication;
  order_cost_detail: OrderCostDetail[];
};

export type OrderApplication = {
  order_no: string;
  cooperator_name: string;
  order_amount: number;
  middle_category_name: string;
  middle_category_id: 9;
  sch_con_start_date: string;
  sch_con_end_date: string;
  order_condition_remarks: string;
  working_budget: number;
};

export type OrderCostDetail = {
  detail_name: string;
  specification: string;
  quantity: number;
  unit: string;
  unit_price: number;
  subtotoal: number;
  small_category_name: string;
  small_category_id: number;
  cost_small_category_id: number;
};

export type GetConstruction = {
  id: number;
  construction_code: string;
  construction_name: string;
};

// get approval user
export type TypeApproval = {
  approval_user: TypeUserApproval;
  //
};

export type TypeUserApproval = {
  first_approval: UserApproval[];
  second_approval: UserApproval[];
  third_approval: UserApproval[];
};

export type UserApproval = {
  name: string;
  id: number;
};

/**
 * ワークフロー申請一覧取得
 */
export const getWorkflowApplicationData = async (
  workflow_name: string,
  construction_code: string,
  construction_name: string,
  approval_user: number,
  start_year_month: string,
  completion_year_month: string,
  page: number,
  per_page: number,
) => {
  const response = await api.get<TypeWorkflowApplicationData>(
    API_URL.workflow.getApplicationList(
      workflow_name,
      construction_code,
      construction_name,
      approval_user,
      start_year_month,
      completion_year_month,
      page,
      per_page,
    ),
  );
  return response;
};

/**
 * ワークフロー承認一覧取得
 */
export const getWorkflowApprovalData = async (
  workflow_name: string,
  construction_code: string,
  construction_name: string,
  application_user: number,
  included_all_approval: boolean,
  start_year_month: string,
  completion_year_month: string,
  page: number,
  per_page: number,
) => {
  const response = await api.get<TypeWorkflowApprovalData>(
    API_URL.workflow.getApprovalList(
      workflow_name,
      construction_code,
      construction_name,
      application_user,
      included_all_approval,
      start_year_month,
      completion_year_month,
      page,
      per_page,
    ),
  );
  return response;
};

/**
 * ワークフロー管理一覧取得
 */
export const getWorkflowManageData = async (
  workflow_name: string,
  construction_code: string,
  construction_name: string,
  application_user: number,
  approval_user: number,
  start_year_month: string,
  completion_year_month: string,
  page: number,
  per_page: number,
) => {
  const response = await api.get<TypeWorkflowManageData>(
    API_URL.workflow.getManageList(
      workflow_name,
      construction_code,
      construction_name,
      application_user,
      approval_user,
      start_year_month,
      completion_year_month,
      page,
      per_page,
    ),
  );
  return response;
};

/**
 * ワークフロー承認
 * @param {TypeApprovalRequest} data
 *
 */
export const setApprovalWorkflowData = async (data: TypeApprovalRequest) => {
  const response = await api.put(API_URL.workflow.setApprovalWorkflow(), {
    ...data,
  });
  return response;
};

/**
 * ワークフロー承認
 * @param {TypeApprovalRequest} data
 *
 */
export const setCancelApplication = async (data: TypeApprovalRequest) => {
  const response = await api.put(API_URL.workflow.setCancelApplication(), {
    ...data,
  });
  return response;
};

/**
 * ワークフロー申請内容取得
 */
export const getCustomerApplicationContent = async (workflow_no: string) => {
  const response = await api.get<TypeCustomer>(
    API_URL.workflow.getCustomerApplicationContent(workflow_no),
  );
  return response;
};

export const getConstructionApplicationContent = async (
  workflow_no: string,
) => {
  const response = await api.get<TypeConstruction>(
    API_URL.workflow.getConstructionApplicationContent(workflow_no),
  );
  return response;
};

export const getAddIncApplicationContent = async (workflow_no: string) => {
  const response = await api.get<TypeAddIncDec>(
    API_URL.workflow.getAddIncDecApplicationContent(workflow_no),
  );
  return response;
};

export const getEstimateApplicationContent = async (constructionId: number) => {
  const response = await api.get<TypeEstimate>(
    API_URL.workflow.getEstimateApplicationContent(constructionId),
  );
  return response;
};

export const getCostApplicationContent = async (workflow_no: string) => {
  const response = await api.get<TypeCost>(
    API_URL.workflow.getCostApplicationContent(workflow_no),
  );
  return response;
};

export const getOrderApplicationContent = async (workflow_no: string) => {
  const response = await api.get<TypeOrder>(
    API_URL.workflow.getOrderApplicationContent(workflow_no),
  );
  return response;
};

// export const getApprovalUser = async (workflow_no: string) => {
//   const response = await api.get<TypeApproval>(
//     API_URL.workflow.getApprovalUser(workflow_no),
//   );
//   return response;
// };

export const getApplicationDate = async () => {
  const response = await api.get<string[]>(
    API_URL.workflow.wf_application_date,
  );
  return response;
};

export type TypeWorkflowApprovalUser = {
  approval_user_id: number;
  approval_user_name: string;
};
export const getWFApprovalUserList = async () => {
  const response = await api.get<TypeWorkflowApprovalUser[]>(
    API_URL.workflow.wf_approval_user_list,
  );
  return response;
};

export type TypeWFApplicationUser = {
  application_user_id: number;
  application_user_name: string;
};
export const getWFApplicationUserList = async () => {
  const response = await api.get<TypeWFApplicationUser[]>(
    API_URL.workflow.wf_application_user_list,
  );
  return response;
};
