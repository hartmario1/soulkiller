/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Tr, Td, useStyleConfig, Flex, Spacer, HStack, Box, IconButton } from '@chakra-ui/react';
import { GiAerialSignal } from 'react-icons/gi';
import { FaTrash } from 'react-icons/fa';

const Proxy = () => {
  const proxyColor = useStyleConfig('proxyColumn');

  return (
    <Tr bg = "bgblue" sx = {proxyColor}>
      <Td borderTopLeftRadius = "3xl" borderBottomLeftRadius = "3xl" paddingY = "13px">
        192.269.0.438
      </Td>
      <Td isNumeric>
        User
      </Td>
      <Td isNumeric>
        ***********
      </Td>
      <Td isNumeric color = "green.400">
        52 ms
      </Td>
      <Td isNumeric borderTopRightRadius = "3xl" borderBottomRightRadius = "3xl">
        <Flex>
          <Spacer />
          <HStack>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<GiAerialSignal />} size = "sm" />
            </Box>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FaTrash />} size = "sm" />
            </Box>
          </HStack>
        </Flex>
      </Td>
    </Tr>
  );
};

export default Proxy;
