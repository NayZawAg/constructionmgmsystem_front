/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint-disable react-hooks/exhaustive-deps */
import GetAppIcon from '@mui/icons-material/GetApp';
import Link from '@mui/material/Link';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import cx from 'classnames';
import dayjs from 'dayjs';
import Head from 'next/head';
import Router from 'next/router';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Image } from 'primereact/image';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useCSVDownloader } from 'react-papaparse';
import { NextPageWithLayout } from '../_app';
import {
  AllConstructionListapi,
  ConstructionListapi,
} from '@/api/construction';
import { Header } from '@/components/commons/header/header';
import { ContentHeadingInline } from '@/components/forms/contentHeading/contentHeadingInline';
import { DropdownForm } from '@/components/forms/dropdown/dropdown';
import { InputForm } from '@/components/forms/input/input';
import { useBrandList } from '@/hooks/api/brand';
import {
  ConstructionListQuery,
  useConstructionList,
  useYearList,
} from '@/hooks/api/construction';
import { useCustomerList } from '@/hooks/api/customer';
import { Brand } from '@/interfaces/brand';
import { ConstructionList } from '@/interfaces/constructionList';
import { Customer } from '@/interfaces/customer';
import { Meta } from '@/interfaces/meta';
import type { SelectItemType } from '@/types/common';
import { DATE_FORMAT } from '@/utils/constants/common';
import { setAreaValue } from '@/utils/constants/common';
import { month, constructiontype, EastWestDivision } from '@/utils/select_item';

// import ConstructionApi from '@/api/construction';
export type constructionList = {
  results: ConstructionList[];
  meta: Meta;
};

export type SearchFormFieldValues = {
  construction_name?: string;
  construction_code?: string;
  customer_id?: number;
  brand_ids?: number[];
  east_west_divisions?: number[];
  construction_types?: number[];
  completion_year_month_from?: string;
  completion_year_month_to?: string;
};

export type CsvDownloadType = {
  工事コード: string;
  得意先名: string;
  工事名: string;
  東西区分: string;
  ブランドアイコン: string;
  ステータス: string;
  工事種別: string;
  メインブランド: string;
  親工事コード: string;
  得意先コード: string;
  得意先部署名: string;
  得意先担当者名: string;
  所長の社員コード: string;
  所長名: string;
  敷地面積: number;
  敷地面積坪表示: string;
  建築面積: number;
  建築面積坪表示: string;
  延べ床面積: number;
  延べ床面積坪表示: string;
  構造: string;
  地上階: number;
  地下階: number;
  商材: string;
  予定工事開始日: Date;
  予定工事終了日: Date;
  更新日: Date;
  見積日: Date;
  受注日: Date;
  契約日: Date;
  工事完了日: Date;
  見積金額: number;
  見積時想定原価: number;
  見積時粗々利益額: number;
  見積時粗々利益率: number;
  想定人工: number;
  受注金額: number;
  受注時想定原価: number;
  受注時粗利額: number;
  受注時粗利率: number;
  実行予算時受注金額: number;
  実行予算: number;
  実行予算時粗利額: number;
  実行予算時粗利率: number;
  売上金額: number;
  最終予想原価: number;
  予想粗利額: number;
  予想粗利率: number;
  売上実績: number;
  原価実績: number;
  粗利実績: number;
  実績粗利率: number;
  作業所評点: number;
  サブブランド1: string;
  サブブランド2: string;
  契約用メールアドレス: string;
  郵便番号: string;
  都道府県: string;
  市区町村: string;
  住所1: string;
  住所2: string;
  電話番号: string;
  DR0: Date;
  DR1: Date;
  DR2: Date;
  確認申請実施: Date;
  消防検査日: Date;
};

