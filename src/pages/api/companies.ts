// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ConstructionInfoType } from '@/components/constructions/constructionInfo'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConstructionInfoType[]>
) {
  const consCompanyData = [
    {
      id: 1,
      name: "AAAA",
      branch: "横浜",
      prefecture: "神奈川",
      city: "横浜",
      town: "豊岡",
      phoneno: "080-1111-2222",
      description: "ああああああああああああああああああああああああああああああああああああああああああああああああああああああああ"
    },
    {
      id: 2,
      name: "AAAA",
      branch: "横浜",
      prefecture: "神奈川",
      city: "横浜",
      town: "豊岡",
      phoneno: "080-1111-2222",
      description: "あああああああああああああああああああああああああああああ"
    },
    {
      id: 3,
      name: "AAAA",
      branch: "横浜",
      prefecture: "神奈川",
      city: "横浜",
      town: "豊岡",
      phoneno: "080-1111-2222",
      description: "あああああああああああああああああああああああああああああ"
    },
  ]
  res.status(200).json(consCompanyData)
}