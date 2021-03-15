/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

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
