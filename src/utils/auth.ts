/* eslint @typescript-eslint/no-unused-vars: 0 */
import { parseCookies } from 'nookies';
import { readCookie } from './cookiesUtils';
import {
  hasAuthorities,
  UseMyCAuthorities,
  UseMyEAuthorities,
  UseMyEManageAuthorities,
} from '@/atoms/authorities';
import { LOGIN_TYPE, COOKIE_KEYS } from '@/utils/constants/common';

type PageType = typeof LOGIN_TYPE[keyof typeof LOGIN_TYPE];

class Auth {
  /** 現在表示中のページの判定パラメータ */
  private pageType: PageType = LOGIN_TYPE.employee;
  setPageType(p: PageType): void {
    this.pageType = p;
  }
  getPageType(): PageType {
    return this.pageType;
  }
}

/**
 * 認証関係の判定などを行うクラス
 * シングルトン運用で、Authコンポーネントで最初に設定する。
 */
const auth = new Auth();

export { auth };

/**
 * ページの種別に対応したトークンを持っているか確認。
 * トークンの有効性は確認しないので注意。
 * @param pageType ページ種別
 */
export const hasToken = (pageType: PageType): boolean => {
  // const token =
  //   parseCookies()[
  //     pageType === LOGIN_TYPE.employee
  //       ? COOKIE_KEYS.apiAccessToken
  //       : COOKIE_KEYS.cooperatorApiAccessToken
  //   ];
  const token = parseCookies()[COOKIE_KEYS.apiAccessToken];
  return !!token;
};

// Authority
const delay = (ms: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const checkAuthorities = async (pageName: string): Promise<boolean> => {
  // get user type
  const userType = parseCookies()[COOKIE_KEYS.userType];
  // let userType = '';
  // readCookie('userType').then(async (type) => {
  //   userType = type;
  // });
  // ログインユーザー権限
  const [myEAuthorities] = UseMyEAuthorities();
  const [myEManageAuthorities] = UseMyEManageAuthorities();
  const [myCAuthorities] = UseMyCAuthorities();
  let isAuthority = false;

  await delay(100);

  if (userType == '0') {
    isAuthority = hasAuthorities(pageName, myEManageAuthorities);
  }
  if (!isAuthority && (userType == '0' || userType == '1')) {
    isAuthority = hasAuthorities(pageName, myEAuthorities);
  }
  if (userType == '2') {
    isAuthority = hasAuthorities(pageName, myCAuthorities);
  }

  return isAuthority;
};

export const loginPageType = (userType: number) => {
  return [0, 1].includes(userType)
    ? LOGIN_TYPE.employee
    : LOGIN_TYPE.cooperator;
};
