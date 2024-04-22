// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CostManageTotalAmountType } from '@/components/constructions/costManage/costManageTotalAmount'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CostManageTotalAmountType>
) {
  const costManageTotalAmount = {
    SettlementEstimate: [
      {
        label: '提出見積',
        price: '21,065,000'
      }
    ],
    SettlementEstimatedCost: [
      {
        label: '想定原価',
        price: '21,065,000'
      },
      {
        label: '粗利率',
        price: '16.93%'
      }
    ],
    WorkingBudget: [
      {
        label: '実行予算',
        price: '21,065,000'
      },
      {
        label: '粗利率',
        price: '16.93%'
      }
    ],
    OrderAmount: [
      {
        label: '発注額',
        price: '21,065,000'
      },
      {
        label: '粗利率',
        price: '16.93%'
      }
    ],
    Assessed: [
      {
        label: '発注額',
        price: '21,065,000'
      },
      {
        label: '出来高',
        price: '60.41%'
      }
    ],
    TotalEstimatedAmount: [
      {
        label: '査定+残予算+以降支払い',
        price: '21,065,000'
      },
      {
        label: '粗利率',
        price: '16.93%'
      }
    ]
  }
  res.status(200).json(costManageTotalAmount)
}