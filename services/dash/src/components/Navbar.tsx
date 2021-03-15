/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Flex, Link, Button, IconButton, Box, useDisclosure, useColorMode, useColorModeValue, Img, Popover, PopoverTrigger, PopoverContent, Portal, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody } from '@chakra-ui/react';
import { FiMenu, FiX } from 'react-icons/fi';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import TextLogo from './TextLogo';
import { useUserStore } from '../stores/user';
import { useRef } from 'react';
import { SiDiscord } from 'react-icons/si';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  const icon = useColorModeValue(<MoonIcon />, <SunIcon />);
  const { toggleColorMode } = useColorMode();

  const user = useUserStore();

  const initialFocusRef = useRef(null);

  const LoginButton = () =>
    user.loggedIn
      ? (
        <Link href = "/">
          <Button variant = "ghost" justifyContent = {{ base: 'start', md: 'unset' }}>
            <Img mr = {5} rounded = "full"
              boxSize = "25px" src = {user.avatar ?? ''}
              alt = {user.username!} />
            <Box>
              {user.username}
            </Box>
          </Button>
        </Link>
      )
      : (
        <Popover initialFocusRef = {initialFocusRef}>
          <PopoverTrigger>
            <Button variant = "ghost" justifyContent = {{ base: 'start', md: 'unset' }}>
              Log In
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                You have to log in with Discord to be able to purchase our software.
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Link href = "/">
                  <Button bg = "purple" ref = {initialFocusRef} leftIcon = {<SiDiscord />}>
                    Log In With Discord
                  </Button>
                </Link>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      );

  return (
    <Flex as = "nav" p = {4} align = "center" justify = "space-between" wrap = "wrap">
      <Flex align = "center" mr = {5}>
        <Link href = "/">
          <Button variant = "ghost" padding = "0" width = "200px">
            <TextLogo />
          </Button>
        </Link>
      </Flex>

      <Flex align = "center" paddingY = "3" paddingX = "2">
        <IconButton d = {{ base: 'flex', md: 'none' }}
          aria-label = "Open menu"
          variant = "ghost"
          icon = {isOpen ? <FiX /> : <FiMenu />}
          onClick = {onToggle}
        />
      </Flex>

      <Box d = {{ base: isOpen ? 'flex' : 'none', md: 'block' }}
        flexDirection = {{ base: 'column', md: 'unset' }}
        width = {{ base: 'full', md: 'auto' }}>
      </Box>

      <Box d = {{ base: isOpen ? 'flex' : 'none', md: 'block' }}
        flexDirection = {{ base: 'column', md: 'unset' }}
        width = {{ base: 'full', md: 'auto' }}>
        <LoginButton />
        <IconButton onClick = {toggleColorMode}
          variant = "ghost"
          icon = {icon}
          aria-label = "Toggle Theme" />
      </Box>
    </Flex>
  );
};

export default Navbar;
