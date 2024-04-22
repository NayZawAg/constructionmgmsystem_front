/* eslint-disable @typescript-eslint/no-unused-vars */
import { ParsedUrlQuery } from 'querystring';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getConstruction } from '@/api/construction';
import { addConstructionInformationSettings } from '@/api/construction_information_settings';
import { Header } from '@/components/commons/header/header';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import ConstructionSettingsForm, {
  InformationSettingType,
  InformationSettingInputSchema,
} from '@/components/constructions/constructionSettingsForm';
import { ToastContext } from '@/components/context/toast/toast';
import { NextPageWithLayout } from '@/pages/_app';
import { TypeConstructionDetail } from '@/types/api/construction';
import { API_STATUS_CODE } from '@/utils/constants/api';
import { MESSAGES } from '@/utils/constants/message';
import { convertDataToConstructionInformationSettingsAddRequest } from '@/utils/convertDataToRequestBody/constructioninformationsettings';
import { validationErrorMessage, validationErrorMessageHtmlFormat } from '@/utils/messageUtils';
import { toastErrorMessage, toastMessage } from '@/utils/toastMessage';

type Props = {
  constructionId: number;
  // construction: TypeConstructionDetail;
};

const InformationSetting: NextPageWithLayout<Props> = ({
  constructionId,
  // construction,
}) => {
  const { toast } = useContext(ToastContext);
  const formMethods = useForm<InformationSettingType>({
    mode: "onChange",
    resolver: yupResolver(InformationSettingInputSchema),
  });

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

  const onSubmit = (data: InformationSettingType) => {
    const requestBody =
      convertDataToConstructionInformationSettingsAddRequest(data);
    addConstructionInformationSettings(constructionId, requestBody)
      .then(() => {
        toast.current?.show(
          toastMessage(MESSAGES.API_RESULT.SAVE.SUCCESS('工事情報設定')),
        );
      })
      .catch((e) => {
        if (
          e.response &&
          e.response.status === API_STATUS_CODE.HTTP_422_UNPROCESSABLE_ENTITY
        ) {
          // toast.current?.show(
          //   toastErrorMessage(validationErrorMessage(e.response.data.error)),
          // );
          const error_msg = validationErrorMessageHtmlFormat(e.response.data.error)
          toast.current?.show(toastErrorMessage(<div dangerouslySetInnerHTML={{__html: error_msg }}></div>));
        } else {
          toast.current?.show(
            toastErrorMessage(MESSAGES.API_RESULT.SAVE.FAILURE('工事情報設定')),
          );
        }
      });
  };

  if (!construction) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>工事情報設定</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      {/* メニュー */}
      <ConstructionMenu construction={construction} />
      <Header title="工事情報設定" isSubTitle={true} />
      <ConstructionSettingsForm
        information_setting={construction?.information_setting}
        formMethods={formMethods}
        onSubmit={onSubmit}
        disabled={construction?.status == '4'}
      />
    </>
  );
};
export default InformationSetting;

InformationSetting.auth = true;
InformationSetting.pageId = 'EU_CONSTRUCTION_INFO_SETTING';

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

  // let construction = null;
  // await getConstruction(constructionId)
  //   .then((response) => {
  //     construction = response;
  //   })
  //   .catch(() => {
  //     construction = null;
  //   });

  // if (!construction) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      constructionId,
      // construction,
    },
  };
};
