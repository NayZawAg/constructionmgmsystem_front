import { ResetPasswordInputType } from '@/components/cooperators/resetPasswordForm';
import { PasswordResetInfo } from '@/types/api/reset_password';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type PasswordResetRequest = {
  password: string;
  password_confirmation: string;
};

/** Request Token */
// export const requestToken = async (data: loginIdType) => {
//   const response = await api.post<loginIdType>(API_URL.request_token, {
//     ...data,
//   });
//   return response;
// }
export const requestToken = async (login_id: string) => {
  try {
    const response = await api.post<string>(API_URL.request_token, {
      login_id,
    });
    return response;
  } catch {
    return {
      error: 'Login ID not exist',
    };
  }
  // const response = await api.post<string>(API_URL.request_token, {
  //   login_id,
  // });

  // return response;
};

/**パスワード変更Get */
export const getPasswordResetInfo = async (password_token: string) => {
  const response = await api.get<PasswordResetInfo>(
    API_URL.get_reset_password(password_token),
  );
  return response;
};

/**
 * パスワード変更
 */
export const passwordReset = async (data: ResetPasswordInputType) => {
  const response = await api.put<ResetPasswordInputType>(
    API_URL.reset_password,
    { ...data },
  );
  return response;
};
