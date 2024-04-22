/* eslint-disable indent */
/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint-disable react-hooks/exhaustive-deps */
import { ParsedUrlQuery } from 'querystring';
import { yupResolver } from '@hookform/resolvers/yup';
import cx from 'classnames';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { useContext, useEffect, useState, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './new.module.scss';
import { addAddIncDecConstructions } from '@/api/add_inc_dec_constructions';
import { getConstruction } from '@/api/construction';
import { Header } from '@/components/commons/header/header';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import { ToastContext } from '@/components/context/toast/toast';
import { ContentHeadingInline } from '@/components/forms/contentHeading/contentHeadingInline';
import { InputForm } from '@/components/forms/input/input';
import { InputNumberCurrencyForm } from '@/components/forms/input/inputNumberCurrencyForm';
import { TextareaForm } from '@/components/forms/textarea/textarea';
import { NextPageWithLayout } from '@/pages/_app';
import { TypeConstructionDetail } from '@/types/api/construction';
import { BaseYup } from '@/utils/baseYup';
import { isMinusValueOnChangeOrBlur } from '@/utils/calculation';
import { API_STATUS_CODE } from '@/utils/constants/api';
import { MESSAGES } from '@/utils/constants/message';
import { convertDataToAddIncDecConstructionsAddRequest } from '@/utils/convertDataToRequestBody/add_inc_dec_constructions';
import {
  validationErrorMessage,
  validationErrorMessageHtmlFormat,
} from '@/utils/messageUtils';
import { toastErrorMessage, toastMessage } from '@/utils/toastMessage';
type Props = {
  constructionId: number;
};

export interface AddIncDecConstructionsDataType {
  subject: string;
  estimate_amount: number;
  assumed_cost: number;
  remarks: string;
  add_inc_dec_status: number;
}

export type AddAddIncDecConstructionsType = yup.InferType<
  typeof addIncDecConstructionsInputSchema
>;
/** schema **/
const addIncDecConstructionsInputSchema = BaseYup.object({
  subject: BaseYup.string().required().max(50).label('件名'),
  estimate_amount: BaseYup.number()
    .required()
    .label('見積金額')
    .max(999999999999.99, '見積金額は12桁以内で入力してください')
    .typeError('見積金額を入力してください')
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? null : value,
    ),
  assumed_cost: BaseYup.number()
    .required()
    .label('想定原価')
    .max(999999999999.99, '想定原価は12桁以内で入力してください')
    .typeError('想定原価を入力してください')
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? null : value,
    ),
  remarks: BaseYup.string().max(500).label('備考'),
  add_inc_dec_status: BaseYup.number(),
});

