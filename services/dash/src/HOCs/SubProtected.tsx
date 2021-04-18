/* eslint-disable react/display-name, react-hooks/rules-of-hooks */

import useLoginProtectedRoute from 'hooks/useLoginProtecedRoute';
import { Center, Spinner } from '@chakra-ui/react';
import StandardLayout from 'components/Layouts/Standard';
import { useQueryMe } from '../hooks/useQueryMe';
import Payment from '../components/Payment';

const SubProtected = (Component: React.FC) => (props: any) => {
  const loggedIn = useLoginProtectedRoute();
  const user = useQueryMe()!;

  if (!loggedIn || user.sub === null) {
    return (
      <StandardLayout>
        <Center>
          <Spinner size = "xl" />
        </Center>
      </StandardLayout>
    );
  }

  return user.sub
    ? (<Component {...props} />)
    : (<Payment />);
};

export default SubProtected;
