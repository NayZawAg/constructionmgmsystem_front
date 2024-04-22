// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint @typescript-eslint/no-unused-vars: 0 */
import type { NextApiRequest, NextApiResponse } from 'next'
import { Organization } from '@/interfaces/organization'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Organization[]>
) {
  const { type } = req.query
  const organization = [
    {
      id: 1,
      name:'費用負担部署１',
    },
    {
      id: 2,
      name:'費用負担部署２',
    },
    {
      id: 3,
      name:'費用負担部署３',
    },
    {
      id: 4,
      name:'費用負担部署４',
    },
    {
      id: 5,
      name:'費用負担部署５',
    },
    {
      id: 6,
      name:'費用負担部署６',
    },
  ]
  res.status(200).json(organization)
}
