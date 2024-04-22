/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { getConstruction } from '@/api/construction';
import { getEstimatesMenuList } from '@/api/estimatesCategories';
import { Header } from '@/components/commons/header/header';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import { EstimateMenu } from '@/components/constructions/estimates/estimateMenu';
import EstimatesSummary from '@/components/constructions/estimates/estimatesSummary';
import { NextPageWithLayout } from '@/pages/_app';
import { TypeConstructionDetail } from '@/types/api/construction';
import type { EstimateCategoryMenu } from '@/types/api/estimateMenu';

type Props = {
  constructionId: number;
};

const Summary: NextPageWithLayout<Props> = ({ constructionId }) => {
  const router = useRouter();
  const middle_category_id_query = router.query.middle_category_id;
  const [estimationMenu, setEstimationMenu] = useState<EstimateCategoryMenu>();
  const [middleCategoryId, setMiddleCategoryId] = useState<any>();
  const fetchData = useRef(true);
  const ConstructionDatas = useRef(true);
  const [disableStatus, setDisableStatus] = useState<boolean>(false);
  const [construction, setConstruction] = useState<TypeConstructionDetail>();

  useEffect(() => {
    const fetchConstructionData = async () => {
      if (ConstructionDatas.current) {
        ConstructionDatas.current = false;
        await getConstruction(constructionId)
          .then((response) => {
            setConstruction(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    // fetch construction
    fetchConstructionData();
  }, [constructionId]);

  useEffect(() => {
    if (fetchData.current) {
      fetchData.current = false;
      const fetchEstimatesCategoriesMenu = async () => {
        await getEstimatesMenuList(constructionId)
          .then((response) => {
            setEstimationMenu(response);
            const middle_category_id =
              response.estimate_categories[0]?.large_categories
                .middle_categories[0]?.id;
            setMiddleCategoryId(middle_category_id);
            if (
              response.application_status == 1 ||
              response.application_status == 2 ||
              response.application_status == 3 ||
              response.application_status == 5
            ) {
              setDisableStatus(true);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
      // fetch estimation
      fetchEstimatesCategoriesMenu();
    }
  }, [constructionId]);

  useEffect(() => {
    setMiddleCategoryId(middle_category_id_query);
  }, [middle_category_id_query]);

  if (!construction) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>精算見積サマリー</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Header title="精算見積サマリー" isSubTitle={true} />
      <ConstructionMenu construction={construction} />

      <div className="flex col-12">
        <div className="col-3" style={{ maxWidth: '250px' }}>
          {estimationMenu && (
            <EstimateMenu
              disable={disableStatus}
              estimateMenu={estimationMenu}
              constructionId={constructionId}
              middleCategoryId={
                middle_category_id_query
                  ? middle_category_id_query
                  : middleCategoryId
              }
              isSummary={true}
            />
          )}
        </div>
        <div className="col-9">
          <EstimatesSummary
            disable={construction?.status == '4' || disableStatus}
            constructionId={constructionId}
          />
        </div>
      </div>
    </>
  );
};

export default Summary;

Summary.pageId = 'EU_CONSTRUCTION_SUMMARY';

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
