import type {
  AddAddIncDecConstructionsRequest,
  UpdateAddIncDecConstructionsRequest
} from '@/api/add_inc_dec_constructions';
import { UpdateAddIncDecConstructionsType } from '@/pages/constructions/[id]/add-inc-dec';
import { AddAddIncDecConstructionsType } from '@/pages/constructions/[id]/add-inc-dec/new';
import { MyObject } from "@/types/common"
/**
   * formData 追加増減新規作成requestBodyに変更
   * @param {AddAddIncDecConstructionsType} data formデータ
   * @param {AddAddIncDecConstructionsRequest[]} templateItems
   * | 工事項目
   */
export const convertDataToAddIncDecConstructionsAddRequest = (
  data: AddAddIncDecConstructionsType,
): AddAddIncDecConstructionsRequest => {
  const convertData: AddAddIncDecConstructionsRequest | MyObject = {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data
    convertData[key] = dataObj[key];
  });
  return convertData as AddAddIncDecConstructionsRequest;
};
  /**
   * formData 追加増減更新requestBodyに変更
   * @param {any} data formデータ
   * @param {UpdateAddIncDecConstructionsRequest[]} templateItems
   * | 工事項目
   */
export const convertDataToAddIncDecConstructionsUpdateRequest = (
  data: UpdateAddIncDecConstructionsType
): UpdateAddIncDecConstructionsRequest => {
  const convertData: UpdateAddIncDecConstructionsRequest | MyObject = {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data
    convertData[key] = dataObj[key];
  });
  return convertData as UpdateAddIncDecConstructionsRequest;
};