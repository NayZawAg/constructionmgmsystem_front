import { ParsedUrlQuery } from 'querystring';
import { yupResolver } from '@hookform/resolvers/yup';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getConstruction, updateConstruction } from '@/api/construction';
import ConstructionForm, {
  ConstructionInputSchema,
  ConstructionType,
} from '@/components/constructions/constructionForm';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import { ToastContext } from '@/components/context/toast/toast';
import { NextPageWithLayout } from '@/pages/_app';
import { TypeConstructionDetail } from '@/types/api/construction';
import { PAGE_URL } from '@/utils/constants/common';
import { MESSAGES } from '@/utils/constants/message';
import { convertDataToConstructionUpdateRequest } from '@/utils/convertDataToRequestBody/construction';
import { validationErrorMessageHtmlFormat } from '@/utils/messageUtils';
import { toastErrorMessage, toastMessage } from '@/utils/toastMessage';

type Props = {
  constructionId: number;
  // construction: TypeConstructionDetail;
};

const EditConstructionPage: NextPageWithLayout<Props> = ({
  constructionId,
  // construction,
}) => {
  const router = useRouter();
  const { toast } = useContext(ToastContext);

  const [construction, setConstruction] = useState<TypeConstructionDetail>();

  const fetchConstructionEditData = useRef(true);

  useEffect(() => {
    const fetchConstructionData = async () => {
      if (fetchConstructionEditData.current) {
        fetchConstructionEditData.current = false;
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
  const formMethods = useForm<ConstructionType>({
    mode: "onChange",
    resolver: yupResolver(ConstructionInputSchema),
    shouldFocusError: false,
  });

  const onSubmit = (data: ConstructionType) => {
    const requestBody = convertDataToConstructionUpdateRequest(data);
    updateConstruction(constructionId, requestBody)
      .then(() => {
        router.push(PAGE_URL.USER.CONSTRUCTION.SHOW(String(constructionId)));
        toast.current?.show(
          toastMessage(MESSAGES.API_RESULT.UPDATE.SUCCESS('工事')),
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
            toastErrorMessage(MESSAGES.API_RESULT.UPDATE.FAILURE('工事')),
          );
        }
      });
  };

  if (!construction) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>工事変更</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      {/* メニュー */}
      <ConstructionMenu construction={construction} />
      <ConstructionForm
        construction={construction}
        constructionId={constructionId}
        isCreate={false}
        formMethods={formMethods}
        onSubmit={onSubmit}
        formStatus="CONSTRUCTION_UPDATE"
        applicationStatus={construction?.application_status}
      />
    </>
  );
};

export default EditConstructionPage;

EditConstructionPage.auth = true;
EditConstructionPage.pageId = 'EU_CONSTRUCTION_EDIT';

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
