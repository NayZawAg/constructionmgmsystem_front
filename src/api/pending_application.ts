/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type PendingApplicationList = {
  order_information: OrderInformationList;
  construction: Construction;
  middle_category: MiddleCategory;
  assessment_informations: AssessmentInformations[];
  ass_application: AssApplication;
  cost_small_categories: CostSmallCategories[];
  assessment_application: AssessmentApplication[];
  // reserve_money: ReserveMoney;
  add_volume_application: AddVolumeApplication[];
}
export type OrderInformationList = {
  sch_con_start_date: Date,
  sch_con_end_date: Date,
  order_amount: number,
  cooperator_comment: string,
  order_no: string
}
export type Construction = {
  id: number,
  construction_name: string
}
export type MiddleCategory = {
  id: number,
  middle_category_name: string
}
export type AssessmentInformations = {
  id: number,
  assessment_entry_date: Date,
  assessment_quantity: number,
  cooperator_comment: string,
  order_no: string
  sanwa_comment: string
}
export type CostSmallCategories = {
  id: number,
  cost_category_id: number,
  construction_small_category_id: number,
  entry_small_category_name: string,
  order_no: string,
  small_categories: SmallCategories,
  cost_details: CostDetails[],
}
export type SmallCategories = {
  id: number,
  construction_type_name: string
}
export type CostDetails = {
  id: number,
  detail: string,
  specification: string,
  quantity: number,
  unit: string,
  unit_price: number,
  subtotal: number,
  assessment_quantity: number,
  assessed_amount: number,
  remaining_number: number,
  assessment_unit_price: number,
  order_no: string,
  close_flag: number
}
export type AssessmentApplication = {
  id: number,
  cost_detail_id: number,
  assessment_quantity: number,
  status: number,
  close_flag: number
  // reserve_money: boolean
}
export type AssApplication = {
  reserve_money: boolean,
  minus_order_comment: string,
  add_volume_comment: string,
  cooperator_comment: string,
  sanwa_comment: string
}
// export type ReserveMoney = {
//   reserve_money: true,
// }
export type AddVolumeApplication = {
  id: number,
  construction_id: number,
  cost_category_id: number,
  construction_small_category_id: number,
  entry_small_category_name: string,
  workflow_no: string,
  small_categories: SmallCategories,
  add_volume_detail_applications: AddVolumeDetailApplications[],
}

export type AddVolumeData = {
  id: number;
  cost_category_id: number,
  construction_type_name: string,
  entry_small_category_name: string,
  detail_name: string,
  specification: string,
  quantity: number,
  unit: string,
  unit_price: number,
  amount: number,
  remarks: string,
  title: boolean,
  total_amount: number
};

export type AddVolumeDetailApplications = {
  id: number,
  detail_name: string,
  specification: string,
  quantity: number,
  unit: string,
  unit_price: number,
  amount: number,
  remarks: string
}

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
  total_assessed_amount: any;
  detail_id: any;
  make_close: number;
  application_flag: number;
};
/**
 * @param {number} orderInformationId
 */
export const getPendingApplicationList = async (orderInformationId: number) => {
  const response = await api.get<PendingApplicationList>(
    API_URL.pending_application.detail(orderInformationId)
  );
  return response;
}; 
