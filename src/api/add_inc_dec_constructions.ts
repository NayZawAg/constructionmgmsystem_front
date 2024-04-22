import type {
  AddIncDecConstructionsDetail,
  TypeUpdateAddIncDecConstructions,
  TypeUpdateAddIncDecConstructionAppId,
  TypeAddIncDecConstructionsList
} from '@/types/api/add_inc_dec_constructions';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type AddAddIncDecConstructionsRequest = {
    construction_id: number;
    subject: string;
    estimate_amount: number;
    assumed_cost: number;
    remarks: string;
    add_inc_dec_status: number;
};

export type UpdateAddIncDecConstructionsRequest = {
  add_inc_dec_status: number;
  estimate_amount: number;
};

/**
 * 追加増減工事追加
 * @param {number} constructionId
 * @param {AddAddIncDecConstructionsRequest} data
 */
export const addAddIncDecConstructions = async (
  constructionId: number,
  data: AddAddIncDecConstructionsRequest,
) => {
  // console.log(constructionId)
  const response = await api.post<AddIncDecConstructionsDetail>(
    API_URL.construction.addAddIncDecConstruction(constructionId),
    data,
  );
  return response;
};

/**
 * 承認
 * @param {TypeUpdateAddIncDecConstructions} data
 * @param {number} constructionId
 * @param {number} id
 */
export const updateAddIncDecConstructions = async (data: TypeUpdateAddIncDecConstructions, constructionId: number, id: number) => {
  const response = await api.put(API_URL.construction.updateAddIncDecConstruction(constructionId, id), data);
  return response;
};

/**
 * 追加増減工事取得
 * @param {number} id
 */
export const getAddIncDecConstructionByID = async (id: number) => {
  const response = await api.get<TypeUpdateAddIncDecConstructionAppId>(
    API_URL.construction.getAddIncDecConstructionsByID(id)
  );
  return response;
};

/**
 * 追加増減工事一覧取得
 * @param {number} constructionId
 */
export const getAddIncDecConstructionList = async (constructionId: number) => {
  const response = await api.get<TypeAddIncDecConstructionsList[]>(
    API_URL.construction.getAddIncDecConstructions(constructionId),
  );
  return response;
};
