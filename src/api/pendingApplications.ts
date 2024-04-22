import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

/**未処理申請 */
export type TypePendingApplicationList = {
  results: PendingApplicationResult[];
  meta: Meta;
}

export type PendingApplicationResult = {
  id: number,
  assessment_date: string;
  cooperator_name: string;
  construction_code: string;
  construction_name: string;
  middle_category_name: string;
  order_no: string;
  status: number;
}

export type Meta = {
  current_page: number;
  next_page: number;
  prev_page: number;
  total_count: number;
  total_pages: number;
};

export const getPendingApplicationList = async () => {
  const response = await api.get<TypePendingApplicationList>(
    API_URL.pending_application.list
  );
  return response
}

export const getPendingApplicationCondition = async (
  application_start_date: string, application_end_date: string, search_type: number, page: number, per_page: number
) => {
  const response = await api.get<TypePendingApplicationList>(
    API_URL.pending_application.conditionlist(application_start_date, application_end_date, search_type, page, per_page)
  );
  return response;
};

export const approval = async (
  id: number, access_type: string, submit_type: string, reserve_money: boolean, sanwa_comment: string
) => {
  const response = await api.put(API_URL.pending_application.approval(id, access_type, submit_type, reserve_money, sanwa_comment), {
    id, access_type, submit_type, reserve_money, sanwa_comment
  });
  return response;
}