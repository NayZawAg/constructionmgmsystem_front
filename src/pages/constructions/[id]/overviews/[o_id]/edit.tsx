/* eslint @typescript-eslint/no-unused-vars: 0 */
import { ParsedUrlQuery } from 'querystring';
import { yupResolver } from '@hookform/resolvers/yup';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  getConstructionOverview,
  TypeConstructionOverview,
  updateOverviewRequest,
} from '@/api/construction_overview';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import ConstructionOutlineAddForm, {
  ConstructionOutlineSchema,
  ConstructionOutlineType,
} from '@/components/constructions/constructionOutlineAddForm';
import { ToastContext } from '@/components/context/toast/toast';
import { NextPageWithLayout } from '@/pages/_app';
import { MESSAGES } from '@/utils/constants/message';
import { convertDataToConstructionCreateRequest } from '@/utils/convertDataToRequestBody/construction_overview';
import { validationErrorMessageHtmlFormat } from '@/utils/messageUtils';
import { toastErrorMessage, toastMessage } from '@/utils/toastMessage';

type Props = {
  overviewId: number;
  constructionId: number;
  // constructionOverview: TypeConstructionOverview;
};

const EditOutlinesPage: NextPageWithLayout<Props> = ({
  overviewId,
  constructionId,
}) => {
  const router = useRouter();
  const { toast } = useContext(ToastContext);
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

  const onSubmit = async (data: ConstructionOutlineType) => {
    const requestBody = convertDataToConstructionCreateRequest(data);
    updateOverviewRequest(constructionId, overviewId, requestBody)
      .then(() => {
        Router.push(`/constructions/${constructionId}/overviews/${overviewId}`);
        toast.current?.show(
          toastMessage(MESSAGES.API_RESULT.UPDATE.SUCCESS('工事概要')),
        );
      })
      .catch((e) => {
        if (e.response.status == 422) {
          // let error_msg = '';
          // if (typeof e.response.data.error == 'string') {
          //   toast.current?.show(toastErrorMessage(e.response.data.error));
          // } else if (typeof e.response.data.error == 'object') {
          //   Object.keys(e.response.data.error).map((item) => {
          //     error_msg += e.response.data.error[item][0] + '。';
          //   });
          //   toast.current?.show(toastErrorMessage(error_msg));
          // }
          const error_msg = validationErrorMessageHtmlFormat(e.response.data.error)
          toast.current?.show(toastErrorMessage(<div dangerouslySetInnerHTML={{__html: error_msg }}></div>));
        } else {
          toast.current?.show(
            toastErrorMessage(MESSAGES.API_RESULT.UPDATE.FAILURE('工事概要')),
          );
        }
      });
  };

  if (!constructionOverview) return <div>loading...</div>;

  const construction = constructionOverview.construction;

  return (
    <>
      <Head>
        <title>工事概要変更</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      {/* メニュー */}
      <ConstructionMenu construction={construction} />
      <ConstructionOutlineAddForm
        construction={construction}
        overviews={constructionOverview}
        isCreate={false}
        formMethods={formMethods}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default EditOutlinesPage;

EditOutlinesPage.auth = true;
EditOutlinesPage.pageId = 'EU_CONSTRUCTION_OVERVIEW_EDIT';

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
