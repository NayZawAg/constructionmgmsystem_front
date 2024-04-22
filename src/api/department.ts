import { api } from "@/utils/api/api";
import { API_URL } from "@/utils/constants/api";


export type TypeDepartment= {
  id: number,
  name: string
}
export const getDepartmentList = async () => {
  const response = await api.get<TypeDepartment[]>(
    API_URL.costs.department.list
  );
  return response
}