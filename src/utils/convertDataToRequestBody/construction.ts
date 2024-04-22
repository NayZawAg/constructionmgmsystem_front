import type {
  AddConstructionRequest,
  UpdateConstructionRequest,
} from '@/api/construction';
import { ConstructionType } from '@/components/constructions/constructionForm';
import { MyObject } from "@/types/common"
/**
 * formData 工事新規作成requestBodyに変更
 * @param {ConstructionType} data formデータ
 * | 工事名
 * | 報告書名
 * | 承認有無
 * @param {AddConstructionItemsRequest[]} templateItems
 * | 工事項目
 */
export const convertDataToConstructionCreateRequest = (
  data: ConstructionType,
): AddConstructionRequest => {
  const convertData: AddConstructionRequest | MyObject = {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data
    if (key == 'schedule_construction_start_date') {
      dataObj[key] = dataObj[key] ? dataObj[key].toLocaleString() : undefined
    }
    if (key == 'schedule_construction_end_date') {
      dataObj[key] = dataObj[key] ? dataObj[key].toLocaleString() : undefined
    }
    convertData[key] = dataObj[key];
  });
  return convertData as AddConstructionRequest;
};

/**
 *  * formData 工事更新requestBodyに変更
 * @param {ConstructionType} data
 */
export const convertDataToConstructionUpdateRequest = (
  data: ConstructionType,
): UpdateConstructionRequest => {
  const convertData: UpdateConstructionRequest | MyObject = {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data
    if (key == 'schedule_construction_start_date') {
      dataObj[key] = dataObj[key] ? dataObj[key].toLocaleString() : undefined
    }
    if (key == 'schedule_construction_end_date') {
      dataObj[key] = dataObj[key] ? dataObj[key].toLocaleString() : undefined
    }
    convertData[key] = dataObj[key];
  });
  return convertData as UpdateConstructionRequest;
};
