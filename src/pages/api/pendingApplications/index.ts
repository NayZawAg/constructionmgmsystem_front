// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PendingApplication } from '@/interfaces/pendingApplication'

export const PENDING_LIST = [
  {
    id: 1,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 2,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 3,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 4,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 5,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 6,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 7,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 8,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 9,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 10,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 11,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 12,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 13,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 14,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 15,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 16,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 17,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 18,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 19,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 20,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 21,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 22,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 23,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 24,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 25,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 26,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 27,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 28,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 29,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 30,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 31,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 32,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 33,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 34,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 35,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 36,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 37,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 38,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 39,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 40,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 41,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 42,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 43,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 44,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 45,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 46,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 47,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 48,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 49,
    applicationDate: '2022-02-22',
    status: '承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
  {
    id: 50,
    applicationDate: '2022-02-22',
    status: '協力会社承認待ち',
    classification: '査定',
    constructionNameCode: 'XXXXXXX_XXX0000001',
    cooperationCompany: '〇〇株式会社',
    amount: 4350356,
    middleItem: 'XXXXXXX',
    budgetAmount: 4387500
  },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PendingApplication[]>
) {
  res.status(200).json(PENDING_LIST)
}
