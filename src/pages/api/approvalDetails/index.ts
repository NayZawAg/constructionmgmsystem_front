// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApprovalDetails } from '@/interfaces/approvalDetails'

export const APPROVALDETAILS_LIST = [
  {
    id: 1,
    applicationDate: '2022年01月31日',
    applicationNo:  12345678,
    subject: '稟議件名',
    requestDecisionName: 'ブランド指定',
    constructionName:'工事名称',
    constructionCode:'120000321',
    brand: {
      id: 1,
      brand_name: "ブランド１",
      brand_icon: "https://robohash.org/XM0.png?set=set1",
    },
    expenseCharge: '費用負担部署',
    amount: 123456,
    returnReason:'あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ',
    firstApprovalUser:'第1承認者',
    firstApprovalStatus:'承認済',
    secondApprovalUser:'第2承認者',
    secondApprovalStatus:'',
    thirdApprovalUser:'第3承認者',
    thirdApprovalStatus:'',
    comment:'あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ'
  },

  {
    id: 2,
    applicationDate: '2022年01月31日',
    applicationNo:  12345678,
    subject: '稟議件名',
    requestDecisionName: 'ブランド指定',
    constructionName:'工事名称',
    constructionCode:'120000321',
    brand: {
      id: 1,
      brand_name: "ブランド１",
      brand_icon: "https://robohash.org/XM0.png?set=set1",
    },
    expenseCharge: '費用負担部署',
    amount: 123456,
    returnReason:'あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ',
    firstApprovalUser:'第1承認者',
    firstApprovalStatus:'承認済',
    secondApprovalUser:'第2承認者',
    secondApprovalStatus:'',
    thirdApprovalUser:'第3承認者',
    thirdApprovalStatus:'',
    comment:'あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ'
  },
  {
    id: 3,
    applicationDate: '2022年01月31日',
    applicationNo:  12345678,
    subject: '稟議件名',
    requestDecisionName: 'ブランド指定',
    constructionName:'工事名称',
    constructionCode:'120000321',
    brand: {
      id: 1,
      brand_name: "ブランド１",
      brand_icon: "https://robohash.org/XM0.png?set=set1",
    },
    expenseCharge: '費用負担部署',
    amount: 123456,
    returnReason:'あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ',
    firstApprovalUser:'第1承認者',
    firstApprovalStatus:'承認済',
    secondApprovalUser:'第2承認者',
    secondApprovalStatus:'',
    thirdApprovalUser:'第3承認者',
    thirdApprovalStatus:'',
    comment:'あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ'
  },
  
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApprovalDetails[]>
) {
  res.status(200).json(APPROVALDETAILS_LIST)
}
