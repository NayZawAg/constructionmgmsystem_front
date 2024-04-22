/* eslint-disable @typescript-eslint/no-explicit-any */
import { workFlowConditionType } from '@/components/constructions/constructionCompleteDialog';
import { constructionList } from '@/pages/constructions';
import type {
  ConstructionDetail,
  TypeConstructionDetail,
} from '@/types/api/construction';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type PdfDownload = {
  file_name: string;
};

export type AddConstructionRequest = {
  customer_id: number;
  construction_code: string;
  construction_name: string;
  east_west_division: number;
  new_repair_division: number;
  main_brand_id: number;
  sub_brand1_id: number;
  sub_brand2_id: number;
  type: number;
  clientDepartmentName: string;
  clientContactName: string;
  contractEmail: string;
  zipcode: string;
  prefecture: string;
  municipality: string;
  address_1: string;
  address_2: string;
  phone_no: string;
  structures: string[];
  structureRc: string;
  structureS: string;
  structureSrc: string;
  structureWooden: string;
  groundFloor: string;
  basementFloor: string;
  construction_content: string;
  siteArea: string;
  siteAreaInTsubo: string;
  buildingArea: string;
  buildingAreaInTsubo: string;
  totalFloorArea: string;
  totalFloorAreaInTsubo: string;
  product: string;
  schedule_construction_start_date: string;
  schedule_construction_end_date: string;
  updatedDate: string;
  estimated_date: string;
  order_date: string;
  contract_date: string;
  completionDate: string;
  assumedArtificial: number;
  dr0: string;
  dr1: string;
  dr2: string;
  estimated_amount: number;
  estimated_assumption_cost: number;
  order_amount: number;
  order_assumption_cost: number;
  work_place_score: number;
  user_review: string;
  construction_completion_date: string;
  fire_inspection_date: string;
};

export type UpdateConstructionRequest = {
  customer_id: number;
  construction_code: string;
  construction_name: string;
  east_west_division: number;
  new_repair_division: number;
  main_brand_id: number;
  sub_brand1_id: number;
  sub_brand2_id: number;
  type: number;
  clientDepartmentName: string;
  clientContactName: string;
  contractEmail: string;
  zipcode: string;
  prefecture: string;
  municipality: string;
  address_1: string;
  address_2: string;
  phone_no: string;
  structures: string[];
  structureRc: string;
  structureS: string;
  structureSrc: string;
  structureWooden: string;
  groundFloor: string;
  basementFloor: string;
  construction_content: string;
  siteArea: string;
  siteAreaInTsubo: string;
  buildingArea: string;
  buildingAreaInTsubo: string;
  totalFloorArea: string;
  totalFloorAreaInTsubo: string;
  product: string;
  schedule_construction_start_date: string;
  schedule_construction_end_date: string;
  updatedDate: string;
  estimated_date: string;
  order_date: string;
  contract_date: string;
  completionDate: string;
  assumedArtificial: number;
  dr0: string;
  dr1: string;
  dr2: string;
  estimated_amount: number;
  estimated_assumption_cost: number;
  order_amount: number;
  order_assumption_cost: number;
  work_place_score: number;
  user_review: string;
  construction_completion_date: string;
  fire_inspection_date: string;
};

export type AddWorkflowConditionRequest = {
  workflow_type: number;
  employee_id: number;
  application_date: Date;
  status: number;
};

export type AddWorkflowConditionResponse = {
  id: number;
  workflow_type: number;
  employee_id: number;
  application_date: string;
  status: number;
};

