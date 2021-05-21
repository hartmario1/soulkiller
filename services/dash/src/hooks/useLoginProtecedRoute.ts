import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQueryMe } from './useQueryMe';

const useLoginProtectedRoute = () => {
  const user = useQueryMe();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.loggedIn === false) {
      void router.replace('/').catch(() => null);
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return user?.loggedIn;
};

export default useLoginProtectedRoute;
