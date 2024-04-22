import Head from 'next/head';
import DetailList from '@/components/constructions/employee-expenses/DetailList';
import { NextPageWithLayout } from '@/pages/_app';

const Detail: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>経費精算明細一覧</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <div>
        <DetailList />
      </div>
    </>
  );
};
export default Detail;

Detail.auth = true;
Detail.pageId = 'EU_CONSTRUCTION_EMPLOYEE_EXPENSES';
