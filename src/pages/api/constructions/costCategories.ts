// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export interface CostCategoriesType {
  id:number;
  large_categories:{
    label: string;
    value: number;
    checked: boolean;
  }[];
  middle_categories: {
    label: string;
    value: number;
    checked: boolean;
  }[];
}[]
  
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CostCategoriesType[]>
) {
  const costCategories = [
    {
      id: 1,
      large_categories :[{
        label: "共通仮設工事",
        value: 1,
        checked: true,
      }],
      middle_categories: [{
        label: "仮設建物",
        value: 11,
        checked: false,
      },
      {
        label: "仮囲・進入路仮設",
        value: 12,
        checked: true,
      },
      {
        label: "機械器具",
        value: 13,
        checked: false,
      },
      {
        label: "電気・給排水設備",
        value: 14,
        checked: true,
      },
      {
        label: "警備費",
        value: 15,
        checked: false,
      },
      {
        label: "調査試験費",
        value: 16,
        checked: false,
      },
      ]
    },{
      id: 2,
      large_categories :[{
        label: "直接仮設工事",
        value: 2,
        checked: false,
      }],
      middle_categories: [{
        label: "足場安全",
        value: 21,
        checked: false,
      },
      {
        label: "養生・クリーニング",
        value: 22,
        checked: false,
      },
      {
        label: "掃除・片付",
        value: 23,
        checked: false,
      },
      {
        label: "雑仮設",
        value: 24,
        checked: false,
      },
      {
        label: "運搬費",
        value: 25,
        checked: false,
      },
      ]
    },{
      id: 3,
      large_categories :[{
        label: "土工事",
        value: 3,
        checked: false,
      }],
      middle_categories: [{
        label: "土工事",
        value: 31,
        checked: false,
      },
      {
        label: "山留工事",
        value: 32,
        checked: false,
      },
      {
        label: "表層改良工事",
        value: 33,
        checked: false,
      },
      ]
    },{
      id: 4,
      large_categories :[{
        label: "杭工事",
        value: 4,
        checked: true,
      }],
      middle_categories: [{
        label: "杭工事",
        value: 41,
        checked: false,
      },
      {
        label: "残土処分費",
        value: 42,
        checked: false,
      },      
      ]
    },{
      id: 5,
      large_categories :[{
        label: "コンクリート工事",
        value: 5,
        checked: false,
      }],
      middle_categories: [{
        label: "生コンクリート",
        value: 51,
        checked: true,
      },
      {
        label: "生コン打設手間",
        value: 52,
        checked: true,
      },
      ]
    },{
      id: 6,
      large_categories :[{
        label: "型枠工事",
        value: 6,
        checked: false,
      }],
      middle_categories: [{
        label: "型枠工事",
        value: 61,
        checked: false,
      },
      {
        label: "ボイドスラブ工事",
        value: 62,
        checked: false,
      },
      ]
    },{
      id: 7,
      large_categories :[{
        label: "鉄筋工事",
        value: 7,
        checked: false,
      }],
      middle_categories: [{
        label: "材料",
        value: 71,
        checked: false,
      },
      {
        label: "加工組立手間",
        value: 72,
        checked: false,
      },
      ]
    }
  ]
  res.status(200).json(costCategories)
}