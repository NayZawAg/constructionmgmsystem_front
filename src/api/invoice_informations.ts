/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  // ConstructionDetail,
  TypeConstructionDetail,
} from '@/types/api/construction';
import type {
  // TypeInvoiceInformation,
  TypeGetInvoiceInformationsList,
} from '@/types/api/invoice_informations';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type AddInvoiceInformationsRequest = {
  construction_id: number;
  name: string;
  amount: number;
  remarks: string;
  special_report: string;
  invoice_issued_date: string;
  deposit_planned_date: string;
  construction_division: boolean;
  add_inc_dec_construction_id: number;
};

export type PdfDownload = {
  file_name: string;
};

/**
 * 請求書追加
 * @param {number} constructionId
 * @param {AddInvoiceInformationsRequest} data
 */
export const addInvoiceInformationsData = async (
  constructionId: number,
  data: AddInvoiceInformationsRequest,
  construction: TypeConstructionDetail,
) => {
  const request = {
    invoice_data: data,
    construction_data: construction,
  };
  const response = await api.post<PdfDownload>(
    API_URL.construction.getInvoiceInformations(constructionId),
    { ...request },
  );
  return response;
};

/**
 * 請求書一覧取得
 * @param {number} constructionId
 */
export const getInvoiceInformationsList = async (constructionId: number) => {
  const response = await api.get<TypeGetInvoiceInformationsList>(
    API_URL.construction.getInvoiceInformations(constructionId),
  );
  return response;
};

/**
 * 請求書削除
 * @param {number} id
 * @param {number} ic_id
 */
export const deleteInvoiceConstruction = async (id: number, ic_id: number) => {
  const response = await api.delete(
    API_URL.construction.deleteInvoiceInformations(id, ic_id),
    {
      id,
    },
  );
  return response;
};

export const downloadInvoiceInformationData = async (
  constructionId: number,
  invoiceId: number,
  construction: TypeConstructionDetail,
) => {
  const request = {
    construction_data: construction,
  };
  const response = await api.post<PdfDownload>(
    API_URL.construction.downloadInvoiceInformation(constructionId, invoiceId),
    { ...request },
  );
  return response;
};

export const downloadInvoicePDF = async (id: number, file_name: string) => {
  console.log('downFile', file_name);
  const response = await api.getPdf(
    API_URL.construction.downloadInvoicePdf(id, file_name),
  );
  return response;
};

export const deleteInvoiceTmpFile = async (id: number, file_name: string) => {
  const response = await api.get(
    API_URL.construction.deleteInvoiceTmpFile(id, file_name),
  );
  return response;
};
