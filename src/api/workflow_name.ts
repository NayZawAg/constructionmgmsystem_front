import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type TypeWorkflowName = {
  workflow_type: number;
  name: string;
};
export const getWorkflowNameList = async () => {
  const response = await api.get<TypeWorkflowName[]>(
    API_URL.workflow.workflow_name_list,
  );
  return response;
};
