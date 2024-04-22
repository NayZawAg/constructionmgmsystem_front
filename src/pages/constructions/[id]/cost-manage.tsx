/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint @typescript-eslint/no-explicit-any: 0 */
import { ParsedUrlQuery } from 'querystring';
import { yupResolver } from '@hookform/resolvers/yup';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Checkbox, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import cx from 'classnames';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Row } from 'primereact/row';
import { ScrollPanel } from 'primereact/scrollpanel';
import {
  ToggleButton,
  ToggleButtonChangeParams,
} from 'primereact/togglebutton';
import { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ScrollContainer from "react-indiana-drag-scroll";
import * as yup from 'yup';
import { getConstruction } from '@/api/construction';
import {
  getTotalCostsManageItems,
  TypeTotalCostManage,
} from '@/api/costManageCategories';
import { getCostsManageItems } from '@/api/costManageCategories';
import { getCostManageMenuList } from '@/api/costManageCategories';
import {
  addCostDetailsData,
  UpdateCostDetailCategory,
  UpdateCostSmallCategory,
} from '@/api/costManageCategories';
import { getDepartmentList, TypeDepartment } from '@/api/department';
import { getEstimateDetailsWithMiidle } from '@/api/estimateDetails';
import { getCostDetailsList, TypeOrderList } from '@/api/order';
import { getAllCostDetailsList, OrderData } from '@/api/order';
import { getReasonList, TypeReason } from '@/api/reason';
import layoutStyles from '@/components/commons/layout/layout.module.scss';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import { AddSmallItemDialog } from '@/components/constructions/cost/addSmallItemDialog';
import { CostManageMenu } from '@/components/constructions/costManage/costManageMenu';
import styles from '@/components/constructions/costManage/costManageMenu.module.scss';
import OrdersDialog from '@/components/constructions/costManage/ordersDialog';
import { ToastContext } from '@/components/context/toast/toast';
import { InputNumberFreeForm } from '@/components/forms/input/inputNumberFreeForm';
import { useUnitList } from '@/hooks/api/unit';
import { EstimateDetails } from '@/interfaces/estimateDetails';
import { JsonData } from '@/interfaces/jsonData';
import { Unit } from '@/interfaces/unit';
import { NextPageWithLayout } from '@/pages/_app';
import { TypeConstructionDetail } from '@/types/api/construction';
import { CostManageCategoryMenu } from '@/types/api/costManage';
import { SelectItemType } from '@/types/common';
import {changeFormatCurrency, prefixYenSign,postfixPercentSign, isMinusValueOnChangeOrBlur, toFixed } from '@/utils/calculation';
import { API_STATUS_CODE } from '@/utils/constants/api';
import { MESSAGES } from '@/utils/constants/message';
import {
  toastErrorMessage,
  toastMessage,
  toastInfoMessage,
} from '@/utils/toastMessage';

type Props = {
  constructionId: number;
};

export interface CostManageMinorItemTypeNew {
  id: number;
  dataFlag: boolean;
  rowgroupid: number;
  rowLevel: string;
  isChecked: boolean;
  isCheckedMenu: boolean;
  cost_small_category_id: number;
  assessment_status: number;
  construction_type_name: string;
  specification: string;
  entry_small_category_name: string;
  quantity: number;
  unit_price: number;
  unit: string;
  subtotal: number;
  assessment_quantity: number;
  assessment_unit: string;
  assessment_unit_price: number;
  assessed_amount: number;
  cooperator_name: string;
  remarks: string;
  reason_id: string;
  department_id: string;
  order_no: string;
  cost_detail_id: number;
  disabled: boolean;
  close_flag: boolean;
  small_category_id: number;
}
[];

const schema = yup.object({
  cost_details: yup.array().of(
    yup.object({
      name: yup
        .string()
        .required('明細名は必須フィールドです')
        .max(50, '明細名は50桁以内で入力してください。'),
      specification: yup.string().max(50, '仕様は50桁以内で入力してください。'),
      quantity: yup
        .number()
        .required('数量は必須フィールドです')
        .min(-999999999999.99, '数量は12桁以内で入力してください。')
        .max(999999999999.99, '数量は12桁以内で入力してください。')
        .typeError('数字を入力してください')
        .transform((value, originalValue) =>
          String(originalValue).trim() === '' ? null : value,
        ),
      unitPrice: yup
        .number()
        .required('単価は必須フィールドです')
        .min(-9999999999.99, '単価は10桁以内で入力してください。')
        .max(9999999999.99, '単価は10桁以内で入力してください。')
        .typeError('数字を入力してください')
        .transform((value, originalValue) =>
          String(originalValue).trim() === '' ? null : value,
        ),
      remarks: yup.string().max(500, '備考は500桁以内で入力してください。'),
    }),
  ),
  cost_small_categories: yup.array().of(
    yup.object({
      label: yup
        .string()
        .max(500, '小項目ラベルは500桁以内で入力してください。'),
      remarks: yup
        .string()
        .max(500, '小項目備考は500桁以内で入力してください。'),
    }),
  ),
});
export type CostDetailInputType = yup.InferType<typeof schema>;

const CostManage: NextPageWithLayout<Props> = ({ constructionId }) => {
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [changeData, setChangeData] = useState<boolean>(false);
  const [orderBtnDisabled, setOrderBtnDisabled] = useState<boolean>(false);
  const [units] = useState<SelectItemType[]>([]);
  const [addId, setId] = useState<any>(0);
  const [mainRowDatas, setMainrowDatas] = useState<
    CostManageMinorItemTypeNew[]
  >([]);
  const [reasonArr] = useState<any[]>([]);
  const [tableData, setTableData] = useState<JsonData[]>([]);
  const [dialog, setDialog] = useState<boolean>(false);
  const [cancelStatus] = useState<boolean>(false);
  const [fileAddModal, setFileAddModal] = useState<boolean>(false);
  const [orderAddModal, setOrderAddModal] = useState<boolean>(false);
  const [fileType, setFileType] = useState('Excelペースト');
  const [excelFlag, setExcelFlag] = useState<boolean>(false);
  const [smallCategoryId, setSmallCategoryId] = useState<any>(0);
  const [returnSmallItemData, setReturnSmallItemData] = useState<JsonData[]>(
    [],
  );
  const [totalCostManage, setTotalCostManage] = useState<TypeTotalCostManage>();
  const [totalWorkingBudget, setTotalWorkingBudget] = useState<number>(0);
  const [salesAmount, setSalesAmount] = useState<number>(0);
  const [overallFinalExpectedCost, setOverallFinalExpectedCost] =
    useState<number>(0);
  const [construction, setConstruction] = useState<TypeConstructionDetail>();
  const router = useRouter();
  const cost_category_id_query = router.query.cost_category_id;
  const middle_category_id_query = router.query.middle_category_id;
  const middle_category_name_query = router.query.middle_category_name;
  const [costCategoryId, setCostCategoryId] = useState<any>();
  const [middleCategoryId, setMiddleCategoryId] = useState<any>();
  const [middleCategoryName, setMiddleCategoryName] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [returnCostDetail, setReturnCostDetail] = useState<boolean>(false);
  const [costManageMenu, setCostManageMenu] =
    useState<CostManageCategoryMenu>();
  const { toast } = useContext(ToastContext);
  const [updateCostSmallType] = useState<UpdateCostSmallCategory[]>([]);
  const [updateCostDetailType] = useState<UpdateCostDetailCategory[]>([]);
  const [addCostDetailsType] = useState<any[]>([]);
  const [tableWidth] = useState(2200);
  const [reasons, setReason] = useState<TypeReason[]>();
  const [departments, setDepartment] = useState<TypeDepartment[]>();
  const op = useRef<OverlayPanel>(null);
  const om = useRef<OverlayPanel>(null);
  const [isCheckDetailRemark, setIsCheckDetailRemark] = useState(true);
  const [isCheckRemarks, setIsCheckRemarks] = useState(false);
  const [disablestatus, setDisablestatus] = useState<boolean>(false);
  const [dialogHeader, setDialogHeader] = useState('発注登録');
  const [buttonLabel, setButtonLabel] = useState('発注登録する');
  const [minorItemsDialog, setMinorItemsDialog] = useState<TypeOrderList[]>([]);
  const [order_data, setOrderData] = useState<OrderData>();
  const [checkboxReason, setCheckboxReason] = useState<number[]>([]);
  const [checkboxDepartment, setCheckboxDepartment] = useState<number[]>([]);
  const [circleIconIndex, setCircleIconIndex] = useState(0);
  const [quantity, setQuantity] = useState<any>(0);
  const [costDeatilIds] = useState<number[]>([]);
  const [costSmallCategoryIds] = useState<number[]>([]);
  const [submitBtnDisable, setSubmitBtnDisabled] = useState<boolean>(false);
  const [copyBtnDisable, setCopyBtnDisabled] = useState<boolean>(false);
  const [copyBtnText, setCopyBtnText] =
    useState<string>('精算見積から明細をコピー');

  const ConstructionDatas = useRef(true);

  // 単位リスト取得
  const onSuccessCallbackForUnits = (data: Unit[]) => {
    if (units.length < 1) {
      units.push({
        id: '',
        label: '　',
        value: '',
      });
      data.map((unit: Unit) => {
        units.push({
          id: String(unit.id),
          label: unit.name,
          value: unit.name,
        });
      });
    }
  };

  const { data: unitlist } = useUnitList({}, onSuccessCallbackForUnits);

  const specificationCols = [
    { field: 'specification', header: '仕様', width: '10%' },
  ];
  const blankSpecificationCols = [
    { field: 'blank_specification', header: '', width: '2%' },
  ];
  const [specificationColumns, setSpecificationColumns] = useState(
    blankSpecificationCols,
  );

  const remarksCols = [{ field: 'remarks', header: '備考', width: '6%' }];
  const blankRemarksCols = [{ field: 'blankRemarks', header: '', width: '2%' }];
  const [RemarksColumns, setRemarksColumns] = useState(remarksCols);

  const onSubmitAssignedCsv = async (files: JsonData[], excelFlag: boolean) => {
    setDialog(true);
    setFileType('CSVアップロード');
    setTableData(files);
    setExcelFlag(excelFlag);
  };

  const onSubmitAssignedExcel = async (
    files: JsonData[],
    small_category_id: number,
    excelFlag: boolean,
  ) => {
    setDialog(true);
    setFileType('Excelペースト');
    setTableData(files);
    setExcelFlag(excelFlag);
    setSmallCategoryId(small_category_id);
  };

  const onSubmitAssignedSmallCategory = async (
    files: JsonData[],
    small_category_id: number,
    excelFlag: boolean,
  ) => {
    setDialog(true);
    setFileType('小分類カテゴリー');
    setTableData(files);
    setSmallCategoryId(small_category_id);
    setExcelFlag(excelFlag);
  };

  const returnSmallItemDataList = async (
    files: JsonData[],
    excelFlag: boolean,
  ) => {
    setChangeData(true);
    setSubmitBtnDisabled(false);
    setReturnSmallItemData(files);

    if (excelFlag) {
      const subIndex =
        mainRowDatas.length > 0
          ? Number(
              mainRowDatas[mainRowDatas.length - 1].rowLevel.split('-')[1],
            ) + 1
          : 0;
      let subtotalTotal = 0;
      let totalMainIndex = 0;
      files.map((item: any, index: number) => {
        if (item.classification != '') {
          subtotalTotal = 0;
          totalMainIndex = mainRowDatas.length;
          mainRowDatas.push({
            dataFlag: true,
            id: 0,
            rowgroupid: subIndex,
            rowLevel: 'subTotal-' + subIndex,
            isChecked: false,
            isCheckedMenu: false,
            cost_small_category_id: subIndex,
            assessment_status: -1,
            construction_type_name: item.classification,
            specification: '',
            entry_small_category_name: '',
            quantity: 0,
            unit_price: 0,
            unit: '',
            subtotal: 0,
            assessment_quantity: 0,
            assessment_unit: '',
            assessment_unit_price: 0,
            assessed_amount: 0,
            cooperator_name: '',
            remarks: '',
            reason_id: '',
            department_id: '',
            order_no: '',
            cost_detail_id: -1,
            disabled: false,
            close_flag: false,
            small_category_id: item.cost_small_category_id,
          });
          formMethods.setValue(`cost_small_categories.${subIndex}.label`, '');
          formMethods.setValue(`cost_small_categories.${subIndex}.remarks`, '');
        } else {
          subtotalTotal += item.subtotal;
          mainRowDatas[totalMainIndex].subtotal = subtotalTotal;

          const tmpDeatilId = maxCostDetailId();
          mainRowDatas.push({
            dataFlag: true,
            id: 0,
            rowgroupid: subIndex,
            rowLevel: 'item-' + subIndex,
            isChecked: false,
            isCheckedMenu: false,
            cost_small_category_id: 0,
            assessment_status: -1,
            construction_type_name: item.detail,
            specification: item.specification,
            entry_small_category_name: '',
            quantity: item.quantity,
            unit_price: item.unit_price,
            unit: item.unit,
            subtotal: item.subtotal,
            assessment_quantity: 0,
            assessment_unit: '',
            assessment_unit_price: 0,
            assessed_amount: 0,
            cooperator_name: '',
            remarks: item.remarks,
            reason_id: '',
            department_id: '',
            order_no: '',
            cost_detail_id: tmpDeatilId,
            disabled: false,
            close_flag: false,
            small_category_id: item.cost_small_category_id,
          });
          formMethods.setValue(
            `cost_details.${tmpDeatilId}.name`,
            item.detail ? item.detail : '',
          );
          formMethods.setValue(
            `cost_details.${tmpDeatilId}.specification`,
            item.specification ? item.specification : '',
          );
          formMethods.setValue(
            `cost_details.${tmpDeatilId}.quantity`,
            item.quantity,
          );
          formMethods.setValue(
            `cost_details.${tmpDeatilId}.unitPrice`,
            item.unit_price,
          );
          formMethods.setValue(
            `cost_details.${tmpDeatilId}.remarks`,
            item.remarks ? item.remarks : '',
          );
        }
      });
    } else {
      let subtotalTotal = 0;
      let totalMainIndex = 0;
      files.map((item: any, index: number) => {
        if (item.classification != '') {
          subtotalTotal = 0;
          totalMainIndex = mainRowDatas.length;
          const csvIndex =
            mainRowDatas.length > 0
              ? Number(
                  mainRowDatas[mainRowDatas.length - 1].rowLevel.split('-')[1],
                ) + 1
              : 0;
          mainRowDatas.push({
            dataFlag: true,
            id: 0,
            rowgroupid: csvIndex,
            rowLevel: 'subTotal-' + csvIndex,
            isChecked: false,
            isCheckedMenu: false,
            cost_small_category_id: csvIndex,
            assessment_status: -1,
            construction_type_name: item.classification,
            specification: '',
            entry_small_category_name: '',
            quantity: 0,
            unit_price: 0,
            unit: '',
            subtotal: 0,
            assessment_quantity: 0,
            assessment_unit: '',
            assessment_unit_price: 0,
            assessed_amount: 0,
            cooperator_name: '',
            remarks: '',
            reason_id: '',
            department_id: '',
            order_no: '',
            cost_detail_id: -1,
            disabled: false,
            close_flag: false,
            small_category_id: item.cost_small_category_id,
          });
          formMethods.setValue(`cost_small_categories.${csvIndex}.label`, '');
          formMethods.setValue(`cost_small_categories.${csvIndex}.remarks`, '');
        } else {
          subtotalTotal += item.subtotal;
          mainRowDatas[totalMainIndex].subtotal = subtotalTotal;
          const itemIndex = Number(
            mainRowDatas[mainRowDatas.length - 1].rowLevel.split('-')[1],
          );
          const tmpDeatilId = maxCostDetailId();
          mainRowDatas.push({
            dataFlag: true,
            id: 0,
            rowgroupid: itemIndex,
            rowLevel: 'item-' + itemIndex,
            isChecked: false,
            isCheckedMenu: false,
            cost_small_category_id: 0,
            assessment_status: -1,
            construction_type_name: item.detail,
            specification: item.specification,
            entry_small_category_name: '',
            quantity: item.quantity,
            unit_price: item.unit_price,
            unit: item.unit,
            subtotal: item.subtotal,
            assessment_quantity: 0,
            assessment_unit: '',
            assessment_unit_price: 0,
            assessed_amount: 0,
            cooperator_name: '',
            remarks: item.remarks,
            reason_id: '',
            department_id: '',
            order_no: '',
            cost_detail_id: tmpDeatilId,
            disabled: false,
            close_flag: false,
            small_category_id: item.cost_small_category_id,
          });
          formMethods.setValue(
            `cost_details.${tmpDeatilId}.name`,
            item.detail ? item.detail : '',
          );
          formMethods.setValue(
            `cost_details.${tmpDeatilId}.specification`,
            item.specification ? item.specification : '',
          );
          formMethods.setValue(
            `cost_details.${tmpDeatilId}.quantity`,
            item.quantity,
          );
          formMethods.setValue(
            `cost_details.${tmpDeatilId}.unitPrice`,
            item.unit_price,
          );
          formMethods.setValue(
            `cost_details.${tmpDeatilId}.remarks`,
            item.remarks ? item.remarks : '',
          );
        }
      });
    }
    // clear data
    const mainNew: CostManageMinorItemTypeNew[] = [];

    // add
    mainRowDatas.map((data) => {
      mainNew.push(data);
    });

    setMainrowDatas(mainNew);
  };

  const addClass = (element: any, className: any) => {
    if (element.classList) element.classList.add(className);
    else element.className += ' ' + className;
  };

  const removeClass = (element: any, className: any) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
          'gi',
        ),
        ' ',
      );
  };

  useEffect(() => {
    if (fileAddModal || orderAddModal) {
      addClass(document.body, layoutStyles['overflow-hidden']);
    } else {
      removeClass(document.body, layoutStyles['overflow-hidden']);
    }
  }, [fileAddModal, orderAddModal]);

  const fetchData = useRef(true);

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
  }, [constructionId, costCategoryId, cost_category_id_query, dialogHeader]);

  // カテゴリー取得
  useEffect(() => {
    fetchEstimatesCategoriesMenu();
  }, [constructionId, refresh]);

  const calculatefinalexpect = () => {
    const total = mainRowDatas
      .filter((item) => item.rowLevel.includes('subTotal-'))
      .reduce((prev, curr, _index, _array) => prev + curr.subtotal, 0);
    return toFixed(total, 2);
  };

  const calculateoverallfinal = () => {
    const total = Number(overallFinalExpectedCost) + calculatefinalexpect();
    return toFixed(total, 2);
  };

  const overallGrossProfitRate = () => {
    if (Number(salesAmount) > 0) {
      const rate = (calculateoverallfinal() / Number(salesAmount)) * 100;
      return toFixed(rate, 2);
    } else {
      return '';
    }

    // return isNaN(rate)
    //   ? 0
    //   : rate.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const fetchEstimatesCategoriesMenu = useCallback(async () => {
    await getCostManageMenuList(constructionId)
      .then((response) => {
        const categories = response;
        if (categories.cost_categories.length <= 0) {
          setBtnDisabled(true);
          setOrderBtnDisabled(true);
        } else {
          setBtnDisabled(false);
          setOrderBtnDisabled(false);
        }
        setCostManageMenu(categories);
        const cost_category_id =
          categories.cost_categories[0]?.large_categories.middle_categories[0]
            ?.cost_category_id;
        setCostCategoryId(cost_category_id);
        const middle_category_id =
          categories.cost_categories[0]?.large_categories.middle_categories[0]
            ?.id;
        setMiddleCategoryId(middle_category_id);
        const middle_category_name =
          categories.cost_categories[0]?.large_categories.middle_categories[0]
            ?.construction_type_name;
        setMiddleCategoryName(middle_category_name);
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response &&
          err.response.status === API_STATUS_CODE.HTTP_404_NOT_FOUND
        ) {
          router.replace('/404');
        }
      });
  }, []);

  // fetch cost details
  const fetchEstimatesCategoriesData = useCallback(async () => {
    if (
      fetchData.current &&
      costCategoryId != 0 &&
      costCategoryId != undefined
    ) {
      mainRowDatas.splice(0);
      reasonArr.splice(0);
      fetchData.current = false;

      await getCostsManageItems(
        constructionId,
        cost_category_id_query ? cost_category_id_query : costCategoryId,
        middle_category_id_query ? middle_category_id_query : middleCategoryId,
      )
        .then((response) => {
          if (
            response.cost_detail_list.length <= 0 ||
            response.category_delete_flag === 1
          ) {
            setOrderBtnDisabled(true);
          } else {
            setOrderBtnDisabled(false);
          }

          // calculate total amount
          const totalAmountList = response.total_amount;
          setTotalCostManage(totalAmountList);
          setTotalWorkingBudget(
            totalAmountList?.total_cost_manage?.working_budget != null
              ? toFixed((totalAmountList.total_cost_manage?.working_budget), 2)
              : 0,
          );
          setSalesAmount(
            totalAmountList.overall_cost_manage?.overall_sold != null
              ? toFixed((totalAmountList.overall_cost_manage?.overall_sold), 2)
              : 0,
          );
          setOverallFinalExpectedCost(
            totalAmountList.overall_cost_manage?.overall_expected_cost != null
              ? toFixed((totalAmountList.overall_cost_manage?.overall_expected_cost), 2)
              : 0,
          );

          // cost details list
          const results = response.cost_detail_list;
          results.map((result, index1) => {
            mainRowDatas?.push({
              dataFlag: false,
              id: 0,
              rowgroupid: index1,
              rowLevel: 'subTotal-' + index1,
              isChecked: false,
              isCheckedMenu: false,
              cost_small_category_id: result.cost_small_categories.id,
              assessment_status: result.cost_small_categories.assessment_status,
              construction_type_name:
                result.small_categories.construction_type_name,
              specification: '',
              entry_small_category_name:
                result.cost_small_categories.entry_small_category_name,
              quantity: 0,
              unit_price: 0,
              unit: '',
              subtotal: 0,
              assessment_quantity: 0,
              assessment_unit: '',
              assessment_unit_price: 0,
              assessed_amount: 0,
              cooperator_name: '',
              remarks: result.cost_small_categories.remarks,
              reason_id: '',
              department_id: '',
              order_no: result.cost_small_categories.order_no,
              cost_detail_id: -1,
              disabled: result.cost_small_categories.disabled,
              close_flag: false,
              small_category_id: result.small_categories.id,
            });

            formMethods.setValue(
              `cost_small_categories.${result.cost_small_categories.id}.label`,
              result.cost_small_categories.entry_small_category_name
                ? result.cost_small_categories.entry_small_category_name
                : '',
            );
            formMethods.setValue(
              `cost_small_categories.${result.cost_small_categories.id}.remarks`,
              result.cost_small_categories.remarks
                ? result.cost_small_categories.remarks
                : '',
            );
            let subtotalTotal = 0;
            let assessedAmountTotal = 0.0;
            result.cost_details.map((cost_detail) => {
              subtotalTotal += cost_detail.subtotal;
              assessedAmountTotal += Number(cost_detail.assessed_amount);
              mainRowDatas?.push({
                dataFlag: false,
                id: 0,
                rowgroupid: index1,
                rowLevel: 'item-' + index1,
                isChecked: false,
                isCheckedMenu: false,
                cost_small_category_id: result.cost_small_categories.id,
                assessment_status: cost_detail.assessment_status,
                construction_type_name: cost_detail.detail,
                specification: cost_detail.specification,
                entry_small_category_name: '',
                quantity: cost_detail.quantity,
                unit_price: cost_detail.unit_price,
                unit: cost_detail.unit,
                subtotal: cost_detail.subtotal,
                assessment_quantity: Number(cost_detail.assessment_quantity),
                assessment_unit: cost_detail.assessment_unit,
                assessment_unit_price: cost_detail.assessment_unit_price,
                assessed_amount: Number(cost_detail.assessed_amount),
                cooperator_name: cost_detail.cooperator_name,
                remarks: cost_detail.remarks,
                reason_id: cost_detail.reason_id,
                department_id: cost_detail.department_id,
                order_no: '',
                cost_detail_id: cost_detail.id,
                disabled: false,
                close_flag: cost_detail.close_flag,
                small_category_id: result.small_categories.id,
              });

              formMethods.setValue(
                `cost_details.${cost_detail.id}.name`,
                'database',
              );
              formMethods.setValue(
                `cost_details.${cost_detail.id}.specification`,
                'database',
              );
              formMethods.setValue(
                `cost_details.${cost_detail.id}.quantity`,
                0,
              );
              formMethods.setValue(
                `cost_details.${cost_detail.id}.unitPrice`,
                0,
              );
              formMethods.setValue(
                `cost_details.${cost_detail.id}.remarks`,
                cost_detail.remarks ? cost_detail.remarks : '',
              );

              // add reasons
              reasonArr.push({
                cost_detail_id: cost_detail.id,
                reason_id: cost_detail.reason_id,
                department_id: cost_detail.department_id,
              });
            });
            const mainIndex = mainRowDatas.findIndex(
              (item) => item.rowLevel === 'subTotal-' + index1,
            );

            mainRowDatas[mainIndex].assessed_amount = assessedAmountTotal;
            mainRowDatas[mainIndex].subtotal = subtotalTotal;
          });

          // clear data
          const mainNew: CostManageMinorItemTypeNew[] = [];

          // add
          mainRowDatas.map((data) => {
            mainNew.push(data);
          });

          setMainrowDatas(mainNew);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [costCategoryId]);

  const getCopiedData = async () => {
    setCopyBtnDisabled(true);
    setCopyBtnText('精算見積から明細をコピー中...');
    const estimateDetail: EstimateDetails[] =
      await getEstimateDetailsWithMiidle(
        constructionId,
        middle_category_id_query ? middle_category_id_query : middleCategoryId,
      );
    if (estimateDetail.length > 0) {
      setCopyBtnDisabled(false);
      setCopyBtnText('精算見積から明細をコピー');
      setChangeData(true);
    } else {
      setCopyBtnDisabled(false);
      setCopyBtnText('精算見積から明細をコピー中');
      toast.current?.show(toastInfoMessage('精算見積で明細がありません'));
    }

    estimateDetail.map((item: any) => {
      let total = 0.0;
      const subIndex =
        mainRowDatas.length > 0
          ? Number(
              mainRowDatas[mainRowDatas.length - 1].rowLevel.split('-')[1],
            ) + 1
          : 0;
      mainRowDatas.push({
        dataFlag: true,
        id: 0,
        rowgroupid: subIndex,
        rowLevel: 'subTotal-' + subIndex,
        isChecked: false,
        isCheckedMenu: false,
        cost_small_category_id: subIndex,
        assessment_status: -1,
        construction_type_name: item.small_categories.construction_type_name,
        specification: '',
        entry_small_category_name:
          item.estimate_small_categories.entry_small_category_name,
        quantity: 0,
        unit_price: 0,
        unit: '',
        subtotal: 0,
        assessment_quantity: 0,
        assessment_unit: '',
        assessment_unit_price: 0,
        assessed_amount: 0,
        cooperator_name: '',
        remarks: item.remarks,
        reason_id: '',
        department_id: '',
        order_no: '',
        cost_detail_id: -1,
        disabled: false,
        close_flag: false,
        small_category_id: item.small_categories.id,
      });

      formMethods.setValue(
        `cost_small_categories.${subIndex}.label`,
        item.entry_small_category_name ? item.entry_small_category_name : '',
      );
      formMethods.setValue(
        `cost_small_categories.${subIndex}.remarks`,
        item.remarks ? item.remarks : '',
      );

      // index for total amount
      const indexTotal = mainRowDatas.length - 1;
      // cost details
      item.estimate_details.map((e_detail: any) => {
        total += +e_detail.subtotal;
        const tmpDeatilId = maxCostDetailId();
        mainRowDatas.push({
          dataFlag: true,
          id: 0,
          rowgroupid: subIndex,
          rowLevel: 'item-' + subIndex,
          isChecked: false,
          isCheckedMenu: false,
          cost_small_category_id: subIndex,
          assessment_status: -1,
          construction_type_name: e_detail.detail,
          specification: e_detail.specification,
          entry_small_category_name: '',
          quantity: e_detail.quantity,
          unit_price: e_detail.unit_price,
          unit: e_detail.unit,
          subtotal: e_detail.subtotal,
          assessment_quantity: 0,
          assessment_unit: '',
          assessment_unit_price: 0,
          assessed_amount: 0,
          cooperator_name: '',
          remarks: e_detail.remarks,
          reason_id: item.reason_id,
          department_id: item.department_id,
          order_no: '',
          cost_detail_id: tmpDeatilId,
          disabled: false,
          close_flag: false,
          small_category_id: item.small_categories.id,
        });
        formMethods.setValue(
          `cost_details.${tmpDeatilId}.name`,
          e_detail.detail ? e_detail.detail : '',
        );
        formMethods.setValue(
          `cost_details.${tmpDeatilId}.specification`,
          e_detail.specification ? e_detail.specification : '',
        );
        formMethods.setValue(
          `cost_details.${tmpDeatilId}.quantity`,
          e_detail.quantity,
        );
        formMethods.setValue(
          `cost_details.${tmpDeatilId}.unitPrice`,
          e_detail.unit_price,
        );
        formMethods.setValue(
          `cost_details.${tmpDeatilId}.remarks`,
          e_detail.remarks ? e_detail.remarks : '',
        );
      });

      mainRowDatas[indexTotal].subtotal = total;
    });

    // // clear data
    const mainNew: CostManageMinorItemTypeNew[] = [];

    // // add
    mainRowDatas.map((data) => {
      mainNew.push(data);
    });

    setMainrowDatas(mainNew);
  };

  useEffect(() => {
    setCostCategoryId(costCategoryId);
    fetchEstimatesCategoriesData();
  }, [costCategoryId, returnCostDetail]);

  useEffect(() => {
    setCostCategoryId(cost_category_id_query);
    fetchData.current = true;
    setChangeData(false);
    clearFormMethodsVlaues();
    clearFormMethodsErrors();
  }, [cost_category_id_query]);

  const clearFormMethodsVlaues = () => {
    formMethods.setValue(`cost_details`, []);
    formMethods.setValue(`cost_small_categories`, []);
  };

  const clearFormMethodsErrors = () => {
    formMethods.clearErrors(`cost_details`);
    formMethods.clearErrors(`cost_small_categories`);
  };

  const maxCostDetailId = () => {
    return Math.max(...mainRowDatas.map((o) => o.cost_detail_id), 0) + 1;
  };

  const getOrderData = async (cost_category_id: any) => {
    minorItemsDialog.splice(0);
    const data = await getCostDetailsList(constructionId, cost_category_id);
    if (data.length === 0) {
      setDisablestatus(true);
    }
    data.map((dt) => {
      minorItemsDialog.push(dt);
    });
    setOrderAddModal(true);
  };

  useEffect(() => {
    // getReasonList
    const fetchReasonData = async () => {
      await getReasonList()
        .then((response) => {
          setReason(response);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchReasonData();

    // getDepartmentList
    const fetchDepartmentData = async () => {
      await getDepartmentList()
        .then((response) => {
          setDepartment(response);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchDepartmentData();
  }, []);

  useEffect(() => {
    if (orderAddModal) {
      addClass(document.body, layoutStyles['overflow-hidden']);
    } else {
      removeClass(document.body, layoutStyles['overflow-hidden']);
    }
  }, [orderAddModal]);

  const minorItemsValues = () => {
    const results = mainRowDatas.filter(
      (item) => item.rowLevel.includes('subTotal-') || item.isChecked == false,
    );
    // // clear data
    const mainNew: CostManageMinorItemTypeNew[] = [];

    // // add
    mainRowDatas.map((data) => {
      if (data.rowLevel.includes('subTotal-') || data.isChecked == false) {
        mainNew.push(data);
      }
    });

    return mainNew;
  };
  const addCircleBtnTemplate = (rowData: any) => {
    const reason_id = reasonArr.find(
      (item) => item.cost_detail_id == rowData.cost_detail_id,
    )?.reason_id;
    const department_id = reasonArr.find(
      (item) => item.cost_detail_id == rowData.cost_detail_id,
    )?.department_id;
    const frontValue = rowData.rowLevel.split('-')[0];
    const circleColor = !reason_id && !department_id ? '' : '#e62031';
    const iconClass =
      !reason_id && !department_id ? 'pi pi-circle' : 'pi pi-circle-fill';
    if (frontValue != 'subTotal') {
      if (!rowData.dataFlag) {
        return (
          <>
            <div>
              <i
                className={iconClass}
                style={{
                  fontSize: '1.5rem',
                  color: circleColor,
                  borderColor: 'black',
                }}
                onClick={(e) => onClickOverPanel(rowData, e)}
                onMouseOver={(e) => onMouseOverPanel(rowData, e)}
                onMouseOut={(e) => om.current?.toggle(e)}
              ></i>
            </div>
          </>
        );
      }
      if (rowData.dataFlag) {
        return (
          <i
            className="pi pi-circle"
            style={{ fontSize: '1.5rem', borderColor: 'black' }}
            onClick={(e) => onClickOverPanel(rowData, e)}
            aria-haspopup
            aria-controls="overlay_panel"
          ></i>
        );
      }
    } else {
      return '';
    }
  };

  const onClickOverPanel = (data: any, e: any) => {
    setCircleIconIndex(data.cost_detail_id);
    op.current?.toggle(e);
    const selectedReasonData =
      !data.reason_id || data.reason_id?.split(';') == ''
        ? []
        : data.reason_id?.split(';');
    const selectedDepartmentData =
      !data.department_id || data.department_id?.split(';') == ''
        ? []
        : data.department_id?.split(';');
    setCheckboxDepartment(selectedDepartmentData);
    setCheckboxReason(selectedReasonData);
  };

  const onMouseOverPanel = (data: any, e: any) => {
    const reason_id = reasonArr.find(
      (item) => item.cost_detail_id == data.cost_detail_id,
    )?.reason_id;
    const department_id = reasonArr.find(
      (item) => item.cost_detail_id == data.cost_detail_id,
    )?.department_id;
    om.current?.toggle(e);
    const selectedReasonData =
      !reason_id || reason_id?.split(';') == '' ? [] : reason_id?.split(';');
    const selectedDepartmentData =
      !department_id || department_id?.split(';') == ''
        ? []
        : department_id?.split(';');
    setCheckboxReason(selectedReasonData);
    setCheckboxDepartment(selectedDepartmentData);
  };

  const [detailRemarkLabel, setDetailRemarkLabel] = useState('');
  const [remarkLabel, setRemarkLabel] = useState('備考');
  const detailRemarkToggle = (event: ToggleButtonChangeParams) => {
    if (event.value === true) {
      setDetailRemarkLabel('');
      setSpecificationColumns(blankSpecificationCols);
    } else {
      setDetailRemarkLabel('仕様');
      setSpecificationColumns(specificationCols);
    }
    setIsCheckDetailRemark((isCheck) => !isCheck);
  };

  const RemarksToggle = (event: ToggleButtonChangeParams) => {
    if (event.value === true) {
      setRemarkLabel('');
      setRemarksColumns(blankRemarksCols);
    } else {
      setRemarkLabel('備考');
      setRemarksColumns(remarksCols);
    }
    setIsCheckRemarks((isCheck) => !isCheck);
  };
  const detailRemarkColHeader = () => {
    return (
      <div>
        <ToggleButton
          checked={isCheckDetailRemark}
          onChange={(e) => detailRemarkToggle(e)}
          onIcon="pi pi-plus"
          offIcon="pi pi-minus"
          onLabel=""
          offLabel=""
          className="w-full border-round-xs"
        />
        {detailRemarkLabel && (
          <label className="pt-1 pl-2" htmlFor="binary">
            {detailRemarkLabel}
          </label>
        )}
      </div>
    );
  };
  const remarksColHeader = () => {
    return (
      <div>
        <ToggleButton
          checked={isCheckRemarks}
          onChange={(e) => RemarksToggle(e)}
          onIcon="pi pi-plus"
          offIcon="pi pi-minus"
          onLabel=""
          offLabel=""
          className="w-full border-round-xs"
        />
        {remarkLabel && (
          <label className="pt-1 pl-2" htmlFor="binary">
            {remarkLabel}
          </label>
        )}
      </div>
    );
  };
  const formatCurrency = (value: number) => {
    return value.toLocaleString('jp-JP', {
      maximumFractionDigits: 2
    });
  };
  const subtotalBodyTemplate = (rowData: any) => {
    // if (rowData.dataFlag) {
    //   const title = rowData.rowLevel.split('-')[0];
    //   const dataIndex = rowData.rowLevel.split('-')[1];
    //   if (title == 'item') {
    //     return rowData.subtotal.toLocaleString();
    //   } else {
    //     return rowData.subtotal.toLocaleString();
    //   }
    // } else {
    //   return rowData.subtotal.toLocaleString();
    // }
    // return ('￥'+ rowData.subtotal.toLocaleString(undefined, {
    //   // style: 'currency',
    //   // currency: 'JPY',
    //   maximumFractionDigits: 2
    // }));
    // return prefixYenSign(formatCurrency(rowData.subtotal))
       return  prefixYenSign(changeFormatCurrency(rowData.subtotal),)
  };

  const assAmtBodyTemplate = (rowData: any) => {
    if (rowData.dataFlag) {
      return '';
    } else {
      // return ('￥'+ rowData.assessed_amount?.toLocaleString(undefined, {
      //   // style: 'currency',
      //   // currency: 'JPY',￥
      //   maximumFractionDigits: 2
      // }));
      // return prefixYenSign(formatCurrency(rowData.assessed_amount))
      return prefixYenSign(changeFormatCurrency(rowData.assessed_amount),)     
    }
  };

  const specBodyTemplate = (rowData: any) => {
    if (rowData.dataFlag) {
      const title = rowData.rowLevel.split('-')[0];
      if (title == 'item') {
        return (
          <>
            <InputText
              value={rowData.specification ? rowData.specification : ''}
              className="h-2rem"
              onChange={(e) => {
                setChangeData(true);
                formMethods.setValue(
                  `cost_details.${rowData.cost_detail_id}.specification`,
                  e.target.value,
                );
                onSetAddVolumn(
                  rowData,
                  undefined,
                  e.target.value,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                );
              }}
            />

            <div style={{ color: '#e24c4c', fontSize: '0.75rem' }}>
              {
                errors.cost_details?.[rowData.cost_detail_id]?.specification
                  ?.message
              }
            </div>
          </>
        );
      } else {
        return '';
      }
    } else {
      const title = rowData.rowLevel.split('-')[0];
      if (title == 'item' && rowData.assessment_status == 0) {
        return (
          <>
            <InputText
              value={rowData.specification ? rowData.specification : ''}
              className="h-2rem"
              onChange={(e) => {
                setChangeData(true);
                formMethods.setValue(
                  `cost_details.${rowData.cost_detail_id}.specification`,
                  e.target.value,
                );
                onSetAddVolumn(
                  rowData,
                  undefined,
                  e.target.value,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                );
              }}
            />

            <div style={{ color: '#e24c4c', fontSize: '0.75rem' }}>
              {
                errors.cost_details?.[rowData.cost_detail_id]?.specification
                  ?.message
              }
            </div>
          </>
        );
      } else {
        return rowData.specification;
      }
    }
  };
  const specificationColComponents = specificationColumns.map((col) => {
    if (col.field == 'specification') {
      return (
        <Column
          key={col.header}
          field={col.field}
          header={col.header}
          body={specBodyTemplate}
          style={{ width: col.width, wordBreak: "break-word" }}
        />
      );
    } else {
      return (
        <Column
          key={col.header}
          field={col.field}
          header={col.header}
          style={{ width: col.width }}
        />
      );
    }
  });

  const remarksTemplate = (rowData: any) => {
    const indexMain = mainRowDatas.findIndex(
      (item) => item.rowLevel === rowData.rowLevel,
    );
    if (rowData.rowLevel.includes('subTotal-')) {
      return (
        <>
          <InputText
            value={rowData.remarks ? rowData.remarks : ''}
            className="h-2rem"
            disabled={rowData.disabled}
            onChange={(e) => {
              setChangeData(true);
              mainRowDatas[indexMain].remarks = e.target.value;
              const mainRemarks: CostManageMinorItemTypeNew[] = [];
              mainRowDatas.map((main_item) => {
                mainRemarks.push(main_item);
              });
              setMainrowDatas(mainRemarks);

              formMethods.setValue(
                `cost_small_categories.${rowData.cost_small_category_id}.remarks`,
                e.target.value,
              );
            }}
          />
          <div style={{ color: '#e24c4c', fontSize: '0.75rem' }}>
            {
              errors.cost_small_categories?.[rowData.cost_small_category_id]
                ?.remarks?.message
            }
          </div>
        </>
      );
    } else {
      return (
        <>
          <InputText
            value={rowData.remarks ? rowData.remarks : ''}
            className="h-2rem"
            disabled={rowData.disabled}
            onChange={(e) => {
              setChangeData(true);
              onSetAddVolumn(
                rowData,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                e.target.value,
              );

              formMethods.setValue(
                `cost_details.${rowData.cost_detail_id}.remarks`,
                e.target.value,
              );
            }}
          />
          <div style={{ color: '#e24c4c', fontSize: '0.75rem' }}>
            {errors.cost_details?.[rowData.cost_detail_id]?.remarks?.message}
          </div>
        </>
      );
    }
  };

  const remarkColComponents = RemarksColumns.map((col) => {
    if (col.field == 'remarks') {
      return (
        <Column
          key={col.header}
          field={col.field}
          header={col.header}
          body={remarksTemplate}
          style={{ width: col.width }}
        />
      );
    } else {
      return (
        <Column
          key={col.header}
          field={col.field}
          header={col.header}
          style={{ width: col.width }}
        />
      );
    }
  });

  // 原価管理
  const costManageColspanTemplate = () => {
    return (
      <>
        <div className="flex flex-row -m-3">
          <div className="col flex border-right-1 border-300 w-9rem flex align-items-center justify-content-center">
            数量
          </div>
          <div className="col flex border-right-1 border-300 w-8rem flex align-items-center justify-content-center">
            単位
          </div>
          <div className="col flex align-items-center w-9rem justify-content-center ">
            単価
          </div>
        </div>
      </>
    );
  };

  const assessedColspanTemplate = () => {
    return (
      <>
        <div className="flex flex-row -m-3">
          <div className="col flex border-right-1 w-9rem border-300 flex align-items-center justify-content-center">
            数量
          </div>
          <div className="col flex border-right-1 w-6rem border-300 flex align-items-center justify-content-center">
            単位
          </div>
          <div className="col flex align-items-center w-9rem justify-content-center">
            単価
          </div>
        </div>
      </>
    );
  };

  // 査定済み

  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column field="hiddenStatus" header="" rowSpan={2} alignHeader="center"/>
        <Column field="btnType" header="" rowSpan={2} alignHeader="center" />
        <Column field="assessment_status" header="ステータス" rowSpan={2} alignHeader="center"  />
        <Column
          field="construction_type_name"
          header="小分類/明細"
          rowSpan={2}
          alignHeader= "center"
        />
        <Column header={detailRemarkColHeader} rowSpan={2} alignHeader= "left" className='w-12rem' />
        <Column field="" header="原価管理" colSpan={2} alignHeader= "center" className='w-3' />
        <Column field="" header="査定済み" colSpan={2} alignHeader= "center" className='w-3' />
        <Column header={remarksColHeader} rowSpan={2} alignHeader= "left" className='w-12rem' />
        <Column header="追加理由" rowSpan={2}  alignHeader= "center" className='w-5rem'/>
        <Column field="cooperator_name" header="協力会社" rowSpan={2} alignHeader= "center" className='w-12rem' />
      </Row>
      <Row>
        <Column
          field="costManageColspanTemplate"
          header={costManageColspanTemplate}
          align="center"
          className="w-25rem"
          colSpan={1}
        />
        <Column field="subtotal" header="金額" colSpan={1} align="center" className="w-12rem" />
        <Column
          field="assessedColspanTemplate"
          header={assessedColspanTemplate}
          align="center"
          className="w-20rem"
          colSpan={1}
        />
        <Column
          field="assessed_amount"
          header="査定額"
          colSpan={1}
          align="center"
          className="w-12rem"
        />
      </Row>
    </ColumnGroup>
  );

  // テーブル行の色
  const rowClass = (data: any) => {
    const frontValue = data.rowLevel.split('-')[0];
    // const reason_id = reasonArr.find(
    //   (item) => item.cost_detail_id == data.cost_detail_id
    // )?.reason_id
    // const department_id = reasonArr.find(
    //   (item) => item.cost_detail_id == data.cost_detail_id
    // )?.department_id
    if (frontValue === 'subTotal') {
      return { 'sub-total-item': frontValue === 'subTotal' };
    } else if (frontValue !== 'subTotal') {
      if (data.assessment_status == 4 || data.close_flag == 1) {
        return { 'surface-200': frontValue !== 'subTotal' };
      } else if (
        data.assessment_status == 1 ||
        data.assessment_status == 2 ||
        data.assessment_status == 3
      ) {
        return { 'bg-orange-100': frontValue !== 'subTotal' };
      } else {
        return '';
      }
    } else {
      return '';
    }
  };

  const changeDataState = () => {
    // // clear data
    const mainNew: CostManageMinorItemTypeNew[] = [];

    // // add
    mainRowDatas.map((data) => {
      mainNew.push(data);
    });

    setMainrowDatas(mainNew);
  };

  const onSetAddVolumn = (
    rowData: any,
    construction_type_name?: string,
    specification?: string,
    quantity?: any,
    unit?: any,
    unit_price?: number,
    remarks?: string,
  ) => {
    const mainIndx = mainRowDatas.findIndex((minor_item) => {
      return minor_item.cost_detail_id == rowData.cost_detail_id;
    });

    const subIndex = rowData.rowLevel.split('-')[1];
    const subMainIndex = mainRowDatas.findIndex(
      (item) => item.rowLevel === 'subTotal-' + subIndex,
    );

    if (construction_type_name !== undefined) {
      mainRowDatas[mainIndx].construction_type_name = construction_type_name;
    }
    if (specification !== undefined) {
      mainRowDatas[mainIndx].specification = specification;
    }
    if (quantity !== undefined) {
      // rowData.quantity = Number(e.target.value)
      const subtotal = toFixed((quantity * rowData.unit_price), 2);
      mainRowDatas[mainIndx].quantity = quantity;
      mainRowDatas[mainIndx].subtotal = subtotal;
      const result = mainRowDatas
        .filter((item) => item.rowLevel == 'item-' + subIndex)
        .reduce((prev, curr, _index, _array) => prev + curr.subtotal, 0);
      mainRowDatas[subMainIndex].subtotal = result;
      setQuantity(quantity);
    }
    if (unit !== undefined) {
      mainRowDatas[mainIndx].unit = unit;
    }
    if (unit_price !== undefined) {
      const subtotal = toFixed((rowData.quantity * unit_price), 2);
      mainRowDatas[mainIndx].unit_price = unit_price;
      mainRowDatas[mainIndx].subtotal = subtotal;
      const result = mainRowDatas
        .filter((item) => item.rowLevel == 'item-' + subIndex)
        .reduce((prev, curr, _index, _array) => prev + curr.subtotal, 0);

      mainRowDatas[subMainIndex].subtotal = result;
      setQuantity(rowData.quantity);
    }
    if (remarks !== undefined) {
      mainRowDatas[mainIndx].remarks = remarks;
    }

    // clear data
    const main: CostManageMinorItemTypeNew[] = [];
    mainRowDatas.map((minor_item) => {
      main.push(minor_item);
    });
    setMainrowDatas(main);
  };

  const detailBodyTemplate = (rowData: any) => {
    const title = rowData.rowLevel.split('-')[0];
    if (
      (rowData.dataFlag && title == 'item') ||
      (!rowData.dataFlag && title == 'item' && rowData.assessment_status == 0)
    ) {
      return (
        <>
          <InputText
            type="text"
            value={
              rowData.construction_type_name
                ? rowData.construction_type_name
                : ''
            }
            className="h-2rem"
            onChange={(e) => {
              setChangeData(true);
              formMethods.setValue(
                `cost_details.${rowData.cost_detail_id}.name`,
                e.target.value,
              );
              onSetAddVolumn(
                rowData,
                e.target.value,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
              );
            }}
          />
          <div style={{ color: '#e24c4c', fontSize: '0.75rem' }}>
            {errors.cost_details?.[rowData.cost_detail_id]?.name?.message}
          </div>
        </>
      );
    } else {
      return rowData.construction_type_name;
    }
  };

  const assessmentStatusTemplate = (rowData: any) => {
    if (rowData.dataFlag == true) {
      const deleteValue = rowData.rowLevel.split('-')[0];
      if (deleteValue === 'subTotal') {
        return (
          <Button
            size="small"
            style={{backgroundColor: '#EF4444', color: 'white'}}
            onClick={() => handleDelete(rowData)}
          >
            削除
          </Button>
        );
      } else {
        return '';
      }
    } else {
      const tileIndex = rowData.rowLevel.split('-')[0];
      if (tileIndex === 'subTotal') {
        if (rowData.assessment_status == 0 && rowData.dataFlag == false) {
          return (
            <Button
              // variant="outlined"
              size="small"
              style={{backgroundColor: '#EF4444', color: 'white'}}
              onClick={() => handleDelete(rowData)}
            >
              削除
            </Button>
          );
        } else {
          return '';
        }
      } else {
        if (rowData.close_flag == 1) {
          return '査定クローズ';
        } else if (
          rowData.assessment_status == 0 &&
          rowData.dataFlag == false
        ) {
          return '';
        } else if (
          rowData.assessment_status == 1 &&
          rowData.dataFlag == false
        ) {
          return <span>申請中</span>;
        } else if (
          rowData.assessment_status == 2 &&
          rowData.dataFlag == false
        ) {
          return <span>発注済</span>;
        } else if (
          rowData.assessment_status == 3 &&
          rowData.dataFlag == false
        ) {
          const result = (rowData.assessment_quantity / rowData.quantity) * 100;
          return (
            <span>
              査定
              {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
            </span>
          );
        } else if (
          rowData.assessment_status == 4 &&
          rowData.dataFlag == false
        ) {
          return <span>査定済</span>;
        }
      }
    }
  };

  // To fix
  const orderUpdateDialog = async (rowData: any) => {
    minorItemsDialog.splice(0);
    const data = await getAllCostDetailsList(
      constructionId,
      cost_category_id_query ? cost_category_id_query : costCategoryId,
      rowData.order_no,
      rowData.assessment_status,
    );
    data.small_category_data.map((dt) => {
      minorItemsDialog.push(dt);
    });
    setOrderData(data.order_data);
    setOrderAddModal(true);
    if (rowData.assessment_status != 1) {
      setDisablestatus(true);
    } else {
      setDisablestatus(false);
    }
  };
  // To fix
  const companyCodeTemplate = (rowData: any) => {
    const companyCodeValue = rowData.rowLevel.split('-')[0];
    if (companyCodeValue === 'subTotal') {
      return (
        <Link
          className="cursor-pointer"
          onClick={() => {
            setDialogHeader('発注変更');
            setButtonLabel('発注変更する');
            orderUpdateDialog(rowData);
          }}
        >
          {rowData.order_no}
        </Link>
      );
    } else {
      return <span>{rowData.cooperator_name}</span>;
    }
  };
  // 小計
  const subTotalToggle = (rowData: any) => {
    const splitSubTotal = rowData.rowLevel.split('-');
    if (splitSubTotal[0] === 'subTotal') {
      return (
        <div>
          <ToggleButton
            checked={rowData.isChecked}
            onChange={(e) => onDataToggle(e, rowData)}
            onIcon="pi pi-plus"
            onLabel=""
            offLabel=""
            offIcon="pi pi-minus"
            className="w-full border-round-xs"
          />
        </div>
      );
    } else {
      return '';
    }
  };
  const onDataToggle = (event: ToggleButtonChangeParams, rowData: any) => {
    const subTotalNo = rowData.rowLevel.split('-')[1];
    mainRowDatas.map((data, index) => {
      if (data.rowLevel == 'subTotal-' + subTotalNo) {
        mainRowDatas[index].isChecked = event.value;
      } else if (data.rowLevel == 'item-' + subTotalNo) {
        mainRowDatas[index].isChecked = event.value;
      }
    });

    // // clear data
    const mainNew: CostManageMinorItemTypeNew[] = [];

    // // add
    mainRowDatas.map((data) => {
      mainNew.push(data);
    });

    setMainrowDatas(mainNew);
  };

  const rowAdd = (rowData: any) => {
    setChangeData(true);
    if (mainRowDatas !== undefined) {
      const tmpCostDetailId = maxCostDetailId();
      const subIndex = rowData.rowLevel.split('-')[1];
      const subMainIndex = mainRowDatas.findIndex(
        (item) => item.rowLevel === 'subTotal-' + subIndex,
      );
      const mainGpId = mainRowDatas.filter(
        (e) => e.rowLevel.split('-')[1] === subIndex,
      );

      const posMain = mainRowDatas
        .map((e) => {
          return e.cost_detail_id;
        })
        .indexOf(mainGpId[mainGpId.length - 1].cost_detail_id);

      const tmpPosMain = mainGpId[mainGpId.length - 1].rowLevel.includes(
        'subTotal-',
      )
        ? subMainIndex
        : posMain;

      if (tmpPosMain !== -1) {
        const newData = {
          dataFlag: true,
          index: 0,
          id: -1,
          rowgroupid: 0,
          rowLevel: 'item-' + subIndex,
          isChecked: false,
          isCheckedMenu: false,
          cost_small_category_id:
            mainRowDatas[subMainIndex].cost_small_category_id,
          assessment_status: 0,
          construction_type_name: '',
          specification: '',
          entry_small_category_name: '',
          quantity: 0,
          unit_price: 0,
          unit: '',
          subtotal: 0,
          assessment_quantity: 0,
          assessment_unit: '',
          assessment_unit_price: 0,
          assessed_amount: 0,
          cooperator_name: '',
          remarks: '',
          reason_id: '',
          department_id: '',
          order_no: '',
          order_information_id: 0,
          cost_detail_id: tmpCostDetailId,
          disabled: false,
          close_flag: false,
          small_category_id: mainRowDatas[subMainIndex].small_category_id,
        };
        mainRowDatas.splice(tmpPosMain + 1, 0, newData);
        formMethods.setValue(
          `cost_details.${newData.cost_detail_id}.name`,
          newData.construction_type_name,
        );
        formMethods.setValue(
          `cost_details.${newData.cost_detail_id}.specification`,
          newData.specification,
        );

        formMethods.setValue(
          `cost_details.${newData.cost_detail_id}.remarks`,
          newData.remarks,
        );
      }

      // clear data
      const mainNew: CostManageMinorItemTypeNew[] = [];

      // add
      mainRowDatas.map((data) => {
        mainNew.push(data);
      });

      setMainrowDatas(mainNew);
    }
  };

  const btnTypeBodyTemplae = (rowData: any) => {
    const buttonValue = rowData.rowLevel.split('-')[0];
    const buttonIndex = rowData.rowLevel.split('-')[1];
    const groupData = mainRowDatas.filter(
      (item) => item.rowLevel == 'item-' + buttonIndex,
    );
    const isStatusSame = groupData.every((item) => item.assessment_status == 0);
    if (
      (buttonValue == 'subTotal' && rowData.dataFlag == true) ||
      (buttonValue == 'subTotal' && isStatusSame)
    ) {
      return (
        <IconButton
          onClick={() => rowAdd(rowData)}
          disabled={rowData.isChecked}
        >
          <ControlPointIcon />
        </IconButton>
      );
    } else if (
      (buttonValue != 'subTotal' && rowData.dataFlag == true) ||
      (buttonValue != 'subTotal' &&
        rowData.dataFlag == false &&
        rowData.assessment_status == 0)
    ) {
      return (
        <IconButton onClick={() => rowDelete(rowData)}>
          <RemoveCircleOutlineIcon />
        </IconButton>
      );
    } else {
      return '';
    }
  };

  const rowDelete = (rowData: any) => {
    setChangeData(true);
    const cost_detail_id = rowData.cost_detail_id;
    const subIndex = rowData.rowLevel.split('-')[1];

    if (mainRowDatas !== undefined) {
      // set formMethods value
      formMethods.setValue(`cost_details.${cost_detail_id}.name`, 'delete');
      formMethods.setValue(
        `cost_details.${cost_detail_id}.specification`,
        'delete',
      );
      formMethods.setValue(`cost_details.${cost_detail_id}.quantity`, 0);
      formMethods.setValue(`cost_details.${cost_detail_id}.unitPrice`, 0);
      formMethods.setValue(`cost_details.${cost_detail_id}.remarks`, 'delete');

      // clear error
      formMethods.clearErrors(`cost_details.${cost_detail_id}.name`);
      formMethods.clearErrors(`cost_details.${cost_detail_id}.specification`);
      formMethods.clearErrors(`cost_details.${cost_detail_id}.quantity`);
      formMethods.clearErrors(`cost_details.${cost_detail_id}.unitPrice`);
      formMethods.clearErrors(`cost_details.${cost_detail_id}.remarks`);

      if (rowData.dataFlag == false) {
        costDeatilIds.push(rowData.cost_detail_id);
      }

      // clear data
      const mainNew: CostManageMinorItemTypeNew[] = [];

      // add
      let total = 0.0;
      mainRowDatas.map((data) => {
        if (data.cost_detail_id !== cost_detail_id) {
          mainNew.push(data);
        }
        if (
          data.rowLevel == 'item-' + subIndex &&
          data.cost_detail_id !== cost_detail_id
        ) {
          total = total + data.subtotal;
        }
      });
      const subMainIndex = mainNew.findIndex(
        (item) => item.rowLevel === 'subTotal-' + subIndex,
      );
      mainNew[subMainIndex].subtotal = total;

      setMainrowDatas(mainNew);
    }
  };
  const costManageTemplate = (rowData: any) => {
    if (!rowData.dataFlag) {
      const costManageValue = rowData.rowLevel.split('-')[0];
      if (costManageValue === 'subTotal') {
        const indexMain = mainRowDatas.findIndex(
          (item) => item.rowLevel === rowData.rowLevel,
        );
        return (
          <>
            <InputText
              // type="text"
              className="w-17rem h-2rem"
              value={
                rowData.entry_small_category_name
                  ? rowData.entry_small_category_name
                  : ''
              }
              onChange={(e) => {
                setChangeData(true);
                rowData.entry_small_category_name = e.target.value;
                mainRowDatas[indexMain].entry_small_category_name =
                  e.target.value;
                formMethods.setValue(
                  `cost_small_categories.${rowData.cost_small_category_id}.label`,
                  e.target.value,
                );
                // clear data
                const main: CostManageMinorItemTypeNew[] = [];
                mainRowDatas.map((minor_item) => {
                  main.push(minor_item);
                });
                setMainrowDatas(main);
              }}
              disabled={rowData.disabled}
            />
            <div style={{ color: '#e24c4c', fontSize: '0.75rem' }}>
              {
                errors.cost_small_categories?.[rowData.cost_small_category_id]
                  ?.label?.message
              }
            </div>
          </>
        );
      } else if (rowData.assessment_status == 0) {
        return (
          <>
            <div className="flex flex-row -m-2">
              <div className="col border-right-1 w-9rem border-300 flex align-items-center justify-content-end">
                <div className="card">
                  <div className="flex flex-column card-container green-container">
                    <div className="flex align-items-center justify-content-center">
                      <InputNumberFreeForm
                        id={`cost_details.${rowData.cost_detail_id}.quantity`}
                        name="quantity"
                        className="h-2rem"
                        inputStyle={{ width: '100%' }}
                        mode={'decimal'}
                        min={0}
                        minFractionDigits={2}
                        maxFractionDigits={2}
                        maxLength={12 + 6} // 6 は",".00"のため
                        value={rowData.quantity ? rowData.quantity : ''}
                        onChange={(e: any) => {
                          setChangeData(true);
                          onSetAddVolumn(
                            rowData,
                            undefined,
                            undefined,
                            Number(e.value),
                            undefined,
                            undefined,
                            undefined,
                          );
                          formMethods.setValue(
                            `cost_details.${rowData.cost_detail_id}.quantity`,
                            e.value,
                          );
                        }}
                        onBlur={(e: any) => {
                          const value = e.target.value.replaceAll(',', '');
                          setChangeData(true);
                          onSetAddVolumn(
                            rowData,
                            undefined,
                            undefined,
                            isNaN(value) ? value : Number(value),
                            undefined,
                            undefined,
                            undefined,
                          );
                          formMethods.setValue(
                            `cost_details.${rowData.cost_detail_id}.quantity`,
                            value,
                          );
                        }}
                      />
                    </div>
                    <div
                      className="flex align-items-center justify-content-center"
                      style={{ color: '#e24c4c', fontSize: '0.75rem' }}
                    >
                      {
                        errors.cost_details?.[rowData.cost_detail_id]?.quantity
                          ?.message
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="col border-right-1 w-8rem border-300 flex align-items-center justify-content-center text-left">
                <Dropdown
                  value={rowData.unit ? rowData.unit : ''}
                  options={units}
                  placeholder=""
                  className="w-full h-2rem"
                  onChange={(e) => {
                    setChangeData(true);

                    onSetAddVolumn(
                      rowData,
                      undefined,
                      undefined,
                      undefined,
                      e.target.value,
                      undefined,
                      undefined,
                    );
                  }}
                  filter={true}
                />
              </div>
              <div className="col flex align-items-center w-9rem justify-content-end">
                <div className="card">
                  <div className="flex flex-column card-container green-container">
                    <div className="flex align-items-center justify-content-center">
                      <InputNumberFreeForm
                        id={`cost_details.${rowData.cost_detail_id}.unitPrice`}
                        name={`cost_details.${rowData.cost_detail_id}.unitPrice`}
                        className="mr-0 h-2rem"
                        inputStyle={{ width: '100%', textAlign: 'right'}}
                        value={rowData.unit_price ? rowData.unit_price : ''}
                        maxLength={10}
                        mode={'decimal'}
                        onChange={(e: any) => {
                          if(!isMinusValueOnChangeOrBlur(e?.value)) {
                            setChangeData(true);
                            onSetAddVolumn(
                              rowData,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              Number(e.value),
                              undefined,
                            );
                            formMethods.setValue(
                              `cost_details.${rowData.cost_detail_id}.unitPrice`,
                              e?.value,
                            );
                          }
                        }}
                        onBlur={(e: any) => {
                          const value = e.target.value.replaceAll(',', '');
                          if(!isMinusValueOnChangeOrBlur(value)) {
                            setChangeData(true);
                            onSetAddVolumn(
                              rowData,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              isNaN(value) ? value : Number(value),
                              undefined,
                            );
                            formMethods.setValue(
                              `cost_details.${rowData.cost_detail_id}.unitPrice`,
                              value,
                            );
                          }
                        }}
                      />
                    </div>
                    <div
                      className="flex align-items-center justify-content-center"
                      style={{ color: '#e24c4c', fontSize: '0.75rem' }}
                    >
                      {
                        errors.cost_details?.[rowData.cost_detail_id]?.unitPrice
                          ?.message
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className="flex flex-row -m-2">
              <div
                className="col border-right-1 border-300 flex align-items-center justify-content-end"
                style={{ wordBreak: 'break-word'}}
              >
                {rowData.quantity.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
                
              </div>
              <div
                className="col border-right-1 border-300 flex align-items-center justify-content-center"
                style={{ wordBreak: 'break-word' }}
              >
                {rowData.unit}
              </div>
              <div
                className="col border-300 flex align-items-center justify-content-end"
                style={{ wordBreak: 'break-word' }}
              >
                {/* {('￥'+rowData.unit_price.toLocaleString(undefined, {
                  // style: 'currency',
                  // currency: 'JPY',
                  maximumFractionDigits: 2
                }))} */}
                {/* {prefixYenSign(formatCurrency(rowData.unit_price))} */}
                { prefixYenSign(changeFormatCurrency(rowData.unit_price),)}
              </div>
            </div>
          </>
        );
      }
    } else {
      const costManageValue = rowData.rowLevel.split('-')[0];
      if (costManageValue === 'subTotal') {
        const indexMain = mainRowDatas.findIndex(
          (item) => item.rowLevel === rowData.rowLevel,
        );
        return (
          <>
            <InputText
              // type="text"
              className="w-17rem h-2rem"
              value={
                rowData.entry_small_category_name
                  ? rowData.entry_small_category_name
                  : ''
              }
              onChange={(e) => {
                setChangeData(true);
                rowData.entry_small_category_name = e.target.value;
                mainRowDatas[indexMain].entry_small_category_name =
                  e.target.value;

                formMethods.setValue(
                  `cost_small_categories.${rowData.cost_small_category_id}.label`,
                  e.target.value,
                );

                // clear data
                const main: CostManageMinorItemTypeNew[] = [];
                mainRowDatas.map((minor_item) => {
                  main.push(minor_item);
                });
                setMainrowDatas(main);
              }}
            />
            <div style={{ color: '#e24c4c', fontSize: '0.75rem' }}>
              {
                errors.cost_small_categories?.[rowData.cost_small_category_id]
                  ?.label?.message
              }
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className="flex flex-row -m-2">
              <div className="col border-right-1 border-300 flex align-items-center justify-content-end">
                <div className="card">
                  <div className="flex flex-column card-container green-container">
                    <div className="flex align-items-center justify-content-center">
                      <InputNumberFreeForm
                        id={`cost_details.${rowData.cost_detail_id}.quantity`}
                        name="quantity"
                        className="h-2rem"
                        inputStyle={{ width: '100%' }}
                        mode={'decimal'}
                        min={0}
                        minFractionDigits={2}
                        maxFractionDigits={2}
                        maxLength={12 + 6}  // 6 は",".00"のため
                        value={rowData.quantity ? rowData.quantity : ''}
                        onChange={(e: any) => {
                          setChangeData(true);
                          onSetAddVolumn(
                            rowData,
                            undefined,
                            undefined,
                            Number(e.value),
                            undefined,
                            undefined,
                            undefined,
                          );
                          formMethods.setValue(
                            `cost_details.${rowData.cost_detail_id}.quantity`,
                            e.value,
                          );
                        }}
                        onBlur={(e: any) => {
                          const value = e.target.value.replaceAll(',', '');
                          setChangeData(true);
                          onSetAddVolumn(
                            rowData,
                            undefined,
                            undefined,
                            isNaN(value) ? value : Number(value),
                            undefined,
                            undefined,
                            undefined,
                          );
                          formMethods.setValue(
                            `cost_details.${rowData.cost_detail_id}.quantity`,
                            value,
                          );
                        }}
                      />
                    </div>
                    <div
                      className="flex align-items-center justify-content-center"
                      style={{ color: '#e24c4c', fontSize: '0.75rem' }}
                    >
                      {
                        errors.cost_details?.[rowData.cost_detail_id]?.quantity
                          ?.message
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="col border-right-1 border-300 flex align-items-center justify-content-center">
                <Dropdown
                  value={rowData.unit ? rowData.unit : ''}
                  options={units}
                  placeholder=""
                  className="w-full h-2rem"
                  onChange={(e) => {
                    setChangeData(true);

                    onSetAddVolumn(
                      rowData,
                      undefined,
                      undefined,
                      undefined,
                      e.target.value,
                      undefined,
                      undefined,
                    );
                  }}
                  filter={true}
                />
              </div>
              <div className="col flex align-items-center justify-content-end">
                <div className="card">
                  <div className="flex flex-column card-container green-container">
                    <div className="flex align-items-center justify-content-center">
                      <InputNumberFreeForm
                        id={`cost_details.${rowData.cost_detail_id}.unitPrice`}
                        name={`cost_details.${rowData.cost_detail_id}.unitPrice`}
                        className="mr-0 h-2rem"
                        inputStyle={{ width: '100%', textAlign: 'right' }}
                        value={rowData.unit_price ? rowData.unit_price : ''}
                        mode={'decimal'}
                        maxLength={10}
                        onChange={(e: any) => {
                          if(!isMinusValueOnChangeOrBlur(e?.value)) {
                            setChangeData(true);
                            onSetAddVolumn(
                              rowData,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              Number(e.value),
                              undefined,
                            );
                            formMethods.setValue(
                              `cost_details.${rowData.cost_detail_id}.unitPrice`,
                              e?.value,
                            );
                          }
                        }}
                        onBlur={(e: any) => {
                          const value = e.target.value.replaceAll(',', '');
                          if(!isMinusValueOnChangeOrBlur(value)) {
                            setChangeData(true);
                            onSetAddVolumn(
                              rowData,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              isNaN(value) ? value : Number(value),
                              undefined
                            );
                            formMethods.setValue(
                              `cost_details.${rowData.cost_detail_id}.unitPrice`,
                              value
                            );
                          }
                        } }                      />
                    </div>
                    <div
                      className="flex align-items-center justify-content-center"
                      style={{ color: '#e24c4c', fontSize: '0.75rem' }}
                    >
                      {
                        errors.cost_details?.[rowData.cost_detail_id]?.unitPrice
                          ?.message
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }
    }
  };

  const handleDelete = (rowData: any) => {
    setChangeData(true);
    const index = rowData.rowLevel.split('-')[1];
    if (rowData.dataFlag == false) {
      costSmallCategoryIds.push(rowData.cost_small_category_id);
    }
    if (mainRowDatas !== undefined) {
      const main = mainRowDatas.filter(
        (item) => item.rowLevel.split('-')[1] !== index,
      );
      setMainrowDatas(main);
    }

    // set values for cost small categories
    formMethods.setValue(
      `cost_small_categories.${rowData.cost_small_category_id}.label`,
      'delete',
    );
    formMethods.setValue(
      `cost_small_categories.${rowData.cost_small_category_id}.remarks`,
      'delete',
    );

    // clear errors
    formMethods.clearErrors(
      `cost_small_categories.${rowData.cost_small_category_id}.label`,
    );
    formMethods.clearErrors(
      `cost_small_categories.${rowData.cost_small_category_id}.remarks`,
    );
    mainRowDatas.map((item) => {
      if (item.rowLevel == 'item-' + index) {
        // set values for cost details
        formMethods.setValue(
          `cost_details.${item.cost_detail_id}.name`,
          'delete',
        );
        formMethods.setValue(
          `cost_details.${item.cost_detail_id}.specification`,
          'delete',
        );
        formMethods.setValue(`cost_details.${item.cost_detail_id}.quantity`, 0);
        formMethods.setValue(
          `cost_details.${item.cost_detail_id}.unitPrice`,
          0,
        );
        formMethods.setValue(
          `cost_details.${item.cost_detail_id}.remarks`,
          'delete',
        );

        // clear errors
        formMethods.clearErrors(`cost_details.${item.cost_detail_id}.name`);
        formMethods.clearErrors(
          `cost_details.${item.cost_detail_id}.specification`,
        );
        formMethods.clearErrors(`cost_details.${item.cost_detail_id}.quantity`);
        formMethods.clearErrors(
          `cost_details.${item.cost_detail_id}.unitPrice`,
        );
        formMethods.clearErrors(`cost_details.${item.cost_detail_id}.remarks`);
      }
    });
  };

  const assessedTemplate = (rowData: any) => {
    if (rowData.dataFlag) {
      return (
        <div className="grid -m-2">
          {/* <div className="col border-right-1 border-300 flex align-items-center justify-content-end"></div>
          <div className="col border-right-1 border-300 flex align-items-center justify-content-center"></div>
          <div className="col flex align-items-center justify-content-end"></div> */}
        </div>
      );
    } else {
      const assessedValue = rowData.rowLevel.split('-')[0];
      if (assessedValue === 'subTotal') {
        return (
          <div className="grid -m-3">
            {/* <div className="col border-right-1 border-300 -ml-1" style={{ wordBreak: 'break-word', minHeight: '65px'}}></div>
            <div className="col border-right-1 border-300" style={{ wordBreak: 'break-word', minHeight: '65px'}}></div>
            <div className="col" style={{ wordBreak: 'break-word', minHeight: '65px'}}></div> */}
          </div>
        );
      }
      if (assessedValue !== 'subTotal') {
        return (
          <div className="grid -m-3">
            <div
              className="col border-right-1 border-300 flex align-items-center justify-content-end"
              style={{ wordBreak: 'break-word', minHeight: '54px'}}
            >
              {rowData.assessment_quantity
                ? rowData.assessment_quantity.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                : ''}
            </div>
            <div
              className="col border-right-1 border-300 flex align-items-center justify-content-center"
              style={{ wordBreak: 'break-word' }}
            >
              {rowData.assessment_unit}
            </div>
            <div
              className="col flex align-items-center justify-content-end mr-1"
              style={{ wordBreak: 'break-word' }}
            >
              {rowData.assessment_unit_price
                // ? ('￥'+ rowData.assessment_unit_price.toLocaleString(undefined, {
                //   // style: 'currency',
                //   // currency: 'JPY',
                //   maximumFractionDigits: 2
                // }))
                ? prefixYenSign(
                  changeFormatCurrency(rowData.assessment_unit_price),
                )
                : ''}
            </div>
          </div>
        );
      }
    }
  };

  /** form **/
  const formMethods = useForm<CostDetailInputType>({
    mode: "onChange",
    resolver: yupResolver(schema),
    shouldFocusError: false,
  });
  const {
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const returnOrder = async (cost_detail_ids: any[]) => {
    await getCostsManageItems(
      constructionId,
      cost_category_id_query ? cost_category_id_query : costCategoryId,
      middle_category_id_query ? middle_category_id_query : middleCategoryId,
    )
      .then((response) => {
        if (response.cost_detail_list.length <= 0) {
          setOrderBtnDisabled(true);
        }
        const oldData = mainRowDatas.filter((item) => item.dataFlag);
        mainRowDatas.splice(0);
        // cost details list
        const results = response.cost_detail_list;
        results.map((result, index1) => {
          mainRowDatas?.push({
            dataFlag: false,
            id: 0,
            rowgroupid: index1,
            rowLevel: 'subTotal-' + index1,
            isChecked: false,
            isCheckedMenu: false,
            cost_small_category_id: result.cost_small_categories.id,
            assessment_status: result.cost_small_categories.assessment_status,
            construction_type_name:
              result.small_categories.construction_type_name,
            specification: '',
            entry_small_category_name:
              result.cost_small_categories.entry_small_category_name,
            quantity: 0,
            unit_price: 0,
            unit: '',
            subtotal: 0,
            assessment_quantity: 0,
            assessment_unit: '',
            assessment_unit_price: 0,
            assessed_amount: 0,
            cooperator_name: '',
            remarks: result.cost_small_categories.remarks,
            reason_id: '',
            department_id: '',
            order_no: result.cost_small_categories.order_no,
            cost_detail_id: -1,
            disabled: result.cost_small_categories.disabled,
            close_flag: false,
            small_category_id: result.small_categories.id,
          });

          formMethods.setValue(
            `cost_small_categories.${result.cost_small_categories.id}.label`,
            result.cost_small_categories.entry_small_category_name
              ? result.cost_small_categories.entry_small_category_name
              : '',
          );
          formMethods.setValue(
            `cost_small_categories.${result.cost_small_categories.id}.remarks`,
            result.cost_small_categories.remarks
              ? result.cost_small_categories.remarks
              : '',
          );
          let subtotalTotal = 0;
          let assessedAmountTotal = 0.0;
          result.cost_details.map((cost_detail) => {
            subtotalTotal += cost_detail.subtotal;
            assessedAmountTotal += Number(cost_detail.assessed_amount);
            mainRowDatas?.push({
              dataFlag: false,
              id: 0,
              rowgroupid: index1,
              rowLevel: 'item-' + index1,
              isChecked: false,
              isCheckedMenu: false,
              cost_small_category_id: result.cost_small_categories.id,
              assessment_status: cost_detail.assessment_status,
              construction_type_name: cost_detail.detail,
              specification: cost_detail.specification,
              entry_small_category_name: '',
              quantity: cost_detail.quantity,
              unit_price: cost_detail.unit_price,
              unit: cost_detail.unit,
              subtotal: cost_detail.subtotal,
              assessment_quantity: Number(cost_detail.assessment_quantity),
              assessment_unit: cost_detail.assessment_unit,
              assessment_unit_price: cost_detail.assessment_unit_price,
              assessed_amount: Number(cost_detail.assessed_amount),
              cooperator_name: cost_detail.cooperator_name,
              remarks: cost_detail.remarks,
              reason_id: cost_detail.reason_id,
              department_id: cost_detail.department_id,
              order_no: '',
              cost_detail_id: cost_detail.id,
              disabled: false,
              close_flag: cost_detail.close_flag,
              small_category_id: result.small_categories.id,
            });

            formMethods.setValue(
              `cost_details.${cost_detail.id}.name`,
              'database',
            );
            formMethods.setValue(
              `cost_details.${cost_detail.id}.specification`,
              'database',
            );
            formMethods.setValue(`cost_details.${cost_detail.id}.quantity`, 0);
            formMethods.setValue(`cost_details.${cost_detail.id}.unitPrice`, 0);
            formMethods.setValue(
              `cost_details.${cost_detail.id}.remarks`,
              cost_detail.remarks ? cost_detail.remarks : '',
            );
          });
          const mainIndex = mainRowDatas.findIndex(
            (item) => item.rowLevel === 'subTotal-' + index1,
          );

          mainRowDatas[mainIndex].assessed_amount = assessedAmountTotal;
          mainRowDatas[mainIndex].subtotal = subtotalTotal;
        });

        // clear data
        const mainNew: CostManageMinorItemTypeNew[] = [];

        // add
        mainRowDatas.map((data) => {
          mainNew.push(data);
        });

        // add changes data
        oldData.map((data) => {
          mainNew.push(data);
        });

        setMainrowDatas(mainNew);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data: any) => {
    setSubmitBtnDisabled(true);
    addCostDetailsType.splice(0);
    const filterData = mainRowDatas.filter(
      (item) => item.dataFlag == false && item.rowLevel.includes('subTotal'),
    );
    const filterItemData = mainRowDatas.filter(
      (item) => item.dataFlag == false && item.rowLevel.includes('item'),
    );
    const addData = mainRowDatas.filter((item) => item.dataFlag);
    updateCostSmallType.splice(0);
    updateCostDetailType.splice(0);
    filterData.map((item) => {
      updateCostSmallType.push({
        remarks: item.remarks,
        entry_small_category_name: item.entry_small_category_name,
        cost_small_category_id: item.cost_small_category_id,
      });

      const gpIndex = item.rowLevel.split('-')[1];
      const addItemArr = mainRowDatas
        .filter((item) => item.dataFlag && item.rowLevel == 'item-' + gpIndex)
        .map((data) => {
          addCostDetailsType.push(data);
        });
    });

    filterItemData.map((item) => {
      updateCostDetailType.push({
        remarks: item.remarks,
        reason_id: item.reason_id,
        department_id: item.department_id,
        cost_detail_id: item.cost_detail_id,
        detail: item.construction_type_name,
        specification: item.specification,
        quantity: item.quantity,
        unit: item.unit,
        unit_price: item.unit_price,
        subtotal: item.subtotal,
      });
    });
    const update_data = {
      cost_samll_categories: updateCostSmallType,
      cost_details: updateCostDetailType,
    };
    addCostDetailsData(
      constructionId,
      cost_category_id_query ? cost_category_id_query : costCategoryId,
      addData,
      update_data,
      costDeatilIds,
      addCostDetailsType,
      costSmallCategoryIds,
    )
      .then(() => {
        setSubmitBtnDisabled(false);
        costDeatilIds.splice(0);
        costSmallCategoryIds.splice(0);
        toast.current?.show(
          toastMessage(MESSAGES.API_RESULT.SAVE.SUCCESS('原価明細')),
        );
        fetchData.current = true;
        fetchEstimatesCategoriesData();
        setChangeData(false);
      })
      .catch(() => {
        toast.current?.show(
          toastErrorMessage(MESSAGES.API_RESULT.SAVE.FAILURE('原価明細')),
        );
      });
  };

  const onSelectedReasons = (e: any) => {
    const mainIndex = mainRowDatas.findIndex(
      (item) => item.cost_detail_id === circleIconIndex,
    );
    const selected = checkboxReason ? [...checkboxReason] : [];
    if (e.target.checked) {
      selected.push(e.target.value);
      // add main data
      mainRowDatas[mainIndex].reason_id = mainRowDatas[mainIndex].reason_id
        ? mainRowDatas[mainIndex].reason_id + ';' + e.target.value
        : e.target.value;
    } else {
      selected.splice(selected.indexOf(e.target.value), 1);
      const reaSelected = mainRowDatas[mainIndex].reason_id;
      if (reaSelected.includes(e.target.value + ';')) {
        mainRowDatas[mainIndex].reason_id = mainRowDatas[
          mainIndex
        ].reason_id.replace(e.target.value + ';', '');
      } else if (reaSelected.includes(';' + e.target.value)) {
        mainRowDatas[mainIndex].reason_id = mainRowDatas[
          mainIndex
        ].reason_id.replace(';' + e.target.value, '');
      } else if (reaSelected.includes(e.target.value)) {
        mainRowDatas[mainIndex].reason_id = mainRowDatas[
          mainIndex
        ].reason_id.replace(e.target.value, '');
      }
    }
    setCheckboxReason(selected);
  };

  const onSelectedDepartments = (e: any) => {
    const mainIndex = mainRowDatas.findIndex(
      (item) => item.cost_detail_id === circleIconIndex,
    );
    const selected = checkboxDepartment ? [...checkboxDepartment] : [];
    if (e.target.checked) {
      selected.push(e.target.value);

      mainRowDatas[mainIndex].department_id = mainRowDatas[mainIndex]
        .department_id
        ? mainRowDatas[mainIndex].department_id + ';' + e.target.value
        : e.target.value;
    } else {
      selected.splice(selected.indexOf(e.target.value), 1);
      const deptSelected = mainRowDatas[mainIndex].department_id;
      if (deptSelected.includes(e.target.value + ';')) {
        mainRowDatas[mainIndex].department_id = mainRowDatas[
          mainIndex
        ].department_id.replace(e.target.value + ';', '');
      } else if (deptSelected.includes(';' + e.target.value)) {
        mainRowDatas[mainIndex].department_id = mainRowDatas[
          mainIndex
        ].department_id.replace(';' + e.target.value, '');
      } else if (deptSelected.includes(e.target.value)) {
        mainRowDatas[mainIndex].department_id = mainRowDatas[
          mainIndex
        ].department_id.replace(e.target.value, '');
      }
    }
    setCheckboxDepartment(selected);
  };

  const input = useRef<HTMLInputElement | null>(null);
  const span = useRef<HTMLSpanElement | null>(null);
  const onClickDataTable = useCallback((event: any) => {
    if ((event.target as Element)) {
      if ((event.target as Element).tagName === 'INPUT') {
        input.current = event.target as HTMLInputElement;
        input.current.focus();
      } else if ((event.target as Element).tagName === 'SPAN') {
        span.current = event.target as HTMLSpanElement;
        span.current.focus();
      }
    } else {
      if (input.current) {
        input.current = null;
      }
    }
  }, []);

  if (!construction) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>原価管理</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      {/* メニュー */}
      <ConstructionMenu construction={construction} />

      <div className="card">
        <div className="card-container">
          <div className="flex">
            <div className="flex-1 flex align-items-end justify-content-start">
              <div className="card-container blue-container overflow-hidden">
                <div className="flex">
                  <div className="flex align-items-start justify-content-start mr-2">
                    <h2 className="mt-0">
                      {middle_category_name_query
                        ? middle_category_name_query
                        : middleCategoryName}
                    </h2>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex align-items-start justify-content-start mr-2">
                    <Button
                      variant="outlined"
                      size="small"
                      className={
                        construction?.status == '4'
                          ? `${cx('disable-button')}`
                          : `${cx('link-button')}`
                      }
                      onClick={() =>
                        router.push(
                          `/constructions/${constructionId}/cost-categories`,
                        )
                      }
                      disabled={construction?.status == '4'}
                    >
                      カテゴリー／実行予算登録
                    </Button>
                  </div>
                  <div className="flex align-items-start justify-content-start mr-2">
                    <Button
                      variant="outlined"
                      size="small"
                      disabled={
                        construction.status == '4' ||
                        btnDisabled ||
                        copyBtnDisable
                      }
                      className={
                        construction.status == '4' ||
                        btnDisabled ||
                        copyBtnDisable
                          ? `${cx('disable-button')}`
                          : `${cx('link-button')}`
                      }
                      onClick={() => {
                        getCopiedData();
                      }}
                    >
                      {copyBtnText}
                    </Button>
                  </div>
                  <div className="flex align-items-start justify-content-start mr-2">
                    <Button
                      variant="outlined"
                      size="small"
                      disabled={construction.status == '4' || btnDisabled}
                      className={
                        construction.status == '4' || btnDisabled
                          ? `${cx('disable-button')}`
                          : `${cx('link-button')}`
                      }
                      onClick={() => setFileAddModal(true)}
                    >
                      小分類追加
                    </Button>
                  </div>
                  <div className="flex align-items-start justify-content-start mr-2">
                    <Button
                      variant="outlined"
                      size="small"
                      disabled={construction.status == '4' || orderBtnDisabled}
                      className={
                        construction.status == '4' || orderBtnDisabled
                          ? `${cx('disable-button')}`
                          : `${cx('link-button')}`
                      }
                      onClick={() => {
                        getOrderData(
                          cost_category_id_query
                            ? cost_category_id_query
                            : costCategoryId,
                        );
                        setDialogHeader('発注登録');
                        setButtonLabel('発注申請する');
                      }}
                    >
                      発注申請
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1  flex align-items-center justify-content-center">
              <div className="flex flex-row">
                <div className="flex pr-2">
                  <table className={styles['table']}>
                    <thead>
                      <tr>
                        <td
                          className={styles['con-info-label']}
                        >
                          実行予算
                        </td>
                        <td
                          className={styles['con-info-data']}
                          style={{ width: '200px', wordBreak: 'break-word' }}
                        >
                          {/* {'￥' +Number(totalWorkingBudget).toLocaleString(undefined, {
                            // style: 'currency',
                            // currency: 'JPY',
                            maximumFractionDigits: 2
                          })} */}
                          {
                            //  cuprefixYenSign(formatCurrency(Number(totalWorkingBudget)))
                            prefixYenSign(
                              changeFormatCurrency(Number(totalWorkingBudget)),
                            )
                          }
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={styles['con-info-label']}
                        >
                          最終予想原価
                        </td>
                        <td
                          className={styles['con-info-data']}
                          style={{ width: '200px', wordBreak: 'break-word' }}
                        >
                          {/* {'￥' +calculatefinalexpect().toLocaleString(undefined, {
                            // style: 'currency',
                            // currency: 'JPY',
                            maximumFractionDigits: 2
                          })} */}
                          {prefixYenSign(changeFormatCurrency(calculatefinalexpect()),)}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={styles['con-info-label']}
                        >
                          {Number(totalWorkingBudget) > calculatefinalexpect()
                            ? '利益'
                            : '超過'}
                        </td>
                        <td
                          className={styles['con-info-data']}
                          style={{ width: '200px', wordBreak: 'break-word' }}
                        >
                          {/* {'￥' +(
                            Number(totalWorkingBudget) - calculatefinalexpect()
                          ).toLocaleString(undefined, {
                            // style: 'currency',
                            // currency: 'JPY',
                            maximumFractionDigits: 2
                          })} */}
                          {prefixYenSign(changeFormatCurrency(Number(totalWorkingBudget) - calculatefinalexpect()),)}
                        </td>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="flex pr-2">
                  <table className={styles['table']} >
                    <thead>
                      <tr>
                        <td
                          className={styles['con-info-label']}
                        >
                          全体売上
                        </td>
                        <td
                          className={styles['con-info-data']}
                          style={{ width: '200px', wordBreak: 'break-word' }}
                        >
                          {/* {'￥'+Number(salesAmount).toLocaleString(undefined, {
                            // style: 'currency',
                            // currency: 'JPY',
                            maximumFractionDigits: 2
                          })} */}
                          {prefixYenSign(changeFormatCurrency(Number(salesAmount)),)}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={styles['con-info-label']}
                        >
                          全体最終予想原価
                        </td>
                        <td
                          className={styles['con-info-data']}
                          style={{ width: '200px', wordBreak: 'break-word' }}
                        >
                          {/* {'￥'+calculateoverallfinal().toLocaleString(undefined, {
                            // style: 'currency',
                            // currency: 'JPY',
                            maximumFractionDigits: 2
                          })} */}
                          {prefixYenSign(changeFormatCurrency(calculateoverallfinal()),)}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={styles['con-info-label']}
                        >
                          粗利額（{overallGrossProfitRate() + '%'}）
                        </td>
                        <td
                          className={styles['con-info-data']}
                          style={{ width: '200px', wordBreak: 'break-word' }}
                        >
                          {
                            prefixYenSign(changeFormatCurrency((Number(salesAmount) - calculateoverallfinal())),)
                          }
                        </td>
                      </tr>
                    </thead>
                  </table>
                </div>
               </div>
            </div>    
            
          </div>
        </div>
      </div>

      <div className="flex col-12 pl-0">
        <div className="col-3 lg:col-2 pl-0">
          {costManageMenu && (
            <CostManageMenu
              costManageMenu={costManageMenu}
              constructionId={constructionId}
              middleCategoryId={
                middle_category_id_query
                  ? middle_category_id_query
                  : middleCategoryId
              }
              editValue={changeData}
            />
          )}
        </div>
        <div className="col-9 lg:col-10 justify-content-end pr-0 pl-0">
          <div style={{ width: '100%' }} className="mt-2">
            <FormProvider {...formMethods}>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div
                  className="datatable-style-demo overflow-y-scroll"
                  style={{ height: '500px' }}
                >
                  <ScrollContainer className="container" onClick={onClickDataTable}>
                    <div className="card form mb-3">
                      <DataTable
                        value={minorItemsValues()}
                        rowClassName={rowClass}
                        headerColumnGroup={headerGroup}
                        showGridlines
                        size="small"
                        className="cost-manage-table pr-1"
                        style={{ width: tableWidth + 'px' }}
                        emptyMessage=" "
                      >
                        <Column
                          field="subTotal"
                          body={subTotalToggle}
                          style={{ width: '2%' }}
                        />
                        <Column
                          field="btnType"
                          style={{ width: '3%' }}
                          body={btnTypeBodyTemplae}
                        />
                        <Column
                          field="assessment_status"
                          style={{ width: '6%' }}
                          body={assessmentStatusTemplate}
                        />
                        <Column
                          field="construction_type_name"
                          style={{ width: '10%', wordBreak: 'break-word' }}
                          body={detailBodyTemplate}
                        />
                        {specificationColComponents}
                        <Column
                          field="costManageColspanTemplate"
                          body={costManageTemplate}
                          align="center"
                        />
                        <Column
                          field="subtotal"
                          style={{ wordBreak: 'break-word' }}
                          align="right"
                          body={subtotalBodyTemplate}
                        />
                        <Column
                          field="assessedColspanTemplate"
                          body={assessedTemplate}
                          align="center"
                        />
                        <Column
                          field="assessed_amount"
                          style={{ wordBreak: 'break-word' }}
                          align="right"
                          body={assAmtBodyTemplate}
                        />
                        {remarkColComponents}
                        <Column
                          field="reason"
                          style={{ width: '95px' }}
                          body={addCircleBtnTemplate}
                        />
                        <Column
                          field="cooperator_name"
                          body={companyCodeTemplate}
                          style={{ width: '140px' }}
                        />
                      </DataTable>
                    </div>
                  </ScrollContainer>
                </div>

                {/* footer */}
                <div className="flex justify-content-end pr-3 mt-4">
                  <div className="flex align-items-center justify-content-center mr-2">
                    <Button variant="outlined" disabled>
                      印刷
                    </Button>
                  </div>
                  <div className="flex align-items-center justify-content-center">
                    <Button
                      variant="outlined"
                      type="submit"
                      className={
                        construction.status == '4' ||
                        submitBtnDisable ||
                        !changeData
                          ? `${cx('disable-button1')}`
                          : `${cx('link-button1')}`
                      }
                      disabled={
                        construction.status == '4' ||
                        submitBtnDisable ||
                        !changeData
                      }
                    >
                      原価保存
                    </Button>
                  </div>
                </div>
                <OverlayPanel
                  ref={op}
                  id="overlay_panel_click"
                  style={{ width: '900px', height: '420px' }}
                >
                  <ScrollPanel style={{ width: '880px', height: '400px' }}>
                    <div className="grid -ml-3 -mr-3 px-0">
                      {reasons?.map((reason, index) => (
                        <div key={index} className="col-4 -mb-4">
                          <Checkbox
                            style ={{
                              color: checkboxReason?.some(
                                (checkbox) => Number(checkbox) === reason.id,
                              ) ? "#fb923c" : '#ced4da'
                            }}
                            name="reasons"
                            value={reason.id}
                            onChange={(e: any) => {
                              setChangeData(true);
                              onSelectedReasons(e);
                            }}
                            checked={checkboxReason?.some(
                              (checkbox) => Number(checkbox) === reason.id,
                            )}
                          />
                          <label className="-ml-1 text-xs">{reason.name}</label>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4"></div>
                    <div className="grid -ml-3 -mr-3 mb-1 px-0">
                      {departments?.map((department, index2) => (
                        <div key={index2} className="col-4 -mb-4">
                          <Checkbox
                            style ={{
                              color: checkboxDepartment?.some(
                                (checkbox) => Number(checkbox) === department.id,
                              ) ? "#fb923c" : '#ced4da'
                            }}
                            name="departments"
                            value={department.id}
                            onChange={(e: any) => {
                              setChangeData(true);
                              onSelectedDepartments(e);
                            }}
                            checked={checkboxDepartment?.some(
                              (checkbox) => Number(checkbox) === department.id,
                            )}
                          />
                          <label className="-ml-2 text-xs">
                            {department.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollPanel>
                </OverlayPanel>
                <OverlayPanel
                  ref={om}
                  id="overlay_panel_over"
                  style={{ width: '800px' }}
                >
                  <div className="grid">
                    {checkboxReason?.map((f: any, index: number) => {
                      const reasonId =
                        reasons &&
                        reasons.filter((item) => item.id == Number(f)).length >
                          0
                          ? reasons.filter((item) => item.id == Number(f))[0].id
                          : '';
                      const reasonName =
                        reasons &&
                        reasons.filter((item) => item.id == Number(f)).length >
                          0
                          ? reasons.filter((item) => item.id == Number(f))[0]
                              .name
                          : '';
                      return (
                        <div key={index} className="col-3 -mb-4">
                          <Checkbox
                            name="deparment"
                            value={reasonId}
                            checked={true}
                            disabled={true}
                          />
                          <label className="-ml-1">{reasonName}</label>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4"></div>
                  <div className="grid">
                    {checkboxDepartment?.map((f: any, index: number) => {
                      const departmentId =
                        departments &&
                        departments.filter((item) => item.id == Number(f))
                          .length > 0
                          ? departments.filter(
                              (item) => item.id == Number(f),
                            )[0].id
                          : '';
                      const departmentName =
                        departments &&
                        departments.filter((item) => item.id == Number(f))
                          .length > 0
                          ? departments.filter(
                              (item) => item.id == Number(f),
                            )[0].name
                          : '';
                      return (
                        <div key={index} className="col-3 -mb-4">
                          <Checkbox
                            name="deparment"
                            value={departmentId}
                            checked={true}
                            disabled={true}
                          />
                          <label className="-ml-1">{departmentName}</label>
                        </div>
                      );
                    })}
                  </div>
                </OverlayPanel>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>

      <AddSmallItemDialog
        constructionId={constructionId}
        data={tableData}
        dialogStatus={dialog}
        isOpen={fileAddModal}
        fileType={fileType}
        excelFlag={excelFlag}
        onHide={() => setFileAddModal(false)}
        onSubmitcsv={onSubmitAssignedCsv}
        onSubmitexcel={onSubmitAssignedExcel}
        onSubmitSmallCategory={onSubmitAssignedSmallCategory}
        cancelStatus={cancelStatus}
        small_category_id={smallCategoryId}
        isLoading={true}
        middle_category_id={
          middle_category_id_query ? middle_category_id_query : middleCategoryId
        }
        estimate_category_id={
          cost_category_id_query ? cost_category_id_query : costCategoryId
        }
        middle_category_name={
          middle_category_name_query
            ? middle_category_name_query
            : middleCategoryName
        }
        returnSmallItemData={returnSmallItemDataList}
      />
      {orderAddModal && (
        <OrdersDialog
          isOpen={orderAddModal}
          dialogHeader={dialogHeader}
          buttonLabel={buttonLabel}
          onHide={() => {
            setOrderAddModal(false);
            setOrderData(undefined);
            setDisablestatus(false);
          }}
          constructionId={constructionId}
          cost_category_id={
            cost_category_id_query ? cost_category_id_query : costCategoryId
          }
          middle_category_id={
            middle_category_id_query
              ? middle_category_id_query
              : middleCategoryId
          }
          data={minorItemsDialog}
          orderData={order_data}
          disable_status={disablestatus}
          returnOrder={returnOrder}
        />
      )}
    </>
  );
};

export default CostManage;

CostManage.auth = true;
CostManage.pageId = 'EU_CONSTRUCTION_COSTMANAGE';

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
