export interface Customer {
  id: number;
  customer_code: string;
  customer_name: string;
  collection_code: string;
  corporation_no: number;
  invoice_no: number;
  company_name: string;
  company_name_kana: string;
  branch_department_name: string;
  branch_department_kana: string;
  zipcode: string;
  prefecture: string;
  municipality: string;
  address_1: string;
  address_2: string;
  phone_no: string;
  email: string;
  url: string;
  fax: string;
  incharge_name: string;
  representative_name: string;
  representative_name_kana: string;
  use_suspension_flag: string;
  suspension_reason: string;
}
