import Navbar from '../Navbar';
import { Box } from '@chakra-ui/react';
import DashboardFooter from 'components/DashboardFooter';

const DashboardLayout: React.FC = ({ children }) => (
  <Box direction = "column" h = "100vh" w = "100%" overflowY = "auto"
    css = {{
      '&::-webkit-scrollbar': {
        width: '4px'
      },
      '&::-webkit-scrollbar-track': {
        width: '6px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#1a202c',
        borderRadius: '24px'
      }
    }}>
    <Navbar />

    <Box w = "100%" minW = "350px" paddingX = "20px">
      {children}
    </Box>
    <DashboardFooter />
  </Box>
);

export default DashboardLayout;
