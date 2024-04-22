import qs from 'query-string';
import useSWR, { SWRResponse } from 'swr';
import { AssessmentList } from '@/interfaces/assessment';
import { Meta } from '@/interfaces/meta';
import { CommonErrorResponse } from '@/types/api/common';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type AssessmentListQuery = {
  construction_code?: string;
  construction_name?: string;
  start_year_month?: string;
  completion_year_month?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
};

export type AssessmentData = {
  results: AssessmentList[];
  meta: Meta;
};

export const useAssessmentList = (
  query?: AssessmentListQuery,
  onSuccessCallback?: (data: AssessmentData) => void,
): SWRResponse<AssessmentData, CommonErrorResponse> => {
  const result = useSWR<AssessmentData>(
    qs.stringifyUrl(
      {
        url: API_URL.assessment.list,
        query: {
          construction_code: query?.construction_code || undefined,
          construction_name: query?.construction_name || undefined,
          start_year_month: query?.start_year_month || undefined,
          completion_year_month: query?.completion_year_month || undefined,
          page: query?.page || undefined,
          per_page: query?.per_page || undefined,
          sort_by: query?.sort_by || undefined,
        },
      },
      {
        skipEmptyString: true,
      },
    ),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
