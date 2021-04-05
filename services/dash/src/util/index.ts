import Cookies from 'universal-cookie';
import { createStandaloneToast } from '@chakra-ui/react';
import { useUserStore } from 'stores';

const raiseError = (data: Record<string, string>) => void createStandaloneToast()({
  status: 'error',
  title: data.statusCode ? `Error ${data.statusCode} - ${data.error!}  ` : 'An error occured',
  description: data.message ?? ''
});

export const fetchApi = async <T>(path: string): Promise<T> => {
  const toast = createStandaloneToast();
  const cookies = new Cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN!}${path}`);
  const data = await res.json();

  if (res.ok) {
    return data;
  }

  if (res.status === 401) {
    const refreshToken = cookies.get('refresh_token');
    if (!refreshToken) {
      toast({
        status: 'error',
        title: 'Your session expired.'
      });

      useUserStore.getState().logout();
      throw new Error();
    }

    const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN!}api/auth/discord/refresh`, {
      body: JSON.stringify({
        refresh_token: refreshToken
      })
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
