/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint-disable react-hooks/exhaustive-deps */
import { ParsedUrlQuery } from 'querystring';
import Button from '@mui/material/Button';
import cx from 'classnames';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getConstruction } from '@/api/construction';
import {
  addEstimateDetails,
  AddEstimateDetailsRequest,
  getEstimateDetails,
} from '@/api/estimateDetails';
import {
  addEstimatesCategoriesList,
  AddEstimatesCategoriesList,
  getEstimatesMenuList,
} from '@/api/estimatesCategories';
import { Header } from '@/components/commons/header/header';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import { EstimateManage } from '@/components/constructions/estimates/estimateManage';
import { EstimateMenu } from '@/components/constructions/estimates/estimateMenu';
import { EstimatesAddSmallItemDialog } from '@/components/constructions/estimates/estimatesAddSmallItemDialog';
import { EstimatesCategoriesDialog } from '@/components/constructions/estimates/estimatesCategoriesDialog';
import { ToastContext } from '@/components/context/toast/toast';
import { EstimateDetails } from '@/interfaces/estimateDetails';
import { EstimateJsonData } from '@/interfaces/estimateJsonData';
import { NextPageWithLayout } from '@/pages/_app';
import { TypeConstructionDetail } from '@/types/api/construction';
import type { EstimateCategoryMenu } from '@/types/api/estimateMenu';
import { API_STATUS_CODE } from '@/utils/constants/api';
import { MESSAGES } from '@/utils/constants/message';
import { validationErrorMessage, validationErrorMessageHtmlFormat } from '@/utils/messageUtils';
import { toastErrorMessage, toastMessage } from '@/utils/toastMessage';

type Props = {
  constructionId: number;
};

