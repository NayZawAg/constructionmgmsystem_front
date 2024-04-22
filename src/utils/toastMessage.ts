/* eslint-disable @typescript-eslint/no-explicit-any */

import { TOAST_LIFE } from '@/utils/constants/common';
/**
 * 通常時のトーストメッセージを表示します
 * @param message トーストに表示するメッセージ
 */
export const toastMessage = (message: string) => {
  return {
    severity: 'success',
    detail: message,
    life: TOAST_LIFE,
  };
};

/**
 * エラー時のトーストメッセージを表示します
 * @param message トーストに表示するメッセージ
 */
export const toastErrorMessage = (message: any) => {
  return {
    severity: 'error',
    detail: message,
    life: TOAST_LIFE,
  };
};

/**
 * 通知のトーストメッセージを表示します
 * @param message トーストに表示するメッセージ
 */
export const toastInfoMessage = (message: string) => {
  return {
    severity: 'info',
    detail: message,
    life: TOAST_LIFE,
  };
};
