// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint @typescript-eslint/no-unused-vars: 0 */
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApprovalData } from '@/interfaces/approvalData'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApprovalData[]>
) {
  const { type } = req.query
  const approvalData = [
    {
      id: 1,
      name:'工事指定（GLなし）',
    },
    {
      id: 2,
      name:'工事指定（GLあり）',
    },
    {
      id: 3,
      name:'ブランド指定',
    },
    {
      id: 4,
      name:'ブランド指定（金額あり）',
    },
    {
      id: 5,
      name:'金額あり',
    },
    {
      id: 6,
      name:'金額なし',
    },
  ]
  res.status(200).json(approvalData)
}
