/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Flex, Box, Center, SimpleGrid, Button, Link } from '@chakra-ui/react';
import { FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  const Legal = () => (
    <Center>
      <Link href = "/terms">
        <Button variant = "link">
          <Box paddingX = "2">
            Terms of Service
          </Box>
        </Button>
      </Link>
      <Link href = "/privacy">
        <Button variant = "link">
          <Box paddingX = "2">
            Privacy
          </Box>
        </Button>
      </Link>
    </Center>
  );

  const Social = () => (
    <Center>
      <Link href = "https://www.instagram.com/soulkiller.io/">
        <Button variant = "link">
          <Box>
            <FiInstagram />
          </Box>
        </Button>
      </Link>
      <Link href = "https://twitter.com/SoulkillerIO">
        <Button variant = "link">
          <Box>
            <FiTwitter />
          </Box>
        </Button>
      </Link>
    </Center>
  );

  const Text = () => (
    <Center>
      <Box>
        © 2021
        <Link href = "/">
          <Button variant = "link">
            <Box paddingX = "1">
              Soulkiller
            </Box>
          </Button>
        </Link>
      . All rights reserved.
      </Box>
    </Center>
  );

  return (
    <Flex paddingY = "5">
      <Center flexGrow = {1}>
        <SimpleGrid columns = {3}>
          <Text />
          <Social />
          <Legal />
        </SimpleGrid>
      </Center>
    </Flex>
  );
};

export default Footer;
