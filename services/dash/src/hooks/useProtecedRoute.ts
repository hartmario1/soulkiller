import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQueryMe } from './useQueryMe';

const useProtectedRoute = () => {
  const user = useQueryMe();
  const router = useRouter();

  useEffect(() => {
    if (!user || (user.loggedIn !== null && !user.loggedIn)) {
      console.log(user);
      void router.replace('/').catch(() => null);
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return user?.loggedIn;
};

export default useProtectedRoute;
