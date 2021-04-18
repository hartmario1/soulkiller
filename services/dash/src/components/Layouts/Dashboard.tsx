import Navbar from '../Navbar';
import { Box } from '@chakra-ui/react';
import DashboardFooter from 'components/DashboardFooter';

const DashboardLayout: React.FC = ({ children }) => (
  <Box direction = "column" h = "100vh" w = "100%">
    <Navbar />

    <Box w = "100%" minW = "350px" paddingX = "20px">
      {children}
    </Box>
    <DashboardFooter />
  </Box>
);

export default DashboardLayout;
