import type { AddConstructionOverview } from '@/api/construction_overview';
import { ConstructionOutlineType } from '@/components/constructions/constructionOutlineAddForm';
import { MyObject } from "@/types/common"
/**
   * formData 工事新規作成requestBodyに変更
   * @param {ConstructionOutlineType} data formデータ
   * | 工事名
   * | 報告書名
   * | 承認有無
   * @param {AddConstructionItemsRequest[]} templateItems
   * | 工事項目
   */
export const convertDataToConstructionCreateRequest = (
  data: ConstructionOutlineType, 
): AddConstructionOverview => {
  const convertData: AddConstructionOverview | MyObject = {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data
    convertData[key] = dataObj[key];
  });
  return convertData as AddConstructionOverview;
};
  
/**
   *  * formData 工事更新requestBodyに変更
  //  * @param {ConstructionType} data
   */
//   export const convertDataToConstructionUpdateRequest = (
//     data: ConstructionType,
//   ): UpdateConstructionRequest => {
//     const convertData: UpdateConstructionRequest | MyObject = {};
//     Object.keys(data).map((key) => {
//       const dataObj: MyObject = data
//       convertData[key] = dataObj[key];
//     });
//     return convertData as UpdateConstructionRequest;
//   };
  