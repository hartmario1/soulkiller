/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, HStack, Text, Spacer, useStyleConfig } from '@chakra-ui/react';

const ActivityTask = () => {
  const styles = useStyleConfig('taskColumn');

  return (
    <Box paddingX = "10px" paddingBottom = "5px">
      <Box bg = "bgblue" borderRadius = "xl" sx = {styles}>
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
            Proxy 1
          </Text>
          <Spacer />
          <Text isTruncated color = "green.400">
            Checked Out
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default ActivityTask;
