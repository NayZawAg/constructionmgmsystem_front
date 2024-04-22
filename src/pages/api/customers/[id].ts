// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { CUSTOMER_LIST } from '.';
import { Customer } from '@/interfaces/customer';
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Customer>,
) {
  const { id } = req.query;
  const customerDetailsData = CUSTOMER_LIST[Number(id) - 1];
  res.status(200).json(customerDetailsData);
}