const SearchPage: NextPageWithLayout = () => {
  // create mui theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#f57c00',
      },
    },
  });

  const ref = React.useRef<HTMLInputElement>(null);
  const today = new Date();
  const endyear = today.getFullYear();
  const date = dayjs(today.getFullYear() + '-' + (today.getMonth() + 1)).format(
    DATE_FORMAT,
  );
  const [StartYear, setStartYear] = useState<any>();
  const [StartMonth, setStartMonth] = useState<any>();
  const [EndYear, setEndYear] = useState<any>(endyear);
  const [EndMonth, setEndMonth] = useState<any>();
  const [yearOptions] = useState<SelectItemType[]>([]);
  const [constructionQuery, setconstructionQuery] =
    useState<ConstructionListQuery>({ page: 1, per_page: 30 });
  const [construction_code, setConstructioncode] = useState<string>('');
  const [construction_name, setConstructionname] = useState<string>('');
  const [completion_year_month_from] = useState<string>('');
  const [completion_year_month_to] = useState<string>('');
  const [customer_id, setCustomer] = useState<any>(0);
  const [brandcheckboxes, setCheckboxesBrand] = useState<number[]>([]);
  const [eastwestcheckboxes, setCheckboxesEastWest] = useState<number[]>([]);
  const [typecheckboxes, setCheckboxesType] = useState<number[]>([]);
  const [customers] = useState<SelectItemType[]>([]);
  const [brands, setBrands] = useState<SelectItemType[]>([]);
  const formMethods = useForm<SearchFormFieldValues>();
  const [currentPage, setCurrentPage] = useState('1');
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page.",
  );
  const [constructions, setConstruction] = useState<ConstructionList[]>([]);
  // ステータス
  const statusConstant = ['申請中', '申請中', '申請中', '差戻', '承認済み'];
  const consAppStatus = [1, 2, 3, 4]; // 工事申請ステータス
  const fetchConstructionDatas = useRef(true);
  const fetchAllConstructionsData = useRef(true);
  const pageClickRef = useRef(true);

  const useSuccessForYear = (data: []) => {
    // console.log('HHH',data)
    // console.log('Year', data)
    yearOptions.push({
      id: '',
      label: '　',
      value: '',
    });
    {
      data.map((value) =>
        yearOptions.push({
          id: String(value),
          label: value,
          value: String(value),
        }),
      );
    }
  };
  useYearList(useSuccessForYear);

  const [meta, setMeta] = useState<Meta>({
    current_page: 0,
    next_page: 0,
    prev_page: 0,
    total_count: 0,
    total_pages: 0,
  });
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [activeConstructionItems, setActiveItems] = useState<
    ConstructionList[]
  >([]);
  // CSVdownloader
  const { CSVDownloader, Type } = useCSVDownloader();

  // const handleStartYear = (e: string) => {
  //   setStartYear(true);
  //   console.log(e)
  // };
  // const handleStartMonth = () => {
  //   setStartMonth(true);
  // };
  // const handleEndYear = () => {
  //   setEndYear(true);
  // };
  const handleCustomer = (e: number) => {
    setCustomer(e);
  };

  const onSelectCheckboxesForBrand = (e: { value: any; checked: boolean }) => {
    const selectedCheckboxes = [...brandcheckboxes];

    if (e.checked) {
      selectedCheckboxes.push(e.value);
    } else {
      selectedCheckboxes.splice(selectedCheckboxes.indexOf(e.value), 1);
    }

    setCheckboxesBrand(selectedCheckboxes);
  };

  const onSelectCheckboxesForEastWest = (e: {
    value: any;
    checked: boolean;
  }) => {
    const selectedCheckboxes = [...eastwestcheckboxes];

    if (e.checked) {
      selectedCheckboxes.push(e.value);
    } else {
      selectedCheckboxes.splice(selectedCheckboxes.indexOf(e.value), 1);
    }

    setCheckboxesEastWest(selectedCheckboxes);
  };

  const onSelectCheckboxesForType = (e: { value: any; checked: boolean }) => {
    const selectedCheckboxes = [...typecheckboxes];

    if (e.checked) {
      selectedCheckboxes.push(e.value);
    } else {
      selectedCheckboxes.splice(selectedCheckboxes.indexOf(e.value), 1);
    }

    setCheckboxesType(selectedCheckboxes);
  };

  /** 得意先名プルダウンメニューセット **/
  const onSuccessCallbackForCustomers = (data: Customer[]) => {
    if (customers.length < 1) {
      customers.push({
        id: '0',
        label: '　',
        value: '0',
      });
      data.map((customer: Customer) => {
        customers.push({
          id: customer.id + '',
          label: customer.company_name,
          value: customer.id,
        });
      });
    }
  };

  const onSuccessCallbackForBrand = (data: Brand[]) => {
    brands.length < 1 &&
      data.map((brand: Brand) => {
        brands.push({
          id: brand.id + '',
          label: brand.brand_name,
          value: brand.id,
        });
      });
  };

  const useSuccessForConstructions = (data: constructionList) => {
    // setconstructionQuery({ page: 1, per_page: 30 });

    setActiveItems(data.results);
    setConstruction(data.results);
    setMeta(data.meta);
  };

  // fetch brand
  const { data: brandlist } = useBrandList({}, onSuccessCallbackForBrand);

  // fetch construction
  const { data: constructionslist } = useConstructionList(
    constructionQuery,
    useSuccessForConstructions,
  );

  // fetch customer
  const { data: customerlist } = useCustomerList(
    {},
    onSuccessCallbackForCustomers,
  );

  useEffect(() => {
    if (customerlist) {
      onSuccessCallbackForCustomers(customerlist);
    }
    if (brandlist) {
      onSuccessCallbackForBrand(brandlist);
    }
  }, [customerlist, brandlist]);

  // useEffect(() => {
  //   getConstructionData('', '', 0, [], [], [], '', '');
  // }, [constructions]);

  async function getConstructionData(
    construction_code: string,
    construction_name: string,
    customer_id: number,
    brand_ids: number[],
    east_west_divisions: number[],
    construction_types: number[],
    completion_year_month_from: string,
    completion_year_month_to: string,
  ) {
    if (fetchConstructionDatas.current) {
      fetchConstructionDatas.current = false;
      const constructions: constructionList = await ConstructionListapi(
        construction_code,
        construction_name,
        customer_id,
        brand_ids,
        east_west_divisions,
        construction_types,
        completion_year_month_from,
        completion_year_month_to,
        1,
        itemsPerPage,
      );
      const ConstructionData: ConstructionList[] = constructions.results;
      const meta: Meta = constructions.meta;
      setConstruction(ConstructionData);
      setMeta(meta);
      setActiveItems(ConstructionData);
    }
  }

  const onClickCopyBtn = (rowData: any) => {
    Router.push({
      pathname: '/constructions/new',
      query: {
        id: rowData.id ? rowData.id : rowData.construction_application_id,
        status: rowData.status,
      },
    });
  };

  // async function getConstructionDataF(data: any) {
  //   const constructions: constructionList = await ConstructionListapi(data)
  //   const ConstructionData: ConstructionList[] = constructions.results;
  //   const meta: Meta = constructions.meta;
  //   setConstruction(ConstructionData);
  //   setMeta(meta);
  //   setActiveItems(ConstructionData);
  // };

  const iconTemplate = (rowData: any) => {
    return (
      <Image
        src={rowData.main_brand.brand_icon}
        width="30"
        height="30"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        alt={rowData.main_brand.brand_name}
      />
    );
  };
  const code_linkTemplate = (rowData: any, column: any) => {
    if (consAppStatus.includes(rowData.status)) {
      return <label>{rowData.construction_code}</label>;
    } else {
      return (
        <Link href={`/constructions/${rowData.id}`}>
          {rowData.construction_code}
        </Link>
      );
    }
  };
  const customer_linkTemplate = (rowData: any) => {
    return <label>{rowData.customer.company_name}</label>;
  };
  const name_linkTemplate = (rowData: any) => {
    if (consAppStatus.includes(rowData.status)) {
      return <label>{rowData.construction_name}</label>;
    } else {
      return (
        <Link href={`/constructions/${rowData.id}`}>
          {rowData.construction_name}
        </Link>
      );
    }
  };
  const municipalTemplate = (rowData: any) => {
    return <label>{rowData.municipality}</label>;
  };
  const status = (rowData: any) => {
    return <label>{statusConstant[rowData.status - 1]}</label>;
  };
  const copyBtn = (rowData: any) => {
    return (
      <Button
        label="複製"
        onClick={() => {
          onClickCopyBtn(rowData);
        }}
        // className="p-button-sm p-button-outlined p-button-secondary"
        className={cx('link-button', 'p-button-sm p-button-outlined md:w-4rem')}
        style={{ height: '30px' }}
      />
    );
  };
  const onSubmit = (data: any) => {
    const today = new Date();
    fetchConstructionDatas.current = true;
    if (
      data.construction_name == '' &&
      data.construction_code == '' &&
      !data.customer_id &&
      eastwestcheckboxes.length == 0 &&
      typecheckboxes.length == 0 &&
      brandcheckboxes.length == 0 &&
      !data.completionYearStart &&
      !data.completionMonthStart &&
      !data.completionYearEnd &&
      !data.completionMonthEnd
    ) {
      getConstructionData(
        construction_code,
        construction_name,
        customer_id,
        brandcheckboxes,
        eastwestcheckboxes,
        typecheckboxes,
        completion_year_month_from,
        completion_year_month_to,
      );
    } else if (
      data.completionYearStart &&
      data.completionMonthStart &&
      data.completionYearEnd &&
      data.completionMonthEnd
    ) {
      getConstructionData(
        data.construction_code,
        data.construction_name,
        data.customer_id,
        brandcheckboxes,
        eastwestcheckboxes,
        typecheckboxes,
        dayjs(
          data.completionYearStart + '-' + data.completionMonthStart,
        ).format(DATE_FORMAT),
        dayjs(data.completionYearEnd + '-' + data.completionMonthEnd).format(
          DATE_FORMAT,
        ),
      );
    } else if (
      (!data.completionYearStart || !data.completionMonthStart) &&
      data.completionYearEnd &&
      data.completionMonthEnd
    ) {
      getConstructionData(
        data.construction_code,
        data.construction_name,
        data.customer_id,
        brandcheckboxes,
        eastwestcheckboxes,
        typecheckboxes,
        '',
        dayjs(data.completionYearEnd + '-' + data.completionMonthEnd).format(
          DATE_FORMAT,
        ),
      );
    } else if (
      data.completionYearStart &&
      data.completionMonthStart &&
      (!data.completionYearEnd || !data.completionMonthEnd)
    ) {
      getConstructionData(
        data.construction_code,
        data.construction_name,
        data.customer_id,
        brandcheckboxes,
        eastwestcheckboxes,
        typecheckboxes,
        dayjs(
          data.completionYearStart + '-' + data.completionMonthStart,
        ).format(DATE_FORMAT),
        '',
      );
    } else if (
      (!data.completionYearStart || !data.completionMonthStart) &&
      (!data.completionYearEnd || !data.completionMonthEnd)
    ) {
      getConstructionData(
        data.construction_code,
        data.construction_name,
        data.customer_id,
        brandcheckboxes,
        eastwestcheckboxes,
        typecheckboxes,
        '',
        '',
      );
    } else {
      getConstructionData(
        data.construction_code,
        data.construction_name,
        data.customer_id,
        brandcheckboxes,
        eastwestcheckboxes,
        typecheckboxes,
        dayjs(
          data.completionYearStart + '-' + data.completionMonthStart,
        ).format(DATE_FORMAT),
        dayjs(data.completionYearEnd + '-' + data.completionMonthEnd).format(
          DATE_FORMAT,
        ),
      );
    }
  };

  // const pageClick = async (pageNumber: any) => {
  //   const constructions: constructionList = await ConstructionListapi(construction_code,construction_name,customer_id, brandcheckboxes,eastwestcheckboxes,typecheckboxes,completion_year_month_from,completion_year_month_to,pageNumber,itemsPerPage)
  //   const ConstructionData: ConstructionList[] = constructions.results;
  //   const meta: Meta = constructions.meta;
  //   setConstruction(ConstructionData);
  //   setMeta(meta);
  //   setActiveItems(ConstructionData);
  //   console.log(pageNumber)
  // };

  const pageClick = async (
    event: React.ChangeEvent<unknown>,
    pageNumber: number,
  ) => {
    console.log('pageClick: ', pageClickRef.current);
    pageClickRef.current = true;
    if (pageClickRef.current) {
      pageClickRef.current = false;
      if (StartYear && StartMonth && EndYear && EndMonth) {
        const constructions: constructionList = await ConstructionListapi(
          construction_code,
          construction_name,
          customer_id,
          brandcheckboxes,
          eastwestcheckboxes,
          typecheckboxes,
          dayjs(StartYear + '-' + StartMonth).format(DATE_FORMAT),
          dayjs(EndYear + '-' + EndMonth).format(DATE_FORMAT),
          pageNumber,
          itemsPerPage,
        );
        const ConstructionData: ConstructionList[] = constructions.results;
        const meta: Meta = constructions.meta;
        setConstruction(ConstructionData);
        setMeta(meta);
        setActiveItems(ConstructionData);
        // console.log(meta)
        // console.log(ConstructionData)
      } else {
        const constructions: constructionList = await ConstructionListapi(
          construction_code,
          construction_name,
          customer_id,
          brandcheckboxes,
          eastwestcheckboxes,
          typecheckboxes,
          '',
          '',
          pageNumber,
          itemsPerPage,
        );
        const ConstructionData: ConstructionList[] = constructions.results;
        const meta: Meta = constructions.meta;
        setConstruction(ConstructionData);
        setMeta(meta);
        setActiveItems(ConstructionData);
        // console.log(meta)
        // console.log(ConstructionData)
      }
    }
  };

  // const pageClick = async (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   pageNumber: number,
  // ) => {
  //   const constructions: constructionList = await ConstructionListapi(construction_code,construction_name,customer_id, brandcheckboxes,eastwestcheckboxes,typecheckboxes,dayjs(StartYear + '-' + StartMonth).format(DATE_FORMAT),dayjs(EndYear + '-' + EndMonth).format(DATE_FORMAT),pageNumber,itemsPerPage)
  //   const ConstructionData: ConstructionList[] = constructions.results;
  //   const meta: Meta = constructions.meta;
  //   setConstruction(ConstructionData);
  //   setMeta(meta);
  //   setActiveItems(ConstructionData);
  //   console.log(meta)
  //   console.log(ConstructionData)
  // };

  // const template1 = {
  //   layout: 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
  //   'PrevPageLink': (options: { className: string | undefined; onClick: React.MouseEventHandler<HTMLButtonElement> | undefined; disabled: boolean | undefined; }) => {
  //     return (
  //       <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
  //         <span className="p-3">Previous</span>
  //         <Ripple />
  //       </button>
  //     )
  //   },
  //   'NextPageLink': (options: { className: string | undefined; onClick: React.MouseEventHandler<HTMLButtonElement> | undefined; disabled: boolean | undefined; }) => {
  //     return (
  //       <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
  //         <span className="p-3">Next</span>
  //         <Ripple />
  //       </button>
  //     )
  //   },
  //   'PageLinks': (options: { view: { startPage: number; endPage: any; }; page: number; totalPages: any; className: string | undefined; onClick: React.MouseEventHandler<HTMLButtonElement> | undefined; }) => {
  //     if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
  //       const className = classNames(options.className, { 'p-disabled': true });

  //       return <span className={className} style={{ userSelect: 'none' }}>...</span>;
  //     }
  //     return (
  //       <button type="button" className={options.className} onClick={(options) => pageClick(options)}>
  //         {options.page + 1}
  //         <Ripple />
  //       </button>
  //     )
  //   },
  //   'CurrentPageReport': (options: { first: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; last: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
  //     return (
  //       <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '180px', textAlign: 'center' }}>
  //         件中 {options.first} ~ {options.last} 件目 of {meta.total_count}
  //       </span>
  //     )
  //   }
  // };

  // get Csv download datas
  const [downloadConsList, setDownloadConsList] = useState<CsvDownloadType[]>(
    [],
  );
  const csvHeaders: string[] = [
    '工事コード',
    '工事名',
    '東西区分',
    '工事種別',
    'メインブランド',
    '親工事コード',
    '得意先コード',
    '得意先名',
    '得意先部署名',
    '得意先担当者名',
    '所長の社員コード',
    '所長名',
    // 'ブランドアイコン',
    '敷地面積',
    '敷地面積（坪表示）',
    '建築面積',
    '建築面積（坪表示）',
    '延べ床面積',
    '延べ床面積（坪表示）',
    '構造',
    '地上階',
    '地下階',
    '商材',
    '予定工事開始日',
    '予定工事終了日',
    '更新日',
    '見積日',
    '受注日',
    '契約日',
    '工事完了日',
    'ステータス',
    '見積金額',
    '見積時想定原価',
    '見積時粗々利益額',
    '見積時粗々利益率',
    '想定人工(@8万円)',
    '受注金額',
    '受注時想定原価',
    '受注時粗利額',
    '受注時粗利率',
    '実行予算時受注金額',
    '実行予算',
    '実行予算時粗利額',
    '実行予算時粗利率',
    '売上金額',
    '最終予想原価',
    '予想粗利額',
    '予想粗利率',
    '売上実績',
    '原価実績',
    '粗利実績',
    '実績粗利率',
    '作業所評点',
    'サブブランド1',
    'サブブランド2',
    '契約用メールアドレス',
    '郵便番号',
    '都道府県',
    '市区町村',
    '住所1',
    '住所2',
    '電話番号',
    'DR0',
    'DR1',
    'DR2',
    '確認申請実施',
    '消防検査日',
  ];
  function sleep(milliseconds: any) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
  const csvDownload = async () => {
    fetchAllConstructionsData.current = true;
    const completionYearStart = StartYear;
    const completionMonthStart = StartMonth;
    const completionYearEnd = EndYear;
    const completionMonthEnd = EndMonth;

    const today = new Date();
    if (
      construction_name == '' &&
      construction_code == '' &&
      !customer_id &&
      eastwestcheckboxes.length == 0 &&
      typecheckboxes.length == 0 &&
      brandcheckboxes.length == 0 &&
      !completionYearStart &&
      !completionMonthStart &&
      !completionYearEnd &&
      !completionMonthEnd
    ) {
      await getAllConstructionsData(
        construction_code,
        construction_name,
        customer_id,
        brandcheckboxes,
        eastwestcheckboxes,
        typecheckboxes,
        completion_year_month_from,
        completion_year_month_to,
      );
    } else if (
      completionYearStart &&
      completionMonthStart &&
      completionYearEnd &&
      completionMonthEnd
    ) {
      await getAllConstructionsData(
        construction_code,
        construction_name,
        customer_id,
        brandcheckboxes,
        eastwestcheckboxes,
        typecheckboxes,
        dayjs(completionYearStart + '-' + completionMonthStart).format(
          DATE_FORMAT,
        ),
        dayjs(completionYearEnd + '-' + completionMonthEnd).format(DATE_FORMAT),
      );
    } else if (
      (!completionYearStart || !completionMonthStart) &&
      completionYearEnd &&
      completionMonthEnd
    ) {
      await getAllConstructionsData(
        construction_code,
        construction_name,
        customer_id,
        brandcheckboxes,
        eastwestcheckboxes,
        typecheckboxes,
        '',
        dayjs(completionYearEnd + '-' + completionMonthEnd).format(DATE_FORMAT),
      );
    } else if (
      completionYearStart &&
      completionMonthStart &&
      (!completionYearEnd || !completionMonthEnd)
    ) {
      await getAllConstructionsData(
        construction_code,
        construction_name,
        customer_id,
        brandcheckboxes,
        eastwestcheckboxes,
        typecheckboxes,
        dayjs(completionYearStart + '-' + completionMonthStart).format(
          DATE_FORMAT,
        ),
        '',
      );
    } else if (
      (!completionYearStart || !completionMonthStart) &&
      (!completionYearEnd || !completionMonthEnd)
    ) {
      await getAllConstructionsData(
        construction_code,
        construction_name,
        customer_id,
        brandcheckboxes,
        eastwestcheckboxes,
        typecheckboxes,
        '',
        '',
      );
    } else {
      await getAllConstructionsData(
        construction_code,
        construction_name,
        customer_id,
        brandcheckboxes,
        eastwestcheckboxes,
        typecheckboxes,
        dayjs(today.getFullYear() + '-' + today.getMonth()).format(DATE_FORMAT),
        dayjs(today.getFullYear() + '-' + today.getMonth()).format(DATE_FORMAT),
      );
    }
  };

  async function getAllConstructionsData(
    construction_code: string,
    construction_name: string,
    customer_id: number,
    brand_ids: number[],
    east_west_divisions: number[],
    construction_types: number[],
    completion_year_month_from: string,
    completion_year_month_to: string,
  ) {
    if (fetchAllConstructionsData.current) {
      fetchAllConstructionsData.current = false;
      const constructions: constructionList = await AllConstructionListapi(
        construction_code,
        construction_name,
        customer_id,
        brand_ids,
        east_west_divisions,
        construction_types,
        completion_year_month_from,
        completion_year_month_to,
        itemsPerPage,
      );
      const ConstructionData: ConstructionList[] = constructions.results;
      // console.log('For CSV DOwnload', ConstructionData);

      // const downloadList: React.SetStateAction<CsvDownloadType[]> = [];
      const downloadList: React.SetStateAction<any[]> = [];
      downloadList.push(csvHeaders);
      ConstructionData.map((cons: ConstructionList) => {
        downloadList.push([
          cons.construction_code,
          cons.construction_name,
          cons.east_west_division == 0 ? '大阪' : '東京',
          cons.new_repair_division == 0 ? '新築工事' : '営繕工事',
          cons.main_brand.brand_name,
          cons.old_construction_code,
          cons.customer.customer_code,
          cons.customer.company_name,
          cons.customer.branch_department_name,
          cons.customer.representative_name,
          cons.employee_code,
          cons.employee_name,
          // cons.main_brand.brand_icon,
          cons.site_area,
          String(setAreaValue(cons.site_area)),
          cons.building_area,
          String(setAreaValue(cons.building_area)),
          cons.total_floor_area,
          String(setAreaValue(cons.total_floor_area)),
          getStructure([
            cons.structure_s,
            cons.structure_rc,
            cons.structure_src,
            cons.structure_wooden,
          ]),
          cons.ground_floor,
          cons.underground_floor,
          cons.product,
          cons.schedule_construction_start_date,
          cons.schedule_construction_end_date,
          cons.updated_at,
          cons.estimated_date,
          cons.order_date,
          cons.contract_date,
          cons.construction_completion_date,
          statusConstant[cons.status - 1],
          cons.estimated_amount,
          cons.estimated_assumption_cost,
          cons.gross_profit_amount_1,
          cons.gross_profit_rate_1,
          cons.assumption_artificial,
          cons.order_amount,
          cons.order_assumption_cost,
          cons.gross_profit_amount_2,
          cons.gross_profit_rate_2,
          cons.order_amount,
          cons.working_budget,
          cons.gross_profit_amount_3,
          cons.gross_profit_rate_3,
          cons.sales_amount,
          cons.final_expected_cost,
          // expectGrossProfitAmount(cons.sales_amount, cons.final_expected_cost),
          // expectGrossProfitRate(cons.sales_amount, cons.final_expected_cost),
          cons.expected_gross_profit_amount,
          cons.expected_gross_profit_rate,
          cons.sales_amount,
          cons.final_expected_cost,
          cons.gross_profit_amount_4,
          cons.gross_profit_rate_4,
          cons.work_place_score,
          cons.sub_brand1.brand_name,
          cons.sub_brand2.brand_name,
          cons.contract_email_address,
          cons.zipcode,
          cons.prefecture,
          cons.municipality,
          cons.address_1,
          cons.address_2,
          cons.phone_no,
          cons.dr0,
          cons.dr1,
          cons.dr2,
          cons.confirmation_application,
          cons.fire_inspection_date,
        ]);
        // downloadList.push({
        //   工事コード: cons.construction_code,
        //   工事名: cons.construction_name,
        //   東西区分: cons.east_west_division == 0 ? '大阪' : '東京',
        //   工事種別: cons.new_repair_division == 0 ? '新築工事' : '営繕工事',
        //   メインブランド: cons.main_brand.brand_name,
        //   親工事コード: cons.old_construction_code,
        //   得意先コード: cons.customer.customer_code,
        //   得意先名: cons.customer.company_name,
        //   得意先部署名: cons.customer.branch_department_name,
        //   得意先担当者名: cons.customer.representative_name,
        //   所長の社員コード: cons.employee_code,
        //   所長名: cons.employee_name,
        //   ブランドアイコン: cons.main_brand.brand_icon,
        //   敷地面積: cons.site_area,
        //   敷地面積坪表示: String(setAreaValue(cons.site_area)),
        //   建築面積: cons.building_area,
        //   建築面積坪表示: String(setAreaValue(cons.building_area)),
        //   延べ床面積: cons.total_floor_area,
        //   延べ床面積坪表示: String(setAreaValue(cons.total_floor_area)),
        //   構造: getStructure([
        //     cons.structure_s,
        //     cons.structure_rc,
        //     cons.structure_src,
        //     cons.structure_wooden,
        //   ]),
        //   地上階: cons.ground_floor,
        //   地下階: cons.underground_floor,
        //   商材: cons.product,
        //   予定工事開始日: cons.schedule_construction_start_date,
        //   予定工事終了日: cons.schedule_construction_end_date,
        //   更新日: cons.updated_at,
        //   見積日: cons.estimated_date,
        //   受注日: cons.order_date,
        //   契約日: cons.contract_date,
        //   工事完了日: cons.construction_completion_date,
        //   ステータス: statusConstant[cons.status - 1],
        //   見積金額: cons.estimated_amount,
        //   見積時想定原価: cons.estimated_assumption_cost,
        //   見積時粗々利益額: cons.gross_profit_amount_1,
        //   見積時粗々利益率: cons.gross_profit_rate_1,
        //   想定人工: cons.assumption_artificial,
        //   受注金額: cons.order_amount,
        //   受注時想定原価: cons.order_assumption_cost,
        //   受注時粗利額: cons.gross_profit_amount_2,
        //   受注時粗利率: cons.gross_profit_rate_2,
        //   実行予算時受注金額: cons.order_amount,
        //   実行予算: cons.working_budget,
        //   実行予算時粗利額: cons.gross_profit_amount_3,
        //   実行予算時粗利率: cons.gross_profit_rate_3,
        //   売上金額: cons.sales_amount,
        //   最終予想原価: cons.final_expected_cost,
        //   予想粗利額: cons.order_amount - cons.working_budget,
        //   予想粗利率: expectGrossProfitRate(
        //     cons.order_amount,
        //     cons.final_expected_cost,
        //   ),
        //   売上実績: cons.sales_amount,
        //   原価実績: cons.final_expected_cost,
        //   粗利実績: cons.gross_profit_amount_4,
        //   実績粗利率: cons.gross_profit_rate_4,
        //   作業所評点: cons.work_place_score,
        //   サブブランド1: cons.sub_brand1.brand_name,
        //   サブブランド2: cons.sub_brand2.brand_name,
        //   契約用メールアドレス: cons.contract_email_address,
        //   郵便番号: cons.zipcode,
        //   都道府県: cons.prefecture,
        //   市区町村: cons.municipality,
        //   住所1: cons.address_1,
        //   住所2: cons.address_2,
        //   電話番号: cons.phone_no,
        //   DR0: cons.dr0,
        //   DR1: cons.dr1,
        //   DR2: cons.dr2,
        //   確認申請実施: cons.confirmation_application,
        //   消防検査日: cons.fire_inspection_date,
        // });
        // downloadList.push({
        //   工事コード: cons.construction_code,
        //   得意先名: cons.customer.company_name,
        //   工事名: cons.construction_name,
        //   ブランドアイコン: cons.main_brand.brand_icon,
        //   市区町村: cons.municipality,
        //   ステータス: statusConstant[cons.status - 1],
        //   工事種別: cons.new_repair_division,
        //   メインブランド: cons.main_brand.brand_id,
        //   親工事コード: cons.old_construction_code,
        //   得意先コード: cons.customer.customer_code,
        //   得意先部署名: cons.customer.branch_department_name,
        //   得意先担当者名: cons.customer.representative_name,
        //   所長の社員コード: cons.customer.company_name,
        //   所長名: cons.customer.company_name,
        //   敷地面積: cons.site_area,
        // });
      });
      setDownloadConsList(downloadList);
      sleep(500).then(() => {
        ref.current?.click();
      });
    }
  }

  const getStructure = (arr: boolean[]) => {
    const strArr = ['S造', 'RC造', 'SRC造', '木造'];
    let index = 0;
    let structures = null;
    structures = [];
    for (const value of arr) {
      if (value) {
        structures.push(strArr[index]);
      }
      index++;
    }
    return structures.toString();
  };

  const rowClassName = (rowData: any, rowIndex: any) => {
    console.log('rowIndex', rowIndex.rowIndex);
    return rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
  };

  if (!constructionslist || !customerlist || !brandlist)
    return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>工事一覧</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Header title="工事一覧">
        <Button
          className="p-button-success"
          onClick={() => Router.push('/constructions/new')}
          label={'新規登録'}
        />
      </Header>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)} autoComplete="off">
          <div className="contents form">
            <div className="grid">
              <div className="col-8 h-full block pl-3">
                <div className="formgrid grid">
                  <div className={cx('header', 'field col-2 pt-2 mb-0')}>
                    {/* <ContentHeadingInline heading="工事コード" /> */}
                    <div className={cx('heading-text')}>工事コード</div>
                  </div>
                  <div className="field col-10  pt-2 pr-4 mb-0">
                    <InputForm
                      name="construction_code"
                      className="w-15rem"
                      onChange={(e) => setConstructioncode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="formgrid grid">
                  <div
                    className={cx('header', 'field col-2 pt-2 mb-0')}
                    // style={{ borderBottom: '2px solid #FFFFFF' }}
                  >
                    {/* <ContentHeadingInline heading="工事名" /> */}
                    <div className={cx('heading-text')}>工事名</div>
                  </div>
                  <div className="field col-10 pt-2 pr-4 mb-0">
                    <InputForm
                      name="construction_name"
                      // className="w-24rem construction_name"
                      className={cx('search_textbox')}
                      onChange={(e) => setConstructionname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="formgrid grid">
                  <div className={cx('header', 'field col-2 pt-2 mb-0')}>
                    {/* <ContentHeadingInline heading="得意先名" /> */}
                    <div className={cx('heading-text')}>得意先名</div>
                  </div>
                  <div className="field col-10 pt-2 pr-4 mb-0">
                    <DropdownForm
                      name="customer_id"
                      items={customers}
                      // className="w-24rem"
                      className={cx('search_textbox')}
                      onChange={(e: any) => setCustomer(e)}
                      filter={true}
                    />
                  </div>
                </div>
                <div className="formgrid grid">
                  <div className={cx('header', 'field col-2 pt-2 mb-0')}>
                    {/* <ContentHeadingInline heading="ブランド" /> */}
                    <div
                      className={cx('heading-text')}
                      style={{ paddingTop: '17px' }}
                    >
                      ブランド
                    </div>
                  </div>
                  <div className="field col-10 pt-2 mb-0">
                    <div className="flex justify-content-start flex-wrap">
                      {brands.map((data, key) => {
                        return (
                          <div
                            key={key}
                            className="flex field align-items-center justify-content-center mr-3"
                          >
                            <Checkbox
                              inputId={data.id}
                              name={data.label}
                              value={data.value}
                              onChange={(e) => {
                                onSelectCheckboxesForBrand(e);
                              }}
                              checked={brandcheckboxes.some(
                                (checkbox) => checkbox === data.value,
                              )}
                            />
                            <label htmlFor={data.id} className="ml-2 mt-1">
                              {data.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="formgrid grid">
                  <div className={cx('header', 'field col-2 pt-2 mb-0')}>
                    {/* <ContentHeadingInline heading="東西区分" /> */}
                    <div className={cx('heading-text')}>東西区分</div>
                  </div>
                  <div className="field col-10 pt-2 pr-4 mb-0">
                    <div className="flex justify-content-start flex-wrap">
                      {EastWestDivision.map((data, key) => {
                        return (
                          <div
                            key={key}
                            className="flex align-items-center justify-content-center mr-3"
                          >
                            <Checkbox
                              inputId={data.id}
                              name={data.label}
                              value={data.value}
                              onChange={(e) => {
                                onSelectCheckboxesForEastWest(e);
                              }}
                              checked={eastwestcheckboxes.some(
                                (checkbox) => checkbox === data.value,
                              )}
                            />
                            <label htmlFor={data.id} className="ml-2">
                              {data.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="formgrid grid">
                  <div className={cx('header', 'field col-2 pt-2 mb-0')}>
                    {/* <ContentHeadingInline heading="新築／営繕" /> */}
                    <div className={cx('heading-text')}>区分</div>
                  </div>
                  <div className="field col-10 pt-2 pr-4 mb-0">
                    <div className="flex justify-content-start flex-wrap">
                      {constructiontype.map((data, key) => {
                        return (
                          <div
                            key={key}
                            className="flex align-items-center justify-content-center mr-3"
                          >
                            <Checkbox
                              inputId={data.id}
                              name={data.label}
                              value={data.value}
                              onChange={(e) => {
                                onSelectCheckboxesForType(e);
                              }}
                              checked={typecheckboxes.some(
                                (checkbox) => checkbox === data.value,
                              )}
                            />
                            <label htmlFor={data.id} className="ml-2">
                              {data.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="formgrid grid">
                  <div className={cx('header', 'field col-2 pt-2 mb-0 h-8')}>
                    {/* <ContentHeadingInline heading="完了日" /> */}
                    <div className={cx('heading-text')}>完了日</div>
                  </div>
                  <div className="field col-10 pt-2 pr-4 mb-0">
                    <div className="flex flex-row">
                      <div className="text-left pulldown-w-year mr-2">
                        <DropdownForm
                          name="completionYearStart"
                          // defaultValue={selectStartMonth ? '2022': ''}
                          items={yearOptions}
                          className="w-full"
                          onChange={(e: any) => setStartYear(e)}
                        />
                      </div>
                      <div className="text-left pulldown-w-month mr-2">
                        <DropdownForm
                          name="completionMonthStart"
                          // defaultValue={selectStartYear? '01': ""}
                          items={month}
                          className="w-full"
                          onChange={(e: any) => setStartMonth(e)}
                        />
                      </div>
                      <div className="field mr-2 mt-1">
                        <ContentHeadingInline heading="〜" />
                      </div>
                      <div className="text-left pulldown-w-year mr-2">
                        <DropdownForm
                          name="completionYearEnd"
                          // defaultValue={selectEndYear ? '2022': ''}
                          items={yearOptions}
                          className="w-full"
                          onChange={(e: any) => setEndYear(e)}
                        />
                      </div>
                      <div className="text-left pulldown-w-month">
                        <DropdownForm
                          name="completionMonthEnd"
                          // defaultValue={selectEndMonth ? '01': ''}
                          items={month}
                          className="w-full"
                          onChange={(e: any) => setEndMonth(e)}
                        />
                      </div>
                      <div>
                        <Button
                          className="p-button-success ml-2"
                          label={'検索'}
                          type="submit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="grid">
              <div className="flex align-items-center justify-content-center col-12 h-full block">
                <Button
                  className="p-button-success"
                  label={'検索'}
                  type="submit"
                />
              </div>
            </div> */}
            <div className="grid">
              <div className="col-8 h-full block"></div>
              <div className="flex flex-row-reverse col-4 h-full block">
                <Button
                  className="p-button-success download-icon"
                  icon={<GetAppIcon className="mr-1"></GetAppIcon>}
                  label={'工事一覧CSVダウンロード'}
                  type="button"
                  onClick={async () => await csvDownload()}
                />
                <CSVDownloader
                  type={Type.Link}
                  filename={'工事一覧'}
                  bom={true}
                  data={downloadConsList}
                >
                  <span ref={ref}></span>
                </CSVDownloader>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
      <DataTable
        value={activeConstructionItems}
        emptyMessage=" "
        // paginator
        // paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        // currentPageReportTemplate="{totalRecords} 件中 {first} ~ {last} 件目"
        // rows={10}
        // rowsPerPageOptions={[30, 40, 50]}
        // responsiveLayout="scroll"
        // paginatorTemplate={template1}
        // totalRecords= {meta.total_count}
        // rowClassName={rowClassName}
        // className={styles['table-item']}
        className="construction-table"
      >
        <Column
          field="code"
          header="工事コード"
          // style={{ width: '16%' }}
          body={code_linkTemplate}
          alignHeader="center"
        ></Column>
        <Column
          header="得意先名"
          style={{ width: '22%' }}
          body={customer_linkTemplate}
          alignHeader="center"
        ></Column>
        <Column
          field="name"
          header="工事名"
          style={{ width: '22%' }}
          body={name_linkTemplate}
          alignHeader="center"
        ></Column>
        <Column
          header="ブランドアイコン"
          // style={{ width: '16%' }}
          body={iconTemplate}
          alignHeader="center"
          align="center"
        ></Column>
        <Column
          field="representative_name2"
          header="市区町村"
          style={{ width: '22%' }}
          body={municipalTemplate}
          alignHeader="center"
        ></Column>
        <Column
          field="status"
          header="ステータス"
          style={{ width: '8%' }}
          body={status}
          alignHeader="center"
        ></Column>
        <Column
          field="copy"
          header=""
          style={{ textAlign: 'center' }}
          body={copyBtn}
          alignHeader="center"
        ></Column>
      </DataTable>
      <div className="contents form">
        {constructions?.length > 0 && (
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
    </>
  );
};
export default SearchPage;

SearchPage.auth = true;
SearchPage.pageId = 'EU_CONSTRUCTION';
