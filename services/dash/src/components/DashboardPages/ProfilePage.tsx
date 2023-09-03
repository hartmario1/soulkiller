/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Center, HStack, Table, Thead, Tr, Th, Tbody, useStyleConfig, Select, useDisclosure } from '@chakra-ui/react';
import DeleteProfileGroup from 'components/Modals/Groups/DeleteProfileGroup';
import EditProfileGroup from 'components/Modals/Groups/EditProfileGroup';
import ProfileGroup from 'components/Modals/Groups/ProfileGroup';
import { useQueryProfileGroups } from 'hooks/useQueryProfileGroups';
import { useQueryProfiles } from 'hooks/useQueryProfiles';
import { useState } from 'react';
import CreateProfile from '../Modals/CreateProfile';
import DeleteProfiles from '../Modals/DeleteProfiles';
import ProfileUi from '../Profile';

const ProfilePage = () => {
  const [groupId, setGroupId] = useState<number | null>(null);
  const styles = useStyleConfig('taskBox');
  const { isOpen: createIsOpen, onClose: createOnClose, onOpen: createOnOpen } = useDisclosure();
  const profiles = useQueryProfiles();
  const profileGroups = useQueryProfileGroups();

  return (
    <Box>
      <ProfileGroup isOpen = {createIsOpen} onClose = {createOnClose} />
      <HStack paddingBottom = "12px">
        <Select variant = "filled" placeholder = "Profile Group" onChange = {event => {
          if (event.target.value === 'add') {
            createOnOpen();
          } else {
            setGroupId(parseInt(event.target.value, 10));
          }
        }}>
          <option value = "add">
            Add Profile Group
          </option>
          {profileGroups.map(group => (
            <option value = {group.id}>
              {group.name}
            </option>
          ))}
        </Select>
        <EditProfileGroup id = {groupId} />
        <DeleteProfileGroup id = {groupId} />
      </HStack>
      <Box bg = "whiteblue" height = "605px" maxWidth = "1880px" borderRadius = "xl" sx = {styles}
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
                  City
                </Th>
                <Th isNumeric>
                  Phone
                </Th>
                <Th isNumeric>
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {profiles.filter(profile => profile.group_id === groupId).map(data => (
                <ProfileUi data = {data} />
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>

      <Box paddingTop = "10px">
        <Center>
          <HStack>
            <CreateProfile groupId = {groupId} />
            <DeleteProfiles />
          </HStack>
        </Center>
      </Box>
    </Box>
  );
};

export default ProfilePage;
