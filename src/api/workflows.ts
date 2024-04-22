import { api } from "@/utils/api/api";
import { API_URL } from "@/utils/constants/api";
export type PositionType = {
  position_code: string,
  position_name: string,
  // director_flag: number,
  chief_flag: number | null,
  bm_flag: number,
  user_id: number | null,
}
export type BrandType = {
  // id: number,
  brand_code: string,
  brand_name: string,
  brand_icon: string,
  display_order: number | null,
  user_id: number
}
export type WorkflowType = {
  name: string,
  workflow_type: number,
  condition_branch_id: number,
  amount: number,
  fir_app_position_id: string,
  sec_app_position_id: string,
  thi_app_position_id: string,
  user_id: number,
}
export type RequestType = {
  request_decision_name: string,
  request_decision_type: number,
  condition_branch_id: number,
  amount: number,
  first_app_position_id: string,
  second_app_position_id: string,
  third_app_position_id: string,
  user_id: number,
}

/**
 * 役職マスタ登録
 * @param {PositionType} data
 */
export const AddPosition = async (data: PositionType[]) => {
  const response = await api.post<PositionType[]>(
    API_URL.workflow.addPositionList,
    data,
  );
  return response;
};

/**
 * ブランドマスタ登録
 * @param {BrandType} data
 */
export const AddBrand = async (data: BrandType[]) => {
  const response = await api.post<BrandType[]>(
    API_URL.workflow.addBrandList,
    data,
  );
  return response;
};

/**
 * ワークフロー申請経路登録
 * @param {WorkflowType} data
 */
export const AddWorkflow = async (data: WorkflowType[]) => {
  const response = await api.post<WorkflowType[]>(
    API_URL.workflow.addWorkflowList,
    data,
  );
  return response;
};

/**
 * 稟議申請経路登録
 * @param {RequestType} data
 */
export const AddRequestDecision = async (data: RequestType[]) => {
  const response = await api.post<RequestType[]>(
    API_URL.workflow.addRequestDecisonList,
    data,
  );
  return response;
};

/**
 * ユーザー取得
 */

export const getAllUserList = async () => {
  const response = await api.get(
    API_URL.workflow.getAllUsers
  );
  return response;
};

/**
 * Positions取得
 */

export const getAllPositionsList = async () => {
  const response = await api.get(
    API_URL.workflow.getAllPositions
  );
  return response;
};


