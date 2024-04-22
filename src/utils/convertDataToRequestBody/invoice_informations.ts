/* eslint @typescript-eslint/no-explicit-any: 0 */
import type { AddInvoiceInformationsRequest } from '@/api/invoice_informations';
// import { InvoiceInformationsType } from '@/pages/constructions/[id]/invoices';
import { MyObject } from '@/types/common';
/**
 * formData 追加増減新規作成requestBodyに変更
 * @param {any} data formデータ
 * @param {AddInvoiceInformationsRequest[]} templateItems
 * | 工事項目
 */
export const convertDataToInvoiceInformationsAddRequest = (
  data: any,
): AddInvoiceInformationsRequest => {
  const convertData: AddInvoiceInformationsRequest | MyObject = {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data;
    if (key == 'deposit_planned_date' || key == 'invoice_issued_date') {
      dataObj[key] = dataObj[key].toLocaleString();
    }
    if (key == 'id') {
      dataObj[key] = '';
    }
    convertData[key] = dataObj[key];
    // const dataObj: MyObject = data
    // convertData[key] = dataObj[key];
  });
  return convertData as AddInvoiceInformationsRequest;
};
