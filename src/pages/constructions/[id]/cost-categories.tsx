/* eslint-disable indent */
/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint-disable react-hooks/exhaustive-deps */
import { ParsedUrlQuery } from 'querystring';
import Buttonmui from '@mui/material/Button';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { useEffect, useState, useContext } from 'react';
import styles from './costCategories.module.scss';
import { getConstruction } from '@/api/construction';
import {
  CostCategoriesList,
  LargeCategoriesList,
  MiddleCategoriesList,
  AddCostCategoriesList,
  CostCategoryApplicationStatusList,
  CostDetailDeleteFlagList,
  getCostCategoriesList,
  addCostCategoriesList,
} from '@/api/costCategories';
import {
  EstimatesCategoriesList,
  getEstimatesCategoriesList,
} from '@/api/estimatesCategories';
import { Header } from '@/components/commons/header/header';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import { CostCategoriesConfirmDialog } from '@/components/constructions/cost/costCategoriesConfirmDialog';
import { OrderedWarningDialog } from '@/components/constructions/cost/costCategoriesOrderedWarningDialog';
import { ToastContext } from '@/components/context/toast/toast';
import { InputNumberFreeForm } from '@/components/forms/input/inputNumberFreeForm';
import { NextPageWithLayout } from '@/pages/_app';
import { TypeConstructionDetail } from '@/types/api/construction';
import { toFixed } from '@/utils/calculation';
import { API_STATUS_CODE } from '@/utils/constants/api';
import { MESSAGES } from '@/utils/constants/message';
import {
  validationErrorMessage,
  validationErrorMessageHtmlFormat,
} from '@/utils/messageUtils';
import { toastErrorMessage, toastMessage } from '@/utils/toastMessage';

type Props = {
  constructionId: number;
};

