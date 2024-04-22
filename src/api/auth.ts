import axios from 'axios';
import { AuthToken, AuthCooperatorLoginParams, AuthCooperatorLogin } from '@/types/api/auth';
import { API_URL } from '@/utils/constants/api';
import { LOGIN_TYPE } from '@/utils/constants/common';

/**
 * 協力会社ログイン
 * @param {AuthCooperatorLoginParams} data
 */
export const cooperatorLogin = async (data: AuthCooperatorLoginParams) => {
  const response = await axios.post<AuthCooperatorLogin>(
    API_URL.cooperator.auth.login,
    { ...data },
  )
  return response;
};

/**
 * 認証コードから、アクセストークンを取得する
 * @param authorizationCode KANNAより取得した認証コード
 * @param appDiv ログインする種別の値
 * @returns システムのトークン情報
 */
export const sendAuthorizationCode = async (
  authorizationCode: string,
  appDiv: typeof LOGIN_TYPE[keyof typeof LOGIN_TYPE],
): Promise<AuthToken> => {
  return await axios
    .post(API_URL.auth.token, {
      authorizationCode,
      appDiv,
    })
    .then((d) => d.data);
};

/**
 * リフレッシュトークンをもとに、トークンを更新する
 * @param refreshToken リフレッシュトークン
 * @returns 新しいトークン情報
 */
export const tokenRefresh = async (
  refreshToken: string,
): Promise<AuthToken> => {
  return await axios
    .post(API_URL.auth.refresh, {
      refreshToken,
    })
    .then((d) => d.data);
};
