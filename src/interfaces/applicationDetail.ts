export interface ApplicationDetail {
  id: number,
  status: string;
  application_date: string;
  application_no: number;
  expense_name: string;
  account_subject_1: string;
  account_subject_2: string;
  purchase: string;
  purchase_amount: number;
  transportation: string;
  transportation_amount: number;
  payment: string;
  destination: string;
  approval_no:  number;
  construction_code: number;
  reason: string;
  receipt: string;
  approver_1: string;
  approver_2: string;
}