const Estimates: NextPageWithLayout<Props> = ({ constructionId }) => {
  const router = useRouter();
  const estimate_category_id_query = router.query.estimate_category_id;
  const middle_category_id_query = router.query.middle_category_id;
  const middle_category_name_query = router.query.middle_category_name;

  const [estimationMenu, setEstimationMenu] = useState<EstimateCategoryMenu>();
  const [estimateCategoryId, setEstimateCategoryId] = useState<any>();
  // estimate_category_id_query ? estimate_category_id_query : '',
  const [middleCategoryId, setMiddleCategoryId] = useState<any>();
  // middle_category_id_query ? middle_category_id_query : '',
  const [middleCategoryName, setMiddleCategoryName] = useState<any>(
    middle_category_name_query ? middle_category_name_query : '',
  );

  const [categoriesModal, setCategoriesModal] = useState<boolean>(false);
  const [fileAddModal, setFileAddModal] = useState<boolean>(false);
  const [dialog, setDialog] = useState<boolean>(false);
  const [fileType, setFileType] = useState('Excelペースト');
  // to fix selected id
  // const [estimate_category_id] = useState<number>(1);
  // to fix selected id
  // const [middle_category_id] = useState<number>(1);
  const [samll_category_id, setSmallCategoryId] = useState<any>(0);
  const [tableData, setTableData] = useState<EstimateJsonData[]>([]);
  const [disableStatus, setDisableStatus] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [excelFlag, setExcelFlag] = useState<boolean>(false);

  const onSubmitAssignedCsv = async (
    files: EstimateJsonData[],
    excelFlag: boolean,
  ) => {
    setDialog(true);
    setFileType('CSVアップロード');
    setTableData(files);
    setExcelFlag(excelFlag);
  };

  const onSubmitAssignedExcel = async (
    files: EstimateJsonData[],
    small_category_id: number,
    excelFlag: boolean,
  ) => {
    setDialog(true);
    setFileType('Excelペースト');
    setTableData(files);
    setSmallCategoryId(small_category_id);
    setExcelFlag(excelFlag);
  };

  // カテゴリー取得
  const fetchEstimatesCategoriesMenu = useCallback(async () => {
    const categories = await getEstimatesMenuList(constructionId);
    setEstimationMenu(categories);
    const estimate_category_id =
      categories.estimate_categories[0]?.large_categories.middle_categories[0]
        ?.estimate_category_id;
    setEstimateCategoryId(estimate_category_id);
    const middle_category_id =
      categories.estimate_categories[0]?.large_categories.middle_categories[0]
        ?.id;
    setMiddleCategoryId(middle_category_id);
    const middle_category_name =
      categories.estimate_categories[0]?.large_categories.middle_categories[0]
        ?.construction_type_name;
    setMiddleCategoryName(middle_category_name);
    if (
      categories.application_status == 1 ||
      categories.application_status == 2 ||
      categories.application_status == 3 ||
      categories.application_status == 5
    ) {
      setDisableStatus(true);
    }
  }, []);

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
    fetchEstimatesCategoriesMenu();
  }, [constructionId, refresh]);

  // カテゴリー登録
  const { toast } = useContext(ToastContext);
  const addEstimateCategories = (
    EstimatesCategoryType: AddEstimatesCategoriesList[],
  ) => {
    addEstimatesCategoriesList(constructionId, EstimatesCategoryType)
      .then(() => {
        toast.current?.show(
          toastMessage(MESSAGES.API_RESULT.SAVE.SUCCESS('清算見積カテゴリー')),
        );
        fetchEstimatesCategoriesMenu();
      })
      .catch(() => {
        toast.current?.show(
          toastErrorMessage(
            MESSAGES.API_RESULT.SAVE.FAILURE('清算見積カテゴリー'),
          ),
        );
      });
  };
  const addDetails = (EstimatesDetailType: AddEstimateDetailsRequest[]) => {
    addEstimateDetails(constructionId, EstimatesDetailType)
      .then(() => {
        toast.current?.show(
          toastMessage(MESSAGES.API_RESULT.SAVE.SUCCESS('清算見積追加確認')),
        );
        setRefresh(true);
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
            toastErrorMessage(
              MESSAGES.API_RESULT.SAVE.FAILURE('清算見積追加確認'),
            ),
          );
        }
      });
  };
  if (!construction) return <div>loading...</div>;
  return (
    <>
      <Head>
        <title>精算見積管理</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      {/* メニュー */}
      <ConstructionMenu construction={construction} />

      {/* <Header title="精算見積管理" isSubTitle={true} /> */}
      <h2 className="mt-0">
        {middle_category_name_query
          ? middle_category_name_query
          : middleCategoryName}
      </h2>

      <div className="flex col-12">
        <div className="col-2">
          <Button
            disabled={construction.status == '4' || disableStatus}
            variant="outlined"
            size="small"
            className={
              disableStatus
                ? `${cx('disable-button')}`
                : `${cx('link-button')}`
            }
            onClick={() => setCategoriesModal(true)}
          >
            カテゴリー登録
          </Button>
        </div>
        <div className="col-10 pl-5">
          {estimationMenu &&
          estimationMenu.estimate_categories &&
          estimationMenu.estimate_categories.length > 0 ? (
              <Button
                disabled={construction.status == '4' || disableStatus}
                variant="outlined"
                size="small"
                className={
                  disableStatus
                    ? `${cx('disable-button')}`
                    : `${cx('link-button')}`
                }
                onClick={() => {
                  setFileAddModal(true);
                  setRefresh(false);
                }}
              >
              小項目追加
              </Button>
            ) : (
              <Button
                disabled={true}
                variant="outlined"
                size="small"
                className={`${cx('disable-button')}`}
                onClick={() => {
                  setFileAddModal(true);
                  setRefresh(false);
                }}
              >
              小項目追加
              </Button>
            )}
          <EstimatesAddSmallItemDialog
            constructionId={constructionId}
            data={tableData}
            dialogStatus={dialog}
            isOpen={fileAddModal}
            fileType={fileType}
            onHide={() => setFileAddModal(false)}
            onSubmitcsv={onSubmitAssignedCsv}
            onSubmitexcel={onSubmitAssignedExcel}
            estimate_category_id={
              estimate_category_id_query
                ? estimate_category_id_query
                : estimateCategoryId
            }
            small_category_id={samll_category_id}
            excelFlag={excelFlag}
            middle_category_id={
              middle_category_id_query
                ? middle_category_id_query
                : middleCategoryId
            }
            middle_category_name={
              middle_category_name_query
                ? middle_category_name_query
                : middleCategoryName
            }
            isLoading={true}
            // onRefresh={() => router.reload()}
            addEstimateDetail={addDetails}
          />

          <EstimatesCategoriesDialog
            isOpen={categoriesModal}
            onHide={() => setCategoriesModal(false)}
            constructionId={constructionId}
            //onRefresh={() => router.reload()}
            addEstimateCategories={addEstimateCategories}
          />
        </div>
      </div>
      <div className="flex col-12">
        <div className="col-3 lg:col-2">
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
            />
          )}
        </div>
        <div className="col-9 lg:col-10 pl-2 lg:pl-3">
          {/* {<EstimateManage estimateDetails={estimateDetails}/>} */}
          {estimateCategoryId && (
            <EstimateManage
              disable={disableStatus}
              constructionId={constructionId}
              estimateCategoryId={
                estimate_category_id_query
                  ? estimate_category_id_query
                  : estimateCategoryId
              }
              refresh={refresh}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Estimates;

Estimates.auth = true;
Estimates.pageId = 'EU_CONSTRUCTION_ESTIMATE';

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
