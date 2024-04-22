// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint @typescript-eslint/no-unused-vars: 0 */
import type { NextApiRequest, NextApiResponse } from 'next'
import { Brand } from '@/interfaces'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Brand[]>
) {
  const { type } = req.query
  const brandManager = [
    {
      id: 1,
      brand_name:'ブランド１',
      brand_icon: ''
    },
    {
      id: 2,
      brand_name:'ブランド２',
      brand_icon: ''
    },
    {
      id: 3,
      brand_name:'ブランド３',
      brand_icon: ''
    },
  ]
  res.status(200).json(brandManager)
}
