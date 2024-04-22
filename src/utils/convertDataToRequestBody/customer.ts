import { CustomerLists } from '@/api/customer';
import { CustomerType } from '@/components/customers/customerForm';
import { MyObject } from '@/types/common';

/**
 * formData 得意先新規作成requestBodyに変更
 * @param {CustomerType} data formデータ
 * @param {CustomerLists[]} templateItems
 * | 得意先項目
 */
export const convertDataToCustomerAddRequest = (
  data: CustomerType,
): CustomerLists => {
  const convertData: CustomerLists | MyObject = {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data;
    convertData[key] = dataObj[key];
  });
  return convertData as CustomerLists;
};

/**
 * formData 得意先新規作成requestBodyに変更
 * @param {CustomerType} data formデータ
 * @param {CustomerLists[]} templateItems
 * | 得意先項目
 */
export const convertDataToCustomerUpdateRequest = (
  data: CustomerType,
): CustomerLists => {
  const convertData: CustomerLists | MyObject = {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data;
    convertData[key] = dataObj[key];
  });
  return convertData as CustomerLists;
};
