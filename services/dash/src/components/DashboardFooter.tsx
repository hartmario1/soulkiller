/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Circle, HStack, Spacer, Text, useStyleConfig } from '@chakra-ui/react';
import { useState } from 'react';

const DashboardFooter = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);

  const styles = useStyleConfig('taskBox');

  return (
    <Box paddingX = "25px">
      <Box bg = "whiteblue" borderRadius = "lg" paddingX = "20px" sx = {styles}>
        <HStack>
          <Circle size = "7px" bg = "#4fc66c" color = "white" />
          <Box>
            <Text fontSize = "small">
              Connected
            </Text>
          </Box>
          <Spacer />
          <Box fontSize = "small">
            {time}
          </Box>
          <Spacer />
          <Text fontSize = "small">
            Version 0.1.0
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default DashboardFooter;
