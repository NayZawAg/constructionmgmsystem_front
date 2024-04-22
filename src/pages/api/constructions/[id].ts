// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CONSTRUCTION_LIST } from '.'
import { TypeConstruction } from '@/interfaces'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TypeConstruction>
) {
  const { id } = req.query
  const constructionData = CONSTRUCTION_LIST[Number(id) - 1]
  res.status(200).json(constructionData)
}