export type AddConstructionApplicationRequest = {
  approval_flow_id: number;
  construction_id: number;
  customer_id: number;
  code: string;
  name: string;
  overview: string;
  product: string;
  east_west_division: number;
  main_brand_id: number;
  sub_brand1_id: number;
  sub_brand2_id: number;
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
  customer_department_name: string;
  contractor_name: string;
  contract_email_address: string;
  order_amount: number;
  estimated_amount: number;
  consumption_tax: number;
  estimated_assumption_cost: number;
  order_assumption_cost: number;
  working_budget: number;
  assumption_artificial: number;
  cost_real_time: number;
  assessment_amount: number;
  remaining_budget: number;
  gross_profit_amount_1: number;
  gross_profit_rate_1: number;
  gross_profit_amount_2: number;
  gross_profit_rate_2: number;
  status: number;
  estimated_date: string;
  order_date: string;
  contract_date: string;
  sch_con_start_date: string;
  sch_con_end_date: string;
  con_started_date: string;
  con_completion_date: string;
  confirmation_application: string;
  fire_inspection_date: string;
  dr0: string;
  dr1: string;
  dr2: string;
  work_place_score: number;
  user_review: string;
  old_construction_code: string;
  // overview: string;
  // product: string;
  // east_west_division: number;
  // new_repair_division: number;
  // main_brand_id: number;
  // sub_brand1_id: number;
  // sub_brand2_id: number;
  // // type: number;
  // customer_department_name: string;
  // contractor_name: string;
  // contract_email_address: string;
  // zipcode: string;
  // prefecture: string;
  // municipality: string;
  // address1: string;
  // address2: string;
  // phone_no: string;
  // structure_s: string;
  // structure_rc: string;
  // structureS: string;
  // structure_src: string;
  // structure_wooden: string;
  // ground_floor: string;
  // underground_floor: string;
  // detail: string;
  // site_area: string;
  // // siteAreaInTsubo: string;
  // building_area: string;
  // // buildingAreaInTsubo: string;
  // total_floor_area: string;
  // totalFloorAreaInTsubo: string;
  // order_amount: number;
  // estimated_amount: number;
  // consumption_tax: number;
  // estimated_assumption_cost: number;
  // order_assumption_cost: number;
  // working_budget: number;
  // assumption_artificial: number;
  // cost_real_time: number;
  // assessment_amount: number;
  // remaining_budget: number;
  // gross_profit_amount_1: number;
  // gross_profit_rate_1: number;
  // gross_profit_amount_2: number;
  // gross_profit_rate_2: number;
  // status: string;
  // estimated_date: Date;
  // order_date: Date;
  // // commodity: string;
  // contract_date: Date;
  // sch_con_start_date: string;
  // sch_con_end_date: string;
  // // updatedDate: string;
  // // estimatedDate: string;
  // // orderDate: string;
  // // contractDate: string;
  // con_started_date: Date;
  // // completionDate: string;
  // // assumedArtificial: string;
  // confirmation_application: string;
  // fire_inspection_date: Date;
  // dr0: string;
  // dr1: string;
  // dr2: string;
  // work_place_score: string;
  // con_completion_date: string;
  // old_construction_code: string;
  // new_construction_division: string;
};

/**
 * 工事取得
 * @param {number} id
 */
export const getConstruction = async (id: number) => {
  const response = await api.get<TypeConstructionDetail>(
    API_URL.construction.detail(id),
  );
  return response;
};

/**
 * 工事取得
 * @param {string} construction_code
 */
export const getdetailsConstruction = async (
  construction_code: string,
  workflow_no?: string,
) => {
  const response = await api.get<TypeConstructionDetail>(
    API_URL.construction.getdetail(construction_code, workflow_no),
  );
  return response;
};

/**
 * 工事取得
 * @param {number} id
 */
export const getConstructionWithStatus = async (id: number, status: number) => {
  const response = await api.get<TypeConstructionDetail>(
    API_URL.construction.detailwithstatus(id, status),
  );
  return response;
};

/**
 * 工事追加
 * @param {AddConstructionRequest} data
 */
export const addConstruction = async (data: AddConstructionRequest) => {
  const response = await api.post<ConstructionDetail>(
    API_URL.construction.addConstructionList,
    { ...data },
  );
  return response;
};

