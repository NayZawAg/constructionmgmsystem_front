import { api } from "@/utils/api/api";
import { API_URL } from "@/utils/constants/api";


export type TypeReason= {
  id: number,
  name: string
}
export const getReasonList = async () => {
  const response = await api.get<TypeReason[]>(
    API_URL.costs.reason.list
  );
  return response
}