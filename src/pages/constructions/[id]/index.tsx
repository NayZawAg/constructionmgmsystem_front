/* eslint-disable react-hooks/exhaustive-deps */
/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
import { ParsedUrlQuery } from 'querystring';
import { yupResolver } from '@hookform/resolvers/yup';
import cx from 'classnames';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { Row } from 'primereact/row';
import { useState, useContext, useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './index.module.scss';
import { addWorkflowCondition, getConstruction } from '@/api/construction';
import { Header } from '@/components/commons/header/header';
import {
  ConstructionCompleteDialog,
  workFlowConditionType,
} from '@/components/constructions/constructionCompleteDialog';
import { ConstructionEstimateDialog } from '@/components/constructions/constructionEstimateDialog';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import { ToastContext } from '@/components/context/toast/toast';
import { ContentHeadingInline } from '@/components/forms/contentHeading/contentHeadingInline';
import { ContentInline } from '@/components/forms/contentHeading/contentInline';
import { DropdownForm } from '@/components/forms/dropdown/dropdown';
import { useConstructionDetail } from '@/hooks/api/construction';
import { NextPageWithLayout } from '@/pages/_app';
import { TypeConstructionDetail } from '@/types/api/construction';
import { BaseYup } from '@/utils/baseYup';
import {
  changeFormatCurrency,
  postfixPercentSign,
  prefixYenSign,
  toFixed,
} from '@/utils/calculation';
import { API_STATUS_CODE } from '@/utils/constants/api';
import { setAreaValue } from '@/utils/constants/common';
import { FORM_CALENDER_FORMAT, DATE_FORMAT } from '@/utils/constants/common';
import { MESSAGES } from '@/utils/constants/message';
import { validationErrorMessageHtmlFormat } from '@/utils/messageUtils';
import { statusitems } from '@/utils/select_item';
import { toastErrorMessage, toastMessage } from '@/utils/toastMessage';

type Props = {
  constructionId: number;
};

/**schema */
export type statusType = yup.InferType<typeof statusSchema>;
export const statusSchema = BaseYup.object({
  status: BaseYup.string().label('ステータス'),
});

const Constructions: NextPageWithLayout<Props> = ({ constructionId }) => {
  const formMethods = useForm<statusType>({
    mode: 'onChange',
    resolver: yupResolver(statusSchema),
  });
  const { toast } = useContext(ToastContext);
  const buttonType = 'p-button-success p-button-sm w-full';
  const [cmsAddModal, setCmsAddModal] = useState<boolean>(false);
  const [documentAddModal, setDocumentAddModal] = useState<boolean>(false);
  const [estimateAddModal, setEstimateAddModal] = useState<boolean>(false);

  const [completionDate, setCompletionDate] = useState<string>('');
  // set status
  const [status, setStatus] = useState<statusType>();

  const fetchConstructionDetailData = useRef(true);

  // const [sales] = useState([
  //   {
  //     title: '売上',
  //     estimatedName: '見積金額',
  //     estimated: '',
  //     orderAmountName: '受注金額',
  //     orderAmount: '',
  //     saleAmountName: '売上金額',
  //     saleAmount: '',
  //     saleAmountName1: '売上金額',
  //     saleAmount1: '',
  //     assessedName: '売上金額',
  //     assessed: '',
  //   },
  //   {
  //     title: '原価',
  //     estimatedName: '想定原価',
  //     estimated: '',
  //     orderAmountName: '想定原価',
  //     orderAmount: '',
  //     saleAmountName: '実行予算',
  //     saleAmount: '',
  //     saleAmountName1: '最終予想原価',
  //     saleAmount1: '',
  //     assessedName: '査定済',
  //     assessed: '',
  //   },
  //   {
  //     title: '粗利',
  //     estimatedName: '粗々利益額',
  //     estimated: '',
  //     orderAmountName: '利益額',
  //     orderAmount: '',
  //     saleAmountName: '利益額',
  //     saleAmount: '',
  //     saleAmountName1: '粗利額',
  //     saleAmount1: '',
  //     assessedName: '粗利額',
  //     assessed: '',
  //   },
  //   {
  //     title: '利益率',
  //     estimatedName: '粗々利益率',
  //     estimated: '',
  //     orderAmountName: '利益率',
  //     orderAmount: '',
  //     saleAmountName: '利益率',
  //     saleAmount: '',
  //     saleAmountName1: '粗利率',
  //     saleAmount1: '',
  //     assessedName: '粗利率',
  //     assessed: '',
  //   },
  // ]);

  const [construction, setConstruction] = useState<TypeConstructionDetail>();
  const fetchConstructionData = async () => {
    if (fetchConstructionDetailData.current) {
      fetchConstructionDetailData.current = false;
      await getConstruction(constructionId)
        .then((response) => {
          setConstruction(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    // fetch construction
    fetchConstructionData();
  }, [constructionId]);

  const onHideModal = () => {
    setCmsAddModal(false);
  };

  const onSubmitAssignedCms = (data: workFlowConditionType) => {
    // return '';
    //   // API呼び出す
    // const requestBody = {
    //   data,
    // };
    addWorkflowCondition(constructionId, data)
      .then(() => {
        toast.current?.show(
          toastMessage(MESSAGES.API_RESULT.ADD.SUCCESS('ワークフロー承認状況')),
        );
        fetchConstructionData();
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
              MESSAGES.API_RESULT.ADD.FAILURE('ワークフロー承認状況'),
            ),
          );
        }
      });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('jp-JP');
  };

  if (!construction) return <div>loading...</div>;

  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header=" " alignHeader="center" />
        <Column header="見積" colSpan={2} alignHeader="center" />
        <Column header="受注" colSpan={2} alignHeader="center" />
        <Column header="実行予算" colSpan={2} alignHeader="center" />
        <Column header="工事中" colSpan={2} alignHeader="center" />
        <Column header="完成" colSpan={2} alignHeader="center" />
      </Row>
    </ColumnGroup>
  );

  const inputBodyTemplate = (rowData: any) => {
    if (rowData.product == '見積金額') {
      return '';
    } else if (rowData.product == '想定原価') {
      return '';
    } else {
      return '';
    }
  };

  const input2BodyTemplate = (rowData: any) => {
    if (rowData.lastYearSale == '受注金額') {
      return '';
    } else if (rowData.product == '想定原価') {
      return '';
    } else {
      return '';
    }
  };

  const sales = [
    {
      title: '売上',
      estimatedName: '見積金額',
      estimated:
        construction?.estimated_amount != undefined ||
        construction?.estimated_amount != null
          ? prefixYenSign(
            changeFormatCurrency(
              toFixed(Number(construction?.estimated_amount), 2),
            ),
          )
          : '',
      orderAmountName: '受注金額',
      orderAmount:
        construction?.order_amount != undefined ||
        construction?.order_amount != null
          ? prefixYenSign(
            changeFormatCurrency(
              toFixed(Number(construction?.order_amount), 2),
            ),
          )
          : '',
      saleAmountName: '売上金額',
      saleAmount:
        construction?.sales_amount != undefined ||
        construction?.sales_amount != null
          ? prefixYenSign(
            changeFormatCurrency(
              toFixed(Number(construction?.sales_amount), 2),
            ),
          )
          : '',
      saleAmountName1: '売上金額',
      saleAmount1:
        construction?.sales_amount != undefined ||
        construction?.sales_amount != null
          ? prefixYenSign(
            changeFormatCurrency(toFixed(construction?.sales_amount, 2)),
          )
          : '',
      assessedName: '売上金額',
      assessed:
        construction?.sales_amount != undefined ||
        construction?.sales_amount != null
          ? prefixYenSign(
            changeFormatCurrency(
              toFixed(Number(construction?.sales_amount), 2),
            ),
          )
          : '',
    },
    {
      title: '原価',
      estimatedName: '想定原価',
      estimated:
        construction?.estimated_assumption_cost != undefined ||
        construction?.estimated_assumption_cost != null
          ? prefixYenSign(
            changeFormatCurrency(
              toFixed(Number(construction?.estimated_assumption_cost), 2),
            ),
          )
          : '',
      orderAmountName: '想定原価',
      orderAmount:
        construction?.order_assumption_cost != undefined ||
        construction?.order_assumption_cost != null
          ? prefixYenSign(
            changeFormatCurrency(
              toFixed(Number(construction?.order_assumption_cost), 2),
            ),
          )
          : '',
      saleAmountName: '実行予算',
      saleAmount:
        construction?.working_budget != undefined ||
        construction?.working_budget != null
          ? prefixYenSign(
            changeFormatCurrency(
              toFixed(Number(construction?.working_budget), 2),
            ),
          )
          : '',
      saleAmountName1: '最終予想原価',
      saleAmount1:
        construction?.final_expected_cost != undefined ||
        construction?.final_expected_cost != null
          ? prefixYenSign(
            changeFormatCurrency(
              toFixed(Number(construction?.final_expected_cost), 2),
            ),
          )
          : '',
      assessedName: '査定済',
      assessed:
        construction?.achievement != undefined ||
        construction?.achievement != null
          ? prefixYenSign(
            changeFormatCurrency(
              toFixed(Number(construction?.achievement), 2),
            ),
          )
          : '',
    },
    {
      title: '粗利',
      estimatedName: '粗々利益額',
      estimated:
        construction?.gross_profit_amount_1 != undefined ||
        construction?.gross_profit_amount_1 != null
          ? prefixYenSign(
            changeFormatCurrency(
              toFixed(Number(construction?.gross_profit_amount_1), 2),
            ),
          )
          : '',
      orderAmountName: '利益額',
      orderAmount:
        construction?.gross_profit_amount_2 != undefined ||
        construction?.gross_profit_amount_2 != null
          ? prefixYenSign(
            changeFormatCurrency(
              toFixed(Number(construction?.gross_profit_amount_2), 2),
            ),
          )
          : '',
      saleAmountName: '利益額',
      saleAmount:
        construction?.gross_profit_amount_3 != undefined ||
        construction?.gross_profit_amount_3 != null
          ? prefixYenSign(
            changeFormatCurrency(
              toFixed(Number(construction?.gross_profit_amount_3), 2),
            ),
          )
          : '',
      saleAmountName1: '粗利額',
      saleAmount1:
        construction?.gross_profit_amount_4 != undefined ||
        construction?.gross_profit_amount_4 != null
          ? prefixYenSign(
            changeFormatCurrency(
              toFixed(Number(construction?.gross_profit_amount_4), 2),
            ),
          )
          : '',
      assessedName: '粗利額',
      assessed:
        construction?.gross_profit_amount_5 != undefined ||
        construction?.gross_profit_amount_5 != null
          ? prefixYenSign(
            changeFormatCurrency(
              toFixed(Number(construction?.gross_profit_amount_5), 2),
            ),
          )
          : '',
    },
    {
      title: '利益率',
      estimatedName: '粗々利益率',
      estimated:
        construction?.gross_profit_rate_1 != undefined ||
        construction?.gross_profit_rate_1 != null
          ? postfixPercentSign(
            toFixed(Number(construction?.gross_profit_rate_1), 2),
          )
          : '',
      orderAmountName: '利益率',
      orderAmount:
        construction?.gross_profit_rate_2 != undefined ||
        construction?.gross_profit_rate_2 != null
          ? postfixPercentSign(
            toFixed(Number(construction?.gross_profit_rate_2), 2),
          )
          : '',
      saleAmountName: '利益率',
      saleAmount:
        construction?.gross_profit_rate_3 != undefined ||
        construction?.gross_profit_rate_3 != null
          ? postfixPercentSign(
            toFixed(Number(construction?.gross_profit_rate_3), 2),
          )
          : '',
      saleAmountName1: '粗利率',
      saleAmount1:
        construction?.gross_profit_rate_4 != undefined ||
        construction?.gross_profit_rate_4 != null
          ? postfixPercentSign(
            toFixed(Number(construction?.gross_profit_rate_4), 2),
          )
          : '',
      assessedName: '粗利率',
      assessed:
        construction?.gross_profit_rate_5 != undefined ||
        construction?.gross_profit_rate_5 != null
          ? postfixPercentSign(
            toFixed(Number(construction?.gross_profit_rate_5), 2),
          )
          : '',
    },
  ];

  // データ登録
  // const onSubmit = () => {
  //   // const requestBody = {
  //   //   // "workflow_type": 15,
  //   //   employee_id: 5,
  //   //   application_date: completionDate,
  //   //   status: 4,
  //   // };
  //   // if (completionDate) {
  //   //   console.log('DATA');
  //   //   const requestBody = {
  //   //     workflow_type: 15,
  //   //     employee_id: 5,
  //   //     application_date: new Date(completionDate),
  //   //     status: 4,
  //   //   };
  //   const requestBody = {
  //     workflow_type: 15,
  //     employee_id: 1,
  //     status: 1,
  //     application_date: new Date(completionDate),
  //   };
  //   // API呼び出す
  //   addWorkflowCondition(constructionId, requestBody)
  //     .then(() => {
  //       toast.current?.show(
  //         toastMessage(MESSAGES.API_RESULT.ADD.SUCCESS('ワークフロー承認状況')),
  //       );
  //     })
  //     .catch(() => {
  //       toast.current?.show(
  //         toastErrorMessage(
  //           MESSAGES.API_RESULT.ADD.FAILURE('ワークフロー承認状況'),
  //         ),
  //       );
  //     });
  //   // }
  // };

  const onSubmit = (status: statusType) => {
    setStatus(status);
  };

  const onSubmitDate = (data: any) => {
    console.log(data);
  };

  let structure_src = '';
  let structure_rc = '';
  let structure_s = '';
  let structure_wooden = '';
  if (construction.structure_src) {
    structure_src = 'SRC造';
  }
  if (construction.structure_rc) {
    structure_rc = 'RC造';
  }
  if (construction.structure_s) {
    structure_s = 'S造';
  }
  if (construction.structure_wooden) {
    structure_wooden = '木造';
  }
  // 東西区分
  // let east_west = '';
  // if (construction.east_west_division === 1) {
  //   east_west = '大阪';
  // }
  // if (construction.east_west_division === 2) {
  //   east_west = '東京';
  // }
  // const repair = '';
  let east_west = '';
  const east_west_obj = { 0: '大阪', 1: '東京' };
  for (const [key, value] of Object.entries(east_west_obj)) {
    if (parseInt(key) === construction.east_west_division) {
      east_west = value;
    }
  }
  let new_repair = '';
  const new_repair_obj = { 0: '新築工事', 1: '営繕工事' };
  for (const [key, value] of Object.entries(new_repair_obj)) {
    if (parseInt(key) === construction.new_repair_division) {
      new_repair = value;
    }
  }

  const overviewRoute = (overviewId: number) => {
    if (overviewId) {
      Router.push(`/constructions/${constructionId}/overviews/${overviewId}`);
    } else {
      Router.push(`/constructions/${constructionId}/overviews/new`);
    }
  };

  return (
    <>
      <Head>
        <title>工事詳細</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      {/* メニュー */}
      <ConstructionMenu construction={construction} />
      <Header title="工事詳細" isSubTitle={true} />
      <div className="formgrid grid">
        <div className="col-12">
          <h3 className="mt-0 mb-1">
            {`${construction.construction_code}${'　'}${
              construction.construction_name
            }`}
          </h3>
        </div>
        {/* <div className="col-4">
          <h3 className="mt-0 mb-2">{construction.customer.company_name}</h3>
        </div>
        <div className="col-4">
          <h3 className="mt-0 mb-2">{construction.construction_name}</h3>
        </div> */}
      </div>
      <div className="col-12 pt-1 flex">
        <div className="flex p-1 col-6">
          {/* <div className="flex-1 h-full"> */}

          <table className={styles['table']} style={{ height: '60%' }}>
            <thead>
              {/* <tr>
                <td className={styles['con-info-label']}>工事コード</td>
                <td className={styles['con-info-data']}>
                  {construction.construction_code}
                </td>
              </tr>
              <tr>
                <td className={styles['con-info-label']}>工事名</td>
                <td className={styles['con-info-data']}>
                  {construction.construction_name}
                </td>
              </tr> */}
              <tr>
                <td className={styles['con-info-label']}>得意先名</td>
                <td className={styles['con-info-data']}>
                  {construction.customer.company_name}
                  {'　'}
                  {construction.customer_department_name
                    ? construction.customer_department_name
                    : ''}
                </td>
              </tr>
              <tr>
                <td className={styles['con-info-label']}>住所</td>
                <td className={styles['con-info-data']}>
                  {`〒${construction.zipcode ? construction.zipcode : ''} ${
                    construction.prefecture ? construction.prefecture : ''
                  } ${
                    construction.municipality ? construction.municipality : ''
                  }${construction.address_1 ? construction.address_1 : ''} ${
                    construction.address_2 ? construction.address_2 : ''
                  }`}
                </td>
              </tr>
              <tr>
                <td className={styles['con-info-label']}>構造</td>
                <td className={styles['con-info-data']}>
                  {`${structure_rc} ${structure_s} ${structure_src} ${structure_wooden}`}
                </td>
              </tr>
              <tr>
                <td className={styles['con-info-label']}>敷地面積</td>
                <td className={styles['con-info-data']}>
                  {`${
                    construction.site_area ? construction.site_area + '㎡' : ''
                  }  (${setAreaValue(construction.site_area)}坪)`}
                </td>
              </tr>
              <tr>
                <td className={styles['con-info-label']}>建築面積</td>
                <td className={styles['con-info-data']}>
                  {`${
                    construction.building_area
                      ? construction.building_area + '㎡'
                      : ''
                  }  (${setAreaValue(construction.building_area)}坪)`}
                </td>
              </tr>
              <tr>
                <td className={styles['con-info-label']}>延べ床面積</td>
                <td className={styles['con-info-data']}>
                  {`${
                    construction.total_floor_area
                      ? construction.total_floor_area + '㎡'
                      : ''
                  }  (${setAreaValue(construction.total_floor_area)}坪)`}
                </td>
              </tr>
              <tr>
                <td className={styles['con-info-label']}>商材</td>
                <td className={styles['con-info-data']}>
                  {`${construction.product ? construction.product : ''}`}
                </td>
              </tr>
            </thead>
          </table>
          {/* </div> */}
        </div>
        <div className="flex p-1 col-6">
          <div className="flex-1 h-full">
            <table className={styles['table']}>
              <thead>
                <tr>
                  <td className={styles['con-info-label']}>東西区分</td>
                  <td className={styles['con-info-data']}>{`${east_west}`}</td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>区分</td>
                  <td className={styles['con-info-data']}>{`${new_repair}`}</td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>ブランド</td>
                  <td
                    className={styles['con-info-data']}
                  >{`${construction.main_brand.brand_name}`}</td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>サブブランド</td>
                  <td
                    className={styles['con-info-data']}
                  >{`${construction.sub_brand1.brand_name}  ${construction.sub_brand2.brand_name}`}</td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>担当者</td>
                  <td
                    className={styles['con-info-data']}
                    style={{ backgroundColor: '#FFFFFF' }}
                  >
                    oo oo
                  </td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>契約mail</td>
                  <td className={styles['con-info-data']}>{`${
                    construction.contract_email_address
                      ? construction.contract_email_address
                      : ''
                  }`}</td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>電話番号</td>
                  <td className={styles['con-info-data']}>{`${
                    construction.phone_no ? construction.phone_no : ''
                  }`}</td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>工事内容</td>
                  <td className={styles['con-info-data']}>{`${
                    construction.construction_content
                      ? construction.construction_content
                      : ''
                  }`}</td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <div className="contents">
        {/* <div className="flex justify-content-evenly p-1">
          <div className="flex-1 h-full">
            <div className="formgrid grid">
              <div className="col-4">
                <h3 className="mt-0 mb-2">{construction.construction_code}</h3>
              </div>
              <div className="col-4">
                <h3 className="mt-0 mb-2">
                  {construction.customer.company_name}
                </h3>
              </div>
              <div className="col-4">
                <h3 className="mt-0 mb-2">{construction.construction_name}</h3>
              </div>
              <div className="col-4">
                <ContentHeadingInline heading="得意先名" />
              </div>
              <div className="col-4">
                <ContentInline
                  heading={`${construction.customer.company_name}`}
                />
              </div>
              <div className="col-4">
                {construction.customer_department_name
                  ? construction.customer_department_name
                  : ''}
              </div>
              <div className="col-4">
                <ContentHeadingInline heading="住所" />
              </div>
              <div className="col-8">
                <ContentInline
                  heading={`〒${
                    construction.zipcode ? construction.zipcode : ''
                  } ${construction.prefecture ? construction.prefecture : ''} ${
                    construction.municipality ? construction.municipality : ''
                  }${construction.address_1 ? construction.address_1 : ''} ${
                    construction.address_2 ? construction.address_2 : ''
                  }`}
                />
              </div>
              <div className="col-4">
                <ContentHeadingInline heading="構造" />
              </div>
              <div className="col-8 formgrid grid ml-0">
                <ContentInline
                  heading={`${structure_rc} ${structure_s} ${structure_src} ${structure_wooden}`}
                />
                <div className="col-12 md:col-2 ml-8">
                  <ContentHeadingInline heading="階数" />
                </div>
                <div className="col-12 md:col">
                  <ContentInline
                    heading={`地上  ${
                      construction.ground_floor ? construction.ground_floor : ''
                    }階／地下  ${
                      construction.underground_floor
                        ? construction?.underground_floor
                        : ''
                    }階`}
                  />
                </div>
              </div>
              <div className="col-4">
                <ContentHeadingInline heading="敷地面積" />
              </div>
              <div className="col-8">
                <ContentInline
                  heading={`${
                    construction.site_area ? construction.site_area + '㎡' : ''
                  }  (${setAreaValue(construction.site_area)}坪)`}
                />
              </div>
              <div className="col-4">
                <ContentHeadingInline heading="建築面積" />
              </div>
              <div className="col-8">
                <ContentInline
                  heading={`${
                    construction.building_area
                      ? construction.building_area + '㎡'
                      : ''
                  }  (${setAreaValue(construction.building_area)}坪)`}
                />
              </div>
              <div className="col-4">
                <ContentHeadingInline heading="延べ床面積" />
              </div>
              <div className="col-8">
                <ContentInline
                  heading={`${
                    construction.total_floor_area
                      ? construction.total_floor_area + '㎡'
                      : ''
                  }  (${setAreaValue(construction.total_floor_area)}坪)`}
                />
              </div>
              <div className="col-4">
                <ContentHeadingInline heading="商材" />
              </div>
              <div className="col-8">
                <ContentInline
                  heading={`${
                    construction.product ? construction.product : ''
                  }`}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 h-full">
            <div className="grid">
              <div className="col-2">
                <ContentHeadingInline heading="東西区分" />
              </div>
              <div className="col-2">
                <ContentInline heading={`${east_west}`} />
              </div>
              <div className="col-1">
                <ContentHeadingInline heading="区分" />
              </div>
              <div className="col-2">
                <ContentInline heading={`${new_repair}`} />
              </div>
              <div className="col-2">
                <ContentHeadingInline heading="ブランド" />
              </div>
              <div className="col-2 ml-1">
                <ContentInline
                  heading={`${construction.main_brand.brand_name}`}
                />
              </div>
            </div>
            <div className="grid">
              <div className="col-7"></div>
              <div className="col-2 px-2 py-1">
                <ContentHeadingInline heading="サブブランド" />
              </div>
              <div className="col ml-1">
                <ContentInline
                  heading={`${construction.sub_brand1.brand_name}  ${construction.sub_brand2.brand_name}`}
                />
                <span></span>
              </div>
            </div>
            <div className="grid">
              <div className="col-2 surface-400">
                <ContentHeadingInline heading="担当者" />
              </div>
              <div className="col-2 surface-400">
                <ContentInline heading="oo oo" />
              </div>
              <div className="col-2">
                <ContentHeadingInline heading="契約mail" />
              </div>
              <div className="col-5 pr-6">
                <ContentInline
                  heading={`${
                    construction.contract_email_address
                      ? construction.contract_email_address
                      : ''
                  }`}
                />
              </div>
            </div>
            <div className="grid">
              <div className="col-2">
                <ContentHeadingInline heading="電話番号" />
              </div>
              <div className="col-10">
                <ContentInline
                  heading={`${
                    construction.phone_no ? construction.phone_no : ''
                  }`}
                />
              </div>
            </div>
            <div className="grid">
              <div className="col-2">
                <ContentHeadingInline heading="工事内容" />
              </div>
              <div className="col-10">
                <div className="flex align-items-center surface-border w-full">
                  <ContentInline
                    heading={`${
                      construction.construction_content
                        ? construction.construction_content
                        : ''
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex justify-content-start">
          <div className="flex align-items-center justify-content-center m-2 ml-0">
            <Button
              label="工事ダッシュボード"
              className={`${buttonType}`}
              onClick={() =>
                Router.push(`/constructions/${constructionId}/dashboard`)
              }
            />
          </div>
          <div className="flex align-items-center justify-content-center m-2">
            <Button
              label="工事概要"
              className={`${buttonType}`}
              // onClick={() => Router.push('/#')}
              onClick={() => overviewRoute(construction.overview.id)}
            />
          </div>
          <div className="flex align-items-center justify-content-center m-2">
            <Button
              label="工事体制"
              className={`${buttonType}`}
              onClick={() =>
                Router.push(`/constructions/${constructionId}/structures`)
              }
            />
          </div>
        </div>
        <hr></hr>
        <div className="contents col-12 flex">
          <div className="flex p-1 col-4">
            <table className={styles['table']} style={{ height: '80px' }}>
              <thead>
                <tr>
                  <td
                    className={styles['con-info-label']}
                    style={{ width: '30%' }}
                  >
                    予定工事開始日
                  </td>
                  <td
                    className={styles['con-info-data']}
                    style={{ width: '200px' }}
                  >
                    {`${
                      construction.schedule_construction_start_date
                        ? dayjs(
                          construction.schedule_construction_start_date,
                        ).format('YYYY/MM/DD')
                        : ''
                    }  `}
                  </td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>予定工事完了日</td>
                  <td className={styles['con-info-data']}>
                    {`${
                      construction.schedule_construction_end_date
                        ? dayjs(
                          construction.schedule_construction_end_date,
                        ).format('YYYY/MM/DD')
                        : ''
                    }`}
                  </td>
                </tr>
              </thead>
            </table>
          </div>
          <div className="flex p-1 col-4">
            <table className={styles['table']} style={{ height: '80px' }}>
              <thead>
                <tr>
                  <td
                    className={styles['con-info-label']}
                    // style={{ width: '30%' }}
                  >
                    見積提出日
                  </td>
                  <td className={styles['con-info-data']}>
                    {`${
                      construction.estimated_date
                        ? dayjs(construction.estimated_date).format(
                          'YYYY/MM/DD',
                        )
                        : ''
                    }`}
                  </td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>受注日</td>
                  <td className={styles['con-info-data']}>
                    {`${
                      construction.order_date
                        ? dayjs(construction.order_date).format('YYYY/MM/DD')
                        : ''
                    }`}
                  </td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>契約日</td>
                  <td className={styles['con-info-data']}>
                    {`${
                      construction.contract_date
                        ? dayjs(construction.contract_date).format('YYYY/MM/DD')
                        : ''
                    }`}
                  </td>
                </tr>
              </thead>
            </table>
          </div>
          <div className="flex p-1 col-4">
            <table className={styles['table']} style={{ height: '80px' }}>
              <thead>
                <tr>
                  <td
                    className={styles['con-info-label']}
                    // style={{ width: '30%' }}
                  >
                    更新日
                  </td>
                  <td className={styles['con-info-data']}>
                    {`${
                      construction.updated_at
                        ? dayjs(construction.updated_at).format('YYYY/MM/DD')
                        : ''
                    }`}
                  </td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>工事完了日</td>
                  <td className={styles['con-info-data']}>
                    {`${
                      construction.construction_completion_date
                        ? dayjs(
                          construction.construction_completion_date,
                        ).format('YYYY/MM/DD')
                        : ''
                    }`}
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        {/* <div className="grid">
          <div className="col-5 h-full block">
            <div className="formgrid grid">
              <div className="field col-3">
                <ContentHeadingInline heading="予定工事開始日" />
              </div>
              <div className="col-9 flex flex-row">
                <div className="field w-10rem mr-2">
                  <ContentInline
                    heading={`${
                      construction.schedule_construction_start_date
                        ? dayjs(
                            construction.schedule_construction_start_date,
                          ).format('YYYY/MM/DD')
                        : ''
                    }  `}
                  />
                </div>
                <div className="field w-4rem ml-3">〜</div>
                <div className="field w-12rem">
                  <ContentHeadingInline heading="予定工事完了日" />
                </div>
                <div className="field w-10rem">
                  <ContentInline
                    heading={`${
                      construction.schedule_construction_end_date
                        ? dayjs(
                            construction.schedule_construction_end_date,
                          ).format('YYYY/MM/DD')
                        : ''
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-7 h-full block">
            <div className="formgrid grid">
              <div className="col-4 col-offset-8 flex flex-row-reverse">
                <div className="field w-10rem">
                  <ContentInline
                    heading={`${
                      construction.updated_at
                        ? dayjs(construction.updated_at).format('YYYY/MM/DD')
                        : ''
                    }`}
                  />
                </div>
                <div className="field w-5rem mr-2">
                  <ContentHeadingInline heading="更新日" />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="formgrid grid">
          <div className="col-9 flex flex-row">
            <div className="field w-6rem"></div>
            <div className="field w-7rem mr-2">
              <ContentHeadingInline heading="見積提出日" />
            </div>
            <div className="field w-9rem mr-2">
              <ContentInline
                heading={`${
                  construction.estimated_date
                    ? dayjs(construction.estimated_date).format('YYYY/MM/DD')
                    : ''
                }`}
              />
            </div>
            <div className="field w-7rem mr-2">
              <ContentHeadingInline heading="受注日" />
            </div>
            <div className="field w-9rem mr-2">
              <ContentInline
                heading={`${
                  construction.order_date
                    ? dayjs(construction.order_date).format('YYYY/MM/DD')
                    : ''
                }`}
              />
            </div>
            <div className="field w-7rem mr-2">
              <ContentHeadingInline heading="契約日" />
            </div>
            <div className="field w-9rem">
              <ContentInline
                heading={`${
                  construction.contract_date
                    ? dayjs(construction.contract_date).format('YYYY/MM/DD')
                    : ''
                }`}
              />
            </div>
          </div>
          <div className="col-3 flex flex-row-reverse">
            <div className="field w-10rem">
              <ContentInline
                heading={`${
                  construction.construction_completion_date
                    ? dayjs(construction.construction_completion_date).format(
                        'YYYY/MM/DD',
                      )
                    : ''
                }`}
              />
            </div>
            <div className="field w-5rem mr-2">
              <ContentHeadingInline heading="工事完了日" />
            </div>
          </div>
        </div> */}
        <DataTable
          value={sales}
          size="small"
          headerColumnGroup={headerGroup}
          showGridlines
          emptyMessage=" "
          className="constructions-cal-table"
        >
          <Column field="title" className="text-sm" style={{ width: '80px' }} />
          <Column
            field="estimatedName"
            className="text-sm "
            style={{ width: '110px' }}
          />
          <Column
            field="estimated"
            // body={inputBodyTemplate}
            className="text-sm w-11rem"
            align="right"
            style={{ wordBreak: 'break-word' }}
          />
          <Column
            field="orderAmountName"
            className="text-sm"
            style={{ width: '100px' }}
          />
          <Column
            field="orderAmount"
            // body={inputBodyTemplate}
            className="text-sm w-11rem"
            align="right"
            style={{ wordBreak: 'break-word' }}
          />
          <Column
            field="saleAmountName"
            className="text-sm"
            style={{ width: '100px' }}
          />
          <Column
            field="saleAmount"
            // body={inputBodyTemplate}
            className="text-sm w-11rem"
            align="right"
            style={{ wordBreak: 'break-word' }}
          />
          <Column
            field="saleAmountName1"
            className="text-sm"
            style={{ width: '130px' }}
          />
          <Column
            field="saleAmount1"
            className="text-sm w-11rem"
            align="right"
            style={{ wordBreak: 'break-word' }}
          />
          <Column
            field="assessedName"
            className="text-sm"
            style={{ width: '100px' }}
          />
          <Column
            field="assessed"
            className="text-sm w-11rem"
            align="right"
            style={{ wordBreak: 'break-word' }}
          />
        </DataTable>
        {/* <div className="flex h-full pt-3">
          <div className="formgrid grid w-3">
            <div className="col-4">
              <ContentHeadingInline heading="想定人工" />
            </div>
            <div className="col-8 pt-2">
              <ContentInline
                heading={`${
                  construction.assumption_artificial
                    ? construction.assumption_artificial + '人／日'
                    : ''
                }`}
              />
            </div>
          </div>
        </div> */}
        <div className="formgrid grid pt-2 pl-2">
          <div className={cx('header', 'field pl-2  pt-2 w-9rem mb-0')}>
            <div className={cx('heading-text')}>想定人工</div>
          </div>
          <div className="pl-2">
            <ContentInline
              heading={`${
                construction.assumption_artificial != undefined ||
                construction.assumption_artificial != null
                  ? changeFormatCurrency(
                    toFixed(Number(construction.assumption_artificial), 2),
                  ) + '人／日'
                  : ''
              }`}
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 h-full -ml-2">
            <div className="formgrid grid col-7">
              <div className="col-12 md:col mb-2">
                <Button
                  label="見積申請"
                  className={`${buttonType}`}
                  onClick={() =>
                    Router.push(
                      `/constructions/${constructionId}/estimates/summary`,
                    )
                  }
                  disabled={
                    construction.status == '4' ||
                    construction.application_status === 1 ||
                    construction.application_status === 2 ||
                    construction.application_status === 3
                      ? true
                      : false
                  }
                />
              </div>
              <div className="col-12 md:col">
                <Button
                  label="見積書発行"
                  className={`${buttonType}`}
                  onClick={() => setEstimateAddModal(true)}
                  disabled={
                    construction.status == '4' ||
                    construction.application_status === 1 ||
                    construction.application_status === 2 ||
                    construction.application_status === 3
                      ? true
                      : false
                  }
                />
              </div>
              {/* <div className="col-12 md:col">
                <Button
                  label="受注申請"
                  className={`${buttonType}`}
                  // onClick={() => Router.push('/#')}
                />
              </div> */}
              <div className="col-12 md:col">
                <Button
                  label="請求書発行"
                  className={`${buttonType}`}
                  onClick={() =>
                    Router.push(`/constructions/${constructionId}/invoices`)
                  }
                  disabled={
                    construction.application_status === 1 ||
                    construction.application_status === 2 ||
                    construction.application_status === 3
                      ? true
                      : false
                  }
                />
              </div>
            </div>
          </div>
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <div className="flex-1 h-full bg-">
                <div className="formgrid form grid">
                  <div className="col-12 md:col-4 pt-2">
                    <ContentHeadingInline heading="ステータス" />
                  </div>
                  <div className="col-12 md:col-4 pt-1">
                    <DropdownForm
                      items={statusitems}
                      name="statusitems"
                      placeholder=""
                      className="w-14rem"
                      defaultValue={`${String(construction.status)}`}
                      disabled
                    />
                  </div>
                  <div className="col-12 md:col-4">
                    <Button
                      type="submit"
                      label="完了申請"
                      className={`${buttonType}`}
                      onClick={() => setDocumentAddModal(true)}
                      disabled={
                        construction.status == '4' ||
                        construction.application_status === 1 ||
                        construction.application_status === 2 ||
                        construction.application_status === 3
                          ? true
                          : false
                      }
                      // onClick={onSubmitDate}
                    />
                    {/* <Button
                      type="button"
                      label="完了申請"
                      className={`${buttonType}`}
                      onClick={() => setDocumentAddModal(true)}
                      // onClick={onSubmitDate}
                    /> */}
                  </div>
                  <ConstructionCompleteDialog
                    isOpen={documentAddModal}
                    onHide={() => setDocumentAddModal(false)}
                    onSubmit={onSubmitAssignedCms}
                    isLoading={true}
                    status={status}
                    main_brand_id={construction.main_brand.id}
                    // parentCallback={parentCallback}
                  />

                  <ConstructionEstimateDialog
                    isOpen={estimateAddModal}
                    onHide={() => setEstimateAddModal(false)}
                    isLoading={true}
                    construction={construction}
                    issueType={'工事詳細'}
                  />
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
        <hr></hr>
        <div className="contents col-12 flex">
          <div className="flex p-1 col-4">
            <table className={styles['table']} style={{ width: '80%' }}>
              <thead>
                <tr>
                  <td
                    className={styles['con-info-label']}
                    style={{ width: '27%' }}
                  >
                    DR0
                  </td>
                  <td className={styles['con-info-data']}>
                    {`${
                      construction.dr0
                        ? dayjs(construction.dr0).format('YYYY/MM/DD')
                        : ''
                    }`}
                  </td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>DR1</td>
                  <td className={styles['con-info-data']}>
                    {`${
                      construction.dr1
                        ? dayjs(construction.dr1).format('YYYY/MM/DD')
                        : ''
                    }`}
                  </td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>DR2</td>
                  <td className={styles['con-info-data']}>
                    {`${
                      construction.dr2
                        ? dayjs(construction.dr2).format('YYYY/MM/DD')
                        : ''
                    }`}
                  </td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>確認申請完了日</td>
                  <td className={styles['con-info-data']}>
                    {`${
                      construction.confirmation_application
                        ? dayjs(construction.confirmation_application).format(
                          'YYYY/MM/DD',
                        )
                        : ''
                    }`}
                  </td>
                </tr>
              </thead>
            </table>
          </div>
          <div className="flex p-1 pl-3 col-6">
            <table className={styles['table']} style={{ height: '100px' }}>
              <thead>
                <tr>
                  <td
                    className={styles['con-info-label']}
                    // style={{ width: '27%' }}
                  >
                    消防検査実施日
                  </td>
                  <td className={styles['con-info-data']}>
                    {`${
                      construction.fire_inspection_date
                        ? dayjs(construction.fire_inspection_date).format(
                          'YYYY/MM/DD',
                        )
                        : ''
                    }`}
                  </td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>作業所スコア</td>
                  <td className={styles['con-info-data']}>
                    {`${
                      construction.work_place_score
                        ? construction.work_place_score
                        : ''
                    }`}
                  </td>
                </tr>
                <tr>
                  <td className={styles['con-info-label']}>
                    ユーザーズレビュー
                  </td>
                  <td className={styles['con-info-data']}>
                    {`${
                      construction.user_review ? construction.user_review : ''
                    }`}
                  </td>
                </tr>
              </thead>
            </table>
          </div>
          <div className="flex p-1 col-2"></div>
        </div>
        {/* <div className="flex justify-content-evenly">
          <div className="flex-1 h-full">
            <div className="formgrid grid">
              <div className="col pl-1 ml-1">
                <ContentHeadingInline heading="DR0" />
              </div>
              <div className="col-3">
                <ContentInline
                  heading={`${
                    construction.dr0
                      ? dayjs(construction.dr0).format('YYYY/MM/DD')
                      : ''
                  }`}
                />
              </div>
              <div className="col">
                <ContentHeadingInline heading="DR1" />
              </div>
              <div className="col-3">
                <ContentInline
                  heading={`${
                    construction.dr1
                      ? dayjs(construction.dr1).format('YYYY/MM/DD')
                      : ''
                  }`}
                />
              </div>
              <div className="col">
                <ContentHeadingInline heading="DR2" />
              </div>
              <div className="col-3">
                <ContentInline
                  heading={`${
                    construction.dr2
                      ? dayjs(construction.dr2).format('YYYY/MM/DD')
                      : ''
                  }`}
                />
              </div>
              <div className="formgrid grid flex-1 col-12 pt-3">
                <div className="col-3 w-8rem">
                  <ContentHeadingInline heading="確認申請完了日" />
                </div>
                <div className="col-3 pl-3 w-10rem">
                  <ContentInline
                    heading={`${
                      construction.confirmation_application
                        ? dayjs(construction.confirmation_application).format(
                            'YYYY/MM/DD',
                          )
                        : ''
                    }`}
                  />
                </div>
                <div className="col-3 w-8rem">
                  <ContentHeadingInline heading="消防検査実施日" />
                </div>
                <div className="col-3 w-10rem">
                  <ContentInline
                    heading={`${
                      construction.fire_inspection_date
                        ? dayjs(construction.fire_inspection_date).format(
                            'YYYY/MM/DD',
                          )
                        : ''
                    }`}
                  />
                  <input type={'hidden'} name="fireinspectionDate" />
                </div>
              </div>
              <div className="formgrid flex col-12 pt-3 pl-0">
                <div className="col-3 pl-1 ml-1">
                  <ContentHeadingInline heading="作業所スコア" />
                </div>
                <div className="col-9 ml-5">
                  <ContentInline
                    heading={`${
                      construction.work_place_score
                        ? construction.work_place_score
                        : ''
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 h-full">
            <div className="grid">
              <div className="col-3">
                <ContentHeadingInline heading="ユーザーズレビュー" />
              </div>
              <div className="col-9">
                <div className="flex align-items-center w-full ">
                  <ContentInline
                    heading={`${
                      construction.user_review ? construction.user_review : ''
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex justify-content-center">
          <div className="flex align-items-center justify-content-center m-2">
            <Button
              label="変更"
              className={`${buttonType}`}
              onClick={() =>
                Router.push(`/constructions/${constructionId}/edit`)
              }
              // onClick={onSubmit}
              disabled={
                construction.status == '4' ||
                construction.application_status === 1 ||
                construction.application_status === 2 ||
                construction.application_status === 3
                  ? true
                  : false
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Constructions;

Constructions.auth = true;
Constructions.pageId = 'EU_CONSTRUCTION_DETAIL';

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
