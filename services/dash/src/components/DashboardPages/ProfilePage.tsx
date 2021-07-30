/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Center, HStack, Table, Thead, Tr, Th, Tbody, useStyleConfig } from '@chakra-ui/react';
import CreateProfile from '../Modals/CreateProfile';
import DeleteModal from '../Modals/DeleteModal';
import Profile from '../Profile';

const ProfilePage = () => {
  const styles = useStyleConfig('taskBox');

  return (
    <Box>
      <Box bg = "whiteblue" height = "666px" maxWidth = "1880px" borderRadius = "xl" sx = {styles}
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
        <Box paddingY = "10px" paddingX = "30px">
          <Table variant = "simple" size = "sm">
            <Thead>
              <Tr>
                <Th>
                  Profile Name
                </Th>
                <Th>
                  Country
                </Th>
                <Th isNumeric>
                  Full Name
                </Th>
                <Th isNumeric>
                  Email
                </Th>
                <Th isNumeric>
                  Username
                </Th>
                <Th isNumeric>
                  Phone
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Profile />
              <Profile />
              <Profile />
              <Profile />
              <Profile />
              <Profile />
              <Profile />
              <Profile />
              <Profile />
            </Tbody>
          </Table>
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
