import { GetServerSideProps } from 'next';
import { parseCookies, setCookie } from 'nookies';
import { useEffect } from 'react';
import { sendAuthorizationCode } from '@/api/auth';
import { NextPageWithLayout } from '@/pages/_app';
import { auth } from '@/utils/auth';
import {
  COOKIE_KEYS,
  PAGE_URL,
  LOGIN_TYPE,
} from '@/utils/constants/common';

const LoginCertified: NextPageWithLayout = () => {
  useEffect(() => {
    const url = parseCookies(null)[COOKIE_KEYS.loginCompletedRedirectUrl];
    const pageType = parseCookies(null)[
      COOKIE_KEYS.loginType
    ] as typeof LOGIN_TYPE[keyof typeof LOGIN_TYPE];
    auth.setPageType(pageType);
    location.assign(url || PAGE_URL.USER.DASHBOARD);
  }, []);

  return <div>転送中...</div>;
};

LoginCertified.getLayout = (page) => page;

type Query = {
  authorization_code: string;
};

export const getServerSideProps: GetServerSideProps<object, Query> = async (
  ctx,
) => {
  const { query } = ctx;

  const cookies = parseCookies(ctx);

  /** エラー時などのTOP遷移変数 */
  const errorTopRedirect = {
    props: {},
    redirect: {
      destination: '/',
    },
  };

  const { authorization_code } = query;
  if (!authorization_code) {
    console.error('authorization_code が存在しません。');
    return errorTopRedirect;
  }

  const authorizationCode = Array.isArray(authorization_code)
    ? authorization_code[0]
    : authorization_code;

  // アクセストークン取得
  try {
    const appDiv = cookies[
      COOKIE_KEYS.loginType
    ] as typeof LOGIN_TYPE[keyof typeof LOGIN_TYPE];
    const token = await sendAuthorizationCode(authorizationCode, appDiv);

    if (appDiv === LOGIN_TYPE.user) {
      // クライアントのトークンセット
      setCookie(ctx, COOKIE_KEYS.apiAccessToken, token.accessToken, {
        path: '/',
      });
      setCookie(ctx, COOKIE_KEYS.apiRefreshToken, token.refreshToken, {
        path: '/',
      });
    } else if (appDiv === LOGIN_TYPE.cooperator) {
      // 管理側のトークンセット
      setCookie(ctx, COOKIE_KEYS.cooperatorApiAccessToken, token.accessToken, {
        path: '/',
      });
      setCookie(ctx, COOKIE_KEYS.cooperatorApiRefreshToken, token.refreshToken, {
        path: '/',
      });
    }

    return {
      props: {},
    };
  } catch (e) {
    console.error(e);
    return errorTopRedirect;
  }
};

export default LoginCertified;
