import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import React from 'react';
import { COOKIE_KEYS, PAGE_URL } from '@/utils/constants/common';
import { createCookie, deleteCookie } from '@/utils/cookiesUtils';

const Home: NextPage = () => {
  const { status, data: session } = useSession();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      // delete cookies
      deleteCookie(COOKIE_KEYS.apiAccessToken);
      deleteCookie(COOKIE_KEYS.userType);
      // redirect
      Router.push(PAGE_URL.USER.LOGIN.TOP);
    } else if (status === 'authenticated') {
      // create cookies
      const accessToken = session ? session.accessToken : '';
      const userType = session ? session.user.userType : 0;
      createCookie(COOKIE_KEYS.apiAccessToken, String(accessToken));
      createCookie(COOKIE_KEYS.userType, String(userType));
      // redirect
      Router.push(PAGE_URL.USER.DASHBOARD);
    }
  }, [status, session]);

  return <div />;
};

export default Home;
