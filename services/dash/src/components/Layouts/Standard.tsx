/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import Navbar from '../Navbar';
import Footer from '../Footer';
import { Box, Center, Flex } from '@chakra-ui/react';

const StandardLayout: React.FC = ({ children }) => (
  <Flex direction = "column" h = "100vh" w = "100%"
    overflowY = "auto"
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

    <Center flexGrow = {1}>
      <Box w = "70%" minW = "350px">
        {children}
      </Box>
    </Center>
    <Footer />
  </Flex>
);

export default StandardLayout;
