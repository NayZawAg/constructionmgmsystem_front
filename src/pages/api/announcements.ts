// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint @typescript-eslint/no-unused-vars: 0 */
import type { NextApiRequest, NextApiResponse } from 'next'
import { Announcement } from '@/interfaces'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Announcement[]>
) {
  const { type } = req.query
  const announcementData = [
    {
      id: 1,
      title: "〇〇お知らせタイトル〇〇お知らせタイトル〇〇お知らせタイトル〇〇お知らせタイトル〇〇お知らせタイトル",
      content: "〇〇お知らせコンテンツ〇〇お知らせコンテンツ〇〇お知らせコンテンツ〇〇お知らせコンテンツ〇〇お知らせコンテンツ",
      user: {
        id: 1,
        name: "ユーザ1",
        image: "https://robohash.org/XM0.png?set=set1"
      },
    },
    {
      id: 2,
      title: "〇〇お知らせタイトル〇〇お知らせタイトル〇〇お知らせタイトル〇〇お知らせタイトル〇〇お知らせタイトル",
      content: "〇〇お知らせコンテンツ〇〇お知らせコンテンツ〇〇お知らせコンテンツ〇〇お知らせコンテンツ〇〇お知らせコンテンツ",
      user: {
        id: 2,
        name: "ユーザ2",
        image: "https://robohash.org/UPK.png?set=set1"
      }
    },
    {
      id: 3,
      title: "〇〇お知らせタイトル〇〇お知らせタイトル〇〇お知らせタイトル〇〇お知らせタイトル〇〇お知らせタイトル",
      content: "〇〇お知らせコンテンツ〇〇お知らせコンテンツ〇〇お知らせコンテンツ〇〇お知らせコンテンツ〇〇お知らせコンテンツ",
      user: {
        id: 3,
        name: "ユーザ3",
        image: "https://robohash.org/SW1.png?set=set1"
      }
    },
  ]
  res.status(200).json(announcementData)
}
