/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Tr, Td, useStyleConfig, Flex, Spacer, HStack, Box, IconButton, useToast, useDisclosure } from '@chakra-ui/react';
import { ProfileState, useProfilesStore } from 'stores/profiles';
import { Profile } from '@soulkiller/common';
import { fetchApi } from '../util';
import { FaTrash } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import EditProfile from './Modals/EditProfile';

const selector = (state: ProfileState) => state;

const ProfileUi = ({ data }: { data: Profile }) => {
  const style = useStyleConfig('taskColumn');
  const profiles = useProfilesStore(selector);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Tr bg = "bgblue" sx = {style}>
      <Td borderTopLeftRadius = "3xl" borderBottomLeftRadius = "3xl" paddingY = "13px">
        {data.profile_name}
      </Td>
      <Td>
        {data.country}
      </Td>
      <Td isNumeric>
        {data.first_name + data.last_name}
      </Td>
      <Td isNumeric>
        {data.email}
      </Td>
      <Td isNumeric>
        {data.city}
      </Td>
      <Td isNumeric>
        {data.phone}
      </Td>
      <Td isNumeric borderTopRightRadius = "3xl" borderBottomRightRadius = "3xl">
        <Flex>
          <Spacer />
          <HStack>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FiEdit2 />} size = "sm" onClick = {onOpen} />
              <EditProfile isOpen = {isOpen} onClose = {onClose} name = {data.profile_name} />
            </Box>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FaTrash />} size = "sm" onClick = {async () => {
                await fetchApi(`/api/profiles/${encodeURIComponent(data.profile_name)}`, 'DELETE');
                profiles.remove(data);
                toast({
                  status: 'info',
                  title: 'Task Deletion',
                  description: 'Task has been successfully deleted'
                });
              }} />
            </Box>
          </HStack>
        </Flex>
      </Td>
    </Tr>
  );
};

export default ProfileUi;
