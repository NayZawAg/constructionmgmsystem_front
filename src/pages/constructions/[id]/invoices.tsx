/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParsedUrlQuery } from 'querystring';
// import { Construction } from '@mui/icons-material';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Row } from 'primereact/row';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { getConstruction } from '@/api/construction';
import { addInvoiceInformationsData } from '@/api/invoice_informations';
import {
  getInvoiceInformationsList,
  deleteInvoiceConstruction,
  downloadInvoicePDF,
  PdfDownload,
  deleteInvoiceTmpFile,
  downloadInvoiceInformationData,
} from '@/api/invoice_informations';
import { Header } from '@/components/commons/header/header';
import { ConstructionMenu } from '@/components/constructions/constructionMenu';
import { ToastContext } from '@/components/context/toast/toast';
import { InputNumberFreeForm } from '@/components/forms/input/inputNumberFreeForm';
import { NextPageWithLayout } from '@/pages/_app';
import { TypeConstructionDetail } from '@/types/api/construction';
import {
  TypeInvoiceInformationsList,
  TypeInvoiceInformationsListAddDecInc,
  // TypeInvoiceInformation,
} from '@/types/api/invoice_informations';
import { isMinusValueOnChangeOrBlur } from '@/utils/calculation';
import { API_STATUS_CODE } from '@/utils/constants/api';
import { MESSAGES } from '@/utils/constants/message';
import { convertDataToInvoiceInformationsAddRequest } from '@/utils/convertDataToRequestBody/invoice_informations';
import {
  validationErrorMessage,
  validationErrorMessageHtmlFormat,
} from '@/utils/messageUtils';
import { toastErrorMessage, toastMessage } from '@/utils/toastMessage';

type Props = {
  constructionId: number;
};

