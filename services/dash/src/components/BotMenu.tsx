/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Center, Text, useStyleConfig, VStack } from '@chakra-ui/react';

const BotMenu = ({ content, iconMenu }: { content: string; iconMenu: JSX.Element }) => {
  const styles = useStyleConfig('taskBox');

  return (
    <Box sx = {styles} borderRadius = "lg" width = "100px">
      <VStack padding = "8px">
        <Center>
          {iconMenu}
        </Center>
        <Center>
          <Text>
            {content}
          </Text>
        </Center>
      </VStack>
    </Box>
  );
};

export default BotMenu;
