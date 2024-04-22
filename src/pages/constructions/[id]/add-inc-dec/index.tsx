/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint-disable react-hooks/exhaustive-deps */
import { ParsedUrlQuery } from 'querystring';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useCallback, useContext, useEffect, useState, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  updateAddIncDecConstructions,
  getAddIncDecConstructionList,
} from '@/api/add_inc_dec_constructions';
import { getConstruction } from '@/api/construction';
import { Header } from '@/components/commons/header/header';
import { ConstructionEstimateDialog } from '@/components/constructions/constructionEstimateDialog';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import { ToastContext } from '@/components/context/toast/toast';
import { NextPageWithLayout } from '@/pages/_app';
import type { TypeAddIncDecConstructionsList } from '@/types/api/add_inc_dec_constructions';
import { TypeConstructionDetail } from '@/types/api/construction';
import { BaseYup } from '@/utils/baseYup';
import { prefixYenSign } from '@/utils/calculation';
import { API_STATUS_CODE } from '@/utils/constants/api';
import { MESSAGES } from '@/utils/constants/message';
import { validationErrorMessageHtmlFormat } from '@/utils/messageUtils';
import { toastErrorMessage, toastMessage } from '@/utils/toastMessage';

type Props = {
  constructionId: number;
};

export type AddIncDecConstructionsType = yup.InferType<
  typeof Add_inc_dec_constructionsInputSchema
>;

export type UpdateAddIncDecConstructionsType = {
  add_inc_dec_status: number;
  estimate_amount: number;
};

/** schema **/
const Add_inc_dec_constructionsInputSchema = BaseYup.object();

