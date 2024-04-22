/* eslint-disable react-hooks/rules-of-hooks */
/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Announcements from '@/components/announcements/anouncements';
import { Header } from '@/components/commons/header/header';
import ConstructionList from '@/components/constructions/constructionList';
import ExternalLinkageList from '@/components/externalLinkages/externalLinkageList';
import { useConstructionRecentList } from '@/hooks/api/construction';
import { useIsSp } from '@/hooks/isSp';
import type { NextPageWithLayout } from '@/pages/_app';
import { TypeConstructionList } from '@/types/api/construction';

const DashboardTopPage: NextPageWithLayout = () => {
  const isSp = useIsSp();
  const [recentConstructionData, setRecentConstructionData] =
    useState<TypeConstructionList>([]);

  useEffect(() => {
    const fetchRecentConstructionData = async () => {
      await useConstructionRecentList({
        per_page: 10,
        sort_by: 'order_date',
      })
        .then((response) => {
          setRecentConstructionData(response);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // fetch recent construction
    fetchRecentConstructionData();
  }, []);

  return (
    <>
      <Head>
        <title>ダッシュボード/TOP</title>
      </Head>
      <Header title="XXXXさんのトップページ" />
      <div className="contents">
        {/* <div className="grid">
          <div className="lg:col-6 md:col-6 col-12">
            <Announcements />
            <ExternalLinkageList />
          </div>
          <div className="lg:col-6 md:col-6 col-12">
            <ConstructionList />
          </div>
        </div> */}
        {isSp ? (
          <div className="grid">
            <div className="col-12">
              <Announcements />
            </div>
            <div className="col-12">
              <ConstructionList constructionList={recentConstructionData} />
            </div>
            <div className="col-12">
              <ExternalLinkageList />
            </div>
          </div>
        ) : (
          <div className="grid">
            <div className="lg:col-6 md:col-6 col-12">
              <Announcements />
              <ExternalLinkageList />
            </div>
            <div className="lg:col-6 md:col-6 col-12">
              <ConstructionList constructionList={recentConstructionData} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardTopPage;

DashboardTopPage.auth = true;
DashboardTopPage.pageId = 'TOP_DASHBOARD';
