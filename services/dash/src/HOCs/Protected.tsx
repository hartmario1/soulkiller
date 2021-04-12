import useProtectedRoute from 'hooks/useProtecedRoute';
import { Center, Spinner } from '@chakra-ui/react';
import StandardLayout from 'components/Layouts/Standard';

// eslint-disable-next-line react/display-name
const Protected = (Component: React.FC) => (props: any) => {
  const loggedIn = useProtectedRoute(); // eslint-disable-line react-hooks/rules-of-hooks
  if (loggedIn) return (<Component {...props} />);
  return (
    <StandardLayout>
      <Center>
        <Spinner size = "xl" />
      </Center>
    </StandardLayout>
  );
};

export default Protected;
