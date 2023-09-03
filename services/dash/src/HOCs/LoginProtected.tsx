/* eslint-disable react/display-name, react-hooks/rules-of-hooks */

import useLoginProtectedRoute from 'hooks/useLoginProtecedRoute';
import { Center, Spinner } from '@chakra-ui/react';
import StandardLayout from 'components/Layouts/Standard';

const LoginProtected = (Component: React.FC) => (props: any) => {
  const loggedIn = useLoginProtectedRoute();
  if (loggedIn) { return (<Component {...props} />); }
  return (
    <StandardLayout>
      <Center>
        <Spinner size = "xl" />
      </Center>
    </StandardLayout>
  );
};

export default LoginProtected;
