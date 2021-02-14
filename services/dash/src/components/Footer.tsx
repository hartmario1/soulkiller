/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Button, Link, Wrap, WrapItem, Text } from '@chakra-ui/react';
import { FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => (
  <Wrap paddingY = "5" justify = "center" align = "center">
    <WrapItem>
      <Text>
          © 2021
        {' '}
        <Link href = "/">
            Soulkiller.
        </Link>
        {' '}
          All rights reserved.
      </Text>
    </WrapItem>

    {/* Social */}
    <WrapItem>
      <Link href = "https://www.instagram.com/soulkiller.io/">
        <Button variant = "link">
          <WrapItem>
            <FiInstagram />
          </WrapItem>
        </Button>
      </Link>
      <Link href = "https://twitter.com/SoulkillerIO">
        <Button variant = "link">
          <WrapItem>
            <FiTwitter />
          </WrapItem>
        </Button>
      </Link>
    </WrapItem>

    {/* Legal */}
    <WrapItem>
      <Link href = "/terms">
        <Button variant = "link">
          <WrapItem paddingX = "2">
            Terms of Service
          </WrapItem>
        </Button>
      </Link>
      <Link href = "/privacy">
        <Button variant = "link">
          <WrapItem paddingX = "2">
            Privacy
          </WrapItem>
        </Button>
      </Link>
    </WrapItem>
  </Wrap>
);

export default Footer;
