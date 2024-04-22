/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
import type { NextPage } from 'next';
import { SessionProvider, useSession } from "next-auth/react"
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { addLocale } from 'primereact/api';
import React, { ReactElement, ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { ConfirmModal } from '@/components/commons/confirmModal/confirmModal';
import { Layout } from '@/components/commons/layout/layout';
import { CommonToast } from '@/components/context/toast/toast';
import { fetcher } from '@/utils/api/fetcher';
import '@/styles/globals.scss';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@/styles/themes/theme.css';
import { checkAuthorities } from '@/utils/auth';

export type NextPageWithLayout<P = object> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
  pageId: string;
  auth?: boolean;
};

type AppPropsWithLayout<P> = AppProps & {
  Component: NextPageWithLayout<P>;
};

// add japanese calendar
addLocale('ja', {
  firstDayOfWeek: 1,
  dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
  dayNamesMin: ['日', '月', '火', '水', '木', '金', '土'],
  monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  today: '今日',
  clear: 'クリア',
  //...
});

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppPropsWithLayout<any>) {
  const getLayout = Component.getLayout || ((Comp) => <Layout>{Comp}</Layout>);

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher,
      }}
    >
      <SessionProvider session={session} refetchInterval={5 * 60}>
        {Component.auth ? (
          <>
            <Auth pageId={Component.pageId}>
              <CommonToast>{getLayout(<Component {...pageProps} />)}</CommonToast>
              <ConfirmModal />
            </Auth>
          </>
        ) : (
          <>
            <CommonToast>{getLayout(<Component {...pageProps} />)}</CommonToast>
            <ConfirmModal />
          </>
        )}
      </SessionProvider>
    </SWRConfig>
  );
}

type Props = {
  children: any;
  pageId: string;
};

function Auth({ children, pageId }: Props) {
  const router = useRouter();
  const isReady = router.isReady;
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })
  // check user Type
  // const [authStatus, setAuthStatus] = useState(false)

  checkAuthorities(pageId).then((checkAuthority) => {
    // setAuthStatus(checkAuthority)

    if (isReady && typeof window !== 'undefined' && !checkAuthority) {
      router.replace('/403')
    }
  })

  if (!isReady || status === "loading") return <div>loading...</div>;

  return children
}

export default MyApp
