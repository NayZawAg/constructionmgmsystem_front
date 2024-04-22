// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PersonalManageType } from '@/components/constructions/personalManageList'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PersonalManageType[]>
) {
  const personalManageData = [
    {
      id: 1,
      label: "価値創造シート",
      url: "/dashboard",
      target: "_blank",
      disabled: false,
    },{
      id: 2,
      label: "buildee",
      url: "/dashboard",
      target: "_blank",
      disabled: false,
    },{
      id: 3,
      label: "SpiderPlus",
      url: "/dashboard",
      target: "_blank",
      disabled: false,
    },{
      id: 4,
      label: "工程表",
      url: "/dashboard",
      target: "_blank",
      disabled: false,
    },{
      id: 5,
      label: "写真管理",
      url: "/dashboard",
      target: "_blank",
      disabled: false,
    },{
      id: 6,
      label: "PlaceOn",
      url: "/dashboard",
      target: "_blank",
      disabled: false,
    },{
      id: 7,
      label: "追加増減",
      url: "/dashboard",
      target: "_self",
      disabled: false,
    },{
      id: 8,
      label: "作業所フォルダ",
      url: "/dashboard",
      target: "_blank",
      disabled: false,
    },{
      id: 9,
      label: "設計図",
      url: "/dashboard",
      target: "_blank",
      disabled: false,
    },{
      id: 10,
      label: "施工図",
      url: "/dashboard",
      target: "_blank",
      disabled: false,
    },{
      id: 11,
      label: "契約図面",
      url: "/dashboard",
      target: "_blank",
      disabled: false,
    },{
      id: 12,
      label: "請求書発行",
      url: "/dashboard",
      target: "_self",
      disabled: false,
    },{
      id: 13,
      label: "iNDEX",
      url: "/dashboard",
      target: "_blank",
      disabled: false,
    },{
      id: 14,
      label: "協力会社一覧",
      url: "/dashboard",
      target: "_self",
      disabled: false,
    },{
      id: 15,
      label: "経費精算",
      url: "/dashboard",
      target: "_self",
      disabled: false,
    },{
      id: 16,
      label: "契約書",
      url: "/dashboard",
      target: "_blank",
      disabled: false,
    },{
      id: 17,
      label: "協力会社見積書",
      url: "/dashboard",
      target: "_blank",
      disabled: false,
    },{
      id: 18,
      label: "施主連絡先",
      url: "/dashboard",
      target: "_self",
      disabled: true,
    },{
      id: 19,
      label: "セーフィー",
      url: "/dashboard",
      target: "_blank",
      disabled: false,
    }
  ]
  res.status(200).json(personalManageData)
}
