export type AuthCooperatorLoginParams = {
  login_id?: string;
  password?: string;
};

export type AuthCooperatorLogin = {
  user_type: string;
  name: string;
  email: string;
  image: string;
};

export type AuthLogin = {
  kannaLoginUrl: string;
};

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: string;
  refreshTokenExpires: string;
};
