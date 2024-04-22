import { ExpenseCalculationType } from '@/components/constructions/employee-expenses/expenseCalculationDialog';
import { ExpenseTransportationType } from '@/components/constructions/employee-expenses/expenseTransprtationDialog';
import { MyObject } from '@/types/common';

export type AddCalculationType = {
  subject: string;
  account_title: string;
  account_title_remark: string;
  purchase: string;
  payment_date: string;
  amount: number;
  construction_code: string;
  cost_burden_department: string;
  payment_destination: string;
  request_no: string;
  remark: string;
  images: [];
  status: string;
  expenses_type: number;
  delete_arr: [];
  old_images: boolean;
};

export type UpdateCalculationType = {
  subject: string;
  account_title: string;
  account_title_remark: string;
  purchase: string;
  payment_date: string;
  amount: number;
  construction_code: string;
  cost_burden_department: string;
  payment_destination: string;
  request_no: string;
  remark: string;
  images: [];
  status: string;
  id: number;
  expenses_type: number;
  delete_arr: [];
  old_images: boolean;
};

export type AddTransportationType = {
  subject: string;
  account_title: string;
  account_title_remark: string;
  transportation: string;
  payment_date: string;
  amount: number;
  construction_code: string;
  cost_burden_department: string;
  destination: string;
  request_no: string;
  remark: string;
  images: [];
  status: string;
  expenses_type: number;
  delete_arr: [];
  old_images: boolean;
};

export type UpdateTransportationType = {
  subject: string;
  account_title: string;
  account_title_remark: string;
  transportation: string;
  payment_date: string;
  amount: number;
  construction_code: string;
  cost_burden_department: string;
  destination: string;
  request_no: string;
  remark: string;
  images: [];
  status: string;
  id: number;
  expenses_type: number;
  delete_arr: [];
  old_images: boolean;
};

export const convertDataToExpenseCalculationCreateRequest = (
  data: ExpenseCalculationType,
): AddCalculationType => {
  const convertData: AddCalculationType | MyObject = {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data;
    if (key == 'payment_date') {
      dataObj[key] = dataObj[key].toLocaleString();
    }
    if (key == 'id') {
      dataObj[key] = '';
    }
    convertData[key] = dataObj[key];
  });
  return convertData as AddCalculationType;
};

export const convertDataToExpenseCalculationUpdateRequest = (
  data: ExpenseCalculationType,
): UpdateCalculationType => {
  const convertData: UpdateCalculationType | MyObject = {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data;
    if (key == 'payment_date') {
      dataObj[key] = dataObj[key].toLocaleString();
    }
    convertData[key] = dataObj[key];
  });
  return convertData as UpdateCalculationType;
};

export const convertDataToExpenseTransportationCreateRequest = (
  data: ExpenseTransportationType,
): AddTransportationType => {
  const convertData: AddTransportationType | MyObject = {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data;
    if (key == 'payment_date') {
      dataObj[key] = dataObj[key].toLocaleString();
    }
    if (key == 'id') {
      dataObj[key] = '';
    }
    convertData[key] = dataObj[key];
  });
  return convertData as AddTransportationType;
};

export const convertDataToExpenseTransportationUpdateRequest = (
  data: ExpenseTransportationType,
): UpdateTransportationType => {
  const convertData: UpdateTransportationType | MyObject = {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data;
    if (key == 'payment_date') {
      dataObj[key] = dataObj[key].toLocaleString();
    }
    convertData[key] = dataObj[key];
  });
  return convertData as UpdateTransportationType;
};
