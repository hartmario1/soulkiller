/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, HStack, IconButton, Spacer, Text, useStyleConfig } from '@chakra-ui/react';
import { GiAerialSignal } from 'react-icons/gi';
import { FaTrash } from 'react-icons/fa';

const Proxy = () => {
  const proxyColor = useStyleConfig('proxyColumn');

  return (
    <Box paddingY = "4px" paddingX = "7px">
      <Box borderRadius = "xl" paddingX = "10px" height = "38px" paddingY = "3px" sx = {proxyColor}>
        <HStack>
          <Text>
            192.269.0.438
          </Text>
          <Spacer />
          <Text isTruncated>
            User
          </Text>
          <Spacer />
          <Text isTruncated>
            ***********
          </Text>
          <Spacer />
          <Text color = "green.400">
            52 ms
          </Text>
          <Spacer />
          <HStack>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<GiAerialSignal />} size = "sm" />
            </Box>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FaTrash />} size = "sm" />
            </Box>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default Proxy;
