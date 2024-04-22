import { TypeBrand } from './brand';
import { TypeOrganazation } from './organization';

/** 稟議申請フロー **/
export type TypeRequestDecisionFlow = {
  id: number;
  request_decision_name: string;
  request_decision_type: number;
  condition_branch_id: number;
  amount: number;
  employee_id: number;
  first_app_position_id: string;
  second_app_position_id: string;
  third_app_position_id: string;
};

/** 稟議申請 **/
export type TypeRequestDecisionApplication = {
  id: number;
  construction_id: number;
  brand_id: number;
  employee_id: number;
  request_decision_flow_id: number;
  request_no: string;
  request_decision_no: string;
  request_decision_type: number;
  subject: string;
  reason: string;
  amount: number;
  application_date: Date;
  cost_charge_department: number;
  first_app_user: number;
  second_app_user: number;
  third_app_user: number;
  status: number;
};

/** 稟議承認状況 **/
export type TypeRequestDecisionCondition = {
  id: number;
  employee_id: number;
  request_decision_type: number;
  request_no: string;
  request_decision_no: string;
  condition_branch_id: number;
  application_date: Date;
  first_app_user: number;
  first_app_situation: string;
  second_app_user: number;
  second_app_situation: string;
  third_app_user: number;
  third_app_situation: string;
  status: number;
  return_reason: string;
}[];

/** 稟議承認者 **/
export type Application_user = {
  id: number;
  name: string;
}[];

/** 工事名 **/
export type Construction_Name = {
  id: number;
  construction_code: string;
  construction_name: string;
};

export type Application_Employee = {
  name: string;
};

/** 稟議詳細 **/
export type TypeRequestDecisionDetail = {
  request_decision_application: TypeRequestDecisionApplication;
  request_decision_flow: TypeRequestDecisionFlow;
  first_app: Application_user;
  first_situation: number;
  first_app_user_application: Application_Employee;
  second_app: Application_user;
  second_situation: number;
  second_app_user_application: Application_Employee;
  third_app: Application_user;
  third_situation: number;
  third_app_user_application: Application_Employee;
  reject_reason: string;
  brand: TypeBrand;
  construction: Construction_Name;
  organization: TypeOrganazation;
  images: [];
};

/** 稟議追加 **/
export type TypeAddRequestDecisionApplicationRequest = {
  construction_id: number;
  brand_id: number;
  request_decision_flow_id: number;
  request_decision_name: string;
  request_decision_type: number;
  subject: string;
  reason: string;
  amount: number;
  cost_charge_department: number;
};

/** 稟議更新 **/
export type TypeUpdateRequestDecisionApplicationRequest = {
  construction_id: number;
  brand_id: number;
  request_decision_flow_id: number;
  subject: string;
  reason: string;
  amount: number;
  cost_charge_department: number;
};

/** 稟議差戻 **/
export type TypeReturnApproval = {
  return_reason: string;
  approval_type: string;
};

/** 稟議承認 **/
export type TypeApproval = {
  approval_type: string;
};

/** 稟議差戻 **/
export type TypeUpdateRetrunApproval = {
  id: number;
  return_reason: string;
  approval_type: string;
};

/** 稟議承認 **/
export type TypeUpdateApprovalList = {
  id: number;
  approval_type: string;
};