const AddIncDecConstructions: NextPageWithLayout<Props> = ({
  constructionId,
}) => {
  const router = useRouter();
  const { toast } = useContext(ToastContext);
  const formMethods = useForm<AddAddIncDecConstructionsType>({
    mode: 'onChange',
    resolver: yupResolver(addIncDecConstructionsInputSchema),
    defaultValues: {
      subject: '',
      estimate_amount: undefined,
      assumed_cost: undefined,
      remarks: '',
      add_inc_dec_status: 0,
    },
    shouldFocusError: false,
  });

  const [construction, setConstruction] = useState<TypeConstructionDetail>();
  const fetchData = useRef(true);
  useEffect(() => {
    const fetchConstructionData = async () => {
      if (fetchData.current) {
        fetchData.current = false;
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

  const onMoveListPage = () => {
    router.push(`/constructions/${constructionId}/add-inc-dec`);
  };

  const onSubmit = (data: AddAddIncDecConstructionsType) => {
    const requestBody = convertDataToAddIncDecConstructionsAddRequest(data);

    addAddIncDecConstructions(constructionId, requestBody)
      .then(() => {
        toast.current?.show(
          toastMessage(MESSAGES.API_RESULT.SAVE.SUCCESS('追加増減工事追加')),
        );

        onMoveListPage();
      })
      .catch((e) => {
        if (
          e.response &&
          e.response.status === API_STATUS_CODE.HTTP_422_UNPROCESSABLE_ENTITY
        ) {
          // toast.current?.show(
          //   toastErrorMessage(validationErrorMessage(e.response.data.error)),
          // );
          const error_msg = validationErrorMessageHtmlFormat(
            e.response.data.error,
          );
          toast.current?.show(
            toastErrorMessage(
              <div dangerouslySetInnerHTML={{ __html: error_msg }}></div>,
            ),
          );
        } else {
          toast.current?.show(
            toastErrorMessage(
              MESSAGES.API_RESULT.SAVE.FAILURE('追加増減工事追加'),
            ),
          );
        }
      });
  };

  if (!construction) return <div>loading...</div>;
  return (
    <>
      <Head>
        <title>追加増減工事追加</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      {/* メニュー */}
      <ConstructionMenu construction={construction} />

      <Header title="追加増減工事追加" isSubTitle={true} />

      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)} autoComplete="off">
          <table className={styles['table']}>
            <thead>
              <tr>
                <td className={styles['con-info-label']}>追加増減工事番号</td>
                <td className="pl-2">自動採番</td>
              </tr>
              <tr>
                <td className={styles['con-info-label']}>
                  <ContentHeadingInline heading="件名" requiredFlag={true} />
                </td>
                <td className="pl-2">
                  <InputForm
                    name="subject"
                    className={cx(
                      styles['subject-text'],
                      'lg:w-27rem md:w-20rem',
                    )}
                    defaultValue=""
                  />
                </td>
              </tr>
              <tr>
                <td className={styles['con-info-label']}>
                  <ContentHeadingInline
                    heading="見積金額"
                    requiredFlag={true}
                  />
                </td>
                <td className="pl-2">
                  <InputNumberCurrencyForm
                    name="estimate_amount"
                    className={cx(
                      styles['subject-text'],
                      'lg:w-15rem md:w-11rem',
                    )}
                    inputClassName="text-right"
                    // min={0}
                    mode={'decimal'}
                    prefix={'¥'}
                    maxFractionDigits={0}
                    inputStyle={{ width: '50px' }}
                    maxLength={12}
                    onBlur={(e) => {
                      e.target.value !== ''
                        ? !isMinusValueOnChangeOrBlur(e.target.value)
                          ? formMethods.setValue(
                              'estimate_amount',
                              Number(e.target.value.replace(/[$¥,]+/g, '')),
                            )
                          : ''
                        : '';
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles['con-info-label']}>
                  <ContentHeadingInline
                    heading="想定原価"
                    requiredFlag={true}
                  />
                </td>
                <td className="pl-2">
                  <InputNumberCurrencyForm
                    name="assumed_cost"
                    className={cx(
                      styles['subject-text'],
                      'lg:w-15rem md:w-11rem',
                    )}
                    inputClassName="text-right"
                    // min={0}
                    mode={'decimal'}
                    prefix={'¥'}
                    maxFractionDigits={0}
                    inputStyle={{ width: '50px' }}
                    maxLength={12}
                    onBlur={(e) => {
                      e.target.value !== ''
                        ? !isMinusValueOnChangeOrBlur(e.target.value)
                          ? formMethods.setValue(
                              'assumed_cost',
                              Number(e.target.value.replace(/[$¥,]+/g, '')),
                            )
                          : ''
                        : '';
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles['con-info-label']}>
                  <ContentHeadingInline heading="備考" />
                </td>
                <td className="pl-2">
                  <TextareaForm
                    name="remarks"
                    placeholder=""
                    className={cx(
                      styles['subject-text'],
                      'lg:w-27rem md:w-20rem h-9rem',
                    )}
                    // maxLength={500}
                    defaultValue=""
                  />
                </td>
              </tr>
            </thead>
          </table>
          <div className="field col-12 flex justify-content-center mt-2">
            <Button
              label={'追加'}
              type="submit"
              className="p-button-success p-button-sm"
              disabled={construction?.status == '4'}
            />
            &nbsp;&nbsp;
            <Button
              label={'キャンセル'}
              type="button"
              className="p-button-secondary-cancel"
              onClick={() => {
                onMoveListPage();
              }}
              // style={{
              //   backgroundColor: '#d2d2d2',
              //   borderColor: '#d2d2d2',
              // }}
            />
            {/* </div> */}
            {/* </div> */}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddIncDecConstructions;

AddIncDecConstructions.auth = true;
AddIncDecConstructions.pageId = 'EU_CONSTRUCTION_ADD_INC_DEC_NEW';

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
