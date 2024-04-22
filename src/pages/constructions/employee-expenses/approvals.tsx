import Head from 'next/head';
import ApprovalList from '@/components/constructions/employee-expenses/ApprovalList';
import ApprovalListSP from '@/components/constructions/employee-expenses/ApprovalListSP';
import { useIsSp } from '@/hooks/isSp';
import { NextPageWithLayout } from '@/pages/_app';

const Approval: NextPageWithLayout = () => {

  const isSp = useIsSp();
  return (
    <>
      <Head>
        <title>経費精算承認一覧</title>
      </Head>
      {
        isSp ? (
          <ApprovalListSP/>
        ):(
          <ApprovalList/>
        )
      }
    </>
  )
}

export default Approval

Approval.auth = true;
Approval.pageId = 'EU_CONSTRUCTION_EMPLOYEE_EXPENSES_APPROVALS';
