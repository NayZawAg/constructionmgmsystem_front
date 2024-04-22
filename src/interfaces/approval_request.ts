export interface ApprovalRequest {
  id: number;
  status: string;
  approval_num: string;
  approval_name: string;
  subject: string;
  authorizer: string;
  application_dt: string;
}
