import type { ConstructionInformationSettingsDetail } from '@/types/api/constructionInformationSetting';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type AddConstructionInformationSettingsRequest = {
    construction_id: number;
    value_creation_sheet: string;
    workshop_folder: string;
    design_drawing: string;
    working_diagram: string;
    work_schedule: string;
    photo_management: string;
    index: string;
    buildee: string;
    spider_plus: string;
    safey: string;
    contract: string;
    contract_drawing: string;
    place_on: string;
    cooperator_estimate: string;
    movie: string;
    map: string;
    rule: string;
};

export type UpdateConstructionInformationSettingsRequest = {
  construction_id: number;
  value_creation_sheet: string;
  workshop_folder: string;
  design_drawing: string;
  working_diagram: string;
  work_schedule: string;
  photo_management: string;
  index: string;
  buildee: string;
  spider_plus: string;
  safey: string;
  contract: string;
  contract_drawing: string;
  place_on: string;
  cooperator_estimate: string;
  movie: string;
  map: string;
  rule: string;
};

/**
 * 担当者複数案件追加
 * @param {number} constructionId
 * @param {AddConstructionInformationSettingsRequest} data
 */
export const addConstructionInformationSettings = async (
  constructionId: number,
  data: AddConstructionInformationSettingsRequest,
) => {
  // console.log(constructionId)
  const response = await api.post<ConstructionInformationSettingsDetail>(
    API_URL.construction.informationsettings(constructionId),
    data,
  );
  return response;
};