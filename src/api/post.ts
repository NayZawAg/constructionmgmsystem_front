import type { PostResponseDetail, PostResponseList } from '@/types/api/post';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

/**
 * Add post
 * @param {File[]} data
 */
export const addPost = async (
  files: File[],
) => {
  const form = new FormData();

  files?.forEach((file) => {
    form.append(`image`, file);
  });

  const response = await api.filePost<PostResponseDetail>(
    API_URL.post.list,
    form,
  );
  return response;
};

export const getPostList = async () => {
  const response = await api.get<PostResponseList>(
    API_URL.post.list
  );
  return response;
};
