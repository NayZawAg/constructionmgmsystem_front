import type {
  AddConstructionInformationSettingsRequest,
} from '@/api/construction_information_settings';
import { InformationSettingType } from '@/components/constructions/constructionSettingsForm';
import { MyObject } from "@/types/common"
/**
 * formData 工事新規作成requestBodyに変更
 * @param {InformationSettingType} data formデータ
 * @param {AddConstructionInformationSettingsRequest[]} templateItems
 * | 工事項目
 */
export const convertDataToConstructionInformationSettingsAddRequest = (
  data: InformationSettingType,
): AddConstructionInformationSettingsRequest => {
  const convertData: AddConstructionInformationSettingsRequest | MyObject = {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data
    convertData[key] = dataObj[key];
  });
  return convertData as AddConstructionInformationSettingsRequest;
};

