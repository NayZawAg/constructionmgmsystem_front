// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { CooperatorsCompanyListItemType, CooperatorsCompanyList } from '.';
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CooperatorsCompanyListItemType>,
) {
  const { id } = req.query;
  const cooperatorCompanyDetailsData = CooperatorsCompanyList[Number(id) - 1];
  res.status(200).json(cooperatorCompanyDetailsData);
}
