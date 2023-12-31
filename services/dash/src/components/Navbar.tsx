import { Flex, Link, Button, IconButton, Box, useDisclosure, useColorMode, useColorModeValue, Img, Popover, PopoverTrigger, PopoverContent, Portal, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody, useStyleConfig, HStack } from '@chakra-ui/react';
import { FiMenu, FiX } from 'react-icons/fi';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import TextLogo from './TextLogo';
import { useRef } from 'react';
import { SiDiscord } from 'react-icons/si';
import { useQueryMe } from '../hooks/useQueryMe';

const Navbar = () => {
  const styles = useStyleConfig('featureBox');

  const { isOpen, onToggle } = useDisclosure();

  const icon = useColorModeValue(<MoonIcon />, <SunIcon />);
  const { toggleColorMode } = useColorMode();

  const user = useQueryMe();

  const avatar = user?.avatar && user.id
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`
    : `https://cdn.discordapp.com/embed/avatars/${parseInt(user?.discriminator ?? '0001', 10) % 5}.png`;

  const initialFocusRef = useRef(null);

  const LoginButton = () =>
    user?.loggedIn === true
      ? (
        <HStack>
          <Box>
            <Link href = "/">
              <Button variant = "ghost" justifyContent = {{ base: 'start', md: 'unset' }}>
                <Img mr = {5} rounded = "full"
                  boxSize = "25px" src = {avatar}
                  alt = {user.username!} />
                <Box>
                  {user.username}
                </Box>
              </Button>
            </Link>
          </Box>
          <Box>
            <Link href = "/dashboard">
              <Button>
                {user.sub === true ? 'Dashboard' : 'Purchase'}
              </Button>
            </Link>
          </Box>
        </HStack>
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
                <Link href = {`${process.env.NEXT_PUBLIC_API_DOMAIN!}/api/auth/discord?redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN!}`}>
                  <Button bg = "purple" ref = {initialFocusRef} leftIcon = {<SiDiscord />} sx = {styles}>
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
        <IconButton display = {{ base: 'flex', md: 'none' }}
          aria-label = "Open menu"
          variant = "ghost"
          icon = {isOpen ? <FiX /> : <FiMenu />}
          onClick = {onToggle}
        />
      </Flex>

      <Box display = {{ base: isOpen ? 'flex' : 'none', md: 'block' }}
        flexDirection = {{ base: 'column', md: 'unset' }}
        width = {{ base: 'full', md: 'auto' }}>
      </Box>

      <Box display = {{ base: isOpen ? 'flex' : 'none', md: 'block' }}
        flexDirection = {{ base: 'column', md: 'unset' }}
        width = {{ base: 'full', md: 'auto' }}>
        <HStack>
          <LoginButton />
          <IconButton onClick = {toggleColorMode}
            variant = "ghost"
            icon = {icon}
            aria-label = "Toggle Theme" />
        </HStack>
      </Box>
    </Flex>
  );
};

export default Navbar;
