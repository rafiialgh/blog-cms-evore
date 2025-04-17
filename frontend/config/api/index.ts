import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import Cookies from 'js-cookie';

interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
}

export default async function callAPI({
  url, method, data, token, serverToken,
}: CallAPIProps) {
  let headers = {};

  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    const tokenCookies = Cookies.get('token');
    if (tokenCookies) {

      headers = {
        Authorization: `Bearer ${tokenCookies}`,
      };
    }
  }

  try {
    const response = await axios({
      url,
      method,
      data,
      headers,
    });

    const { length } = Object.keys(response.data);
    return {
      error: false,
      message: response.data.message,
      data: length > 1 ? response.data : response.data.data,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {

      const response = err.response;

      if (response) {
        return {
          error: true,
          message: response.data.message,
          data: null,
        };
      }

      return {
        error: true,
        message: err.message || 'An unexpected error occurred',
        data: null,
      };
    }

    return {
      error: true,
      message: 'An unexpected error occurred',
      data: null,
    };
  }
}
