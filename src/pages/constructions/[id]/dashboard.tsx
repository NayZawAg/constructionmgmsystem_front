/* eslint-disable react-hooks/rules-of-hooks */
/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getConstruction } from '@/api/construction';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import ConstructionSummary from '@/components/constructions/constructionSummary';
import PersonalManageList from '@/components/constructions/personalManageList';
import { NextPageWithLayout } from '@/pages/_app';
import { TypeConstructionDetail } from '@/types/api/construction';

type Props = {
  constructionId: number;
  // construction: TypeConstructionDetail;
};

const ConstructionDashboardPage: NextPageWithLayout<Props> = ({
  constructionId,
}) => {
  const [construction, setConstruction] = useState<TypeConstructionDetail>();

  useEffect(() => {
    const fetchConstructionData = async () => {
      await getConstruction(constructionId)
        .then((response) => {
          setConstruction(response);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // fetch construction
    fetchConstructionData();
  }, [constructionId]);

  if (!construction) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>ダッシュボード工事</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      {/* メニュー */}
      <ConstructionMenu construction={construction} />
      {/* 工事概要 */}
      <ConstructionSummary construction={construction} />
      {/* 個人管理 */}
      <div className="pt-3">
        <PersonalManageList constructionId={construction.id} />
      </div>
    </>
  );
};

export default ConstructionDashboardPage;

ConstructionDashboardPage.auth = true;
ConstructionDashboardPage.pageId = 'EU_CONSTRUCTION_DASHBOARD';

interface Query extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async (
  ctx,
) => {
  const params = ctx.params;
  const { id } = params ? params : { id: null };
  const constructionId = Array.isArray(id) ? id[0] : id;

  // let construction = null;
  // await getConstruction(constructionId)
  //   .then((response) => {
  //     construction = response;
  //   })
  //   .catch(() => {
  //     construction = null;
  //   });

  if (!constructionId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      constructionId,
      // construction,
    },
  };
};
