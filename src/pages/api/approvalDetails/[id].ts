// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { APPROVALDETAILS_LIST } from '.'
import { ApprovalDetails } from '@/interfaces/approvalDetails'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApprovalDetails>
) {
  const { id } = req.query
  const approvalDetailsData = APPROVALDETAILS_LIST[Number(id) - 1]
  res.status(200).json(approvalDetailsData)
}