const Invoices: NextPageWithLayout<Props> = ({ constructionId }) => {
  const { toast } = useContext(ToastContext);
  const { data: session } = useSession();
  const [construction, setConstruction] = useState<TypeConstructionDetail>();
  const [pagerefresh, setPagerefresh] = useState<boolean>(false);
  const formMethods = useForm<TypeInvoiceInformationsList>({});
  const [conRemainAmount, setconRemainAmount] = useState<number>();
  const [stillInvoiceCon, setStillInvoiceCon] = useState<boolean>(false);
  const [stillInvoiceIncDec, setStillInvoiceIncDec] = useState<boolean>(false);
  const [stillDownload, setStillDownload] = useState<boolean>(false);
  const [invoiceDownloadRow, setInvoiceDownloadRow] = useState<number>(-1);
  const [incdecDownloadRow, setIncdecDownloadRow] = useState<number>(-1);

  const ConstructionDatas = useRef(true);
  useEffect(() => {
    if (pagerefresh) {
      setPagerefresh(false);
    }
  });

  const nameBodyTemplate = (rowData: any) => {
    return (
      <>
        <InputText
          name="name"
          type="text"
          className="p-inputtext-sm block mr-0 w-full"
          value={rowData.name}
          disabled={rowData.added_row !== 1}
          onChange={(e) => {
            // console.log('rowId', rowData.id);
            onUpdateInputData(
              rowData.type,
              rowData.id,
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
          {rowData.nameErrMsg}
        </div>
      </>
    );
  };

  const amountBodyTemplate = (rowData: any) => {
    return (
      <>
        <InputNumberFreeForm
          id="amount"
          name="amount"
          className="p-inputtext-sm block mr-3 w-full"
          value={rowData.amount}
          // min={0}
          prefix={'¥'}
          inputStyle={{ width: '100%' }}
          inputClassName="text-right"
          maxLength={12} // +4は","と"¥"のため
          onChange={(e: any) => {
            onUpdateInputData(
              rowData.type,
              rowData.id,
              undefined,
              e.value,
              undefined,
              undefined,
              undefined,
              undefined,
            );
          }}
          onBlur={(e: any) => {
            if (!isMinusValueOnChangeOrBlur(e.target.value)) {
              const value = e.target.value.replaceAll(/[$¥,]+/g, '');
              onUpdateInputData(
                rowData.type,
                rowData.id,
                undefined,
                Number(value),
                undefined,
                undefined,
                undefined,
                undefined,
              );
            }
          }}
          // useGrouping={true}
          disabled={rowData.added_row !== 1}
        />
        <div style={{ color: '#e24c4c', fontSize: '0.75rem' }}>
          {rowData.amountErrMsg}
        </div>
      </>
    );
  };

  const remarksBodyTemplate = (rowData: any) => {
    return (
      <>
        <InputText
          name="remarks"
          className="p-inputtext-sm block mr-0 w-full"
          value={rowData.remarks}
          disabled={rowData.added_row !== 1}
          onChange={(e) => {
            onUpdateInputData(
              rowData.type,
              rowData.id,
              undefined,
              undefined,
              e.target.value,
              undefined,
              undefined,
              undefined,
            );
          }}
        />
        <div style={{ color: '#e24c4c', fontSize: '0.75rem' }}>
          {rowData.remarkErrMsg}
        </div>
      </>
    );
  };

  const specialReportBodyTemplate = (rowData: any) => {
    return (
      <>
        <InputText
          name="special_report"
          className="p-inputtext-sm block mr-0 w-full"
          value={rowData.special_report}
          disabled={rowData.added_row !== 1}
          onChange={(e) => {
            onUpdateInputData(
              rowData.type,
              rowData.id,
              undefined,
              undefined,
              undefined,
              e.target.value,
              undefined,
              undefined,
            );
          }}
        />
        <div style={{ color: '#e24c4c', fontSize: '0.75rem' }}>
          {rowData.specialReportErrMsg}
        </div>
      </>
    );
  };

  const invoiceIssuedDateBodyTemplate = (rowData: any) => {
    return (
      <>
        <Calendar
          // id="basic"
          value={
            rowData.invoice_issued_date
              ? new Date(rowData.invoice_issued_date)
              : rowData.invoice_issued_date
          }
          dateFormat="yy/mm/dd"
          disabled={rowData.added_row !== 1}
          onChange={(e) => {
            onUpdateInputData(
              rowData.type,
              rowData.id,
              undefined,
              undefined,
              undefined,
              undefined,
              e.target.value,
              undefined,
            );
          }}
          style={{ height: '2.8rem' }}
          locale="ja"
        />
        <div style={{ color: '#e24c4c', fontSize: '0.75rem' }}>
          {rowData.invoiceIssuedDateErrMsg}
        </div>
      </>
    );
  };

  const depositPlannedDateBodyTemplate = (rowData: any) => {
    return (
      <>
        <Calendar
          value={
            rowData.deposit_planned_date
              ? new Date(rowData.deposit_planned_date)
              : rowData.deposit_planned_date
          }
          dateFormat="yy/mm/dd"
          disabled={rowData.added_row !== 1}
          onChange={(e) => {
            onUpdateInputData(
              rowData.type,
              rowData.id,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              e.target.value,
            );
          }}
          style={{ height: '2.8rem' }}
          locale="ja"
        />
        <div style={{ color: '#e24c4c', fontSize: '0.75rem' }}>
          {rowData.depositPlannedDateErrMsg}
        </div>
      </>
    );
  };

  // 配列更新
  const onUpdateInputData = (
    type: string,
    rowId: number,
    name?: string,
    amount?: any,
    remark?: string,
    specialReport?: string,
    invoiceDate?: any,
    depositDate?: any,
  ) => {
    if (type === 'invoice') {
      if (invoiceInformationListConstruction) {
        const new_invoiceList = invoiceInformationListConstruction.map(
          (e) => e,
        );
        new_invoiceList.map((item, index) => {
          if (item.id === rowId) {
            if (name !== undefined) {
              new_invoiceList[index].name = name;
            }
            if (amount !== undefined) {
              new_invoiceList[index].amount = amount;
            }
            if (remark !== undefined) {
              new_invoiceList[index].remarks = remark;
            }
            if (specialReport !== undefined) {
              new_invoiceList[index].special_report = specialReport;
            }
            if (invoiceDate !== undefined) {
              new_invoiceList[index].invoice_issued_date = invoiceDate;
            }
            if (depositDate !== undefined) {
              new_invoiceList[index].deposit_planned_date = depositDate;
            }

            setInvoiceInformationListConstruction(new_invoiceList);
          }
        });
      }
    } else {
      if (invoiceInformationListAddDecInc) {
        const new_addDecIncList = invoiceInformationListAddDecInc.map((e) => e);
        new_addDecIncList.map((tmpArr, index) => {
          tmpArr.add_dec_inc_invoice.map((item, c_index) => {
            if (item.id === rowId) {
              if (name !== undefined) {
                new_addDecIncList[index].add_dec_inc_invoice[c_index].name =
                  name;
              }
              if (amount !== undefined) {
                new_addDecIncList[index].add_dec_inc_invoice[c_index].amount =
                  amount;
              }
              if (remark !== undefined) {
                new_addDecIncList[index].add_dec_inc_invoice[c_index].remarks =
                  remark;
              }
              if (specialReport !== undefined) {
                new_addDecIncList[index].add_dec_inc_invoice[
                  c_index
                ].special_report = specialReport;
              }
              if (invoiceDate !== undefined) {
                new_addDecIncList[index].add_dec_inc_invoice[
                  c_index
                ].invoice_issued_date = invoiceDate;
              }
              if (depositDate !== undefined) {
                new_addDecIncList[index].add_dec_inc_invoice[
                  c_index
                ].deposit_planned_date = depositDate;
              }

              setInvoiceInformationListAddDecInc(new_addDecIncList);
            }
          });
        });
      }
    }
  };

  // 追加 工事 請求書Button
  const ButtonBodyTemplate = (rowData: any) => {
    // console.log(session?.user.userType);
    if (rowData.added_row !== 1) {
      return (
        <>
          <div>
            <Button
              label={
                stillDownload && invoiceDownloadRow == rowData.id
                  ? '請求書ダウンロード中...'
                  : '請求書ダウンロード'
              }
              type="button"
              className="p-button-success p-button-sm"
              disabled={
                stillDownload && invoiceDownloadRow == rowData.id ? true : false
              }
              onClick={() => {
                downloadInvoiceData(rowData.id);
                setStillDownload(true);
                setInvoiceDownloadRow(rowData.id);
              }}
            />
          </div>
        </>
      );
    } else {
      if (session?.user.userType === 0) {
        if (rowData.del_id !== 0) {
          return (
            <>
              <div>
                <Button
                  label={stillInvoiceCon ? '請求書発行中...' : '請求書発行'}
                  type="button"
                  className="p-button-success p-button-sm"
                  disabled={
                    conRemainAmount == null || stillInvoiceCon ? true : false
                  }
                  onClick={() => {
                    addInvoiceInformations(rowData, 1);
                  }}
                />
                <Button
                  label={'元に戻す'}
                  type="button"
                  className="p-button-success p-button-sm ml-2"
                  onClick={() => {
                    onDelete(rowData.del_id);
                  }}
                />
              </div>
            </>
          );
        } else {
          return (
            <>
              <div>
                <Button
                  label={stillInvoiceCon ? '請求書発行中...' : '請求書発行'}
                  type="button"
                  className="p-button-success p-button-sm"
                  disabled={
                    conRemainAmount == null || stillInvoiceCon ? true : false
                  }
                  onClick={() => {
                    addInvoiceInformations(rowData, 1);
                  }}
                />
              </div>
            </>
          );
        }
      } else {
        return (
          <>
            <div>
              <Button
                label={stillInvoiceCon ? '請求書発行中...' : '請求書発行'}
                type="button"
                className="p-button-success p-button-sm"
                disabled={
                  conRemainAmount == null || stillInvoiceCon ? true : false
                }
                onClick={() => {
                  addInvoiceInformations(rowData, 1);
                }}
              />
            </div>
          </>
        );
      }
    }
  };

  // 追加工事 請求書Button
  const ButtonIncDecConstructionBodyTemplate = (rowData: any) => {
    if (rowData.added_row !== 1) {
      return (
        <>
          <div>
            <Button
              label={
                stillDownload && incdecDownloadRow == rowData.id
                  ? '請求書ダウンロード中...'
                  : '請求書ダウンロード'
              }
              type="button"
              className="p-button-success p-button-sm"
              disabled={
                stillDownload && incdecDownloadRow == rowData.id ? true : false
              }
              onClick={() => {
                downloadInvoiceData(rowData.id);
                setStillDownload(true);
                setIncdecDownloadRow(rowData.id);
              }}
            />
          </div>
        </>
      );
    } else {
      if (session?.user.userType === 0) {
        if (rowData.del_id !== 0) {
          return (
            <>
              <div>
                <Button
                  label={
                    stillInvoiceIncDec && incdecDownloadRow == rowData.id
                      ? '請求書発行中...'
                      : '請求書発行'
                  }
                  type="button"
                  className="p-button-success p-button-sm"
                  disabled={
                    stillInvoiceIncDec && incdecDownloadRow == rowData.id
                      ? true
                      : false
                  }
                  onClick={() => {
                    addInvoiceInformations(rowData, 2);
                  }}
                />
                <Button
                  label={'元に戻す'}
                  type="button"
                  className="p-button-success p-button-sm ml-2"
                  onClick={() => {
                    onDelete(rowData.del_id);
                  }}
                />
              </div>
            </>
          );
        } else {
          return (
            <>
              <div>
                <Button
                  label={
                    stillInvoiceIncDec && incdecDownloadRow == rowData.id
                      ? '請求書発行中...'
                      : '請求書発行'
                  }
                  type="button"
                  className="p-button-success p-button-sm"
                  disabled={
                    stillInvoiceIncDec && incdecDownloadRow == rowData.id
                      ? true
                      : false
                  }
                  onClick={() => {
                    addInvoiceInformations(rowData, 2);
                  }}
                />
              </div>
            </>
          );
        }
      } else {
        return (
          <>
            <div>
              <Button
                label={
                  stillInvoiceIncDec && incdecDownloadRow == rowData.id
                    ? '請求書発行中...'
                    : '請求書発行'
                }
                type="button"
                className="p-button-success p-button-sm"
                disabled={
                  stillInvoiceIncDec && incdecDownloadRow == rowData.id
                    ? true
                    : false
                }
                onClick={() => {
                  addInvoiceInformations(rowData, 2);
                }}
              />
            </div>
          </>
        );
      }
    }
  };

  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          header="名称"
          className="w-7rem"
          alignHeader="center"
          /*style={{ backgroundColor: '#d2d2d2' }}*/
        />
        <Column
          header="金額"
          className="w-7rem"
          alignHeader="center"
          /*style={{ backgroundColor: '#d2d2d2' }}*/
        />
        <Column
          header="備考欄"
          className="w-7rem"
          alignHeader="center"
          /*style={{ backgroundColor: '#d2d2d2' }}*/
        />
        <Column
          header="特記事項（社内向け）"
          className="w-7rem"
          alignHeader="center"
          /*style={{ backgroundColor: '#d2d2d2' }}*/
        />
        <Column
          header="請求書発行日"
          className="w-7rem"
          alignHeader="center"
          /*style={{ backgroundColor: '#d2d2d2' }}*/
        />
        <Column
          header="入金予定日"
          className="w-7rem"
          alignHeader="center"
          /*style={{ backgroundColor: '#d2d2d2' }}*/
        />
        <Column
          header=""
          className="w-11rem"
          alignHeader="center"
          /*style={{ backgroundColor: '#d2d2d2' }}*/
        />
      </Row>
    </ColumnGroup>
  );

  // Validation
  const onCheckValidation = (rowData: any) => {
    // 名称
    if (rowData.name === '') {
      rowData.nameErrMsg = '名称は必須フィールドです。';
    } else if (rowData.name.length > 50) {
      rowData.nameErrMsg = '名称は50桁以内で入力してください。';
    } else {
      rowData.nameErrMsg = '';
    }

    // 金額
    if (rowData.amount === null) {
      rowData.amountErrMsg = '金額は必須フィールドです。';
    } else if (rowData.amount > rowData.old_remain) {
      rowData.amountErrMsg =
        '金額は' + parseInt(rowData.old_remain) + '以内で入力してください。';
    } else if (rowData.amount > 999999999999.99) {
      rowData.amountErrMsg = '金額は12桁以内で入力してください。';
    } else {
      rowData.amountErrMsg = '';
    }

    // 備考欄
    if (rowData.remarks.length > 500) {
      rowData.remarkErrMsg = '備考欄は500桁以内で入力してください。';
    } else {
      rowData.remarkErrMsg = '';
    }

    // 特記事項（社内向け）
    if (rowData.special_report.length > 500) {
      rowData.specialReportErrMsg =
        '特記事項（社内向け）は500桁以内で入力してください。';
    } else {
      rowData.specialReportErrMsg = '';
    }

    // 請求書発行日
    if (
      rowData.invoice_issued_date === null ||
      rowData.invoice_issued_date === ''
    ) {
      rowData.invoiceIssuedDateErrMsg = '請求書発行日は必須フィールドです。';
    } else {
      rowData.invoiceIssuedDateErrMsg = '';
    }

    // 入金予定日
    if (
      rowData.deposit_planned_date === null ||
      rowData.deposit_planned_date === ''
    ) {
      rowData.depositPlannedDateErrMsg = '入金予定日は必須フィールドです。';
    } else {
      rowData.depositPlannedDateErrMsg = '';
    }

    setPagerefresh(true);

    if (
      rowData.nameErrMsg === '' &&
      rowData.remarkErrMsg === '' &&
      rowData.specialReportErrMsg === '' &&
      rowData.amountErrMsg === '' &&
      rowData.invoiceIssuedDateErrMsg === '' &&
      rowData.depositPlannedDateErrMsg === ''
    ) {
      return true;
    } else {
      return false;
    }
  };

  // if (!construction) return <div>...loading</div>;

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

  let rowconut = 0;

  // 請求書 取得
  const [
    invoiceInformationListConstruction,
    setInvoiceInformationListConstruction,
  ] = useState<TypeInvoiceInformationsList>();

  const [invoiceInformationListAddDecInc, setInvoiceInformationListAddDecInc] =
    useState<TypeInvoiceInformationsListAddDecInc>();

  const fetchInvoiceInformations = useCallback(async () => {
    const responseDatas = await getInvoiceInformationsList(constructionId);

    setconRemainAmount(
      responseDatas.invoice_informations_construction.construction_amount
        .remain,
    );

    const tmpInvoiceInformationListCon =
      responseDatas.invoice_informations_construction.construction_invoice;
    const tmpInvoiceInformationListConRow =
      tmpInvoiceInformationListCon.slice(-1)[0];

    rowconut--;
    tmpInvoiceInformationListCon.push({
      id: rowconut,
      construction_id: construction?.id,
      name: '',
      amount:
        responseDatas.invoice_informations_construction.construction_amount
          .remain, // 元に戻すため最後のidを設定
      old_remain:
        responseDatas.invoice_informations_construction.construction_amount
          .remain,
      remarks: '',
      special_report: '',
      invoice_issued_date: '',
      deposit_planned_date: '',
      construction_division: 1,
      add_inc_dec_construction_id: undefined,
      added_row: 1,
      type: 'invoice',
      del_id:
        tmpInvoiceInformationListConRow === undefined
          ? 0
          : tmpInvoiceInformationListConRow.id,
      nameErrMsg: '',
      amountErrMsg: '',
      remarkErrMsg: '',
      specialReportErrMsg: '',
      invoiceIssuedDateErrMsg: '',
      depositPlannedDateErrMsg: '',
    });

    setInvoiceInformationListConstruction(tmpInvoiceInformationListCon);

    const tmpInvoiceInformationListADI =
      responseDatas.invoice_informations_add_dec_inc;
    tmpInvoiceInformationListADI.map((item, index) => {
      const tmpInvoiceInformationListADIRow =
        item.add_dec_inc_invoice.slice(-1)[0];

      rowconut--;
      tmpInvoiceInformationListADI[index].add_dec_inc_invoice.push({
        id: rowconut,
        construction_id: construction?.id,
        name: '',
        amount: item.add_dec_inc_amount.remain,
        old_remain: item.add_dec_inc_amount.remain,
        remarks: '',
        special_report: '',
        invoice_issued_date: '',
        deposit_planned_date: '',
        construction_division: 2,
        add_inc_dec_construction_id: item.add_dec_inc_amount.id,
        added_row: 1,
        type: 'inc_dec',
        del_id:
          tmpInvoiceInformationListADIRow === undefined
            ? 0
            : tmpInvoiceInformationListADIRow.id,
        nameErrMsg: '',
        amountErrMsg: '',
        remarkErrMsg: '',
        specialReportErrMsg: '',
        invoiceIssuedDateErrMsg: '',
        depositPlannedDateErrMsg: '',
      });

      setInvoiceInformationListAddDecInc(tmpInvoiceInformationListADI);
    });
  }, []);

  useEffect(() => {
    // fetch Invoice Informations
    fetchInvoiceInformations();
  }, [constructionId]);

  if (!construction) return <div>...loading</div>;

  const downloadInvoiceData = (invoiceId: any) => {
    //
    downloadInvoiceInformationData(constructionId, invoiceId, construction)
      .then((result: PdfDownload) => {
        toast.current?.show(
          toastMessage(MESSAGES.API_RESULT.SAVE.SUCCESS('請求書ダウンロード')),
        );

        // fetch Invoice Informations
        // fetchInvoiceInformations();
        setStillDownload(false);
        setInvoiceDownloadRow(-1);

        // download file
        const file_name = result.file_name;
        downloadPdf(construction.id, file_name);
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
              MESSAGES.API_RESULT.SAVE.FAILURE('請求書ダウンロード'),
            ),
          );
        }
        setStillDownload(false);
        setInvoiceDownloadRow(-1);
      });
  };

  // 請求書 登録 function
  const addInvoiceInformations = (
    rowData: any,
    construction_division: number,
  ) => {
    const validation = onCheckValidation(rowData);
    if (validation === true) {
      // 請求書発行中のため
      rowData.type == 'invoice'
        ? setStillInvoiceCon(true)
        : (setStillInvoiceIncDec(true), setIncdecDownloadRow(rowData.id));

      const addInvoiceItem: any = {
        name: rowData.name,
        amount: rowData.amount,
        remarks: rowData.remarks,
        special_report: rowData.special_report,
        invoice_issued_date: rowData.invoice_issued_date,
        deposit_planned_date: rowData.deposit_planned_date,
        construction_division: construction_division,
        add_inc_dec_construction_id: rowData.add_inc_dec_construction_id,
      };

      const requestBody =
        convertDataToInvoiceInformationsAddRequest(addInvoiceItem);

      addInvoiceInformationsData(constructionId, requestBody, construction)
        .then((result: PdfDownload) => {
          toast.current?.show(
            toastMessage(MESSAGES.API_RESULT.SAVE.SUCCESS('請求書作成')),
          );

          // fetch Invoice Informations
          fetchInvoiceInformations();
          setStillInvoiceCon(false);
          setStillInvoiceIncDec(false);
          setIncdecDownloadRow(-1);

          // download file
          const file_name = result.file_name;
          downloadPdf(construction.id, file_name);
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
              toastErrorMessage(MESSAGES.API_RESULT.SAVE.FAILURE('請求書作成')),
            );
          }
          setStillInvoiceCon(false);
          setStillInvoiceIncDec(false);
          setIncdecDownloadRow(-1);
        });
    }
  };

  // 請求書 削除
  const onDelete = (invoiceId: number) => {
    deleteInvoiceConstruction(constructionId, invoiceId)
      .then(() => {
        toast.current?.show(
          toastMessage(MESSAGES.API_RESULT.DELETE.SUCCESS('請求書作成')),
        );

        // fetch Invoice Informations
        fetchInvoiceInformations();
      })
      .catch(() => {
        toast.current?.show(
          toastErrorMessage(MESSAGES.API_RESULT.DELETE.FAILURE('請求書作成')),
        );
      });
    return '';
  };

  const downloadPdf = async (id: number, file_name: any) => {
    await downloadInvoicePDF(id, file_name)
      .then((file: any) => {
        const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
        const blob = new Blob([bom, file], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = file_name;
        link.click();
        deleteTmpFile(id, file_name);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTmpFile = async (id: number, file_name: any) => {
    await deleteInvoiceTmpFile(id, file_name)
      .then((file: any) => {
        //
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 追加工事表示
  const addIncDecConstructionsListInvoice =
    invoiceInformationListAddDecInc?.map((e, index) => {
      return (
        <div key={index}>
          <div>
            <br></br>
            <div className="w-full">
              <h2 className="mb-0">追加工事: {e.add_dec_inc_amount.subject}</h2>
              {/* <Header title="追加工事:" isSubTitle={true} /> */}
            </div>
            <hr className="w-25rem ml-0 mt-0"></hr>
          </div>
          <div
            className="datatable-style-demo pr-4"
            style={{
              // overflow: 'auto',
              width: 'full',
              minHeight: '90%',
            }}
          >
            <DataTable
              // value={addIncDecConstructionInvoiceInfoArray}
              value={e.add_dec_inc_invoice}
              size="small"
              headerColumnGroup={headerGroup}
              showGridlines
              emptyMessage=" "
              className="assessments-table"
            >
              <Column
                field="name"
                header="名称"
                // className="text-sm w-4rem"
                align="left"
                body={nameBodyTemplate}
              />
              <Column
                field="amount"
                header="金額"
                // className="text-sm w-12rem"
                align="left"
                body={amountBodyTemplate}
              />
              <Column
                field="remarks"
                header="備考欄"
                // className="text-sm w-8rem"
                align="left"
                body={remarksBodyTemplate}
              />
              <Column
                field="special_report"
                header="特記事項（社内向け）"
                // className="text-sm w-5rem"
                align="right"
                body={specialReportBodyTemplate}
              />
              <Column
                field="invoice_issued_date"
                header="請求書発行日"
                // className="text-sm w-2rem"
                align="left"
                body={invoiceIssuedDateBodyTemplate}
              />
              <Column
                field="deposit_planned_date"
                header="入金予定日"
                // className="text-sm w-5rem"
                align="left"
                body={depositPlannedDateBodyTemplate}
              />
              <Column
                field=""
                header=""
                // className="text-sm w-5rem"
                align="right"
                body={ButtonIncDecConstructionBodyTemplate}
              />
            </DataTable>
          </div>
        </div>
      );
    });

  if (!construction) return <div>loading...</div>;
  // console.log(invoiceInformationListConstruction);
  // console.log(invoiceInformationListAddDecInc);

  return (
    <>
      <Head>
        <title>請求書作成&送付</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      {/* メニュー */}
      <ConstructionMenu construction={construction} />

      <Header title="請求書作成&送付" isSubTitle={true} />
      <div className="contents form w-full">
        <FormProvider {...formMethods}>
          <form autoComplete="off">
            <div
              className="datatable-style-demo pr-4"
              style={{
                // overflow: 'auto',
                width: 'full',
                minHeight: '90%',
              }}
            >
              <DataTable
                value={invoiceInformationListConstruction}
                // value={dataConstructionListArray}
                size="small"
                headerColumnGroup={headerGroup}
                showGridlines
                emptyMessage=" "
                // className="addSmallItem-table"
                className="assessments-table"
              >
                <Column
                  field="name"
                  header="名称"
                  // className="text-sm w-4rem"
                  align="left"
                  body={nameBodyTemplate}
                />
                <Column
                  field="amount"
                  header="金額"
                  className="text-sm w-5rem"
                  align="left"
                  body={amountBodyTemplate}
                />
                <Column
                  field="remarks"
                  header="備考欄"
                  // className="text-sm w-8rem"
                  align="left"
                  body={remarksBodyTemplate}
                />
                <Column
                  field="special_report"
                  header="特記事項（社内向け）"
                  // className="text-sm w-5rem"
                  align="left"
                  body={specialReportBodyTemplate}
                />
                <Column
                  field="invoice_issued_date"
                  header="請求書発行日"
                  // className="text-sm w-2rem"
                  align="left"
                  body={invoiceIssuedDateBodyTemplate}
                />
                <Column
                  field="deposit_planned_date"
                  header="入金予定日"
                  // className="text-sm w-5rem"
                  align="left"
                  body={depositPlannedDateBodyTemplate}
                />
                <Column
                  field=""
                  header=""
                  // className="text-sm w-5rem"
                  align="right"
                  body={ButtonBodyTemplate}
                />
              </DataTable>
            </div>
            {addIncDecConstructionsListInvoice}
          </form>
        </FormProvider>
      </div>
    </>
  );
};
export default Invoices;

Invoices.auth = true;
Invoices.pageId = 'EU_INVOICE';

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
