import cx from 'classnames';
import Head from 'next/head';
import Router from 'next/router';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import styles from './index.module.scss';
import { Header } from '@/components/commons/header/header';
import { NextPageWithLayout } from '@/pages/_app';

const ExpenseDetails: NextPageWithLayout = () => {
  const employeeData = [
    { name: '社員番号', value: 'XXX' },
    { name: '作成日時', value: 'XXXX/XX/XX XX:XX:XX' },
    { name: 'タイトル', value: 'XXXX年XX月' },
    { name: '申請者', value: 'XXXXXX' },
    { name: 'ステータス', value: '承認済み' },
    { name: '申請日時', value: 'XXXX/XX/XX XX:XX:XX' },
    { name: '承認日時', value: 'XXXX/XX/XX XX:XX:XX' },
    { name: '明細合計金額', value: 'XX,XXX円' },
  ];
  const sortData = [
    {
      debitAccount: '借方勘定科目',
      creditAccount: 'XXX',
      debitDepartment: 'XX事業部',
      creditPJ: 'XXX',
      debitTax: '貸方PJ10%',
      amount: 'XXX,XXX,XXX,XXX円',
    },
    {
      debitAccount: '借方勘定科目',
      creditAccount: 'XXX',
      debitDepartment: 'XX事業部',
      creditPJ: 'XXX',
      debitTax: '貸方PJ10%',
      amount: 'XXX,XXX,XXX,XXX円',
    },
  ];
  const ItemList = [
    {
      no: 'XXX',
      date: 'XXXX/XX/XX',
      paymentDest: 'XXXX',
      amount: 'XXX,XXX,XXX,XXX円',
      expenseItem: '旅費交通費',
    },
    {
      no: 'XXX',
      date: 'XXXX/XX/XX',
      paymentDest: 'XXXX',
      amount: 'XXX,XXX,XXX,XXX円',
      expenseItem: '新聞図書費',
    },
  ];
  return (
    <>
      <Head>
        <title>社員立替経費精算詳細</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Header title="経費精算詳細"></Header>
      <div>
        {/* <div className="flex justify-content-center"> */}
        <table className={styles['table']}>
          <thead>
            {employeeData.flatMap((item, index) => (
              <tr key={index}>
                <td className={cx('pl-2', styles['table-name'])}>
                  {item.name}
                </td>
                <td className={cx('pl-2', styles['table-value'])}>
                  {item.value}
                </td>
              </tr>
            ))}
          </thead>
        </table>
        <h4>合算仕訳け</h4>
        <div>
          <DataTable
            value={sortData}
            size="small"
            showGridlines
            responsiveLayout="scroll"
            emptyMessage=" "
          >
            <Column
              field="debitAccount"
              header="借方勘定科目"
              style={{ width: '15%' }}
            ></Column>
            <Column
              field="creditAccount"
              header="貸方勘定科目"
              style={{ width: '15%' }}
            ></Column>
            <Column
              field="debitDepartment"
              header="借方部門"
              style={{ width: '20%' }}
            ></Column>
            <Column
              field="creditPJ"
              header="貸方PJ"
              style={{ width: '25%' }}
            ></Column>
            <Column
              field="debitTax"
              header="借方税区分"
              style={{ width: '10%' }}
            ></Column>
            <Column
              field="amount"
              header="金額"
              style={{ width: '15%' }}
            ></Column>
          </DataTable>
        </div>
        <br />
        <br />
        <div>
          <div className="card">
            <DataTable
              value={ItemList}
              size="small"
              responsiveLayout="scroll"
              style={{ width: '70%' }}
              emptyMessage=" "
            >
              <Column
                field="no"
                header="明細番号"
                style={{ width: '10%' }}
                className={styles['item-table']}
              ></Column>
              <Column
                field="date"
                header="日付"
                style={{ width: '10%' }}
                className={styles['item-table']}
              ></Column>
              <Column
                field="paymentDest"
                header="支払先・内容"
                style={{ width: '20%' }}
                className={styles['item-table']}
              ></Column>
              <Column
                field="amount"
                header="金額"
                style={{ width: '15%' }}
                className={styles['item-table']}
              ></Column>
              <Column
                field="expenseItem"
                header="経費料目"
                style={{ width: '15%' }}
                className={styles['item-table']}
              ></Column>
            </DataTable>
          </div>
        </div>
        <br />
        <div>
          <div className="flex justify-content-center">
            <Button
              label={'戻る'}
              type="submit"
              className="p-button-secondary p-button-sm"
              onClick={() => Router.push('/dashboard')}
            />
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};
export default ExpenseDetails;

ExpenseDetails.auth = true;
ExpenseDetails.pageId = 'EU_CONSTRUCTION_EMPLOYEE_EXPENSES_DETAIL';
