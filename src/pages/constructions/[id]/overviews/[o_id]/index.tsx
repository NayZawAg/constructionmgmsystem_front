/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
import { ParsedUrlQuery } from 'querystring';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  getConstructionOverview,
  TypeConstructionOverview,
} from '@/api/construction_overview';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import { ConstructionOutlineSchema } from '@/components/constructions/constructionOutlineAddForm';
import ConstructionOutlineShowForm from '@/components/constructions/constructionOutlineShowForm';
import { NextPageWithLayout } from '@/pages/_app';

type Props = {
  overviewId: number;
  constructionId: number;
  // constructionOverview: TypeConstructionOverview;
};

export type ConstructionOutlineType = yup.InferType<
  typeof ConstructionOutlineSchema
>;

const Constructions: NextPageWithLayout<Props> = ({
  overviewId,
  constructionId,
}) => {
  const [constructionOverview, setConstructionOverview] =
    useState<TypeConstructionOverview>();

  const ConOverviewData = useRef(true);

  useEffect(() => {
    const fetchConstructionOverviewData = async () => {
      if (ConOverviewData.current) {
        ConOverviewData.current = false;
        await getConstructionOverview(constructionId, overviewId)
          .then((response) => {
            setConstructionOverview(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    // fetch construction overview
    fetchConstructionOverviewData();
  }, [constructionId, overviewId]);

  /** form **/
  const formMethods = useForm<ConstructionOutlineType>({
    mode: "onChange",
    resolver: yupResolver(ConstructionOutlineSchema),
  });

  if (!constructionOverview) return <div>loading...</div>;

  const construction = constructionOverview.construction;

  return (
    <>
      <Head>
        <title>工事概要詳細</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      {/* メニュー */}
      <ConstructionMenu construction={construction} />
      <ConstructionOutlineShowForm
        overviewId={overviewId}
        formMethods={formMethods}
        constructionId={constructionId}
        constructionOverview={constructionOverview}
      />
    </>
  );
};
export default Constructions;

Constructions.auth = true;
Constructions.pageId = 'EU_CONSTRUCTION_OVERVIEW';

interface Query extends ParsedUrlQuery {
  o_id: string;
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async (
  ctx,
) => {
  const params = ctx.params;
  const { o_id } = params ? params : { o_id: null };
  const { id } = params ? params : { id: null };
  const constructionId = Array.isArray(id) ? id[0] : id;
  const overviewId = Array.isArray(o_id) ? o_id[0] : o_id;

  // let constructionOverview = null;
  // await getConstructionOverview(constructionId, overviewId)
  //   .then((response) => {
  //     constructionOverview = response;
  //   })
  //   .catch(() => {
  //     constructionOverview = null;
  //   });

  if (!constructionId || !overviewId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      overviewId,
      constructionId,
      // constructionOverview,
    },
  };
};
