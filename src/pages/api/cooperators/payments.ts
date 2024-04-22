// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export interface CooperatorsPaymentsItemType {
  year: string;
  month: string;
  isChecked: boolean;
  constructions: {
    construction_name: string;
    construction_code: string;
    subtotal: string;
    tax: {
      consumption_name: string;
      amount: number;
    }[];
    data: {
      name: string;
      middle_category: string;
      amount: number;
    }[];
  }[];
}
[];

export const CooperatorsPaymentsItem = [
  {
    year: '2022',
    month: '04',
    isChecked: false,
    tax: [
      {
        consumption_name: '消費税',
        amount: 20000,
      },
      {
        consumption_name: '協力会費',
        amount: 4000,
      },
      {
        consumption_name: '振込手数料',
        amount: 800,
      },
    ],
    constructions: [
      {
        construction_name: 'AAAAA工事0',
        construction_code: '20230200001',
        subtotal: '200000',
        tax: [
          {
            consumption_name: '消費税',
            amount: 20000,
          },
          {
            consumption_name: '協力会費',
            amount: 4000,
          },
          {
            consumption_name: '振込手数料',
            amount: 800,
          },
        ],
        data: [
          {
            name: '注文番号1',
            middle_category: '保留金',
            amount: 206800,
          },
          {
            name: '注文番号2',
            middle_category: '保留金',
            amount: 4360000,
          },
          // {
          //   name: '基複コンクリート',
          //   quantity: 118.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 2430800,
          //   isChecked: false,
          //   isCheckedItem: false,
          // },
          // {
          //   name: '1段位よりコンクリート',
          //   quantity: 15.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 309000,
          //   isChecked: false,
          //   isCheckedItem: false,
          // },
          // {
          //   name: '根底コンクリート',
          //   quantity: 4.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 82400,
          //   isChecked: false,
          //   isCheckedItem: false,
          // },
          // {
          //   name: '通しモルタル',
          //   quantity: 2.0,
          //   unitCost: 'm3',
          //   unitPrice: 26500,
          //   amount: 53000,
          //   isChecked: false,
          //   isCheckedItem: false,
          // },
          // {
          //   name: 'ポンプ車損料',
          //   quantity: 5.0,
          //   unitCost: '回',
          //   unitPrice: 90000,
          //   amount: 450000,
          //   isChecked: false,
          //   isCheckedItem: false,
          // },
          // {
          //   name: 'ポンプ返し費',
          //   quantity: 5.0,
          //   unitCost: 'm3',
          //   unitPrice: 10000,
          //   amount: 50000,
          //   isChecked: false,
          //   isCheckedItem: false,
          // },
          // {
          //   name: '圧送料',
          //   quantity: 366.0,
          //   unitCost: 'm3',
          //   unitPrice: 800,
          //   amount: 2928000,
          //   isChecked: false,
          //   isCheckedItem: false,
          // },
        ],
      },
    ],
  },
  {
    year: '2022',
    month: '03',
    isChecked: false,
    tax: [
      {
        consumption_name: '消費税',
        amount: 20000,
      },
      {
        consumption_name: '協力会費',
        amount: 4000,
      },
      {
        consumption_name: '振込手数料',
        amount: 800,
      },
    ],
    constructions: [
      {
        construction_name: 'AAAAA工事1',
        construction_code: '20230200002',
        subtotal: '200000',
        tax: [
          {
            consumption_name: '消費税',
            amount: 20000,
          },
          {
            consumption_name: '協力会費',
            amount: 4000,
          },
          {
            consumption_name: '振込手数料',
            amount: 800,
          },
        ],
        data: [
          {
            name: '注文番号1',
            middle_category: '中項目名00001',
            amount: 206800,
          },
          {
            name: '注文番号2',
            middle_category: '中項目名00002',
            amount: 4360000,
          },
          // {
          //   name: '基複コンクリート',
          //   quantity: 118.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 2430800,
          //   isChecked: false,
          //   isCheckedItem: false,
          // },
          // {
          //   name: '1段位よりコンクリート',
          //   quantity: 15.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 309000,
          //   isChecked: false,
          //   isCheckedItem: false,
          // },
          // {
          //   name: '根底コンクリート',
          //   quantity: 4.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 82400,
          //   isChecked: false,
          //   isCheckedItem: false,
          // },
          // {
          //   name: '通しモルタル',
          //   quantity: 2.0,
          //   unitCost: 'm3',
          //   unitPrice: 26500,
          //   amount: 53000,
          //   isChecked: false,
          //   isCheckedItem: false,
          // },
          // {
          //   name: 'ポンプ車損料',
          //   quantity: 5.0,
          //   unitCost: '回',
          //   unitPrice: 90000,
          //   amount: 450000,
          //   isChecked: false,
          //   isCheckedItem: false,
          // },
          // {
          //   name: 'ポンプ返し費',
          //   quantity: 5.0,
          //   unitCost: 'm3',
          //   unitPrice: 10000,
          //   amount: 50000,
          //   isChecked: false,
          //   isCheckedItem: false,
          // },
          // {
          //   name: '圧送料',
          //   quantity: 366.0,
          //   unitCost: 'm3',
          //   unitPrice: 800,
          //   amount: 2928000,
          //   isChecked: false,
          //   isCheckedItem: false,
          // },
        ],
      },
    ],
  },
  {
    year: '2022',
    month: '02',
    isChecked: false,
    tax: [
      {
        consumption_name: '消費税',
        amount: 20000,
      },
      {
        consumption_name: '協力会費',
        amount: 4000,
      },
      {
        consumption_name: '振込手数料',
        amount: 800,
      },
    ],
    constructions: [
      {
        construction_name: 'AAAAA工事3',
        construction_code: '20230200003',
        subtotal: '200000',
        tax: [
          {
            consumption_name: '消費税',
            amount: 20000,
          },
          {
            consumption_name: '協力会費',
            amount: 4000,
          },
          {
            consumption_name: '振込手数料',
            amount: 800,
          },
        ],
        data: [
          {
            name: '注文番号1',
            middle_category: '中項目名00001',
            amount: 206800,
          },
          {
            name: '注文番号2',
            middle_category: '中項目名00002',
            amount: 4360000,
          },
          // {
          //   name: '基複コンクリート',
          //   quantity: 118.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 2430800,
          //   isChecked: false,
          // },
          // {
          //   name: '1段位よりコンクリート',
          //   quantity: 15.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 309000,
          //   isChecked: false,
          // },
          // {
          //   name: '根底コンクリート',
          //   quantity: 4.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 82400,
          //   isChecked: false,
          // },
          // {
          //   name: '通しモルタル',
          //   quantity: 2.0,
          //   unitCost: 'm3',
          //   unitPrice: 26500,
          //   amount: 53000,
          //   isChecked: false,
          // },
          // {
          //   name: 'ポンプ車損料',
          //   quantity: 5.0,
          //   unitCost: '回',
          //   unitPrice: 90000,
          //   amount: 450000,
          //   isChecked: false,
          // },
          // {
          //   name: 'ポンプ返し費',
          //   quantity: 5.0,
          //   unitCost: 'm3',
          //   unitPrice: 10000,
          //   amount: 50000,
          //   isChecked: false,
          // },
          // {
          //   name: '圧送料',
          //   quantity: 366.0,
          //   unitCost: 'm3',
          //   unitPrice: 800,
          //   amount: 2928000,
          //   isChecked: false,
          // },
          // {
          //   name: '捨コンクリート',
          //   quantity: 11.0,
          //   unitCost: 'm3',
          //   unitPrice: 188000,
          //   amount: 206800,
          //   isChecked: false,
          // },
          // {
          //   name: '土間コンクリート',
          //   quantity: 218.0,
          //   unitCost: 'm3',
          //   unitPrice: 20000,
          //   amount: 4360000,
          //   isChecked: false,
          // },
          // {
          //   name: '基複コンクリート',
          //   quantity: 118.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 2430800,
          //   isChecked: false,
          // },
          // {
          //   name: '1段位よりコンクリート',
          //   quantity: 15.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 309000,
          //   isChecked: false,
          // },
          // {
          //   name: '根底コンクリート',
          //   quantity: 4.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 82400,
          //   isChecked: false,
          // },
          // {
          //   name: '通しモルタル',
          //   quantity: 2.0,
          //   unitCost: 'm3',
          //   unitPrice: 26500,
          //   amount: 53000,
          //   isChecked: false,
          // },
          // {
          //   name: 'ポンプ車損料',
          //   quantity: 5.0,
          //   unitCost: '回',
          //   unitPrice: 90000,
          //   amount: 450000,
          //   isChecked: false,
          // },
          // {
          //   name: 'ポンプ返し費',
          //   quantity: 5.0,
          //   unitCost: 'm3',
          //   unitPrice: 10000,
          //   amount: 50000,
          //   isChecked: false,
          // },
          // {
          //   name: '圧送料',
          //   quantity: 366.0,
          //   unitCost: 'm3',
          //   unitPrice: 800,
          //   amount: 2928000,
          //   isChecked: false,
          // },
        ],
      },
    ],
  },
  {
    year: '2022',
    month: '01',
    isChecked: false,
    tax: [
      {
        consumption_name: '消費税',
        amount: 20000,
      },
      {
        consumption_name: '協力会費',
        amount: 4000,
      },
      {
        consumption_name: '振込手数料',
        amount: 800,
      },
    ],
    constructions: [
      {
        construction_name: 'AAAAA工事4',
        construction_code: '20230200004',
        subtotal: '200000',
        tax: [
          {
            consumption_name: '消費税',
            amount: 20000,
          },
          {
            consumption_name: '協力会費',
            amount: 4000,
          },
          {
            consumption_name: '振込手数料',
            amount: 800,
          },
        ],
        data: [
          {
            name: '注文番号1',
            middle_category: '中項目名00001',
            amount: 206800,
          },
          {
            name: '注文番号2',
            middle_category: '中項目名00002',
            amount: 4360000,
          },
          {
            name: '注文番号3',
            middle_category: '中項目名00003',
            amount: 2430800,
          },
          // {
          //   name: '1段位よりコンクリート',
          //   quantity: 15.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 309000,
          //   isChecked: false,
          // },
          // {
          //   name: '根底コンクリート',
          //   quantity: 4.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 82400,
          //   isChecked: false,
          // },
          // {
          //   name: '通しモルタル',
          //   quantity: 2.0,
          //   unitCost: 'm3',
          //   unitPrice: 26500,
          //   amount: 53000,
          //   isChecked: false,
          // },
          // {
          //   name: 'ポンプ車損料',
          //   quantity: 5.0,
          //   unitCost: '回',
          //   unitPrice: 90000,
          //   amount: 450000,
          //   isChecked: false,
          // },
          // {
          //   name: 'ポンプ返し費',
          //   quantity: 5.0,
          //   unitCost: 'm3',
          //   unitPrice: 10000,
          //   amount: 50000,
          //   isChecked: false,
          // },
          // {
          //   name: '圧送料',
          //   quantity: 366.0,
          //   unitCost: 'm3',
          //   unitPrice: 800,
          //   amount: 2928000,
          //   isChecked: false,
          // },
          // {
          //   name: '捨コンクリート',
          //   quantity: 11.0,
          //   unitCost: 'm3',
          //   unitPrice: 188000,
          //   amount: 206800,
          //   isChecked: false,
          // },
          // {
          //   name: '土間コンクリート',
          //   quantity: 218.0,
          //   unitCost: 'm3',
          //   unitPrice: 20000,
          //   amount: 4360000,
          //   isChecked: false,
          // },
          // {
          //   name: '基複コンクリート',
          //   quantity: 118.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 2430800,
          //   isChecked: false,
          // },
          // {
          //   name: '1段位よりコンクリート',
          //   quantity: 15.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 309000,
          //   isChecked: false,
          // },
          // {
          //   name: '根底コンクリート',
          //   quantity: 4.0,
          //   unitCost: 'm3',
          //   unitPrice: 20600,
          //   amount: 82400,
          //   isChecked: false,
          // },
          // {
          //   name: '通しモルタル',
          //   quantity: 2.0,
          //   unitCost: 'm3',
          //   unitPrice: 26500,
          //   amount: 53000,
          //   isChecked: false,
          // },
          // {
          //   name: 'ポンプ車損料',
          //   quantity: 5.0,
          //   unitCost: '回',
          //   unitPrice: 90000,
          //   amount: 450000,
          //   isChecked: false,
          // },
          // {
          //   name: 'ポンプ返し費',
          //   quantity: 5.0,
          //   unitCost: 'm3',
          //   unitPrice: 10000,
          //   amount: 50000,
          //   isChecked: false,
          // },
          // {
          //   name: '圧送料',
          //   quantity: 366.0,
          //   unitCost: 'm3',
          //   unitPrice: 800,
          //   amount: 2928000,
          //   isChecked: false,
          // },
        ],
      },
      {
        construction_name: 'AAAAA工事5',
        construction_code: '20230200005',
        subtotal: '200000',
        tax: [
          {
            consumption_name: '消費税',
            amount: 20000,
          },
          {
            consumption_name: '協力会費',
            amount: 4000,
          },
          {
            consumption_name: '振込手数料',
            amount: 800,
          },
        ],
        data: [
          {
            name: '注文番号1',
            middle_category: '中項目名00001',
            amount: 20680,
          },
          {
            name: '注文番号2',
            middle_category: '中項目名00002',
            amount: 43600,
          },
        ],
      },
    ],
  },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   year: '2022',
  //   month: '04',
  //   isChecked: false,
  //   tax: [
  //     {
  //       consumption_name: '消費税',
  //       amount: 20000,
  //     },
  //     {
  //       consumption_name: '協力会費',
  //       amount: 4000,
  //     },
  //     {
  //       consumption_name: '振込手数料',
  //       amount: 800,
  //     },
  //   ],
  //   constructions: [
  //     {
  //       construction_name: 'AAAAA工事0',
  //       construction_code: '20230200001',
  //       subtotal: '200000',
  //       tax: [
  //         {
  //           consumption_name: '消費税',
  //           amount: 20000,
  //         },
  //         {
  //           consumption_name: '協力会費',
  //           amount: 4000,
  //         },
  //         {
  //           consumption_name: '振込手数料',
  //           amount: 800,
  //         },
  //       ],
  //       data: [
  //         {
  //           name: '注文番号1',
  //           middle_category: '保留金',
  //           amount: 206800,
  //         },
  //         {
  //           name: '注文番号2',
  //           middle_category: '保留金',
  //           amount: 4360000,
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CooperatorsPaymentsItemType[]>,
) {
  res.status(200).json(CooperatorsPaymentsItem);
}
