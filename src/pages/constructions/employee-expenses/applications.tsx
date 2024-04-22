import Head from 'next/head';
import ApplicationList from '@/components/constructions/employee-expenses/ApplicationList';
import { NextPageWithLayout } from '@/pages/_app';

const Application: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>経費精算申請一覧</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <ApplicationList />
    </>
  );
};

export default Application;

Application.auth = true;
Application.pageId = 'EU_CONSTRUCTION_EMPLOYEE_EXPENSES_APPLICATION';
