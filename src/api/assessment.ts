import { assessmentList } from '@/pages/cop/assessments';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export const AssessmentListApi = async (
  construction_code: string,
  construction_name: string,
  start_year_month: string,
  completion_year_month: string,
  page: number,
  per_page: number,
) => {
  const response = await api.get<assessmentList>(
    API_URL.assessment.assessmentConditionList(
      construction_code,
      construction_name,
      start_year_month,
      completion_year_month,
      page,
      per_page,
    ),
  );
  return response;
};
