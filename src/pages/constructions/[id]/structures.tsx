/* eslint-disable indent */
/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
import { ParsedUrlQuery } from 'querystring';
import { start } from 'repl';
import { keys } from '@mui/system';
import cx from 'classnames';
import dayjs from 'dayjs';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { useState, useEffect, useContext, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './structures.module.scss';
import { getConstruction } from '@/api/construction';
import { addConstructionStructures } from '@/api/construction_structures';
import { getCooperators } from '@/api/cooperator';
import { getConstructionStructures } from '@/api/structure';
import { Header } from '@/components/commons/header/header';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import { ToastContext } from '@/components/context/toast/toast';
import { ContentHeadingInline } from '@/components/forms/contentHeading/contentHeadingInline';
import { ContentInline } from '@/components/forms/contentHeading/contentInline';
import { useConstructionStructureList } from '@/hooks/api/construction_structure';
import { useEmployeeUserIDList } from '@/hooks/api/employee';
import {
  ConstructionStructureList,
  AddConstructionStructureList,
} from '@/interfaces/constructionStructure';
import {
  CooperatorList,
  CooperatorStructure,
} from '@/interfaces/cooperatorList';
import { EmployeeList } from '@/interfaces/employee';
import { NextPageWithLayout } from '@/pages/_app';
import { TypeConstructionDetail } from '@/types/api/construction';
import type { SelectItemType } from '@/types/common';
import { MESSAGES } from '@/utils/constants/message';
import { validationErrorMessageHtmlFormat } from '@/utils/messageUtils';
import { duty } from '@/utils/select_item';
import { toastErrorMessage, toastMessage } from '@/utils/toastMessage';

type Props = {
  constructionId: number;
};

const ConstructionSystemPage: NextPageWithLayout<Props> = ({
  constructionId,
}) => {
  const { toast } = useContext(ToastContext);
  const formMethods = useForm<ConstructionStructureList>();

  const [employees] = useState<SelectItemType[]>([]);
  const [sampledata] = useState([
    { name: '会社名', value: '会社〇〇〇' },
    { name: 'Email', value: 'xxxx@gmail.com' },
    { name: '電話番号', value: '081-0000-7781' },
    { name: '工期', value: '2021.6.1~2021.12.28' },
  ]);

  const [constructionStructure_dt, setConstructionStructure_dt] = useState<
    ConstructionStructureList[]
  >([]);
  const [conStructure, setConStructure] = useState<any>([]);
  const [addConstructionStructureList, setConstructionStructureList] = useState<
    AddConstructionStructureList[]
  >([]);
  const [newRowID, setNewRowID] = useState(0);
  const [constructionDtUpdate, setConstructionDtRefresh] = useState(false);
  const [userValidMsg, setUserValidMsg] = useState('');
  const [provisionValidMsg, setProvisionValidMsg] = useState('');
  const [saveNoRecord, setSaveNoRecord] = useState(false);

  const ConstructionDatas = useRef(true);
  const CooperatorDatas = useRef(true);
  const ConstructionStructureDatas = useRef(true);

  useEffect(() => {
    setConstructionDtRefresh(false);

    if (saveNoRecord) {
      constructionStructure_dt.length !== 0
        ? (setProvisionValidMsg(''), setSaveNoRecord(false))
        : '';
    }
  }, [constructionDtUpdate, saveNoRecord, constructionStructure_dt]);

  const [construction, setConstruction] = useState<TypeConstructionDetail>();
  const [cooperator, setCooperator] = useState<any>([]);

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

  // fetch Cooperators
  useEffect(() => {
    const fetchCooperatorData = async () => {
      if (CooperatorDatas.current) {
        CooperatorDatas.current = false;
        await getCooperators(constructionId)
          .then((response) => {
            setCooperator(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    // fetch Cooperators
    fetchCooperatorData();
  }, [constructionId]);

  /** ユーザープルダウンメニューセット **/
  const onSuccessCallbackForEmployees = (data: EmployeeList[]) => {
    data.map((employee: EmployeeList) => {
      employees.push({
        label: employee.name,
        value: employee.id,
      });
    });
  };

  /** 工事体制一覧セット **/
  // useEffect(() => {
  //   const fetchConstructionStructureList = async () => {
  //     if (ConstructionStructureDatas.current) {
  //       ConstructionStructureDatas.current = false;
  //       await getConstructionStructures(constructionId)
  //         .then((response) => {
  //           setConStructure(response);
  //           // setNewRowID(response[response.length - 1].id);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   };
  //   fetchConstructionStructureList();
  // }, [constructionId]);

  const onSuccessCallbackForConstructionStructureList = (
    data: ConstructionStructureList[],
  ) => {
    setConstructionStructure_dt(data);
    // setNewRowID(data[data.length - 1].id);
  };

  const setConstructionStructure = (
    rowNum: any,
    userVal?: number,
    positionDivisionVal?: number,
  ) => {
    const new_constructionStructure_dt = constructionStructure_dt.map((e) => e);
    new_constructionStructure_dt.map((item, index) => {
      if (item.id === rowNum) {
        if (userVal !== undefined) {
          new_constructionStructure_dt[index].user_id = userVal;
        }
        if (positionDivisionVal !== undefined) {
          new_constructionStructure_dt[index].position_division =
            positionDivisionVal;
        }

        setConstructionStructure_dt(new_constructionStructure_dt);
      }
    });
  };

  const user_dropdownTemplate = (rowData: any) => {
    if (rowData.user_id === 0) {
      return (
        <>
          <Dropdown
            name="user_id"
            value={rowData.user_id}
            options={employees}
            onChange={(e) => {
              setConstructionStructure(
                rowData.id,
                Number(e.target.value),
                undefined,
              );
            }}
            className="lg:w-15rem md:w-12rem"
          />
          <div>
            <span style={{ color: '#e24c4c', fontSize: '0.75rem' }}>
              {userValidMsg}
            </span>
          </div>
        </>
      );
    } else {
      console.log('USER DROP DOWN ELSE');
      return (
        <>
          <Dropdown
            name="user_id"
            value={rowData.user_id}
            options={employees}
            onChange={(e) => {
              setConstructionStructure(
                rowData.id,
                Number(e.target.value),
                undefined,
              );
            }}
            className="lg:w-15rem md:w-12rem"
          />
        </>
      );
    }
  };

  const duty_dropdownTemplate = (rowData: any) => {
    return (
      <Dropdown
        name="position_division"
        value={rowData.position_division}
        options={duty}
        onChange={(e) => {
          setConstructionStructure(
            rowData.id,
            undefined,
            Number(e.target.value),
          );
        }}
        className="lg:w-10rem md:w-8rem"
      />
    );
  };

  const IdTemplate = (rowData: any) => {
    return (
      <div>
        <ContentInline heading={rowData.user_id} />
      </div>
    );
  };

  const emailTemplate = (rowData: any) => {
    return (
      <div style={{ wordBreak: 'break-word' }}>
        <ContentInline heading={rowData.email} />
      </div>
    );
  };

  const phoneNoTemplate = (rowData: any) => {
    return (
      <div>
        <ContentInline heading={rowData.phone_no} />
      </div>
    );
  };

  const delete_btnTemplate = (rowData: any) => {
    return (
      <Button
        type="button"
        className="p-button-danger mr-0"
        style={{ width: '70px' }}
        label={'削除'}
        onClick={(e) => deleteTableRow(e, rowData.id)}
        disabled={
          construction?.status == '4' ||
          construction?.application_status === 1 ||
          construction?.application_status === 2 ||
          construction?.application_status === 3
            ? true
            : false
        }
      ></Button>
    );
  };

  const addTableRow = () => {
    setConstructionDtRefresh(true);
    const nextRowID = newRowID + 1;
    const new_constructionStructure_dt = constructionStructure_dt.map((e) => e);
    new_constructionStructure_dt.push({
      id: nextRowID,
      user_id: 0,
      position_division: 0,
    });

    setConstructionStructure_dt(new_constructionStructure_dt);
    setNewRowID(nextRowID);
  };

  const deleteTableRow = (e: any, rowDataID: number) => {
    const new_constructionStructure_dt = constructionStructure_dt.filter(
      (item) => {
        return item.id != rowDataID;
      },
    );

    setConstructionStructure_dt(new_constructionStructure_dt);
    setConstructionDtRefresh(true);
  };

  // fetch employee userID list
  const { data: employeeList } = useEmployeeUserIDList(
    {},
    onSuccessCallbackForEmployees,
  );

  // fetch construction structure list
  const { data: userlist } = useConstructionStructureList(
    constructionId,
    onSuccessCallbackForConstructionStructureList,
  );

  // useEffect(() => {
  //   if (ConstructionStructureDatas) {
  //     const { data: userlist } = useConstructionStructureList(
  //       constructionId,
  //       onSuccessCallbackForConstructionStructureList,
  //     );
  //   }
  // }, [constructionId, ConstructionStructureDatas]);

  useEffect(() => {
    if (userlist) {
      onSuccessCallbackForConstructionStructureList(userlist);
    }
  }, [userlist]);

  if (!employeeList || !userlist) return <div>loading...</div>;

  let position_division_cnt = 0;
  let blnUserId = false;
  const onSubmit = () => {
    constructionStructure_dt.map((e) => {
      if (e.position_division === 0) {
        position_division_cnt++;
      }
      if (e.user_id === 0) {
        blnUserId = true;
      }
    });

    return (
      position_division_cnt > 1
        ? setProvisionValidMsg('所長は一人しか選択できません。')
        : setProvisionValidMsg(''),
      blnUserId === true
        ? setUserValidMsg('ユーザーを選択してください。')
        : setUserValidMsg(''),
      constructionStructure_dt.length === 0
        ? (setProvisionValidMsg('1人以上の登録が必要です。'),
          setSaveNoRecord(true))
        : '',
      position_division_cnt > 1 ||
      blnUserId === true ||
      constructionStructure_dt.length === 0
        ? ''
        : addConstructionStructure()
    );
  };

  const addConstructionStructure = () => {
    setConstructionStructureList([]);
    constructionStructure_dt.map((e) => {
      addConstructionStructureList.push({
        user_id: e.user_id,
        position_division: e.position_division,
      });
    });
    const requestBody = addConstructionStructureList;
    addConstructionStructures(constructionId, requestBody)
      .then(() => {
        toast.current?.show(
          toastMessage(MESSAGES.API_RESULT.SAVE.SUCCESS('工事体制')),
        );
      })
      .catch((e) => {
        if (e.response.status == 422) {
          // toast.current?.show(
          //   toastErrorMessage(e.response.data.error.user[0] + '。'),
          // );
          const error_msg = validationErrorMessageHtmlFormat(e.response.data.error)
          toast.current?.show(toastErrorMessage(<div dangerouslySetInnerHTML={{__html: error_msg }}></div>));
        } else {
          toast.current?.show(
            toastErrorMessage(MESSAGES.API_RESULT.SAVE.FAILURE('工事体制')),
          );
        }
      });
  };

  // startDate
  const startDate = (data: any) => {
    return (
      <span>
        {data.start_date
          ? `${dayjs(data.start_date).format('YYYY/MM/DD')}`
          : ''}
      </span>
    );
  };

  // endDate
  const endDate = (data: any) => {
    return (
      <span>
        {data.end_date ? `${dayjs(data.end_date).format('YYYY/MM/DD')}` : ''}
      </span>
    );
  };

  if (!construction) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>工事体制</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <ConstructionMenu construction={construction} />
      <Header title="工事体制" isSubTitle={true} />
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)} autoComplete="off">
          <div className="contents form">
            <div className="grid">
              <div className="col-12">
                <div className="formgrid grid -ml-1 pl-1 mb-2">
                  <ContentHeadingInline
                    className="w-8rem"
                    heading="三和建設担当者"
                  />
                  <ContentInline heading="" />
                </div>
                <div className="formgrid grid ml-3">
                  <div className="field col-12 -ml-4">
                    <DataTable
                      value={constructionStructure_dt}
                      // responsiveLayout="scroll"
                      emptyMessage=" "
                      className={cx(styles['structures'], 'construction-table')}
                      // className={cx(
                      //   styles['column-style2'],
                      //   'px-1 pt-2 w-13rem',
                      // )}
                    >
                      <Column
                        field=""
                        header="ユーザー"
                        body={user_dropdownTemplate}
                        style={{ width: '20%' }}
                        alignHeader="center"
                      ></Column>
                      <Column
                        field="position_division"
                        header="役割"
                        headerStyle={{ textAlign: 'left' }}
                        style={{ width: '20%' }}
                        alignHeader="center"
                        body={duty_dropdownTemplate}
                      ></Column>
                      <Column
                        field="Id"
                        header="ID"
                        headerStyle={{ textAlign: 'left' }}
                        style={{ width: '5%' }}
                        body={IdTemplate}
                        alignHeader="center"
                      ></Column>
                      <Column
                        field="email"
                        header="メールアドレス"
                        headerStyle={{ textAlign: 'left' }}
                        style={{ width: '20%' }}
                        body={emailTemplate}
                        alignHeader="center"
                      ></Column>
                      <Column
                        field="phone_no"
                        header="電話番号"
                        headerStyle={{ textAlign: 'left' }}
                        body={phoneNoTemplate}
                        style={{ width: '15%' }}
                        alignHeader="center"
                      ></Column>
                      <Column
                        field=""
                        header=""
                        body={delete_btnTemplate}
                        align="right"
                        className="pr-1"
                        style={{ width: '10%' }}
                        alignHeader="center"
                      ></Column>
                    </DataTable>
                  </div>
                </div>
                <div className="formgrid grid ml-2">
                  <div className="field col-3 pl-5">
                    <span style={{ color: '#e24c4c', fontSize: '0.75rem' }}>
                      {provisionValidMsg}
                    </span>
                  </div>
                  <div className="field col-12 flex justify-content-end flex-wrap card-container pr-5 mt-2">
                    <Button
                      className="link-button p-button-outlined"
                      type="button"
                      label={'ユーザーを追加'}
                      onClick={addTableRow}
                      disabled={
                        construction.status == '4' ||
                        construction.application_status === 1 ||
                        construction.application_status === 2 ||
                        construction.application_status === 3
                          ? true
                          : false
                      }
                    ></Button>
                  </div>
                </div>
                <div className="formgrid grid ml-2">
                  <div className="field col-12 flex justify-content-center flex-wrap card-container pr-5 mt-2">
                    <Button
                      className="p-button-success"
                      type="submit"
                      label={'保存'}
                      disabled={
                        construction.status == '4' ||
                        construction.application_status === 1 ||
                        construction.application_status === 2 ||
                        construction.application_status === 3
                          ? true
                          : false
                      }
                    ></Button>
                  </div>
                </div>
              </div>
              {/* <div className="col-12">
                <div className="formgrid grid ml-2">
                  <ContentHeadingInline className="w-5rem" heading="協力会社" />
                  <ContentInline heading="" />
                </div>
              </div>
              <div className="col-12 pl-5">
                <Divider className="mt-2 mb-2 pl-0">
                  <ContentHeadingInline heading="〇〇工事A" />
                </Divider>
                <div>
                  <div className="col-12 pl-5 pr-0">
                    <Divider className="mt-2 mb-2 pl-0" align="left">
                      <ContentHeadingInline heading="会社1〇〇〇" />
                    </Divider>
                  </div>
                  <div className="col-6 ml-7 my-0 pt-0">
                    <DataTable
                      value={sampledata}
                      stripedRows
                      responsiveLayout="scroll"
                    >
                      <Column field="name" header="協力会社情報"></Column>
                      <Column field="value" header=""></Column>
                    </DataTable>
                  </div>
                </div>
                <div>
                  <div className="col-12 pl-5 pr-0">
                    <Divider className="pl-0" align="left">
                      <ContentHeadingInline heading="会社2〇〇〇" />
                    </Divider>
                  </div>
                  <div className="col-6 ml-7 my-0 pt-0">
                    <DataTable
                      value={sampledata}
                      stripedRows
                      responsiveLayout="scroll"
                    >
                      <Column field="name" header="協力会社情報"></Column>
                      <Column field="value" header=""></Column>
                    </DataTable>
                  </div>
                </div>
              </div>
              <div className="col-12 pl-5">
                <Divider className="mt-2 mb-2 pl-0">
                  <ContentHeadingInline heading="〇〇工事B" />
                </Divider>
                <div>
                  <div className="col-12 pl-5 pr-0">
                    <Divider className="pl-0" align="left">
                      <ContentHeadingInline heading="会社1〇〇〇" />
                    </Divider>
                  </div>
                  <div className="col-6 ml-7 my-0 pt-0">
                    <DataTable
                      value={sampledata}
                      stripedRows
                      responsiveLayout="scroll"
                    >
                      <Column field="name" header="協力会社情報"></Column>
                      <Column field="value" header=""></Column>
                    </DataTable>
                  </div>
                </div>
              </div> */}
              <div className="col-12 -ml-3">
                <div className="formgrid grid ml-3">
                  <ContentHeadingInline className="w-5rem" heading="協力会社" />
                  <ContentInline heading="" />
                </div>

                {cooperator.length > 0 ? (
                  <>
                    {cooperator.map((data: any, index: number) => (
                      <div key={index} className="col-12 ml-3">
                        <Divider className="mt-2 mb-2 pl-0 -ml-3">
                          <ContentHeadingInline
                            heading={
                              `${data.construction_name}` +
                              ' ' +
                              `${data.middle_category_name}`
                            }
                          />
                        </Divider>
                        <table className={styles['table']}>
                          <thead>
                            <tr>
                              <th className={styles['th_1']}>協力会社名</th>
                              <th className={styles['th_2']}>Email</th>
                              <th className={styles['th_3']}>電話番号</th>
                              <th className={styles['th_4']}>施工開始予定日</th>
                              <th className={styles['th_5']}>施工予定終了日</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.cooperators.map((cop: any, i: number) => (
                              <tr key={i}>
                                <td className={styles['td_1']}>
                                  {cop.cooperator_name}
                                </td>
                                <td className={styles['td_1']}>{cop.email}</td>
                                <td className={styles['td_1']}>
                                  {cop.phone_no}
                                </td>
                                <td className={styles['td_1']}>
                                  {startDate(cop)}
                                </td>
                                <td className={styles['td_1']}>
                                  {endDate(cop)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <br />
                      </div>
                    ))}
                    <div></div>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
export default ConstructionSystemPage;

ConstructionSystemPage.pageId = 'EU_CONSTRUCTION_STRUCTURE';

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
