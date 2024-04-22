/* eslint @typescript-eslint/no-unused-vars: 0 */
import { ParsedUrlQuery } from 'querystring';
import { yupResolver } from '@hookform/resolvers/yup';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getConstruction } from '@/api/construction';
import { addConstructionOverview } from '@/api/construction_overview';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import ConstructionOutlineAddForm, {
  ConstructionOutlineSchema,
  ConstructionOutlineType,
} from '@/components/constructions/constructionOutlineAddForm';
import { ToastContext } from '@/components/context/toast/toast';
import { NextPageWithLayout } from '@/pages/_app';
import { TypeConstructionDetail } from '@/types/api/construction';
import { MESSAGES } from '@/utils/constants/message';
import { convertDataToConstructionCreateRequest } from '@/utils/convertDataToRequestBody/construction_overview';
import { validationErrorMessageHtmlFormat } from '@/utils/messageUtils';
import { toastErrorMessage, toastMessage } from '@/utils/toastMessage';

type Props = {
  constructionId: number;
  // construction: TypeConstructionDetail;
};

const Outlines: NextPageWithLayout<Props> = ({ constructionId }) => {
  const router = useRouter();
  const { toast } = useContext(ToastContext);

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

  /** form **/
  const formMethods = useForm<ConstructionOutlineType>({
    mode: "onChange",
    resolver: yupResolver(ConstructionOutlineSchema),
    defaultValues: {
      overview: '',
      heavy_equipment_type: '',
      orderer: '',
      construction_site: '',
      usage: '',
      con_tim_per_other_input: '',
      con_sit_per_other_input: '',
      dangerous_work_or_self_risk: '',
      assumed_risk: '',
      counter_measure: '',
      con_not_form_by_order_specified_document: '',
      // no_of_floors: 0,
      scheduled_delivery_date: '',
      con_rev_meeting_implementation_date: '',
      con_rev_meeting_by_wor_type_implementation_date: '',
      company_implementation_date: '',
      head_office_manager_interview_date: '',
    },
    shouldFocusError: false,
  });

  const onSubmit = async (data: ConstructionOutlineType) => {
    const requestBody = convertDataToConstructionCreateRequest(data);
    addConstructionOverview(constructionId, requestBody)
      .then((result) => {
        router.push(`/constructions/${constructionId}/overviews/${result.id}`);
        toast.current?.show(
          toastMessage(MESSAGES.API_RESULT.CREATE.SUCCESS('工事概要')),
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
            toastErrorMessage(MESSAGES.API_RESULT.CREATE.FAILURE('工事概要')),
          );
        }
      });
  };

  if (!construction) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>工事概要追加</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      {/* メニュー */}
      <ConstructionMenu construction={construction} />
      <ConstructionOutlineAddForm
        construction={construction}
        overviews={construction.overview}
        isCreate={true}
        formMethods={formMethods}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Outlines;

Outlines.auth = true;
Outlines.pageId = 'EU_CONSTRUCTION_OVERVIEW_NEW';

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
