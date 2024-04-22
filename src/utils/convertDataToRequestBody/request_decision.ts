import { ApplicationType } from '@/components/requests/applications/applicationForm';
import { TypeAddRequestDecisionApplicationRequest } from '@/types/api/request_decision';
import type { TypeUpdateRequestDecisionApplicationRequest } from '@/types/api/request_decision';
import { MyObject } from '@/types/common';

/**
 * formData 稟議新規申請、変更requestBodyに変更
 * @param {ApplicationType} data formデータ
 * @param {AddRequestDecisionApplicationRequest[]} templateItems
 * | 稟議項目
 */
export const convertDataToRequestDecisionApplicationAddRequest = (
  data: ApplicationType,
): TypeAddRequestDecisionApplicationRequest => {
  const convertData: TypeAddRequestDecisionApplicationRequest | MyObject = {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data;
    convertData[key] = dataObj[key];
  });
  return convertData as TypeAddRequestDecisionApplicationRequest;
};

/**
 * formData 稟議変更equestBodyに変更
 * @param {ApplicationType} data formデータ
 * @param {AddRequestDecisionApplicationRequest[]} templateItems
 * | 稟議項目
 */
export const convertDataToRequestDecisionApplicationUpdateRequest = (
  data: TypeUpdateRequestDecisionApplicationRequest,
): TypeUpdateRequestDecisionApplicationRequest => {
  const convertData: TypeUpdateRequestDecisionApplicationRequest | MyObject =
    {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data;
    convertData[key] = dataObj[key];
  });
  return convertData as TypeUpdateRequestDecisionApplicationRequest;
};
