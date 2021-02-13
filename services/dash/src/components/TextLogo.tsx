/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
*/

import { Image, Box, useColorMode } from '@chakra-ui/react';

const TextLogo = () => {
  const White = () => <Image src = "/soulkiller_white.svg" />;
  const Black = () => <Image src = "/soulkiller_black.svg" />;
  const { colorMode } = useColorMode();
  const Logo = colorMode === 'dark' ? White : Black;

  return (
    <Box>
      <Logo />
    </Box>
  );
};

export default TextLogo;
