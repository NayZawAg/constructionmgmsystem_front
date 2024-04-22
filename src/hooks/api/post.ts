import qs from 'query-string';
import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import type { CommonErrorResponse } from '@/types/api/common';
import { PostResponseList } from '@/types/api/post';
import { API_URL } from '@/utils/constants/api';

/** posts hook **/
export const usePostList = (
): SWRResponse<PostResponseList, CommonErrorResponse> => {
  const result = useSWR<PostResponseList>(
    qs.stringifyUrl({
      url: API_URL.post.list
    })
  );
  return result;
};
