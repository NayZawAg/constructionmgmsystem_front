import { AddConstructionStructureList } from '@/interfaces/constructionStructure';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

/**
 * 担当者複数案件追加
 * @param {number} constructionId
 * @param {AddConstructionStructuresRequest} data
 */
export const addConstructionStructures = async (
  constructionId: number,
  data: AddConstructionStructureList[],
) => {
  const response = await api.post<AddConstructionStructureList[]>(
    API_URL.construction_structure.add_construction_system(constructionId),
    data,
  );
  return response;
};
