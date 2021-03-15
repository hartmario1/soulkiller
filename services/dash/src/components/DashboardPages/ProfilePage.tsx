/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Center, HStack, Text, Spacer, useStyleConfig } from '@chakra-ui/react';
import CreateProfile from '../Modals/CreateProfile';
import DeleteModal from '../Modals/DeleteModal';
import Profile from '../Profile';

const ProfilePage = () => {
  const styles = useStyleConfig('taskBox');

  return (
    <Box>
      <Box bg = "whiteblue" height = "696px" maxWidth = "1880px" borderRadius = "xl" sx = {styles}
        overflowY = "auto"
        css = {{
          '&::-webkit-scrollbar': {
            width: '4px'
          },
          '&::-webkit-scrollbar-track': {
            width: '6px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#7252ff',
            borderRadius: '24px'
          }
        }}>
        <HStack paddingX = "40px" paddingTop = "10px">
          <Text>
          Profile Name
          </Text>
          <Spacer />
          <Text isTruncated>
          Country
          </Text>
          <Spacer />
          <Text isTruncated>
          Full Name
          </Text>
          <Spacer />
          <Text isTruncated>
          Email
          </Text>
          <Spacer />
          <Text isTruncated>
          Username
          </Text>
          <Spacer />
          <Text isTruncated>
          Phone
          </Text>
        </HStack>
        <Box padding = "10px">
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
        </Box>
      </Box>

      <Box paddingTop = "10px">
        <Center>
          <HStack>
            <CreateProfile />
            <DeleteModal title = "Delete Profiles" modalBody = "This will permanently delete your profiles. Are you sure you want to do it?" borderColor = "purple" />
          </HStack>
        </Center>
      </Box>
    </Box>
  );
};

export default ProfilePage;
