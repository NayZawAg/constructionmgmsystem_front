/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { getConstruction } from '@/api/construction';
import { getCostManageMenuList } from '@/api/costManageCategories';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import CostSummary from '@/components/constructions/cost/costSummary';
import { CostManageMenu } from '@/components/constructions/costManage/costManageMenu';
import { NextPageWithLayout } from '@/pages/_app';
import { TypeConstructionDetail } from '@/types/api/construction';
import { CostManageCategoryMenu } from '@/types/api/costManage';

type Props = {
  constructionId: number;
};
const Summary: NextPageWithLayout<Props> = ({ constructionId }) => {
  // categories
  const router = useRouter();
  const middle_category_id_query = router.query.middle_category_id;
  const [middleCategoryId, setMiddleCategoryId] = useState<any>();
  const [costManageMenu, setCostManageMenu] =
    useState<CostManageCategoryMenu>();
  const fetchData = useRef(true);
  const [construction, setConstruction] = useState<TypeConstructionDetail>();
  const ConstructionDatas = useRef(true);
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
      const fetchCostManageCategoriesMenu = async () => {
        await getCostManageMenuList(constructionId)
          .then((response) => {
            setCostManageMenu(response);
            const middle_category_id =
              response.cost_categories[0]?.large_categories.middle_categories[0]
                ?.id;
            setMiddleCategoryId(middle_category_id);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      // fetch cost manage
      fetchCostManageCategoriesMenu();
    }
  }, [constructionId]);

  if (!construction) return <div>loading...</div>;

  const isSmallScreen = window.innerWidth < 768;
  const styles = isSmallScreen ? { minWidth: '220px' } : { maxWidth: '250px' };

  return (
    <>
      <Head>
        <title>予算確定</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <ConstructionMenu construction={construction} />
      <div className="flex col-12">
        <div className="col-3" style={{ maxWidth: '250px' }}>
          {costManageMenu && (
            <CostManageMenu
              costManageMenu={costManageMenu}
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
          <CostSummary constructionId={constructionId} />
        </div>
      </div>
    </>
  );
};
export default Summary;

Summary.auth = true;
Summary.pageId = 'EU_CONSTRUCTION_COST_SUMMARY';

interface Query extends ParsedUrlQuery {
  id: string;
}
export const getServerSideProps: GetServerSideProps<Props, Query> = async (
  ctx,
) => {
  const params = ctx.params;
  const { id } = params ? params : { id: null };
  const constructionId = Array.isArray(id) ? id[0] : id;

  if (!constructionId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      constructionId,
    },
  };
};
