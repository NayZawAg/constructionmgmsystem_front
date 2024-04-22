import { useMedia } from 'react-use';
import { BREAKPOINT } from '@/utils/constants/common';

/**
 * PC画面判定用hook
 * @return {boolean}
 */
export const useIsPc = () => {
  return useMedia(`(min-width: ${BREAKPOINT + 1}px)`, true);
};
