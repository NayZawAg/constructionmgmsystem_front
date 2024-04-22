import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { PersonalManageType } from '@/components/constructions/personalManageList';
import {
  Construction,
  ConstructionDatail,
  ConstructionSummaryDetail,
} from '@/interfaces/construction';
import { ConstructionList } from '@/interfaces/constructionList';
import { Meta } from '@/interfaces/meta';
import type { CommonErrorResponse } from '@/types/api/common';
import { TypeConstructionList } from '@/types/api/construction';
import { api } from '@/utils/api/api';
import { fetcher } from '@/utils/api/fetcher';
import { API_URL } from '@/utils/constants/api';

export type ConstructionQuery = {
  name?: string;
};

// /** 工事一覧取得 hook **/
// export const useConstructionList = (
//   query?: ConstructionQuery,
// ): SWRResponse<ConstructionLists, CommonErrorResponse> => {
//   const result = useSWR<ConstructionLists>(
//     qs.stringifyUrl({
//       url: API_URL.construction.list,
//       query: {
//         name: query?.name || undefined,
//       },
//     }),
//   );
//   return result;
// };

export type ConstructionData = {
  results: ConstructionList[];
  meta: Meta;
};

export type ConstructionListQuery = {
  construction_code?: string;
  construction_name?: string;
  customer_id?: number;
  brand_ids?: number[];
  east_west_divisions?: number[];
  construction_types?: number[];
  completion_year_month_from?: string;
  completion_year_month_to?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
};

export const useConstructionRecentList = async (
  query?: ConstructionListQuery,
) => {
  const response = await api.get<TypeConstructionList>(
    qs.stringifyUrl(
      {
        url: API_URL.construction.recents,
        query: {
          per_page: query?.per_page || undefined,
          sort_by: query?.sort_by || undefined,
        },
      },
      {
        skipEmptyString: true,
      },
    ),
  );
  return response;
};

export const useConstructionList = (
  query?: ConstructionListQuery,
  onSuccessCallback?: (data: ConstructionData) => void,
): SWRResponse<ConstructionData, CommonErrorResponse> => {
  const result = useSWR<ConstructionData>(
    qs.stringifyUrl(
      {
        url: API_URL.construction.list,
        query: {
          construction_code: query?.construction_code || undefined,
          construction_name: query?.construction_name || undefined,
          customer_id: query?.customer_id || undefined,
          // brand_ids: queryString.stringify({brand_ids: query?.brand_ids}, {arrayFormat: 'bracket'}),
          'brand_ids[]': query?.brand_ids || undefined,
          'east_west_divisions[]': query?.east_west_divisions || undefined,
          'construction_types[]': query?.construction_types || undefined,
          completion_year_month_from:
            query?.completion_year_month_from || undefined,
          completion_year_month_to:
            query?.completion_year_month_to || undefined,
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

/** 工事詳細取得 hook **/
export const useConstructionDetail = (
  id: number,
): SWRResponse<ConstructionDatail, CommonErrorResponse> => {
  const result = useSWR<ConstructionDatail>(
    API_URL.construction.detail(id),
    fetcher,
  );
  return result;
};

/** 工事取得 hook **/
export const useConstructionPersonalManages = (
  id: number,
): SWRResponse<PersonalManageType[], CommonErrorResponse> => {
  const result = useSWR<PersonalManageType[]>(
    API_URL.construction.personalManages(id),
    fetcher,
  );
  return result;
};

/** 工事取得コード hook **/
export const useConstructionCodeList = (
  query?: ConstructionQuery,
  onSuccessCallback?: (data: Construction[]) => void,
): SWRResponse<Construction[], CommonErrorResponse> => {
  const result = useSWR<Construction[]>(
    qs.stringifyUrl({
      url: API_URL.construction.list,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};

/** 工事取得コード hook **/
export const useConstructionAll = (
  query?: ConstructionQuery,
  onSuccessCallback?: (data: []) => void,
): SWRResponse<[], CommonErrorResponse> => {
  const result = useSWR<[]>(
    qs.stringifyUrl({
      url: API_URL.construction.all,
      query: {
        name: query?.name || undefined,
      },
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};

export const getConstructionSummary = async (id: number) => {
  const response = await api.get<ConstructionSummaryDetail>(
    API_URL.construction.summary(id),
  );
  return response;
};

export const useYearList = (
  onSuccessCallback?: (data: []) => void,
): SWRResponse<[], CommonErrorResponse> => {
  const result = useSWR<[]>(
    qs.stringifyUrl({
      url: API_URL.construction.showYear,
    }),
    fetcher,
    { onSuccess: (data) => onSuccessCallback && onSuccessCallback(data) },
  );
  return result;
};
