/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type AssessmentInformationData = {
  order_information: OrderInformation;
  construction: ConstrucitonData;
  middle_category: MiddleCategoryData;
  cost_category: CostCategoryData;
  assessment_informations: AssessmentData[];
  cost_small_categories: CostSmallCategories[];
  assessment_application: AssessmentApplicationData[];
  add_volume_application: AddVolumeApplicationData[];
  application_status: number;
};

export type OrderInformation = {
  id: number;
  order_amount: number;
  order_date: number;
  sch_con_start_date: number;
  sch_con_end_date: number;
  order_no: string;
};

export type ConstrucitonData = {
  id: number;
  construction_name: string;
};

export type MiddleCategoryData = {
  id: number;
  construction_type_code: string;
  construction_type_name: string;
};

export type CostCategoryData = {
  id: number;
};

export type AssessmentData = {
  id: number;
  assessment_entry_date: string;
  assessment_quantity: number;
  // order_information_id: number;
  cooperator_comment: string;
  order_no: string;
};

export type CostSmallCategories = {
  id: number;
  cost_category_id: string;
  construction_small_category_id: string;
  entry_small_category_name: number;
  small_categories: SmallCategories;
  cost_details: CostDetails[];
};

export type SmallCategories = {
  id: number;
  construction_type_name: string;
};

export type CostDetails = {
  id: number;
  detail: string;
  specification: string;
  quantity: number;
  unit: string;
  unit_price: number;
  subtotal: number;
  assessment_quantity: number;
  assessed_amount: number;
  remaining_number: number;
  // order_information_id: number;
  order_no: string;
  close_flag: number;
};

export type SmallCategoryDetailData = {
  id: number;
  title: string;
  name: string;
  specification: string;
  quantity: any;
  unit: string;
  unit_price: any;
  order_amount: any;
  assessed_quantity: any;
  assessed_amount: any;
  remaining_number: any;
  close_flag: number;
  assess_quantity: any;
  assess_amount: any;
  // total_assessed_amount: any;
  detail_id: any;
  make_close: number;
  application_flag: number;
  cost_subtotal_index_no: any;
};

export type AddVolumnData = {
  id: number; ///
  title: string;
  name: any; ///
  specification: string; ///
  quantity: any; ////
  unit: any; ///
  unit_price: any; ///
  amount: any; ///
  remark: any; ///
  label: string;
  small_id: any;
  input_flag: number;
  app_flag?: number;
};

export type AssessmentApplicationData = {
  id: number;
  cost_detail_id: number;
  assessment_quantity: number;
  status: number;
  minus_order_comment: string;
  add_volumn_comment: string;
  cooperator_comment: string;
  sanwa_comment: string;
};

export type AddVolumeApplicationData = {
  id: number;
  construction_small_category_id: number;
  entry_small_category_name: string;
  order_no: string;
  add_volume_detail: AddVolumeDetail[];
};

export type AddVolumeDetail = {
  id: number;
  detail_name: string;
  specification: string;
  quantity: any;
  unit: any;
  unit_price: any;
  amount: any;
  remark: string;
};

// Request Body Type
export type AddAssessmentInfoDataType = {
  construction_id: number;
  cost_category_id: number;
  minus_order_comment: string;
  add_volumn_comment: string;
  cooperator_comment: string;
  assesment_detail: AssessmentDetail[];
  volume: Volume;
};

export type AssessmentDetail = {
  cost_small_category_id: number;
  cost_detail_id: number;
  assessment_quantity: number;
  close_flag: number;
  close_comment: string;
  input_flag?: number;
};

export type Volume = {
  small_category: SmallCategory[];
};

export type SmallCategory = {
  construction_small_category_id: number;
  entry_small_category_name: string;
  detail: Detail[];
};

export type Detail = {
  detail_name: string;
  specification: string;
  quantity: number;
  unit: number;
  unit_price: number;
  amount: number;
  remarks: number;
  label?: string;
};

/**
 * 査定情報取得
 * @param {number} orderInformationId
 */
export const getAssessmentInformationData = async (
  orderInformationId: number,
) => {
  const response = await api.get<AssessmentInformationData>(
    API_URL.assessment.getAssessmentInformation(orderInformationId),
  );
  return response;
};

/**
 *査定情報取登録
 * @param {number} orderInformationId
 * @param {AddAssessmentInfoDataType} data
 */
export const addAssessmentInformationData = async (
  orderInformationId: number,
  data: AddAssessmentInfoDataType,
) => {
  const response = await api.post<AddAssessmentInfoDataType>(
    API_URL.assessment.addAssessmentInformation(orderInformationId),
    { ...data },
  );
  return response;
};