/**
 * 工事削除
 * @param {number} id
 */
export const deleteConstruction = async (id: number) => {
  const response = await api.delete(API_URL.construction.detail(id));
  return response;
};

/**
 * 工事更新
 * @param {number} id
 * @param {UpdateConstructionRequest} data
 */
export const updateConstruction = async (
  id: number,
  data: UpdateConstructionRequest,
) => {
  const response = await api.put(API_URL.construction.update(id), {
    ...data,
  });
  return response;
};

/**
 * ワークフロー承認状況追加
 * @param {number} id
 * @param {workFlowConditionType} data
 */
export const addWorkflowCondition = async (
  id: number,
  data: workFlowConditionType,
) => {
  const response = await api.post<workFlowConditionType>(
    API_URL.apply_applications(id),
    { ...data },
  );
  return response;
};

/** @param {AddConstructionApplicationRequest} data */
export const addConstructionApplication = async (
  data: AddConstructionApplicationRequest,
) => {
  const response = await api.post<AddConstructionApplicationRequest>(
    API_URL.construction_applications,
    { ...data },
  );
  return response;
};

export const ConstructionListapi = async (
  construction_code: string,
  construction_name: string,
  customer_id: number,
  brand_ids: number[],
  east_west_division: number[],
  construction_types: number[],
  completion_year_month_from: string,
  completion_year_month_to: string,
  page: number,
  per_page: number,
) => {
  const response = await api.get<constructionList>(
    API_URL.construction.conditionslist(
      construction_code,
      construction_name,
      customer_id,
      brand_ids,
      east_west_division,
      construction_types,
      completion_year_month_from,
      completion_year_month_to,
      page,
      per_page,
    ),
  );
  return response;
};

export const AllConstructionListapi = async (
  construction_code: string,
  construction_name: string,
  customer_id: number,
  brand_ids: number[],
  east_west_division: number[],
  construction_types: number[],
  completion_year_month_from: string,
  completion_year_month_to: string,
  per_page: number,
) => {
  const response = await api.get<constructionList>(
    API_URL.construction.csvdownloadlist(
      construction_code,
      construction_name,
      customer_id,
      brand_ids,
      east_west_division,
      construction_types,
      completion_year_month_from,
      completion_year_month_to,
      per_page,
    ),
  );
  return response;
};

export const createEstimatePDF = async (
  id: number,
  data: any,
  construction: any,
  issueType: string,
  addIncDec: any,
) => {
  // convert construction data
  const customer = {
    company_name: construction.customer.company_name,
    payment_conditions: construction.customer.payment_conditions,
  };
  const con_data = {
    id: construction.id,
    east_west_division: construction.east_west_division,
    customer_department_name: construction.customer_department_name,
    construction_name: construction.construction_name,
    zipcode: construction.zipcode,
    prefecture: construction.prefecture,
    municipality: construction.municipality,
    address_1: construction.address_1,
    address_2: construction.address_2,
    schedule_construction_start_date:
      construction.schedule_construction_start_date,
    schedule_construction_end_date: construction.schedule_construction_end_date,
    estimated_amount: construction.estimated_amount,
    estimated_date: construction.estimated_date,
    customer: customer,
  };
  const request = {
    form_data: data,
    construction_data: con_data,
    issue_type: issueType,
    add_inc_dec: addIncDec,
  };
  const response = await api.post<PdfDownload>(
    API_URL.construction.createEstimatePdf(id),
    { ...request },
  );
  return response;
};
export const downloadEstimatePDF = async (id: number, file_name: string) => {
  const response = await api.getPdf(
    API_URL.construction.downloadEstimatePdf(id, file_name),
  );
  return response;
};

export const deleteEstimateTmpFile = async (id: number, file_name: string) => {
  const response = await api.get(
    API_URL.construction.deleteEstimateTmpFile(id, file_name),
  );
  return response;
};
