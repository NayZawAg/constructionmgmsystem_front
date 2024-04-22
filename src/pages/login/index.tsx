/* eslint @typescript-eslint/no-unused-vars: 0 */
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { getLoginUrl } from '@/api/auth';
import { Login } from '@/components/login/login';
import type { NextPageWithLayout } from '@/pages/_app';
import {
  COOKIE_KEYS,
  PAGE_URL,
  LOGIN_TYPE,
} from '@/utils/constants/common';

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();

  const handleClickLogin = async () => {
    // try {
    //   const res = await getLoginUrl();
    //   document.location.assign(res.kannaLoginUrl);
    // } catch {
    //   console.error('APIエラーが発生しました');
    //   router.push('/');
    // }
    router.push('/dashboard');
  };

  return <Login pageTitle="ログイン" onClickLogin={handleClickLogin} />;
};

LoginPage.getLayout = (page) => page;

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  nookies.set(ctx, COOKIE_KEYS.loginType, LOGIN_TYPE.user, {
    path: '/',
  });
  nookies.set(
    ctx,
    COOKIE_KEYS.loginCompletedRedirectUrl,
    PAGE_URL.USER.DASHBOARD,
  );
  return {
    props: {},
  };
};