const AddIncDecConstructionLists: NextPageWithLayout<Props> = ({
  constructionId,
}) => {
  const formMethods = useForm<AddIncDecConstructionsType>({
    mode: 'onChange',
    resolver: yupResolver(Add_inc_dec_constructionsInputSchema),
  });
  const { toast } = useContext(ToastContext);
  const [addIncDecConstructionsList, setAddIncDecConstructionsList] =
    useState<TypeAddIncDecConstructionsList[]>();

  const fetchData = useRef(true);
  const fetchAddIncDecConstructions = useCallback(async () => {
    if (fetchData.current) {
      fetchData.current = false;
      const responseDatas = await getAddIncDecConstructionList(constructionId);
      setAddIncDecConstructionsList(responseDatas);
    }
  }, []);

  const [construction, setConstruction] = useState<TypeConstructionDetail>();

  const [estimateAddModal, setEstimateAddModal] = useState<boolean>(false);
  const [addIncDec] = useState<{
    estimated_amount: number;
    add_inc_dec_id: number;
  }>({
    estimated_amount: 0,
    add_inc_dec_id: 0,
  });

  const fetchConstructions = useRef(true);
  useEffect(() => {
    const fetchConstructionData = async () => {
      if (fetchConstructions.current) {
        fetchConstructions.current = false;
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
    // fetch add_inc_dec_constructions_list
    fetchAddIncDecConstructions();
  }, [constructionId]);

  const subject_Template = (rowData: any) => {
    return <span>{rowData.subject}</span>;
  };

  const id_Header_Template = (rowData: any) => {
    return (
      <span>
        追加増減
        <br />
        工事番号
      </span>
    );
  };

  const id_Template = (rowData: any) => {
    return <span>{rowData.id}</span>;
  };

  const status_Template = (rowData: any) => {
    if (rowData.add_inc_dec_status == 1) {
      return <span>申請中</span>;
    } else if (rowData.add_inc_dec_status == 2) {
      return <span>受注</span>;
    } else if (rowData.add_inc_dec_status == 3) {
      return <span>却下</span>;
    } else if (rowData.add_inc_dec_status == 0) {
      return <span>見積提案中</span>;
    }
  };

  const estimate_amount_Template = (rowData: any) => {
    if (isNaN(parseInt(rowData.estimate_amount))) {
      return <span></span>;
    } else {
      return (
        <span>
          {prefixYenSign(parseInt(rowData.estimate_amount).toLocaleString())}
        </span>
      );
    }
  };

  const assumed_cost_Template = (rowData: any) => {
    if (isNaN(parseInt(rowData.assumed_cost))) {
      return <span></span>;
    } else {
      return (
        <span>
          {prefixYenSign(parseInt(rowData.assumed_cost).toLocaleString())}
        </span>
      );
    }
  };

  const remarks_Template = (rowData: any) => {
    return <span>{rowData.remarks}</span>;
  };

  const onUpdate = (
    id: number,
    add_inc_dec_status: number,
    new_status: number,
    estimate_amount: number,
  ) => {
    const approvalConfirm: UpdateAddIncDecConstructionsType = {
      add_inc_dec_status: new_status,
      estimate_amount: estimate_amount,
    };
    const request_body = approvalConfirm;
    updateAddIncDecConstructions(request_body, constructionId, id)
      .then(() => {
        toast.current?.show(
          toastMessage(MESSAGES.API_RESULT.UPDATE.SUCCESS('追加増減工事')),
        );
        fetchData.current = true;
        fetchAddIncDecConstructions();
      })
      .catch((e) => {
        if (
          e.response &&
          e.response.status === API_STATUS_CODE.HTTP_422_UNPROCESSABLE_ENTITY
        ) {
          // toast.current?.show(toastErrorMessage(e.response.data.error));
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
              MESSAGES.API_RESULT.UPDATE.FAILURE('追加増減工事'),
            ),
          );
        }
      });
  };

  const buttonTemplate = (rowData: any) => {
    return (
      <div className="flex form justify-content-center">
        <div className="flex align-items-center justify-content-center mr-1">
          <Button
            className="p-button-success-table"
            label={'受注'}
            onClick={() =>
              onUpdate(
                rowData.id,
                rowData.add_inc_dec_status,
                1,
                rowData.estimate_amount,
              )
            }
            disabled={
              rowData.add_inc_dec_status === 1 ||
              rowData.add_inc_dec_status === 2 ||
              rowData.add_inc_dec_status === 3
                ? true
                : false
            }
          />
        </div>
        <div className="flex align-items-center justify-content-center mr-1">
          <Button
            className="p-button-success-table p-button-sm"
            label={'却下'}
            onClick={() =>
              onUpdate(
                rowData.id,
                rowData.add_inc_dec_status,
                3,
                rowData.estimate_amount,
              )
            }
            disabled={
              rowData.add_inc_dec_status === 1 ||
              rowData.add_inc_dec_status === 2 ||
              rowData.add_inc_dec_status === 3
                ? true
                : false
            }
          />
        </div>
        <div className="flex align-items-center justify-content-center">
          <Button
            className="p-button-success w-4rem"
            label={'見積書'}
            onClick={() => {
              addIncDec.estimated_amount = rowData.estimate_amount;
              addIncDec.add_inc_dec_id = rowData.id;
              setEstimateAddModal(true);
            }}
          />
        </div>
      </div>
    );
  };

  if (!construction) return <div>loading...</div>;
  return (
    <>
      <Head>
        <title>追加増減工事一覧</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      {/* メニュー */}
      <ConstructionMenu construction={construction} />

      <Header title="追加増減工事一覧" isSubTitle={true} />

      <FormProvider {...formMethods}>
        <form>
          <div className="contents form">
            <div className="text-right mt-4">
              <>
                <Button
                  className="p-button-success p-button-sm"
                  type="button"
                  label="追加増減工事追加"
                  onClick={() => {
                    Router.push(
                      '/constructions/' + constructionId + '/add-inc-dec/new',
                    );
                  }}
                  disabled={construction?.status == '4'}
                />
              </>
            </div>
            <div>
              <br />
            </div>
          </div>
        </form>
      </FormProvider>
      <div className="datatable-style-demo">
        <div className="card form">
          <DataTable
            value={addIncDecConstructionsList}
            showGridlines
            size="small"
            emptyMessage=" "
            className="construction-table"
          >
            <Column
              field="id"
              header={id_Header_Template}
              body={id_Template}
              alignHeader="center"
              className="lg:w-1 md:w-2"
            ></Column>
            <Column
              header="件名"
              body={subject_Template}
              alignHeader="center"
              className="lg:w-2 md:w-2"
            ></Column>
            <Column
              header="ステータス"
              body={status_Template}
              alignHeader="center"
              className="lg:w-1 md:w-2"
            ></Column>
            <Column
              header="見積金額"
              body={estimate_amount_Template}
              align="right"
              alignHeader="center"
              className="lg:w-1 md:w-1"
            ></Column>
            <Column
              header="想定原価"
              body={assumed_cost_Template}
              align="right"
              alignHeader="center"
              className="lg:w-1 md:w-1"
            ></Column>
            <Column
              header="備考"
              body={remarks_Template}
              alignHeader="center"
              style={{ wordBreak: 'break-word' }}
              className="lg:w-2 md:w-3"
            ></Column>
            <Column
              header=""
              body={buttonTemplate}
              // style={{ width: '10%' }}
              className="lg:w-1 md:w-3"
            ></Column>
          </DataTable>
        </div>
      </div>
      <ConstructionEstimateDialog
        isOpen={estimateAddModal}
        onHide={() => setEstimateAddModal(false)}
        isLoading={true}
        construction={construction}
        issueType={'追加増感'}
        addIncDec={addIncDec}
      />
    </>
  );
};
export default AddIncDecConstructionLists;

AddIncDecConstructionLists.auth = true;
AddIncDecConstructionLists.pageId = 'EU_CONSTRUCTION_ADD_INC_DEC';

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
