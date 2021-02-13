/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import Navbar from './Navbar';
import { Box, Center, Flex } from '@chakra-ui/react';

const StandardLayout: React.FC = ({ children }) => (
  <Flex direction = "column" h = "100vh" w = "100%">
    <Navbar />

    <Center flexGrow = {1}>
      <Box w = "70%" minW = "350px">
        {children}
      </Box>
    </Center>
  </Flex>
);

export default StandardLayout;
