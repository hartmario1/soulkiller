/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, HStack, IconButton, Spacer, Text, useStyleConfig } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const Profile = () => {
  const styles = useStyleConfig('taskColumn');

  return (
    <Box paddingY = "6px">
      <Box bg = "bgblue" borderRadius = "xl" sx = {styles} paddingY = "2px">
        <Box paddingX = "20px">
          <HStack>
            <Text>
            Test
            </Text>
            <Spacer />
            <Text isTruncated>
            Romania
            </Text>
            <Spacer />
            <Text isTruncated>
            John Doe
            </Text>
            <Spacer />
            <Text isTruncated>
            johndoe@soulkiller.io
            </Text>
            <Spacer />
            <Text isTruncated>
            username
            </Text>
            <Spacer />
            <Text isTruncated>
            0732057756
            </Text>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FaTrash />} size = "sm" />
            </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
