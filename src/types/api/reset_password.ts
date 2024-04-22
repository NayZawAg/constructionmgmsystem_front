/**パスワード変更 */
export type PasswordReset = {
  password: string;
  password_confirmation: string;
};

export type PasswordResetInfo = {
  cooperator_user: {
    id: number;
    user_type: string;
    reset_password_sent_at: string;
  };
  cooperator: {
    id: number;
    name: string;
    code: string;
    kana: string;
    branch_name: string;
  };
};
