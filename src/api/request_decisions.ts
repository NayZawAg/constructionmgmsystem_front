import { Meta } from '@/interfaces/meta';
import { RequestDecisionList } from '@/interfaces/requestDecisionList';
import type {
  TypeAddRequestDecisionApplicationRequest,
  TypeUpdateRequestDecisionApplicationRequest,
  TypeRequestDecisionDetail,
  TypeUpdateApprovalList,
  TypeUpdateRetrunApproval,
} from '@/types/api/request_decision';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type requestDecisionData = {
  results: RequestDecisionList[];
  min_date: Date;
  meta: Meta;
};

/**
 * 稟議取得
 * @param {number} id
 */
export const getRequestDecision = async (id: number) => {
  const response = await api.get<TypeRequestDecisionDetail>(
    API_URL.request_decision.detail(id),
  );
  return response;
};

/**
 * 稟議追加
 * @param {TypeAddRequestDecisionApplicationRequest} data
 */
export const addRequestDecisionApplication = async (
  data: TypeAddRequestDecisionApplicationRequest,
) => {
  const response = await api.filePost<TypeAddRequestDecisionApplicationRequest>(
    API_URL.request_decision.addRequestDecisonApplication,
    data,
  );
  return response;
};

/**
 * 稟議更新
 * @param {number} id
 * @param {TypeUpdateRequestDecisionApplicationRequest} data
 */
export const updateRequestDecisionApplication = async (
  id: number,
  data: TypeUpdateRequestDecisionApplicationRequest,
) => {
  const response = await api.filePut(API_URL.request_decision.update(id), {
    ...data,
  });
  return response;
};

/**
 * 稟議取戻
 * @param {number} id
 */
export const updateCancelRequestDecision = async (id: number) => {
  const response = await api.put(API_URL.request_decision.cancelRequest(id), {
    id,
  });
  return response;
};

/**
 * 稟議削除
 * @param {number} id
 */
export const deleteRequestDecision = async (id: number) => {
  const response = await api.delete(API_URL.request_decision.delete(id), {
    id,
  });
  return response;
};

/**
 * 承認
 * @param {TypeUpdateRetrunApproval} data
 */
export const updateApprovalList = async (data: TypeUpdateApprovalList[]) => {
  const response = await api.put(API_URL.request_decision.approval, data);
  return response;
};

/**
 * 差戻
 * @param {TypeUpdateRetrunApproval} data
 */
export const updateRetrunApproval = async (
  data: TypeUpdateRetrunApproval[],
) => {
  const response = await api.put(API_URL.request_decision.approval, data);
  return response;
};

/**
 * 一覧
 * @param {number} search_type
 * @param {number} status
 * @param {number} user_id
 * @param {string} request_decision_name
 * @param {string} completion_year_month_from
 * @param {string} completion_year_month_to
 * @param {number} page
 * @param {number} per_page
 */
export const getRequestDecisionApplicationList = async (
  approval_user_id: number,
  search_type: number,
  status: number,
  user_id: number,
  request_decision_name: string,
  completion_year_month_from: string,
  completion_year_month_to: string,
  page: number,
  per_page: number
) => {
  const response = await api.get<requestDecisionData>(
    API_URL.request_decision.requestDecisionlist(
      approval_user_id,
      search_type,
      status,
      user_id,
      request_decision_name,
      completion_year_month_from,
      completion_year_month_to,
      page,
      per_page)
  );
  return response;
};
