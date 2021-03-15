/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, HStack, IconButton, Spacer, Text, useStyleConfig } from '@chakra-ui/react';
import { FaPlay, FaTrash } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';

const Task = () => {
  const taskStyle = useStyleConfig('taskColumn');

  return (
    <Box paddingX = "10px" paddingBottom = "5px">
      <Box bg = "bgblue" borderRadius = "xl" sx = {taskStyle}>
        <HStack paddingX = "20px" paddingY = "5px">
          <Text>
            Undefeated
          </Text>
          <Spacer />
          <Text isTruncated>
            NBHD X UNDFTD S/S TEE
          </Text>
          <Spacer />
          <Text isTruncated>
            Medium
          </Text>
          <Spacer />
          <Text isTruncated>
            Profile 1
          </Text>
          <Spacer />
          <Text isTruncated>
            Waiting for start
          </Text>
          <Spacer />
          <HStack>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FaPlay />} size = "sm" />
            </Box>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FiEdit2 />} size = "sm" />
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

export default Task;