const CostCategoriesPage: NextPageWithLayout<Props> = ({ constructionId }) => {
  const router = useRouter();
  const { toast } = useContext(ToastContext);
  const [costCategories, setCostCategories] = useState<CostCategoriesList>();
  const [estimatesCategories, setEstimatesCategories] =
    useState<EstimatesCategoriesList>();
  const [largecheckbox, setLargecheckbox] = useState<number[]>([]);
  const [middlecheckbox, setMiddlecheckbox] = useState<number[]>([]);
  const [initselectedLargeCheckboxes] = useState<number[]>([]);
  const [initselectedMiddleCheckboxes] = useState<number[]>([]);
  const [initselectedWorkingBudget] = useState<WorkingBudgetValueType[]>([]);
  const [init, setInit] = useState<boolean>(true);
  const [addedLarge] = useState<number[]>([]);
  const [addedMiddle, setAddedMiddle] = useState<number[]>([]);
  const [deletedLarge] = useState<number[]>([]);
  const [deletedMiddle] = useState<number[]>([]);
  // const [CostCategoryAddType, setCostCategoryAddType] = useState<
  //   AddCostCategoriesList[]
  // >([]);
  const [middleCategoriesList] = useState<MiddleCategoriesList[]>([]);
  const [statusList] = useState<CostCategoryApplicationStatusList[]>([]);
  const [detailFlagList] = useState<CostDetailDeleteFlagList[]>([]);
  const [delmiddleName, setDelmiddleName] = useState<string[]>([]);
  const [confrimModel, setConfrimModel] = useState<boolean>(false);
  const [orderWarningModel, setOderWarningModel] = useState<boolean>(false);
  const [pagerefresh, setPagerefresh] = useState<boolean>(false);
  const [copybuttonDisable, setCopybuttonDisable] = useState<boolean>(false);
  const [initWorkingBudget, setInitWorkingBudget] = useState<
    WorkingBudgetValueType[]
  >([]); //get from DB
  const [inputWorkingBudget] = useState<WorkingBudgetValueType[]>([]); //input
  const [selectedEstimateLargeCheckboxes] = useState<number[]>([]);
  const [selectedEstimateMiddleCheckboxes] = useState<number[]>([]);
  let [middlecheckboxTmp] = useState<number[]>([]);
  const [invalidWorkingBudgetMiddleId] = useState<number[]>([]);
  const [disabelLargeId] = useState<number[]>([]);
  const [orderMiddle, setOrderMiddle] = useState<number[]>([]);
  const [orderedMiddleName, setOrderedMiddleName] = useState<string[]>([]);

  type WorkingBudgetValueType = {
    mid_id: number;
    value: any;
  };

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

  useEffect(() => {
    const fetchCostCategoriesData = async () => {
      await getCostCategoriesList(constructionId)
        .then((response) => {
          setCostCategories(response);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // fetch construction
    fetchCostCategoriesData();
  }, []);

  useEffect(() => {
    const fetchEstimatesCategoriesData = async () => {
      await getEstimatesCategoriesList(constructionId)
        .then((response) => {
          setEstimatesCategories(response);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // fetch construction
    fetchEstimatesCategoriesData();
  }, []);

  useEffect(() => {
    if (costCategories) {
      if (init === true) {
        costCategories?.cost_categories.map(
          (e) => (
            initselectedLargeCheckboxes.push(e.construction_large_category_id),
            initselectedMiddleCheckboxes.push(
              e.construction_middle_category_id,
            ),
            initselectedWorkingBudget.push({
              mid_id: e.construction_middle_category_id,
              value: e.working_budget,
            })
          ),
        );

        const initselectedLargeCheckboxesTmp =
          initselectedLargeCheckboxes.filter((e, index) => {
            return initselectedLargeCheckboxes.indexOf(e) === index;
          });

        const initselectedMiddleCheckboxesTmp =
          initselectedMiddleCheckboxes.filter((e, index) => {
            return initselectedMiddleCheckboxes.indexOf(e) === index;
          });

        setLargecheckbox(initselectedLargeCheckboxesTmp);
        setMiddlecheckbox(initselectedMiddleCheckboxesTmp);
        setInitWorkingBudget(initselectedWorkingBudget);
        setInit(false);

        //中分類リスト
        costCategories.large_categories.map((e) =>
          e.middle_categories.map((f) => middleCategoriesList.push(f)),
        );

        //ステータス取得
        costCategories.status.map((e) => statusList.push(e));

        //明細削除フラグ取得
        costCategories.detail_flag.map((e) => detailFlagList.push(e));

        // disable large categories Id 取得
        statusList.map((status) => {
          let largeID = 0;
          middleCategoriesList.map((mid) => {
            mid.id === status.construction_middle_category_id
              ? (largeID = mid.large_category_id)
              : '';

            largeID !== 0
              ? disabelLargeId.indexOf(largeID) === -1
                ? disabelLargeId.push(largeID)
                : ''
              : '';
          });
        });
      }
    }
  });

  useEffect(() => {
    if (pagerefresh) {
      setPagerefresh(false);
    }
  });

  //コピーボタン処理
  const onCopyEstimatesCategory = () => {
    if (estimatesCategories) {
      estimatesCategories?.estimates_categories.map(
        (e) => (
          selectedEstimateLargeCheckboxes.push(
            e.construction_large_category_id,
          ),
          selectedEstimateMiddleCheckboxes.push(
            e.construction_middle_category_id,
          )
        ),
      );

      const selectedEstimateLargeCheckboxesTmp =
        selectedEstimateLargeCheckboxes.filter((e, index) => {
          return selectedEstimateLargeCheckboxes.indexOf(e) === index;
        });

      //大分類(cost + estimate)
      const addLargeTmp = [...initselectedLargeCheckboxes];
      selectedEstimateLargeCheckboxesTmp.map(
        (e) => (
          largecheckbox.push(e),
          addLargeTmp.indexOf(e) === -1 ? addedLarge.push(e) : ''
        ),
      );

      //remove duplicate value(大分類)
      const largecheckboxTmp = largecheckbox.filter((e, index) => {
        return largecheckbox.indexOf(e) === index;
      });
      setLargecheckbox(largecheckboxTmp);

      //中分類(cost + estimate)
      const addMiddleTmp = [...initselectedMiddleCheckboxes];
      selectedEstimateMiddleCheckboxes.map(
        (e) => (
          middlecheckbox.push(e),
          addMiddleTmp.indexOf(e) === -1 ? addedMiddle.push(e) : ''
        ),
      );

      //remove duplicate value(中分類)
      const middlecheckboxTmp = middlecheckbox.filter((e, index) => {
        return middlecheckbox.indexOf(e) === index;
      });
      setMiddlecheckbox(middlecheckboxTmp);
    }
    setCopybuttonDisable(true);
  };

  //大分類
  const large_template = (large_category: LargeCategoriesList) => {
    return (
      <div className="grid formgird">
        <Checkbox
          inputId={String(large_category.id)}
          name="large_categories"
          value={large_category.id}
          onChange={(e) => {
            onSelectedLargeCategories(e);
          }}
          checked={largecheckbox.some(
            (checkbox) => checkbox === large_category.id,
          )}
          disabled={
            disabelLargeId.indexOf(large_category.id) !== -1 ? true : false
          }
        />
        <div className="ml-2" style={{ width: '80%' }}>
          <label className="w-full">
            {large_category.construction_type_name}
          </label>
        </div>
      </div>
    );
  };

  const onSelectedLargeCategories = (e: { value: any; checked: boolean }) => {
    const selectedLargeCheckboxes = [...largecheckbox];

    if (e.checked) {
      selectedLargeCheckboxes.push(e.value);

      //init配列にない場合のみ追加（登録済みcheckbox をcheck する、しない場合）
      largecheckbox.indexOf(e.value) === -1 &&
      initselectedLargeCheckboxes.indexOf(e.value) === -1
        ? addedLarge.push(e.value)
        : '';

      //削除項目を再チェックする場合
      deletedLarge.indexOf(e.value) !== -1
        ? deletedLarge.splice(deletedLarge.indexOf(e.value), 1)
        : '';

      setLargecheckbox(selectedLargeCheckboxes);

      //大分類をチェックする場合、すべての中分類もチェックオンにする
      onTocheckedMiddle(e);
    } else {
      selectedLargeCheckboxes.splice(
        selectedLargeCheckboxes.indexOf(e.value),
        1,
      );
      //削除項目
      addedLarge.indexOf(e.value) === -1 ? deletedLarge.push(e.value) : '';
      // deletedLarge.push(e.value);

      //チェック済みの項目が外れた場合追加配列にeffectしないように条件する
      addedLarge.indexOf(e.value) !== -1
        ? addedLarge.splice(addedLarge.indexOf(e.value), 1)
        : '';

      setLargecheckbox(selectedLargeCheckboxes);

      //大分類をチェックオフする場合、すべての中分類もチェックオフにする
      onToUncheckedMiddle(e);
    }
    //setLargecheckbox(selectedLargeCheckboxes);
  };
  // console.log('lrg', largecheckbox);
  // console.log('lrgadd', addedLarge);
  // console.log('lrgdel', deletedLarge);

  //中分類
  const middle_template = (middle_category: MiddleCategoriesList) => {
    return (
      <div className="grid m-0 pb-0">
        <Checkbox
          inputId={String(middle_category.id)}
          name="middle_categories"
          value={middle_category.id}
          onChange={(e) => {
            onSelectedMiddleCategories(e);
          }}
          checked={middlecheckbox.some(
            (checkbox) => checkbox === middle_category.id,
          )}
          disabled={setDisable(middle_category.id)}
        />
        <div className="ml-2 mb-0 pb-0" style={{ width: '80%' }}>
          <label className="w-full">
            {middle_category.construction_type_name}
          </label>
        </div>
      </div>
    );
  };

  const onSelectedMiddleCategories = (e: { value: any; checked: boolean }) => {
    const selectedMiddleCheckboxes = [...middlecheckbox];

    if (e.checked) {
      selectedMiddleCheckboxes.push(e.value);

      //init配列にない場合のみ追加（登録済みcheckbox をオン・オフする場合）
      middlecheckbox.indexOf(e.value) === -1 &&
      initselectedMiddleCheckboxes.indexOf(e.value) === -1
        ? addedMiddle.push(e.value)
        : '';

      //削除項目を再チェックする場合
      deletedMiddle.indexOf(e.value) !== -1
        ? deletedMiddle.splice(deletedMiddle.indexOf(e.value), 1)
        : '';

      // 中分類をチェックする場合、大分類もチェックオンにする
      onTocheckedLarge(e);

      setMiddlecheckbox(selectedMiddleCheckboxes);
    } else {
      selectedMiddleCheckboxes.splice(
        selectedMiddleCheckboxes.indexOf(e.value),
        1,
      );

      addedMiddle.indexOf(e.value) === -1 ? deletedMiddle.push(e.value) : '';

      addedMiddle.indexOf(e.value) !== -1
        ? addedMiddle.splice(addedMiddle.indexOf(e.value), 1)
        : '';

      setMiddlecheckbox(selectedMiddleCheckboxes);

      // 中分類すべてをチェックオフする場合、大分類もオフにする
      middlecheckboxTmp = [...selectedMiddleCheckboxes];
      onToUncheckedLarge(e, middlecheckboxTmp);

      // チェックオフする場合、実行予算もクリアする
      const pos = inputWorkingBudget
        .map((e) => {
          return e.mid_id;
        })
        .indexOf(e.value);

      if (pos !== -1) {
        inputWorkingBudget.splice(pos, 1);
      }

      //
      invalidWorkingBudgetMiddleId.splice(
        invalidWorkingBudgetMiddleId.indexOf(e.value),
        1,
      );
    }
  };
  // console.log('mid', middlecheckbox);
  // console.log('midadd', addedMiddle);
  // console.log('middel', deletedMiddle);

  const onTocheckedLarge = (e: { value: any }) => {
    let largeId = 0;
    //find large_id of mid
    middleCategoriesList.map((mid) =>
      mid.id === e.value ? (largeId = mid.large_category_id) : '',
    );
    largecheckbox.indexOf(largeId) === -1 ? largecheckbox.push(largeId) : '';
    addedLarge.indexOf(largeId) === -1 ? addedLarge.push(largeId) : '';
  };

  const onTocheckedMiddle = (e: { value: any }) => {
    const middle_item = middleCategoriesList.filter(
      (f) => f.large_category_id == e.value,
    );

    middle_item.map((e) => {
      // checkbox 選択
      middlecheckbox.indexOf(e.id) === -1 ? middlecheckbox.push(e.id) : '';

      // 登録済みでない場合、追加配列に追加
      initselectedMiddleCheckboxes.indexOf(e.id) === -1
        ? addedMiddle.indexOf(e.id) === -1
          ? addedMiddle.push(e.id)
          : ''
        : '';

      // 登録済みcheckboxを オフして またオンにする場合、削除配列から削除
      deletedMiddle.indexOf(e.id) !== -1
        ? deletedMiddle.splice(deletedMiddle.indexOf(e.id), 1)
        : '';
    });
  };

  const onToUncheckedLarge = (
    e: { value: any },
    selmiddlecheckbox: number[],
  ) => {
    let largeId = 0;
    middleCategoriesList.map((mid) =>
      mid.id === e.value ? (largeId = mid.large_category_id) : '',
    );

    const middle_item = middleCategoriesList.filter(
      (e) => e.large_category_id == largeId,
    );

    const checkFlag = middle_item.map((e) => {
      return selmiddlecheckbox.some((f) => f === e.id);
    });

    checkFlag.indexOf(true) === -1
      ? (largecheckbox.splice(largecheckbox.indexOf(largeId), 1),
        addedLarge.splice(addedLarge.indexOf(largeId), 1))
      : '';
  };

  const onToUncheckedMiddle = (e: { value: any }) => {
    const addMiddleTmp = [...addedMiddle];

    const middle_item = middleCategoriesList.filter(
      (f) => f.large_category_id == e.value,
    );

    middle_item.map((e) => {
      // checkbox 選択
      middlecheckbox.indexOf(e.id) !== -1
        ? middlecheckbox.splice(middlecheckbox.indexOf(e.id), 1)
        : '';

      // checkbox をオフする、追加配列から削除
      addMiddleTmp.indexOf(e.id) !== -1
        ? addMiddleTmp.splice(addMiddleTmp.indexOf(e.id), 1)
        : '';

      // 登録済みのみ削除配列に追加
      initselectedMiddleCheckboxes.indexOf(e.id) !== -1
        ? deletedMiddle.indexOf(e.id) === -1
          ? deletedMiddle.push(e.id)
          : ''
        : '';
    });
    setAddedMiddle(addMiddleTmp);
  };

  //実行予算
  let workBudget: any;
  const workingBudget_template = (middle_category: MiddleCategoriesList) => {
    //default value
    if (initWorkingBudget.length !== 0) {
      workBudget = undefined;
      initWorkingBudget.map((e) => {
        e.mid_id === middle_category.id
          ? e.value === null
            ? (workBudget = undefined)
            : (workBudget = e.value)
          : undefined;
      });
    }

    if (middlecheckbox.indexOf(middle_category.id) !== -1) {
      if (invalidWorkingBudgetMiddleId.indexOf(middle_category.id) === -1) {
        return (
          <div>
            <InputNumberFreeForm
              id={String(middle_category.id)}
              name={String(middle_category.id)}
              mode={'decimal'}
              inputStyle={{ width: '100%', textAlign: 'right' }}
              onBlur={(e) =>
                onInputWorkingBudget(e.target.value, middle_category.id)
              }
              value={
                middlecheckbox.indexOf(middle_category.id) !== -1
                  ? workBudget === undefined
                    ? undefined
                    : toFixed(workBudget, 2)
                  : undefined
              }
              disabled={setDisable(middle_category.id)}
              maxLength={15}
            />
          </div>
        );
      } else {
        return (
          <div>
            <InputNumberFreeForm
              id={String(middle_category.id)}
              name={String(middle_category.id)}
              mode={'decimal'}
              inputStyle={{ width: '100%', textAlign: 'right' }}
              onBlur={(e) => {
                onInputWorkingBudget(e.target.value, middle_category.id);
              }}
              value={
                middlecheckbox.indexOf(middle_category.id) !== -1
                  ? workBudget === undefined
                    ? undefined
                    : toFixed(workBudget, 2)
                  : undefined
              }
              disabled={setDisable(middle_category.id)}
              maxLength={15}
            />
            <div>
              <span style={{ color: '#e24c4c', fontSize: '0.75rem' }}>
                金額は12桁以内で入力してください。
              </span>
            </div>
          </div>
        );
      }
    } else {
      return (
        <>
          <InputNumberFreeForm
            id={String(middle_category.id)}
            name={String(middle_category.id)}
            mode={'decimal'}
            inputStyle={{ width: '100%', textAlign: 'right' }}
            value={undefined}
            onBlur={(e) =>
              onInputWorkingBudget(e.target.value, middle_category.id)
            }
            disabled={true}
          />
        </>
      );
    }
  };

  const onInputWorkingBudget = (e: any, middle_category_id: number) => {
    const val = e.replaceAll(',', '');

    // 実行予算の金額は0以上999999999999以内
    if (val <= 999999999999.99) {
      invalidWorkingBudgetMiddleId.splice(
        invalidWorkingBudgetMiddleId.indexOf(middle_category_id),
        1,
      );

      // 実行予算配列判定
      const pos = initWorkingBudget
        .map((e) => {
          return e.mid_id;
        })
        .indexOf(middle_category_id);

      const c_pos = inputWorkingBudget
        .map((e) => {
          return e.mid_id;
        })
        .indexOf(middle_category_id);

      if (pos !== -1) {
        if (Math.floor(initWorkingBudget[pos].value) != val) {
          if (c_pos !== -1) {
            if (val === '') {
              Math.floor(initWorkingBudget[pos].value) !== null
                ? (inputWorkingBudget[c_pos] = {
                    mid_id: middle_category_id,
                    value: val,
                  })
                : '';
            } else {
              //update value
              inputWorkingBudget[c_pos] = {
                mid_id: middle_category_id,
                value: val,
              };
            }
          } else {
            //add value
            inputWorkingBudget.push({
              mid_id: middle_category_id,
              value: val,
            });
          }
        } else {
          //defalut value null
          if (c_pos !== -1) {
            inputWorkingBudget.splice(c_pos, 1);
          }
          //textbox focus
        }
      } else {
        if (c_pos !== -1) {
          if (val !== '') {
            //value edit
            inputWorkingBudget[c_pos] = {
              mid_id: middle_category_id,
              value: val,
            };
          } else {
            //value delete
            inputWorkingBudget.splice(c_pos, 1);
          }
        } else {
          //value add
          if (val !== '') {
            inputWorkingBudget.push({
              mid_id: middle_category_id,
              value: val,
            });
          }
        }
      }
    } else {
      invalidWorkingBudgetMiddleId.indexOf(middle_category_id) === -1
        ? invalidWorkingBudgetMiddleId.push(middle_category_id)
        : '';
    }

    setPagerefresh(true);

    // console.log('www', inputWorkingBudget);
  };
  // console.log('initwb', initWorkingBudget);
  // console.log('invalid', invalidWorkingBudgetMiddleId);

  // ステータスによって実行予算テキストボックスを活性・非活性する
  const setDisable = (mid_id: number) => {
    const index = statusList
      .map((e) => {
        return e.construction_middle_category_id;
      })
      .indexOf(mid_id);

    if (index !== -1) {
      return statusList[index].status === 1 ||
        statusList[index].status === 2 ||
        statusList[index].status === 3
        ? true
        : false;
    } else {
      return false;
    }
  };
  // console.log('disabelLargeId', disabelLargeId);

  let checklrg: string;
  let checkmid: string;
  // let checkValid: boolean;
  const invalidLrgIndexTmp: number[] = [];
  const [invalidLrgIndex, setInvalidLrgIndex] = useState<number[]>([]);
  const invalidMidIndexTmp: number[] = [];
  const [invalidMidIndex, setInvalidMidIndex] = useState<number[]>([]);
  let ordered_middle: number[] = [];
  let ordered_middle_name: string[] = [];
  const validation = () => {
    ordered_middle = [];
    ordered_middle_name = [];
    // 大分類
    largecheckbox.map((lrg) => {
      checklrg = 'false';
      const selectitem = middleCategoriesList.filter(
        (item) => item.large_category_id === lrg,
      );

      selectitem.map((e) => {
        middlecheckbox.indexOf(e.id) === -1 ? '' : (checklrg = 'true');
      });
      checklrg !== 'true' ? invalidLrgIndexTmp.push(lrg) : '';
    });

    // 中分類
    middlecheckbox.map((mid) => {
      checkmid = 'false';
      const selectitem = middleCategoriesList.filter((item) => item.id === mid);

      selectitem.map((e) => {
        largecheckbox.indexOf(e.large_category_id) === -1
          ? ''
          : (checkmid = 'true');
        checkmid !== 'true' ? invalidMidIndexTmp.push(e.large_category_id) : '';
      });
    });

    setInvalidLrgIndex(invalidLrgIndexTmp);
    setInvalidMidIndex(invalidMidIndexTmp);

    // 発注された場合削除もできないし、申請もできない
    detailFlagList.map((df) => {
      deletedMiddle.indexOf(df.construction_middle_category_id) !== -1
        ? ordered_middle.push(df.construction_middle_category_id)
        : '';
    });

    if (ordered_middle.length !== 0) {
      ordered_middle.map((ord_mid) => {
        middleCategoriesList.map((mid) =>
          mid.id === ord_mid
            ? ordered_middle_name.push(mid.construction_type_name)
            : '',
        );
      });
      setOderWarningModel(true);
    }
    setOrderedMiddleName(ordered_middle_name);

    // return
    if (
      invalidLrgIndexTmp.length !== 0 ||
      invalidMidIndexTmp.length !== 0 ||
      invalidWorkingBudgetMiddleId.length !== 0 ||
      ordered_middle.length !== 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const onConfirm = () => {
    onAddCategories();
  };

  const onMoveManagePage = () => {
    router.push(`/constructions/${constructionId}/cost-manage`);
  };

  let large_id = 0;
  let CostCategoryAddType: any[];
  const convertRequestType = () => {
    CostCategoryAddType = [];
    // console.log('selmid', middlecheckbox);
    // console.log('wb', inputWorkingBudget);
    // console.log('addmid', addedMiddle);
    // console.log('delmid', deletedMiddle);

    //追加・変更
    middlecheckbox.map((e) => {
      //inputWorkingBudget
      const index = inputWorkingBudget
        .map((e) => {
          return e.mid_id;
        })
        .indexOf(e);

      let workingBudget;
      if (index !== -1) {
        workingBudget = inputWorkingBudget[index].value;
      } else {
        workingBudget = null;
      }

      //find large_id of mid
      middleCategoriesList.map((mid) =>
        mid.id === e ? (large_id = mid.large_category_id) : '',
      );

      // カテゴリーのみ登録
      if (addedMiddle.indexOf(e) !== -1 && index == -1) {
        // OK addMid / NO addwb  → add cost_category
        CostCategoryAddType.push({
          large_category: large_id,
          middle_category: e,
          working_budget: null,
          type: 'add_cost_category',
        });

        // カテゴリー ＋ 実行予算の登録
      } else if (addedMiddle.indexOf(e) !== -1 && index !== -1) {
        // OK addMid / OK addwb  → add cost_application
        CostCategoryAddType.push({
          large_category: large_id,
          middle_category: e,
          working_budget: workingBudget,
          type: 'add_cost_category_app',
        });

        // 実行予算を追加・更新する場合
      } else if (addedMiddle.indexOf(e) === -1 && index !== -1) {
        // NO addMid / OK addwb  → edit
        CostCategoryAddType.push({
          large_category: large_id,
          middle_category: e,
          working_budget: workingBudget,
          type: 'change_working_budget',
        });
      } else {
        //
      }
    });

    //削除
    deletedMiddle.map((e) => {
      const initIndex = initWorkingBudget
        .map((e) => {
          return e.mid_id;
        })
        .indexOf(e);

      let appliedBudget;
      if (initIndex !== -1) {
        appliedBudget = initWorkingBudget[initIndex].value;
      }

      //find large_id of mid
      middleCategoriesList.map((mid) =>
        mid.id === e ? (large_id = mid.large_category_id) : '',
      );

      const detailIndex = detailFlagList
        .map((e) => {
          return e.construction_middle_category_id;
        })
        .indexOf(e);

      let detail_flag;
      if (detailIndex !== -1) {
        detail_flag = detailFlagList[detailIndex].detail_flag;
      }

      // 削除するカテゴリーに実行予算がない場合、
      if (appliedBudget === null) {
        // 明細が発注されない場合、削除
        if (detail_flag !== 1) {
          // OK delMid / have nowb  → delete_cost_category
          CostCategoryAddType.push({
            large_category: large_id,
            middle_category: e,
            working_budget: null,
            type: 'delete_cost_category',
          });
        }
        // 削除するカテゴリーに実行予算がある場合、delete_flag`を１に更新
      } else if (appliedBudget !== null) {
        // OK delMid / have nowb  → change_flag
        CostCategoryAddType.push({
          large_category: large_id,
          middle_category: e,
          working_budget: null,
          type: 'change_flag',
        });
      }
    });

    return CostCategoryAddType;
  };

  const onSubmit = () => {
    const checkValid = validation();
    setPagerefresh(true);
    if (checkValid === true) {
      if (
        addedLarge.length !== 0 ||
        deletedLarge.length !== 0 ||
        addedMiddle.length !== 0 ||
        deletedMiddle.length !== 0 ||
        inputWorkingBudget.length !== 0
      ) {
        // 削除するカテゴリーの名称を取得
        if (deletedMiddle.length !== 0) {
          deletedMiddle.map((id) => {
            middleCategoriesList.map((mid) =>
              mid.id === id
                ? delmiddleName.push(mid.construction_type_name)
                : '',
            );
          });
          setConfrimModel(true);
        } else {
          onAddCategories();
        }
      } else {
        //変更なしの場合
        onMoveManagePage();
      }
    } else {
      //Validationエラーの場合
    }
  };

  // console.log('aa', CostCategoryAddType);

  const onAddCategories = () => {
    let tmp_categoryAddType = [];
    //
    tmp_categoryAddType = convertRequestType();
    // console.log('request', CostCategoryAddType);

    const categoryAddType = tmp_categoryAddType;
    console.log('request', categoryAddType);

    addCostCategoriesList(constructionId, categoryAddType)
      .then(() => {
        toast.current?.show(
          toastMessage(MESSAGES.API_RESULT.SAVE.SUCCESS('原価カテゴリー')),
        );
        onMoveManagePage();
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
              MESSAGES.API_RESULT.SAVE.FAILURE('原価カテゴリー'),
            ),
          );
        }
      });
  };

  if (!construction) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>原価カテゴリー登録</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>

      {/* メニュー */}
      <ConstructionMenu construction={construction} />

      <Header title="原価カテゴリー登録" isSubTitle={true}></Header>

      <div className="formgrid grid mt-4">
        <div className="field col-3 w-17rem">
          {copybuttonDisable ? (
            <Buttonmui
              className="link-button font-family"
              variant="outlined"
              onClick={() => setCopybuttonDisable(true)}
              disabled
            >
              精算見積からカテゴリーをコピー
            </Buttonmui>
          ) : (
            <Buttonmui
              className="link-button font-family"
              variant="outlined"
              // className="w-full"
              onClick={onCopyEstimatesCategory}
            >
              精算見積からカテゴリーをコピー
            </Buttonmui>
          )}
        </div>
        {/* <div className="field col-1 w-1rem pr-0">
          <span>※</span>
        </div> */}
        <div className="field col-8 pl-0">
          <span className={styles['label-font']}>
            ※精算見積に登録されているカテゴリーをコピーします。<br></br>
            登録されている中分類がチェック状態となりますが、実行予算は更新されません。
          </span>
        </div>
      </div>

      <div className="contents form px-0 ma-0">
        <form autoComplete="off">
          <div className={styles['tablearea']} key={1}>
            <table className={styles['table']}>
              <thead>
                <tr>
                  <th className={styles['th_1']}>大分類</th>
                  <th className={styles['th_2']}>中分類</th>
                  <th className={styles['th_3']}>実行予算</th>
                </tr>
              </thead>
              {costCategories?.large_categories.map(
                (large_categories, index) => (
                  <tbody key={index}>
                    <tr key={index}>
                      <td className={styles['td_large']}>
                        {large_template(large_categories)}
                      </td>
                      <td className={styles['td_large']}></td>
                      <td className={styles['td_large']}></td>
                    </tr>
                    {large_categories.middle_categories.map(
                      (middle_categories, c_index) =>
                        invalidLrgIndex.length !== 0 ||
                        invalidMidIndex.length !== 0 ? (
                          c_index === 0 &&
                          invalidLrgIndex.indexOf(
                            middle_categories.large_category_id,
                          ) > -1 ? (
                            <tr key={c_index}>
                              <td className={styles['td_middle']}>
                                <span
                                  style={{
                                    color: '#e24c4c',
                                    fontSize: '0.75rem',
                                  }}
                                >
                                  中分類が選択されていません。
                                </span>
                              </td>
                              <td className={styles['td_middle']}>
                                {middle_template(middle_categories)}
                              </td>
                              <td className={styles['td_textfield']}>
                                {workingBudget_template(middle_categories)}
                              </td>
                            </tr>
                          ) : c_index === 0 &&
                            invalidMidIndex.indexOf(
                              middle_categories.large_category_id,
                            ) > -1 ? (
                            <tr key={c_index}>
                              <td className={styles['td_middle']}>
                                <span
                                  style={{
                                    color: '#e24c4c',
                                    fontSize: '0.75rem',
                                  }}
                                >
                                  大分類が選択されていません。
                                </span>
                              </td>
                              <td className={styles['td_middle']}>
                                {middle_template(middle_categories)}
                              </td>
                              <td className={styles['td_textfield']}>
                                {workingBudget_template(middle_categories)}
                              </td>
                            </tr>
                          ) : (
                            <tr key={c_index}>
                              <td className={styles['td_middle']}></td>
                              <td className={styles['td_middle']}>
                                {middle_template(middle_categories)}
                              </td>
                              <td className={styles['td_textfield']}>
                                {workingBudget_template(middle_categories)}
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr key={c_index}>
                            <td className={styles['td_middle']}></td>
                            <td className={styles['td_middle']}>
                              {middle_template(middle_categories)}
                            </td>
                            <td className={styles['td_textfield']}>
                              {workingBudget_template(middle_categories)}
                            </td>
                          </tr>
                        ),
                    )}
                  </tbody>
                ),
              )}
            </table>
          </div>
          <div className="flex align-items-center justify-content-center m-5">
            <Button
              className="p-button-success"
              label={'登録'}
              type="button"
              onClick={onSubmit}
            />
            {/* <Button className="p-button-success p-button-sm w-2rem" onClick={onSubmit}>
              登録
            </Button> */}
          </div>
          <CostCategoriesConfirmDialog
            isOpen={confrimModel}
            onHide={() => setConfrimModel(false)}
            deleteMiddleCategories={delmiddleName}
            onSubmit={onConfirm}
            onCancel={() => setDelmiddleName([])}
          />

          <OrderedWarningDialog
            isOpen={orderWarningModel}
            orderedMiddle={orderedMiddleName}
            onHide={() => setOderWarningModel(false)}
          />
        </form>
      </div>
    </>
  );
};

export default CostCategoriesPage;

CostCategoriesPage.pageId = 'EU_CONSTRUCTION_COST_CATEGORIES';

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
      // construction,
    },
  };
};
