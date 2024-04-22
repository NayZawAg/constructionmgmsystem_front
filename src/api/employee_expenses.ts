/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint @typescript-eslint/no-unused-vars: 0 */
import { ExpenseCalculationType } from '@/components/constructions/employee-expenses/expenseCalculationDialog';
import { ExpenseTransportationType } from '@/components/constructions/employee-expenses/expenseTransprtationDialog';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';
import {
  AddCalculationType,
  AddTransportationType,
  UpdateCalculationType,
  UpdateTransportationType,
} from '@/utils/convertDataToRequestBody/employee_expenses';

export type TypeExpenseApplicationData = {
  expenses_application: CalculationTranspotationExpenses;
  expenses_detail: CalculationTranspotationExpenses;
};
export type TypeExpenseDetailData = {
  calculation_min_application_date: string;
  transpotation_min_application_date: string;
  expenses_detail: CalculationTranspotationExpenses;
};

export type CalculationTranspotationExpenses = {
  calculation_expenses: AdvanceExpenseData[];
  transpotation_expenses: AdvanceExpenseData[];
};

export type AdvanceExpensDetail = {
  id: number;
  construction_id: number;
  expense_id: number;
  application_no: string;
  amount: number;
  file_path: string;
  workflow_approval_condition_id: number;
  employee_id: number;
  cooperator_id: number;
  approval_employee_id: number;
  application_date: string;
  workflow_no: string;
  construction_code: string;
  status: number;
  subject: string;
  account_title: number;
  account_title_remark: string;
  transportation: string;
  payment_date: string;
  cost_burden_department: string;
  destination: string;
  request_no: string;
  remark: string;
  purchase: string;
  payment_destination: string;
  expenses_type: number;
  send_back_count: number;
  employee_name: string;
  first_approval_user_name: string;
  second_approval_user_name: string;
  third_approval_user_name: string;
  account_title_name: string;
  transpotation_name: string;
  department_name: string;
  file_id: number;
  return_reasons?: ReturnReason[];
  images?: [];
};

export type AdvanceExpenseData = {
  id: number;
  construction_id: number;
  expense_id: number;
  application_no: string;
  amount: number;
  file_path: string;
  workflow_approval_condition_id: number;
  employee_id: number;
  cooperator_id: number;
  approval_employee_id: number;
  application_date: string;
  workflow_no: string;
  construction_code: string;
  status: number;
  subject: string;
  account_title: number;
  account_title_remark: string;
  transportation: string;
  payment_date: string;
  cost_burden_department: string;
  destination: string;
  request_no: string;
  remark: string;
  purchase: string;
  payment_destination: string;
  expenses_type: number;
  send_back_count: number;
  employee_name: string;
  first_approval_user_name: string;
  second_approval_user_name: string;
  third_approval_user_name: string;
  account_title_name: string;
  transpotation_name: string;
  department_name: string;
  file_id: number;
  is_file: boolean;
  return_reasons?: ReturnReason[];
  images?: [];
};

export type ReturnReason = {
  return_reason: string;
  id: number;
};

export type TypeExpenseApprovalData = {
  expenses_approval: AdvanceExpenseData[];
};

export type ApprovalRequestBodyType = {
  confirm_type: string;
  approval_id: ExpenseRowId[];
  return_reason?: any;
};

export type ExpenseRowId = {
  id: number;
};

/**
 * 社員立替経費精算 申請一覧取得
 */
export const getEmployeeExpenseApplicationData = async () => {
  const response = await api.get<TypeExpenseApplicationData>(
    API_URL.employee_expense.getExpenseApplication(),
  );
  return response;
};

/**
 * 社員立替経費精算 承認一覧取得
 */
export const getEmployeeExpenseApprovalData = async () => {
  const response = await api.get<TypeExpenseApprovalData>(
    API_URL.employee_expense.getExpenseApproval(),
  );
  return response;
};

/**
 * 社員立替経費精算 明細一覧取得
 */
export const getEmployeeExpenseDetailData = async (
  application_date: string,
) => {
  const response = await api.get<TypeExpenseDetailData>(
    API_URL.employee_expense.getExpenseDetail(application_date),
  );
  return response;
};

/**
 *査定情報取登録
 * @param {number} orderInformationId
 * @param {AddAssessmentInfoDataType} data
 */
// export const addAssessmentInformationData = async (
//   orderInformationId: number,
//   data: AddAssessmentInfoDataType,
// ) => {
//   const response = await api.post<AddAssessmentInfoDataType>(
//     API_URL.assessment.addAssessmentInformation(orderInformationId),
//     { ...data },
//   );
//   return response;
// };

// 立替経費精算（経費）取得
export const getExpenseData = async (id: number) => {
  const response = await api.get<AdvanceExpenseData>(
    API_URL.employee_expense.detail(id),
  );
  return response;
};

// 立替経費精算（経費）
export const addExpenseCalculation = async (data: AddCalculationType) => {
  const form = new FormData();

  data.images?.forEach((file) => {
    form.append(`image`, file);
    // console.log('file', file);
  });
  const response = await api.filePost<AddCalculationType>(
    API_URL.employee_expense.addExpenseCalculationList,
    { ...data },
    // form,
  );
  return response;
};

export const updateExpenseCalculation = async (
  id: number | undefined,
  data: UpdateCalculationType,
) => {
  const response = await api.filePut(API_URL.employee_expense.update(id), {
    ...data,
  });
  return response;
};

// 立替経費精算（交通費精算）
export const addExpenseTransportation = async (data: AddTransportationType) => {
  const response = await api.filePost<AddTransportationType>(
    API_URL.employee_expense.addExpenseTransportation,
    { ...data },
  );
  return response;
};

export const updateExpenseTransportation = async (
  id: number | undefined,
  data: UpdateTransportationType,
) => {
  const response = await api.filePut(API_URL.employee_expense.update(id), {
    ...data,
  });
  return response;
};

/**
 * 社員立替申請
 * @param {ExpenseRowId} data
 *
 */
export const applicaitonEmployeeExpenses = async (data: ExpenseRowId[]) => {
  const response = await api.put(
    API_URL.employee_expense.applicationExpenses(),
    data,
  );
  return response;
};

/**
 * 社員立替承認
 * @param {ApprovalRequestBodyType} data
 */
export const approvalEmployeeExpense = async (
  data: ApprovalRequestBodyType,
) => {
  const response = await api.put<ApprovalRequestBodyType>(
    API_URL.employee_expense.approvalExpenses(),
    { ...data },
  );
  return response;
};

/**
 * 社員立替削除
 * @param {number} ExpenseId
 */
export const deleteEmployeeExpenses = async (id: number) => {
  const response = await api.delete(
    API_URL.employee_expense.deleteExpenses(id),
    {
      id,
    },
  );
  return response;
};
