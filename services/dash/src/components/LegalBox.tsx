/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Text } from '@chakra-ui/react';

const LegalBox = ({ title, ...rest }: { title: string } & Record<string, string>) => {
  const Components = Object
    .values(rest)
    .map(text => (
      <Text paddingY = "5px">
        {text}
      </Text>
    ));

  return (
    <Box paddingY = "10px">
      <Text fontWeight = "bold" fontSize = "3xl">
        {title}
      </Text>
      {Components}
    </Box>
  );
};

export default LegalBox;
