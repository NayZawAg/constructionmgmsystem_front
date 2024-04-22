import { ConstructionStructureList } from '@/interfaces/constructionStructure';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

/** 工事体制一覧セット **/
export const getConstructionStructures = async (id: number) => {
  const response = await api.get<ConstructionStructureList>(
    API_URL.construction_structure.List(id),
  );
  return response;
};
