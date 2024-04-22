import { NextApiRequest, NextApiResponse } from 'next';
import { Employee } from '@/interfaces/employee';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Employee[]>  
){
  const employeeData = [
    {
      id: 1,
      employee_code: "EMP_001",
      name: "山田",
      name_kana: "やまだ"
    },
    {
      id: 2,
      employee_code: "EMP_001",
      name: "雪",
      name_kana: "ゆき"
    }
  ]
  res.status(200).json(employeeData)
}