import type { NextApiRequest, NextApiResponse } from 'next'
import { Supplier } from '@/interfaces/supplier'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Supplier[]>
) {
  const supplierData = [
    {
      id: 1,
      name: "〇〇株式会社１",
      image: "",
      email: ""
    },
    {
      id: 1,
      name: "〇〇株式会社１",
      image: "",
      email: ""
    },
    {
      id: 1,
      name: "〇〇株式会社１",
      image: "",
      email: ""
    },
    {
      id: 1,
      name: "〇〇株式会社１",
      image: "",
      email: ""
    },
    {
      id: 1,
      name: "〇〇株式会社１",
      image: "",
      email: ""
    }
  ]
  res.status(200).json(supplierData)
}
