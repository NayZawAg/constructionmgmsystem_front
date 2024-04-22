import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * 現在のページが管理画面か判定する。
 * 管理画面の場合true
 */
export const useIsManageCurrentPage = (): boolean => {
  const router = useRouter();
  const [isManagePage, setIsManagePage] = useState<boolean>(false);

  useEffect(() => {
    const _isManagePage = /^\/manage/.test(router.asPath);
    setIsManagePage(_isManagePage);
  }, [router]);

  return isManagePage;
};

/**
 * 現在のページが協力会社画面か判定する。
 * 協力会社画面の場合true
 */
export const useIsCooperatorCurrentPage = (): boolean => {
  const router = useRouter();
  const [isCooperatorPage, setIsCooperatorPage] = useState<boolean>(false);

  useEffect(() => {
    const _isCooperatorPage = /^\/cop/.test(router.asPath);
    setIsCooperatorPage(_isCooperatorPage);
  }, [router]);

  return isCooperatorPage;
};
