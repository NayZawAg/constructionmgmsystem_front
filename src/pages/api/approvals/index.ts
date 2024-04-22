// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Approval } from '@/interfaces/approval'

export const APPROVAL_LIST = [
  {
    id: 1,
    status: '承認待ち',
    application_date: 'YYYY/MM/DD',
    classification: '経費精算',
    application_no: 9999,
    payday: 'YYYY/MM/DD',
    applicant: 'テキスト',
    title: 'テキスト',
    account_subject_1: 'テキスト',
    purchase_transportation: 'テキスト',
    amount: 9999,
    expense_charge: '費用負担部署'
  },
  {
    id: 2,
    status: '承認待ち',
    application_date: 'YYYY/MM/DD',
    classification: '交通費精算',
    application_no: 9999,
    payday: 'YYYY/MM/DD',
    applicant: 'テキスト',
    title: 'テキスト',
    account_subject_1: 'テキスト',
    purchase_transportation: 'テキスト',
    amount: 9000,
    expense_charge: '費用負担部署'
  },
  {
    id: 3,
    status: '承認待ち',
    application_date: 'YYYY/MM/DD',
    classification: '経費精算',
    application_no: 9999,
    payday: 'YYYY/MM/DD',
    applicant: 'テキスト',
    title: 'テキスト',
    account_subject_1: 'テキスト',
    purchase_transportation: 'テキスト',
    amount: 9000,
    expense_charge: '費用負担部署'
  },
  {
    id: 4,
    status: '承認待ち',
    application_date: 'YYYY/MM/DD',
    classification: '交通費精算',
    application_no: 9999,
    payday: 'YYYY/MM/DD',
    applicant: 'テキスト',
    title: 'テキスト',
    account_subject_1: 'テキスト',
    purchase_transportation: 'テキスト',
    amount: 9000,
    expense_charge: '費用負担部署'
  },
  {
    id: 5,
    status: '承認待ち',
    application_date: 'YYYY/MM/DD',
    classification: '経費精算',
    application_no: 9999,
    payday: 'YYYY/MM/DD',
    applicant: 'テキスト',
    title: 'テキスト',
    account_subject_1: 'テキスト',
    purchase_transportation: 'テキスト',
    amount: 9000,
    expense_charge: '費用負担部署'
  },
  {
    id: 6,
    status: '承認待ち',
    application_date: 'YYYY/MM/DD',
    classification: '交通費精算',
    application_no: 9999,
    payday: 'YYYY/MM/DD',
    applicant: 'テキスト',
    title: 'テキスト',
    account_subject_1: 'テキスト',
    purchase_transportation: 'テキスト',
    amount: 9000,
    expense_charge: '費用負担部署'
  },
  {
    id: 7,
    status: '承認待ち',
    application_date: 'YYYY/MM/DD',
    classification: '経費精算',
    application_no: 9999,
    payday: 'YYYY/MM/DD',
    applicant: 'テキスト',
    title: 'テキスト',
    account_subject_1: 'テキスト',
    purchase_transportation: 'テキスト',
    amount: 9000,
    expense_charge: '費用負担部署'
  },
  {
    id: 8,
    status: '承認待ち',
    application_date: 'YYYY/MM/DD',
    classification: '交通費精算',
    application_no: 9999,
    payday: 'YYYY/MM/DD',
    applicant: 'テキスト',
    title: 'テキスト',
    account_subject_1: 'テキスト',
    purchase_transportation: 'テキスト',
    amount: 9000,
    expense_charge: '費用負担部署'
  },
  {
    id: 9,
    status: '承認待ち',
    application_date: 'YYYY/MM/DD',
    classification: '経費精算',
    application_no: 9999,
    payday: 'YYYY/MM/DD',
    applicant: 'テキスト',
    title: 'テキスト',
    account_subject_1: 'テキスト',
    purchase_transportation: 'テキスト',
    amount: 9000,
    expense_charge: '費用負担部署'
  },
  {
    id: 10,
    status: '承認待ち',
    application_date: 'YYYY/MM/DD',
    classification: '交通費精算',
    application_no: 9999,
    payday: 'YYYY/MM/DD',
    applicant: 'テキスト',
    title: 'テキスト',
    account_subject_1: 'テキスト',
    purchase_transportation: 'テキスト',
    amount: 9000,
    expense_charge: '費用負担部署'
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Approval[]>
) {
  res.status(200).json(APPROVAL_LIST)
}
