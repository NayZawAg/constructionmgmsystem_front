/* eslint-disable react-hooks/exhaustive-deps */
/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
import { Pagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import cx from 'classnames';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import {
  ToggleButton,
  ToggleButtonChangeParams,
} from 'primereact/togglebutton';
import { SetStateAction, useEffect, useState, Fragment } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { string } from 'yup';
import { NextPageWithLayout } from './_app';
import styles from './ordersStyle.module.scss';
import { getOrder, OrderListApi } from '@/api/order';
import { Header } from '@/components/commons/header/header';
import { ContentHeadingInline } from '@/components/forms/contentHeading/contentHeadingInline';
import { DropdownForm } from '@/components/forms/dropdown/dropdown';
import { InputForm } from '@/components/forms/input/input';
import { useYearList } from '@/hooks/api/construction';
import { Meta } from '@/interfaces/meta';
import { OrderList } from '@/types/api/order';
import { SelectItemType } from '@/types/common';
import { changeFormatCurrency, prefixYenSign } from '@/utils/calculation';
import { DATE_FORMAT } from '@/utils/constants/common';
import { year, month } from '@/utils/select_item';

// fix type
export type orderList = {
  results: OrderList[];
  meta: Meta;
};

export type OrderListFieldValues = {
  id?: string;
  construction_code?: string;
  construction_name?: string;
  middle_category_name?: string;
  order_no?: string;
  cooperator_name?: string;
  order_year_month_from?: string;
  order_year_month_to?: string;
};
const Orders: NextPageWithLayout = () => {
  // create mui theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#f57c00',
      },
    },
  });

  const orderLists = [
    {
      root: true,
      id: 0,
      rowLevel: 'total-1',
      isChecked: false,
      isCheckedItem: false,
      code: '10000000',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-1',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-1',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 1,
      rowLevel: 'total-2',
      isChecked: false,
      isCheckedItem: false,
      code: '10000001',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-2',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-2',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      rowLevel: 'total-3',
      isChecked: false,
      isCheckedItem: false,
      code: '10000002',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-3',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-3',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      rowLevel: 'total-4',
      isChecked: false,
      isCheckedItem: false,
      code: '10000003',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-4',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-4',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 4,
      rowLevel: 'total-5',
      isChecked: false,
      isCheckedItem: false,
      code: '10000004',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-5',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-5',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 5,
      rowLevel: 'total-6',
      isChecked: false,
      isCheckedItem: false,
      code: '10000006',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-6',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-6',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 6,
      rowLevel: 'total-7',
      isChecked: false,
      isCheckedItem: false,
      code: '10000007',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-7',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-7',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 7,
      rowLevel: 'total-8',
      isChecked: false,
      isCheckedItem: false,
      code: '10000008',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-8',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-8',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 8,
      rowLevel: 'total-9',
      isChecked: false,
      isCheckedItem: false,
      code: '10000009',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-9',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-9',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 9,
      rowLevel: 'total-10',
      isChecked: false,
      isCheckedItem: false,
      code: '10000010',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-10',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-10',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 10,
      rowLevel: 'total-11',
      isChecked: false,
      isCheckedItem: false,
      code: '10000011',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-11',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-11',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 11,
      rowLevel: 'total-12',
      isChecked: false,
      isCheckedItem: false,
      code: '10000101',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-12',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-12',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 12,
      rowLevel: 'total-13',
      isChecked: false,
      isCheckedItem: false,
      code: '10000012',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-13',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-13',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 13,
      rowLevel: 'total-14',
      isChecked: false,
      isCheckedItem: false,
      code: '10000013',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-14',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-14',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 14,
      rowLevel: 'total-15',
      isChecked: false,
      isCheckedItem: false,
      code: '10000014',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-15',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-15',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 15,
      rowLevel: 'total-16',
      isChecked: false,
      isCheckedItem: false,
      code: '10000015',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-16',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-16',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 16,
      rowLevel: 'total-17',
      isChecked: false,
      isCheckedItem: false,
      code: '10000016',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-17',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-17',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 17,
      rowLevel: 'total-18',
      isChecked: false,
      isCheckedItem: false,
      code: '10000017',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-18',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-18',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 18,
      rowLevel: 'total-19',
      isChecked: false,
      isCheckedItem: false,
      code: '10000018',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-19',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-19',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 19,
      rowLevel: 'total-20',
      isChecked: false,
      code: '10000019',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-20',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-20',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 20,
      rowLevel: 'total-21',
      isChecked: false,
      isCheckedItem: false,
      code: '10000021',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-21',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-21',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 21,
      rowLevel: 'total-22',
      isChecked: false,
      isCheckedItem: false,
      code: '10000022',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-22',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-22',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 22,
      rowLevel: 'total-23',
      isChecked: false,
      isCheckedItem: false,
      code: '10000023',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-23',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-23',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 23,
      rowLevel: 'total-24',
      isChecked: false,
      isCheckedItem: false,
      code: '10000024',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-24',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-24',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 24,
      rowLevel: 'total-25',
      isChecked: false,
      isCheckedItem: false,
      code: '10000025',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-25',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-25',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 25,
      rowLevel: 'total-26',
      isChecked: false,
      isCheckedItem: false,
      code: '10000026',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-26',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-26',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 26,
      rowLevel: 'total-27',
      isChecked: false,
      isCheckedItem: false,
      code: '10000027',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-27',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-27',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 27,
      rowLevel: 'total-28',
      isChecked: false,
      isCheckedItem: false,
      code: '10000028',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-28',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-28',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 28,
      rowLevel: 'total-29',
      isChecked: false,
      isCheckedItem: false,
      code: '10000029',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-29',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-29',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 29,
      rowLevel: 'total-30',
      isChecked: false,
      isCheckedItem: false,
      code: '10000030',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-30',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-30',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 30,
      rowLevel: 'total-31',
      isChecked: false,
      isCheckedItem: false,
      code: '10000031',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-31',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-31',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 31,
      rowLevel: 'total-32',
      isChecked: false,
      isCheckedItem: false,
      code: '10000032',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-32',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-32',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 32,
      rowLevel: 'total-33',
      isChecked: false,
      isCheckedItem: false,
      code: '10000033',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-33',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-33',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 33,
      rowLevel: 'total-34',
      isChecked: false,
      isCheckedItem: false,
      code: '10000034',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-34',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-34',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 34,
      rowLevel: 'total-35',
      isChecked: false,
      isCheckedItem: false,
      code: '10000035',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-35',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-35',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 35,
      rowLevel: 'total-36',
      isChecked: false,
      isCheckedItem: false,
      code: '10000036',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-36',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-36',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 36,
      rowLevel: 'total-37',
      isChecked: false,
      isCheckedItem: false,
      code: '10000037',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-37',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-37',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 37,
      rowLevel: 'total-38',
      isChecked: false,
      isCheckedItem: false,
      code: '10000038',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-38',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-38',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 38,
      rowLevel: 'total-39',
      isChecked: false,
      isCheckedItem: false,
      code: '10000039',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-39',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-39',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 39,
      rowLevel: 'total-40',
      isChecked: false,
      isCheckedItem: false,
      code: '10000040',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-40',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-40',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 40,
      rowLevel: 'total-41',
      isChecked: false,
      isCheckedItem: false,
      code: '10000041',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-41',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-41',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 41,
      rowLevel: 'total-42',
      isChecked: false,
      isCheckedItem: false,
      code: '10000042',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-42',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-42',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 42,
      rowLevel: 'total-43',
      isChecked: false,
      isCheckedItem: false,
      code: '10000043',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-43',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-43',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 43,
      rowLevel: 'total-44',
      isChecked: false,
      isCheckedItem: false,
      code: '10000044',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-44',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-44',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 44,
      rowLevel: 'total-45',
      isChecked: false,
      isCheckedItem: false,
      code: '10000045',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-45',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-45',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 45,
      rowLevel: 'total-46',
      isChecked: false,
      isCheckedItem: false,
      code: '10000046',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-46',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-46',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 46,
      rowLevel: 'total-47',
      isChecked: false,
      isCheckedItem: false,
      code: '10000047',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-47',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-47',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 47,
      rowLevel: 'total-48',
      isChecked: false,
      isCheckedItem: false,
      code: '10000048',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-48',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-48',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 48,
      rowLevel: 'total-49',
      isChecked: false,
      isCheckedItem: false,
      code: '10000049',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-49',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-49',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 49,
      rowLevel: 'total-50',
      isChecked: false,
      isCheckedItem: false,
      code: '10000050',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-50',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-50',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 50,
      rowLevel: 'total-51',
      isChecked: false,
      isCheckedItem: false,
      code: '10000051',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-51',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-51',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 51,
      rowLevel: 'total-52',
      isChecked: false,
      isCheckedItem: false,
      code: '10000052',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-52',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-52',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 52,
      rowLevel: 'total-53',
      isChecked: false,
      isCheckedItem: false,
      code: '10000054',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-53',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-53',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 53,
      rowLevel: 'total-54',
      isChecked: false,
      isCheckedItem: false,
      code: '10000055',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-54',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-54',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 54,
      rowLevel: 'total-55',
      isChecked: false,
      isCheckedItem: false,
      code: '10000056',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-55',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-55',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 55,
      rowLevel: 'total-56',
      isChecked: false,
      isCheckedItem: false,
      code: '10000057',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-56',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-56',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 56,
      rowLevel: 'total-57',
      isChecked: false,
      isCheckedItem: false,
      code: '10000058',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-57',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-57',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 57,
      rowLevel: 'total-58',
      isChecked: false,
      isCheckedItem: false,
      code: '10000059',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-58',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-58',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 58,
      rowLevel: 'total-59',
      isChecked: false,
      isCheckedItem: false,
      code: '10000060',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-59',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-59',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    {
      id: 59,
      rowLevel: 'total-60',
      isChecked: false,
      isCheckedItem: false,
      code: '10000061',
      name: 'ワンルームマンション営繕工事',
      repairNew: '営繕',
      company: '〇〇株式会社',
      date: '22-05-23',
      period: '22-02-31 ～ 22-11-31',
      amount: 12000000,
      subTotals: [
        {
          id: 0,
          rowLevel: 'subTotal-60',
          isChecked: false,
          isCheckedItem: false,
          code: '',
          name: '外工事',
          repairNew: '',
          company: '',
          date: '',
          period: '',
          amount: 10000000,
          items: [
            {
              id: 0,
              rowLevel: 'item-60',
              isChecked: false,
              isCheckedItem: false,
              code: '',
              name: '項目BBBBBBBBBBBBBBBBBBBB',
              repairNew: '',
              company: '',
              date: '',
              period: '',
              amount: 4000000,
            },
          ],
        },
      ],
    },
    //   {
    //     rowLevel: 'subTotal-1',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '',
    //     name: '外工事',
    //     repairNew: '',
    //     company: '',
    //     date: '',
    //     period: '',
    //     amount: 10000000,
    //   },
    //   {
    //     rowLevel: 'item-1',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '',
    //     name: '項目AAAAAAAAAAAAAAAAAA',
    //     repairNew: '',
    //     company: '',
    //     date: '',
    //     period: '',
    //     amount: '￥6,000,000',
    //   },
    //   {
    //     rowLevel: 'item-1',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '',
    //     name: '項目BBBBBBBBBBBBBBBBBBBB',
    //     repairNew: '',
    //     company: '',
    //     date: '',
    //     period: '',
    //     amount: 4000000,
    //   },
    //   {
    //     rowLevel: 'total-2',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '87654321',
    //     name: 'ワンルームマンション新築工事',
    //     repairNew: '新築',
    //     company: '〇〇株式会社',
    //     date: '22-05-23',
    //     period: '22-02-31 ～ 22-11-31',
    //     amount: 12000000,
    //   },
    //   {
    //     rowLevel: 'subTotal-2',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '',
    //     name: '外工事',
    //     repairNew: '',
    //     company: '',
    //     date: '',
    //     period: '',
    //     amount: 10000000,
    //   },
    //   {
    //     rowLevel: 'item-2',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '',
    //     name: '項目AAAAAAA',
    //     repairNew: '',
    //     company: '',
    //     date: '',
    //     period: '',
    //     amount: 4000000,
    //   },
    //   {
    //     rowLevel: 'item-2',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '',
    //     name: '項目BBBBBBBBBBB',
    //     repairNew: '',
    //     company: '',
    //     date: '',
    //     period: '',
    //     amount: '￥2,000,000',
    //   },
    //   {
    //     rowLevel: 'total-3',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '96349634',
    //     name: 'マンション新築工事',
    //     repairNew: '新築',
    //     company: '〇〇株式会社',
    //     date: '22-06-28',
    //     period: '22-02-31 ～ 22-11-31',
    //     amount: 10000000,
    //   },
    //   {
    //     rowLevel: 'subTotal-3',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '',
    //     name: '外工事',
    //     repairNew: '',
    //     company: '',
    //     date: '',
    //     period: '',
    //     amount: '￥8,000,000',
    //   },
    //   {
    //     rowLevel: 'item-3',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '',
    //     name: '項目CCCCCCCCCCCCCCCCCCCCCCCC',
    //     repairNew: '',
    //     company: '',
    //     date: '',
    //     period: '',
    //     amount: '￥2,000,000',
    //   },
    //   {
    //     rowLevel: 'total-4',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '24568357',
    //     name: 'ワンルームマンション新築工事',
    //     repairNew: '新築',
    //     company: '〇〇株式会社',
    //     date: '22-05-30',
    //     period: '22-02-31 ～ 22-11-31',
    //     amount: '￥20,000,000',
    //   },
    //   {
    //     rowLevel: 'subTotal-4',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '',
    //     name: '外工事',
    //     repairNew: '',
    //     company: '',
    //     date: '',
    //     period: '',
    //     amount: '￥15,000,000',
    //   },
    //   {
    //     rowLevel: 'item-4',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '',
    //     name: '項目DDDDDDDDDDDDDDDDDDD',
    //     repairNew: '',
    //     company: '',
    //     date: '',
    //     period: '',
    //     amount: '￥5,000,000',
    //   },
    //   {
    //     rowLevel: 'total-5',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '85236159',
    //     name: 'ワンルームマンション営繕工事',
    //     repairNew: '営繕',
    //     company: '〇〇株式会社',
    //     date: '22-07-23',
    //     period: '22-03-31 ～ 22-12-31',
    //     amount: '￥30,000,000',
    //   },
    //   {
    //     rowLevel: 'subTotal-5',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '',
    //     name: '外工事',
    //     repairNew: '',
    //     company: '',
    //     date: '',
    //     period: '',
    //     amount: '￥20,000,000',
    //   },
    //   {
    //     rowLevel: 'item-5',
    //     isChecked: false,
    //     isCheckedItem: false,
    //     code: '',
    //     name: '項目EEEEEEEEEEEEEEE',
    //     repairNew: '',
    //     company: '',
    //     date: '',
    //     period: '',
    //     amount: 10000000,
    //   },
  ];

  // const [orderList, setOrderList] = useState([]);
  const router = useRouter();
  const today = new Date();
  const endyear = today.getFullYear();
  const [orderList, setOrderList] = useState<any[]>([]);
  const [main, setMain] = useState<any[]>([]);
  const [construction_code, setConstructionCode] = useState('');
  const [construction_name, setConstructionName] = useState('');
  const [middle_category_name, setMiddleCategoryName] = useState('');
  const [cooperator_name, setCooperatorName] = useState('');
  const [order_no, setOrderNo] = useState('');
  const [orderYearStart, setStartYear] = useState<any>();
  const [orderMonthStart, setStartMonth] = useState<any>();
  const [orderYearEnd, setEndYear] = useState<any>();
  const [orderMonthEnd, setEndMonth] = useState<any>();
  const [name, setName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [end, setEnd] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [orderYearOption] = useState<SelectItemType[]>([]);
  const [order_year_month_from] = useState<string>('');
  const [order_year_month_to] = useState<string>('');
  const [orders, setOrder] = useState<OrderList[]>([]);
  const [activeOrderItems, setActiveOrderItems] = useState<OrderList[]>([]);
  const [meta, setMeta] = useState<Meta>({
    current_page: 0,
    next_page: 0,
    prev_page: 0,
    total_count: 0,
    total_pages: 0,
  });
  const [itemsPerPage, setItemsPerPage] = useState(30);

  useEffect(() => {
    if (router.query?.construction_code) {
      formMethods.setValue(
        'construction_code',
        router.query?.construction_code.toString(),
      );
      getOrderData(
        router.query?.construction_code.toString(),
        '',
        '',
        '',
        '',
        '',
        '',
      );
    } else {
      setOrder([]);
      formMethods.setValue('construction_code', '');
    }
  }, [router.query]);

  // get Year
  const useSuccessForYear = (data: []) => {
    orderYearOption.push({
      id: '',
      label: '　',
      value: '',
    });
    {
      data.map((value) =>
        orderYearOption.push({
          id: String(value),
          label: value,
          value: String(value),
        }),
      );
    }
  };
  useYearList(useSuccessForYear);

  async function getOrderData(
    construction_code: string,
    construction_name: string,
    middle_category_name: string,
    order_no: string,
    cooperator_name: string,
    order_year_month_from: string,
    order_year_month_to: string,
  ) {
    const orders: orderList = await OrderListApi(
      construction_code,
      construction_name,
      middle_category_name,
      order_no,
      cooperator_name,
      order_year_month_from,
      order_year_month_to,
      1,
      itemsPerPage,
    );
    const OrderData: OrderList[] = orders.results;
    const meta: Meta = orders.meta;
    setOrder(OrderData);
    setMeta(meta);
    setActiveOrderItems(OrderData);

    const selectedOrderData: any = [];
    orders.results.forEach((data) => {
      selectedOrderData.push(data);
      data.orders.forEach((order: { small_categories: any[] }) => {
        selectedOrderData.push(order);
        order.small_categories.forEach((small_item) => {
          selectedOrderData.push(small_item);
          small_item.details.forEach((detail: any) => {
            selectedOrderData.push(detail);
          });
          // console.log('SELECTED ORDER DATA', selectedOrderData);
        });
      });
    });
    setOrderList(selectedOrderData);
    setMain(selectedOrderData);
  }

  const formMethods = useForm<OrderListFieldValues>();
  const onSubmit = (data: any) => {
    const today = new Date();
    if (
      data.construction_name == '' &&
      data.construction_code == '' &&
      data.middle_category_name == '' &&
      data.order_no == '' &&
      data.cooperator_name == '' &&
      !data.orderYearStart &&
      !data.orderMonthStart &&
      !data.orderYearEnd &&
      !data.orderMonthEnd
    ) {
      getOrderData(
        construction_code,
        construction_name,
        middle_category_name,
        order_no,
        cooperator_name,
        order_year_month_from,
        order_year_month_to,
      );
    } else if (
      data.orderYearStart &&
      data.orderMonthStart &&
      data.orderYearEnd &&
      data.orderMonthEnd
    ) {
      getOrderData(
        data.construction_code,
        data.construction_name,
        data.middle_category_name,
        data.order_no,
        data.cooperator_name,
        dayjs(data.orderYearStart + '-' + data.orderMonthStart).format(
          DATE_FORMAT,
        ),
        dayjs(data.orderYearEnd + '-' + data.orderMonthEnd).format(DATE_FORMAT),
      );
    } else if (
      (!data.orderYearStart || !data.orderMonthStart) &&
      data.orderYearEnd &&
      data.orderMonthEnd
    ) {
      getOrderData(
        data.construction_code,
        data.construction_name,
        data.middle_category_name,
        data.order_no,
        data.cooperator_name,
        '',
        dayjs(data.orderYearEnd + '-' + data.orderMonthEnd).format(DATE_FORMAT),
      );
    } else if (
      data.orderYearStart &&
      data.orderMonthStart &&
      (!data.orderYearEnd || !data.orderMonthEnd)
    ) {
      getOrderData(
        data.construction_code,
        data.construction_name,
        data.middle_category_name,
        data.order_no,
        data.cooperator_name,
        dayjs(data.orderYearStart + '-' + data.orderMonthStart).format(
          DATE_FORMAT,
        ),
        '',
      );
    } else if (
      (!data.orderYearStart || !data.orderMonthStart) &&
      (!data.orderYearEnd || !data.orderMonthEnd)
    ) {
      getOrderData(
        data.construction_code,
        data.construction_name,
        data.middle_category_name,
        data.order_no,
        data.cooperator_name,
        '',
        '',
      );
    } else {
      getOrderData(
        data.construction_code,
        data.construction_name,
        data.middle_category_name,
        data.order_no,
        data.cooperator_name,
        dayjs(data.orderYearStart + '-' + data.orderMonthStart).format(
          DATE_FORMAT,
        ),
        dayjs(data.orderYearEnd + '-' + data.orderMonthEnd).format(DATE_FORMAT),
      );
    }
  };

  // For Pagination
  const pageClick = async (
    event: React.ChangeEvent<unknown>,
    pageNumber: number,
  ) => {
    if (orderYearStart && orderMonthStart && orderYearEnd && orderMonthEnd) {
      const orders: orderList = await OrderListApi(
        construction_code,
        construction_name,
        middle_category_name,
        order_no,
        cooperator_name,
        dayjs(orderYearStart + '-' + orderMonthStart).format(DATE_FORMAT),
        dayjs(orderYearEnd + '-' + orderMonthEnd).format(DATE_FORMAT),
        pageNumber,
        itemsPerPage,
      );
      const OrderData: OrderList[] = orders.results;
      const meta: Meta = orders.meta;
      setOrder(OrderData);
      setMeta(meta);
      setActiveOrderItems(OrderData);
    } else {
      const orders: orderList = await OrderListApi(
        construction_code,
        construction_name,
        middle_category_name,
        order_no,
        cooperator_name,
        '',
        '',
        pageNumber,
        itemsPerPage,
      );
      const OrderData: OrderList[] = orders.results;
      const meta: Meta = orders.meta;
      setOrder(OrderData);
      setMeta(meta);
      setActiveOrderItems(OrderData);
    }
  };

  // const onSubmit = async (data: OrderList) => {
  //   await getOrder(
  //     data.construction_code,
  //     data.construction_name,
  //     data.middle_category_name,
  //     data.cooperator_name,
  //   ).then((response) => {
  //     console.log(response);
  //     // setOrderList(response);
  //   });
  // };

  const selectedRowData: any = [];
  const searchData = () => {
    orderLists.forEach((data) => {
      selectedRowData.push(data);
      data.subTotals.forEach((sub: { items: any[] }) => {
        selectedRowData.push(sub);
        sub.items.forEach((item) => {
          selectedRowData.push(item);
        });
      });
    });
    // activeOrderItems.forEach((data) => {
    //   console.log('Search Data');
    //   console.log('SEARCH DATA FROM API', data);
    //   console.log('SELECTED ROW DATA BEFORE', selectedRowData);
    //   selectedRowData.push(data);
    //   console.log('SELECTED ROW DATA', selectedRowData);
    //   data.orders.forEach((order: { small_categories: any[] }) => {
    //     selectedRowData.push(order);
    //     order.small_categories.forEach((small) => {
    //       selectedRowData.push(small);
    //     });
    //   });
    // });
    setOrderList(selectedRowData);
    setMain(selectedRowData);
    // setTotalSize(orderLists.length);
    // updateEndValue(selectedRowData, rowsPerPage);
  };

  // const updateEndValue = (dataArray: any[], countPerPage: number) => {
  //   let visibleRows = [];
  //   visibleRows = dataArray.slice(0, countPerPage);
  //   let totalLevelCount = 0;
  //   visibleRows.map((data, i) => {
  //     if (data.rowLevel.includes('total-')) {
  //       totalLevelCount++;
  //     }
  //   });
  //   setEnd(totalLevelCount);
  // };

  // const onDataToggle = async (
  //   event: ToggleButtonChangeParams,
  //   subTotalNo: string,
  // ) => {
  //   if (orderList !== undefined && main != undefined) {
  //     const subTotalIndex = orderList.findIndex(
  //       (item) => item.rowLevel === 'total-' + subTotalNo,
  //     );
  //     orderList[subTotalIndex].isChecked = !orderList[subTotalIndex].isChecked;
  //     main.forEach((data, index) => {
  //       if (data.rowLevel === 'subTotal-' + subTotalNo) {
  //         data.isChecked = !data.isChecked;
  //         main[index] = data;
  //       }
  //     });
  //     if (event.value) {
  //       selectedRowData = orderList.filter(
  //         (item) =>
  //           item.rowLevel !== 'subTotal-' + subTotalNo &&
  //           item.rowLevel !== 'item-' + subTotalNo &&
  //           item.rowLevel !== 'detail-' + subTotalNo, // new
  //       );
  //       await setOrderList(selectedRowData);
  //       // updateEndValue(selectedRowData, rowsPerPage);
  //     } else {
  //       const unCheckedList = main.filter(
  //         (item) =>
  //           !(
  //             item.rowLevel.split('-')[0] === 'subTotal' &&
  //             item.isChecked === true
  //           ) &&
  //           !(
  //             item.rowLevel.split('-')[0] === 'item' &&
  //             item.isCheckedItem === true
  //           ) &&
  //           !(
  //             item.rowLevel.split('-')[0] === 'detail' &&
  //             item.isCheckedDetail === true
  //           ), // new
  //       );
  //       const itemFilter: SetStateAction<any[]> = [];
  //       let subTotalValue = '';
  //       let subTotalChecked = false;
  //       unCheckedList.forEach((item, index) => {
  //         const splitValue = item.rowLevel.split('-');
  //         if (splitValue[0] === 'subTotal') {
  //           subTotalValue = splitValue[1];
  //           subTotalChecked = item.isChecked;
  //         }
  //         if (splitValue[0] === 'item') {
  //           subTotalValue = splitValue[1];
  //           subTotalChecked = item.isCheckedItem;
  //         }
  //         if (splitValue[0] === 'detail') {
  //           if (
  //             item.rowLevel === splitValue[0] + '-' + subTotalValue &&
  //             subTotalChecked === false
  //           ) {
  //             itemFilter.push(item);
  //           }
  //         } else {
  //           itemFilter.push(item);
  //         }
  //       });
  //       await setOrderList(itemFilter);
  //       // updateEndValue(itemFilter, rowsPerPage);
  //     }
  //   }
  // };

  // onItemToggle
  // let selectedItemRowData = [];
  // const onItemToggle = async (
  //   event: ToggleButtonChangeParams,
  //   subTotalNo: string,
  // ) => {
  //   if (orderList !== undefined && main != undefined) {
  //     const subTotalIndex = orderList.findIndex(
  //       (item) => item.rowLevel === 'subTotal-' + subTotalNo,
  //     );
  //     orderList[subTotalIndex].isCheckedItem =
  //       !orderList[subTotalIndex].isCheckedItem;
  //     main.forEach((data, index) => {
  //       if (data.rowLevel === 'item-' + subTotalNo) {
  //         data.isCheckedItem = !data.isCheckedItem;
  //         main[index] = data;
  //       }
  //     });
  //     if (event.value) {
  //       selectedItemRowData = orderList.filter(
  //         (item) => item.rowLevel !== 'item-' + subTotalNo,
  //       );
  //       await setOrderList(selectedItemRowData);
  //       // updateEndValue(selectedItemRowData, rowsPerPage);
  //     } else {
  //       const unCheckedList = main.filter(
  //         (item) =>
  //           !(
  //             item.rowLevel.split('-')[0] === 'detail' &&
  //             item.isCheckedDetail === true
  //           ) && // new
  //           !(
  //             item.rowLevel.split('-')[0] === 'item' &&
  //             item.isCheckedItem === true
  //           ) &&
  //           !(
  //             item.rowLevel.split('-')[0] === 'subTotal' &&
  //             item.isChecked === true
  //           ),
  //       );
  //       const itemFilter: SetStateAction<any[]> = [];
  //       let subTotalValue = '';
  //       let subTotalChecked = false;
  //       unCheckedList.forEach((item, index) => {
  //         const splitValue = item.rowLevel.split('-');
  //         if (splitValue[0] === 'subTotal') {
  //           subTotalValue = splitValue[1];
  //           subTotalChecked = item.isChecked;
  //         }
  //         if (splitValue[0] === 'item') {
  //           subTotalValue = splitValue[1];
  //           subTotalChecked = item.isCheckedItem;
  //         } // new
  //         if (splitValue[0] === 'detail') {
  //           if (
  //             item.rowLevel === splitValue[0] + '-' + subTotalValue &&
  //             subTotalChecked === false
  //           ) {
  //             itemFilter.push(item);
  //           }
  //         } else {
  //           itemFilter.push(item);
  //         }
  //       });
  //       await setOrderList(itemFilter);
  //       // updateEndValue(itemFilter, rowsPerPage);
  //     }
  //   }
  // };

  // onDetailToggle
  let selectedDetailRowData = [];
  const onDetailToggle = async (
    event: ToggleButtonChangeParams,
    subTotalNo: string,
  ) => {
    if (orderList !== undefined && main !== undefined) {
      const subTotalIndex = orderList.findIndex(
        (item) => item.rowLevel === 'item-' + subTotalNo,
      );
      orderList[subTotalIndex].isCheckedDetail =
        !orderList[subTotalIndex].isCheckedDetail;
      main.forEach((data, index) => {
        if (data.rowLevel === 'detail-' + subTotalNo) {
          data.isCheckedDetail = !data.isCheckedDetail;
          main[index] = data;
        }
      });
      if (event.value) {
        selectedDetailRowData = orderList.filter(
          (item) => item.rowLevel != 'detail-' + subTotalNo,
        );
        await setOrderList(selectedDetailRowData);
      } else {
        const unCheckedList = main.filter(
          (item) =>
            !(
              item.rowLevel.split('-')[0] === 'subTotal' &&
              item.isChecked === true
            ) &&
            !(
              item.rowLevel.split('-')[0] === 'item' &&
              item.isCheckedItem === true
            ) &&
            !(
              item.rowLevel.split('-')[0] === 'detail' &&
              item.isCheckedDetail === true
            ),
        );
        const itemFilter: SetStateAction<any[]> = [];
        let subTotalValue = '';
        let subTotalChecked = false;
        unCheckedList.forEach((item, index) => {
          const splitValue = item.rowLevel.split('-');
          if (splitValue[0] === 'subTotal') {
            subTotalValue = splitValue[1];
            subTotalChecked = item.isChecked;
          }
          if (splitValue[0] === 'item') {
            subTotalValue = splitValue[1];
            subTotalChecked = item.isCheckedItem;
          }
          if (splitValue[0] === 'detail') {
            if (
              item.rowLevel === splitValue[0] + '-' + subTotalValue &&
              subTotalChecked === false
            ) {
              itemFilter.push(item);
            }
          } else {
            itemFilter.push(item);
          }
        });
        await setOrderList(itemFilter);
      }
    }
  };

  // Toggle
  const Toggle = (rowData: { isChecked: boolean; rowLevel: string }) => {
    const splitSubTotal = rowData.rowLevel.split('-');
    if (splitSubTotal[0] === 'total') {
      return (
        <div className="field-checkbox pt-2">
          <ToggleButton
            checked={rowData.isChecked}
            // onChange={(e) => onDataToggle(e, splitSubTotal[1])}
            onIcon="pi pi-plus"
            onLabel=""
            offLabel=""
            offIcon="pi pi-minus"
            className="w-full border-round-xs"
          />
        </div>
      );
    }
  };
  // subToggle
  const subToggle = (rowData: {
    isCheckedItem: boolean;
    construction_code: string;
    rowLevel: string;
    construction_name: string;
    order_no: string;
    small_category_name: string;
    isCheckedDetail: boolean;
    detail: string;
  }) => {
    const splitSubTotal = rowData.rowLevel.split('-');
    if (splitSubTotal[0] === 'subTotal') {
      return (
        <>
          <ToggleButton
            checked={rowData.isCheckedItem}
            // onChange={(e) => onItemToggle(e, splitSubTotal[1])}
            onIcon="pi pi-plus"
            onLabel=""
            offLabel=""
            offIcon="pi pi-minus"
            className="w-full border-round-xs"
          />
          {/* <label
              className="pt-1 pl-2"
              style={{ color: '#495057' }}
              htmlFor="binary"
            >
              <span>{rowData.code}</span>
            </label> */}
          <span
            className="pt-1 pl-2 text-800"
            style={{ color: '#495057', fontWeight: '500' }}
          >
            {/* {rowData.construction_name} */}
            発注番号：{rowData.order_no}
          </span>
        </>
      );
    } else if (splitSubTotal[0] === 'item') {
      return (
        <div className="pl-7">
          <ToggleButton
            checked={rowData.isCheckedDetail}
            // onChange={(e) => onDetailToggle(e, splitSubTotal[1])}
            onIcon="pi pi-plus"
            onLabel=""
            offLabel=""
            offIcon="pi pi-minus"
            className="w-full border-round-xs"
          />
          {rowData.small_category_name}
        </div>
      );
    } else if (splitSubTotal[0] === 'detail') {
      return (
        <span
          className="pt-1 pl-2 text-800"
          style={{ color: '#495057', fontWeight: '500' }}
        >
          {/* {rowData.construction_name} */}
          {rowData.detail}
        </span>
      );
    } else {
      return rowData.construction_code + '：' + rowData.construction_name;
    }
  };

  // middleCategory
  const middleCategory = (data: any) => {
    return <span>{data.construction_type_name}</span>;
  };

  // newRepair
  const newRepair = (rowData: any) => {
    if (rowData.new_repair_division === 1) {
      return <span>営繕</span>;
    } else if (rowData.new_repair_division === 0) {
      return <span>新築</span>;
    }
  };

  // cooperatorName
  const cooperatorName = (rowData: any) => {
    return <span>{rowData.cooperator_name}</span>;
  };

  // orderDate
  const orderDate = (rowData: any) => {
    return (
      <span>
        {rowData.order_date
          ? `${dayjs(rowData.order_date).format('YYYY/MM/DD')}`
          : ''}
      </span>
    );
  };

  // detailData
  const detailData = (detail: any) => {
    // return <span style={{ marginLeft: '110px' }}>{detail.detail}</span>;
    // return (
    //   <div>
    //     <p
    //       style={{
    //         marginLeft: '110px',
    //         wordBreak: 'break-word',
    //       }}
    //     >
    //       {detail.detail}
    //     </p>
    //   </div>
    // );
    return (
      <div style={{ marginLeft: '82px' }}>
        <span
          style={{
            wordBreak: 'break-word',
          }}
        >
          {detail.detail}
        </span>
      </div>
    );
  };

  // constructionPeriod
  const constructionPeriod = (rowData: any) => {
    return (
      <span>
        {rowData.construction_started_date &&
        rowData.construction_completion_date
          ? `${dayjs(rowData.construction_started_date).format(
            'YYYY/MM-DD',
          )} ～ ${dayjs(rowData.construction_completion_date).format(
            'YYYY/MM-DD',
          )}`
          : ''}
        {/* {rowData.construction_started_date
          ? `${dayjs(rowData.construction_started_date).format('YY-MM-DD')} ～`
          : ''}
        {rowData.construction_completion_date
          ? ` ${dayjs(rowData.construction_completion_date).format(
              'YY-MM-DD',
            )}  `
          : ''} */}
      </span>
    );
  };

  // 金額フォーマット
  const formatCurrency = (value: number) => {
    return value.toLocaleString('jp-JP', {
      style: 'currency',
      currency: 'JPY',
    });
  };

  const amount = (data: any) => {
    // formatCurrency(rowData.total_amount);
    const total_amount = data.orders.reduce(
      (total_amount: any, currentAmount: any) =>
        (total_amount = total_amount + Number(currentAmount.order_amount)),
      0,
    );
    return `${prefixYenSign(changeFormatCurrency(total_amount))}`;
    // return `${formatCurrency(Number(data.total_amount))}`;
  };

  // テーブル行の色
  // const rowClass = (data: { rowLevel: string }) => {
  //   const frontValue = data.rowLevel.split('-')[0];
  //   if (frontValue === 'total') {
  //     return { 'sub-item': frontValue === 'total' };
  //   } else {
  //     return '';
  //   }
  // };

  // 親行トグルイベント
  const onDataToggle2 = (id: number) => {
    let targetOrder = null;
    targetOrder = orders[id];
    targetOrder.isChecked = !targetOrder.isChecked;
    setOrder([
      ...orders.slice(0, id),
      targetOrder,
      ...orders.slice(id + 1, orders.length),
    ]);
  };

  // 子行トグルイベント
  const onSubToggle2 = (parentId: number, childId: number) => {
    let targetOrder = null;
    targetOrder = orders[parentId];
    (targetOrder.orders[childId] as any).isCheckedItem = !(
      targetOrder.orders[childId] as any
    ).isCheckedItem;
    setOrder([
      ...orders.slice(0, parentId),
      targetOrder,
      ...orders.slice(parentId + 1, orders.length),
    ]);
  };

  //
  const onDetailToggle2 = (
    parentId: number,
    childId: number,
    smallCategoryId: number,
  ) => {
    let targetOrder = null;
    (orders[parentId].orders[childId] as any).small_categories[
      smallCategoryId
    ].isCheckedDetail = !(orders[parentId].orders[childId] as any)
      .small_categories[smallCategoryId].isCheckedDetail;

    targetOrder = orders[parentId];
    setOrder([
      ...orders.slice(0, parentId),
      targetOrder,
      ...orders.slice(parentId + 1, orders.length),
    ]);
  };

  // Toggle
  const Toggle2 = (isChecked: boolean, id: number) => {
    return (
      <div className="field-checkbox">
        <ToggleButton
          checked={isChecked}
          onChange={(e) => onDataToggle2(id)}
          onIcon="pi pi-plus"
          onLabel=""
          offLabel=""
          offIcon="pi pi-minus"
          className="w-full border-round-xs"
        />
      </div>
    );
  };

  // subToggle
  const subToggle2 = (
    parentId: number,
    isCheckedItem: boolean,
    childId: number,
    sub: any,
  ) => {
    return (
      <div className="field-checkbox pl-3">
        {/* {sub.small_categories.length > 0 ? ( */}
        {/* <> */}
        <ToggleButton
          checked={isCheckedItem}
          onChange={(e) => onSubToggle2(parentId, childId)}
          onIcon="pi pi-plus"
          onLabel=""
          offLabel=""
          offIcon="pi pi-minus"
          className="w-full border-round-xs"
        />

        <span className="pl-3">発注番号：{sub.order_no}</span>
        {/* </>
          ) : ( */}
        {/* <span className="pl-5">発注番号：{sub.order_no}</span> */}
        {/* )} */}
      </div>
    );
  };

  // detailToggle
  const detailToggle = (
    parentId: number,
    isCheckedDetail: boolean,
    childId: number,
    detailId: number,
    item: any,
  ) => {
    return (
      <div className="field-checkbox ml-6">
        <ToggleButton
          checked={isCheckedDetail}
          onChange={(e) => onDetailToggle2(parentId, childId, detailId)}
          onIcon="pi pi-plus"
          onLabel=""
          offLabel=""
          offIcon="pi pi-minus"
          className="w-full border-round-xs ml-10"
        />
        <span className="pt-1 pl-3">{item.small_category_name}</span>
      </div>
    );
  };

  const smallCategoryAmount = (item: any) => {
    const total = item.details.reduce(
      (total: any, currentItem: any) =>
        (total = total + Number(currentItem.subtotal)),
      0,
    );
    return `${prefixYenSign(changeFormatCurrency(total))}`;
    // return <span>{total}</span>;
  };

  // const onPage = (event: any) => {
  //   console.log(event.rows);
  //   setRowsPerPage(event.rows);

  //   updateEndValue(orderList, event.rows);
  // };

  // const { name, age } = router.query;

  if (!orders) return <div>loading...</div>;
  return (
    <>
      <Head>
        <title>発注一覧</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Header title="発注一覧"></Header>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)} autoComplete="off">
          <div className="contents form">
            <div className="grid">
              <div className="col-8 h-full block ">
                <div className="formgrid grid pl-2">
                  {/* <div className="field col-2 surface-300 pt-3 pr-4 pl-4 mb-0">
                    <ContentHeadingInline heading="工事コード" />
                  </div> */}
                  <div className={cx('header', 'field col-2 pt-2 mb-0')}>
                    <div className={cx('heading-text')}>工事コード</div>
                  </div>
                  {/* <div className="field col-10 surface-100 pt-2 pr-4 mb-0">
                    <InputForm
                      type="text"
                      name="construction_code"
                      className="p-inputtext-sm block mb-2 pi-search w-24rem border-noround"
                      // value={construction_code}
                      onChange={(e) => setConstructionCode(e.target.value)}
                    />
                  </div> */}
                  <div className="field col-10  pt-1 pr-4 mb-0">
                    <InputForm
                      type="text"
                      name="construction_code"
                      className="w-15rem border-noround"
                      // className={cx('search_textbox')}
                      // value={construction_code}
                      onChange={(e) => setConstructionCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="formgrid grid pl-2">
                  {/* <div className="field col-2 surface-300 pt-2 pr-4 pl-4 mb-0">
                    <ContentHeadingInline heading="工事名" />
                  </div> */}
                  <div className={cx('header', 'field col-2 pt-2 mb-0')}>
                    <div className={cx('heading-text')}>工事名</div>
                  </div>
                  {/* <div className="field col-10 surface-100 pt-1 pr-4 mb-0">
                    <InputForm
                      type="text"
                      name="construction_name"
                      className="p-inputtext-sm block mb-2 pi-search w-24rem border-noround"
                      // style={{ borderRadius: '0' }}
                      // value={construction_name}
                      onChange={(e) => setConstructionName(e.target.value)}
                    />
                  </div> */}
                  <div className="field col-10  pt-1 pr-4 mb-0">
                    <InputForm
                      type="text"
                      name="construction_name"
                      // className="w-29rem border-noround"
                      className={cx('search_textbox')}
                      // style={{ borderRadius: '0' }}
                      // value={construction_name}
                      onChange={(e) => setConstructionName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="formgrid grid pl-2">
                  {/* <div className="field col-2 surface-300 pt-2 pr-4 pl-4 mb-0">
                    <ContentHeadingInline heading="中工事" />
                  </div> */}
                  <div className={cx('header', 'field col-2 pt-2 mb-0')}>
                    <div className={cx('heading-text')}>中工事</div>
                  </div>
                  {/* <div className="field col-10 surface-100 pt-1 pr-4 mb-0">
                    <InputForm
                      type="text"
                      name="middle_category_name"
                      className="p-inputtext-sm block mb-2 pi-search w-24rem border-noround"
                      // style={{ borderRadius: '0' }}
                      // value={middle_category_name}
                      onChange={(e) => setMiddleCategoryName(e.target.value)}
                    />
                  </div> */}
                  <div className="field col-10  pt-1 pr-4 mb-0">
                    <InputForm
                      type="text"
                      name="middle_category_name"
                      // className="w-29rem border-noround"
                      className={cx('search_textbox')}
                      // style={{ borderRadius: '0' }}
                      // value={middle_category_name}
                      onChange={(e) => setMiddleCategoryName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="formgrid grid pl-2">
                  {/* <div className="field col-2 surface-300 pt-2 pr-4 pl-4 mb-0">
                    <ContentHeadingInline heading="発注番号" />
                  </div> */}
                  <div className={cx('header', 'field col-2 pt-2 mb-0')}>
                    <div className={cx('heading-text')}>発注番号</div>
                  </div>
                  {/* <div className="field col-10 surface-100 pt-1 pr-4 mb-0">
                    <InputForm
                      type="text"
                      name="order_no"
                      className="p-inputtext-sm block mb-2 pi-search w-24rem border-noround"
                      // style={{ borderRadius: '0' }}
                      // value={construction_name}
                      onChange={(e) => setOrderNo(e.target.value)}
                    />
                  </div> */}
                  <div className="field col-10  pt-1 pr-4 mb-0">
                    <InputForm
                      type="text"
                      name="order_no"
                      // className="w-29rem border-noround"
                      className={cx('search_textbox')}
                      // style={{ borderRadius: '0' }}
                      // value={construction_name}
                      onChange={(e) => setOrderNo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="formgrid grid pl-2">
                  {/* <div className="field col-2 surface-300 pt-2 pr-4 pl-4 mb-0">
                    <ContentHeadingInline heading="協力会社名" />
                  </div> */}
                  <div className={cx('header', 'field col-2 pt-2 mb-0')}>
                    <div className={cx('heading-text')}>協力会社名</div>
                  </div>
                  {/* <div className="field col-10 surface-100 pt-1 pr-4 mb-0">
                    <InputForm
                      type="text"
                      name="cooperator_name"
                      className="p-inputtext-sm block mb-2 pi-search w-24rem border-noround"
                      // style={{ borderRadius: '0' }}
                      // value={cooperator_name}
                      onChange={(e) => setCooperatorName(e.target.value)}
                    />
                  </div> */}
                  <div className="field col-10  pt-1 pr-4 mb-0">
                    <InputForm
                      type="text"
                      name="cooperator_name"
                      // className="w-29rem border-noround"
                      // style={{ borderRadius: '0' }}
                      // value={cooperator_name}
                      className={cx('search_textbox')}
                      onChange={(e) => setCooperatorName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="formgrid grid pl-2">
                  {/* <div className="field col-2 surface-300 pt-2 pr-4 pl-4 mb-0">
                    <ContentHeadingInline heading="発注日" />
                  </div> */}
                  <div className={cx('header', 'field col-2 pt-2 mb-0')}>
                    <div className={cx('heading-text')}>発注日</div>
                  </div>
                  <div className="field col-10 pt-1 pr-2 mb-0">
                    <div className="flex flex-row">
                      <div className="text-left pulldown-w-year mr-2 mb-2">
                        <DropdownForm
                          name="orderYearStart"
                          items={orderYearOption}
                          className="w-full year"
                          // className={cx('w-full', styles['year'])}
                          // placeholder="年"
                          onChange={(e: any) => setStartYear(e)}
                        />
                      </div>
                      <div className="text-left pulldown-w-month mr-2">
                        <DropdownForm
                          name="orderMonthStart"
                          items={month}
                          className="w-full month"
                          // placeholder="月"
                          onChange={(e: any) => setStartMonth(e)}
                        />
                      </div>
                      <div className="field mr-2 mt-1">
                        <ContentHeadingInline heading="〜" />
                      </div>
                      <div className="text-left pulldown-w-year mr-2">
                        <DropdownForm
                          name="orderYearEnd"
                          items={orderYearOption}
                          className="w-full year"
                          // placeholder="年"
                          onChange={(e: any) => setEndYear(e)}
                        />
                      </div>
                      <div className="text-left pulldown-w-month">
                        <DropdownForm
                          name="orderMonthEnd"
                          items={month}
                          className="w-full month"
                          // placeholder="月"
                          onChange={(e: any) => setEndMonth(e)}
                        />
                      </div>
                      <div className="w-6rem">
                        <Button
                          className="p-button-success ml-2"
                          label={'検索'}
                          type="submit"
                          // onClick={() => searchData()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="formgrid grid">
              <div className="field col-12 flex justify-content-center flex-wrap card-container">
                <Button
                  className="p-button-success"
                  label={'検索'}
                  type="submit"
                  // onClick={() => searchData()}
                />
              </div>
            </div> */}
            {/* <div className="grid">
              <div className="flex flex-row-reverse col-8 ml-2 h-full block">
                <Button
                  className="p-button-success"
                  label={'検索'}
                  type="submit"
                  // onClick={() => searchData()}
                />
              </div>
            </div> */}
          </div>
        </form>
      </FormProvider>

      {orders.length > 0 ? (
        <>
          <div>
            <table className={styles['table']}>
              <thead>
                <tr>
                  <th className={styles['th_1']}></th>
                  <th className={styles['th_2']}>工事コード：工事名</th>
                  <th className={styles['th_3']}>中工事</th>
                  <th className={styles['th_4']}>営繕／新築</th>
                  <th className={styles['th_5']}>協力会社名</th>
                  <th className={styles['th_6']}>発注日</th>
                  <th className={styles['th_7']}>工期</th>
                  <th className={styles['th_8']}>金額</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((data, index) => (
                  <Fragment key={index}>
                    <tr key={index}>
                      <td className={styles['td_1_total']}>
                        {Toggle2(data.isChecked, index)}
                      </td>
                      <td className={styles['td_2_total']}>
                        {data.construction_code}：{data.construction_name}
                      </td>
                      <td className={styles['td_3_total']}>
                        {middleCategory(data)}
                      </td>
                      <td className={styles['td_4_total']}>
                        {newRepair(data)}
                      </td>
                      <td className={styles['td_5_total']}>
                        {cooperatorName(data)}
                      </td>
                      <td className={styles['td_6_total']}>
                        {orderDate(data)}
                      </td>
                      <td className={styles['td_7_total']}>
                        {constructionPeriod(data)}
                      </td>
                      <td className={styles['td_8_total']}>
                        {prefixYenSign(
                          changeFormatCurrency(Number(data.total_amount)),
                        )}
                        {/* {amount(data)} */}
                      </td>
                    </tr>
                    {data.isChecked === false &&
                      data.orders.map((sub: any, sub_index: number) => (
                        <Fragment key={sub_index}>
                          <tr key={sub_index}>
                            <td className={styles['td_1']}></td>
                            <td className={styles['td_2']}>
                              {subToggle2(
                                index,
                                sub.isCheckedItem,
                                sub_index,
                                sub,
                              )}
                              {/* {sub.order_no} */}
                            </td>
                            <td className={styles['td_3']}></td>
                            <td className={styles['td_4']}></td>
                            <td className={styles['td_5']}></td>
                            <td className={styles['td_6']}></td>
                            <td className={styles['td_7']}></td>
                            <td className={styles['td_8']}>
                              {/* {sub.amount} */}
                              {prefixYenSign(
                                changeFormatCurrency(Number(sub.order_amount)),
                              )}
                            </td>
                          </tr>

                          {sub.isCheckedItem === false &&
                            sub.small_categories.map(
                              (item: any, item_index: number) => (
                                <Fragment key={item_index}>
                                  <tr
                                    key={`index${index}-sub${sub_index}-item${item_index}`}
                                  >
                                    <td className={styles['std_1']}></td>
                                    <td
                                      className={styles['std_2']}
                                      style={{ marginLeft: '50px' }}
                                    >
                                      {detailToggle(
                                        index,
                                        item.isCheckedDetail,
                                        sub_index,
                                        item_index,
                                        item,
                                      )}
                                      {/* <span style={{ marginLeft: '90px' }}>
                                          {item.small_category_name}
                                        </span> */}
                                    </td>
                                    <td className={styles['std_3']}></td>
                                    <td className={styles['std_4']}></td>
                                    <td className={styles['std_5']}></td>
                                    <td className={styles['std_6']}></td>
                                    <td className={styles['std_7']}></td>
                                    <td className={styles['std_8']}>
                                      {/* {smallCategoryAmount(item)} */}
                                      {prefixYenSign(
                                        changeFormatCurrency(
                                          Number(
                                            item.small_category_order_amount,
                                          ),
                                        ),
                                      )}
                                    </td>
                                  </tr>

                                  {item.isCheckedDetail === false &&
                                    item.details.map(
                                      (detail: any, detail_index: number) =>
                                        detail.detail ? (
                                          // <tr
                                          //   key={`index${index}-sub${sub_index}-item${item_index}-detail${detail_index}`}
                                          //   className={styles['tr_height']}
                                          // >
                                          <tr
                                            key={detail_index}
                                            className={styles['tr_height']}
                                          >
                                            <td className={styles['td_1']}></td>
                                            <td className={styles['td_2']}>
                                              {detailData(detail)}
                                              {/* <span
                                                style={{ marginLeft: '150px' }}
                                              >
                                                {detail.detail}
                                              </span> */}
                                            </td>
                                            <td className={styles['td_3']}></td>
                                            <td className={styles['td_4']}></td>
                                            <td className={styles['td_5']}></td>
                                            <td className={styles['td_6']}></td>
                                            <td className={styles['td_7']}></td>
                                            <td className={styles['td_8']}>
                                              {prefixYenSign(
                                                changeFormatCurrency(
                                                  Number(detail.subtotal),
                                                ),
                                              )}
                                            </td>
                                          </tr>
                                        ) : (
                                          ''
                                        ),
                                    )}
                                </Fragment>
                              ),
                            )}
                        </Fragment>
                      ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        ''
      )}
      <div className="contents form">
        {orders?.length > 0 && (
          <div className="flex field align-items-center justify-content-center">
            <ThemeProvider theme={theme}>
              <Pagination
                showFirstButton
                showLastButton
                count={meta ? meta.total_pages : 0}
                defaultPage={1}
                onChange={pageClick.bind(this)}
                color="primary"
                shape="rounded"
                className="pagination"
              />
            </ThemeProvider>
          </div>
        )}
      </div>

      {/* {orderList.length !== 0 && (
          <div
            className="datatable-style-background"
            style={{ backgroundColor: 'var(--surface-300) !important' }}
          >
            <DataTable
              value={orderList}
              size="small"
              emptyMessage=" "
            >
              <Column
                body={Toggle}
                className="pl-3"
              ></Column>
              <Column
                // field="code"
                header="工事コード：工事名"
                body={subToggle}
                style={{ width: '35%' }}
              />
              <Column
                field="new_repair_division"
                body={newRepair}
                header="営繕／新築"
                style={{ width: '10%' }}
              />
              <Column
                field="cooperator_name"
                header="協力会社名"
                body={cooperatorName}
                style={{ width: '20%' }}
              />
              <Column
                field="date"
                header="発注日"
                body={orderDate}
                style={{ width: '10%' }}
              />
              <Column
                field="period"
                header="工期"
                body={constructionPeriod}
                style={{ width: '15%' }}
              />
              <Column
                field="amount"
                body={amount}
                header="金額"
                style={{ width: '15%', textAlign: 'right' }}
              />
            </DataTable>
          </div>
        )} */}
    </>
  );
};
export default Orders;
Orders.auth = true;
Orders.pageId = 'EU_MANAGE';
