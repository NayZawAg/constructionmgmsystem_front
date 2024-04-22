import { useMedia } from 'react-use';
import { BREAKPOINT } from '@/utils/constants/common';

/**
 * sp画面判定用hook
 * @return {boolean}
 */
export const useIsSp = () => {
  return useMedia(`(max-width: ${BREAKPOINT}px)`, false);
};
