/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Text } from '@chakra-ui/react';

const FaqBox = ({ title, content }: { title: string; content: string}) => (
  <Box shadow = "dark-lg" borderRadius = "lg">
    <Text fontSize = "xl" fontWeight = "bold" paddingY = "2" paddingX = "3">
      {title}
    </Text>
    <Text fontSize = "m" paddingY = "2" paddingX = "3">
      {content}
    </Text>
  </Box>
);

export default FaqBox;
