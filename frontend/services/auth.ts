import { LoginTypes } from './data-types';
import callAPI from '@/config/api';

const ROOT_API = process.env.NEXT_PUBLIC_ROOT_API;

export async function setLogin(data: LoginTypes) {
  const url = `${ROOT_API}/login`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}