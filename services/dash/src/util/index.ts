import Cookies from 'universal-cookie';
import { createStandaloneToast } from '@chakra-ui/react';
import { useUserStore } from 'stores';

export const raiseError = (data: Record<string, string>) => void createStandaloneToast()({
  status: 'error',
  title: data.statusCode ? `Error ${data.statusCode} - ${data.error!}` : 'An error occured',
  description: data.message ?? ''
});

export const fetchApi = async <T, B = never>(path: string, method = 'GET', body?: B): Promise<T> => {
  const cookies = new Cookies(document.cookie);
  const accessToken = cookies.get('access_token');
  if (!accessToken) {
    throw new Error();
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN!}${path}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Authorization': accessToken,
        'Content-Type': 'application/json'
      }
    }
  );

  if (res.status === 204) {
    console.log(await res.clone().text());
  }

  const data = await res.json();

  if (res.ok) {
    return data;
  }

  if (res.status === 401) {
    const refreshToken = cookies.get('refresh_token');
    if (!refreshToken) {
      useUserStore.getState().logout();
      throw new Error();
    }

    const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN!}api/auth/discord/refresh`, {
      body: JSON.stringify({
        refresh_token: refreshToken
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) {
      raiseError(tokenData);
      throw new Error();
    }

    return fetchApi(path);
  }

  raiseError(data);
  throw new Error();
};
