import * as jwt from 'jsonwebtoken';
import { sessionExpires } from '@/pages/api/auth/[...nextauth]';

const secret = process.env.SECRET

export const jwtEncode = async (uuid: string) => {
  console.log("encode jwt")
  const encoded = jwt.sign({ uuid: uuid, iat: sessionExpires }, secret);
  return encoded;
};

export const jwtDecode = async (token: string) => {
  console.log("decode jwt")
  try {
    const decoded = jwt.verify(token, secret);
    return decoded
  } catch(err) {
    return null
  }
};
