export interface ApprovalData {
  id: number;
  name: string;
}

export interface ApprovalDataList {
  id: number;
  request_decision_name: string;
  request_decision_type: number;
}

export interface ApprovalAppUserDataList {
  id: number;
  first_app_user: string;
  first_app_situation: number;
  second_app_user: string;
  second_app_situation: number;
  third_app_user: string;
  third_app_situation: number;
}
