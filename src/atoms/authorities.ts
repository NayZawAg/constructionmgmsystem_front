/* eslint @typescript-eslint/no-explicit-any: 0 */
import { atom, useAtom } from 'jotai';
import { AUTHORITIES, CU_AUTHORITIES, EM_AUTHORITIES, EU_AUTHORITIES } from '@/utils/constants/authorities';

const authoritiesAtom = atom(AUTHORITIES);
export const UseMyAuthorities = () => { return useAtom(authoritiesAtom)};

const eAuthoritiesAtom = atom(EU_AUTHORITIES);
export const UseMyEAuthorities = () => { return useAtom(eAuthoritiesAtom)};

const eManageAuthoritiesAtom = atom(EM_AUTHORITIES);
export const UseMyEManageAuthorities = () => { return useAtom(eManageAuthoritiesAtom)};

const cAuthoritiesAtom = atom(CU_AUTHORITIES);
export const UseMyCAuthorities = () => { return useAtom(cAuthoritiesAtom)};

/**
 * 権限を持っているかチェック
 * example:
 * const [myAuthorities] = useMyAuthorities();
 * hasAuthorities('M_IMAGE_DETAIL', myAuthorities);
 * @param key チェックするキー
 * @param myAuthorities atomで取得したユーザーの権限
 */
export const hasAuthorities = (
  key: string,
  myAuthorities: any,
): boolean => {
  return Array.isArray(key)
    ? key.some((k) => myAuthorities.includes(k))
    : myAuthorities.includes(key);
};
