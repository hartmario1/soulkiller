/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { ProfileState, useProfilesStore } from 'stores/profiles';
import { fetchApi } from '../../util';

const selector = (state: ProfileState) => state;

const DeleteTasks = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const profiles = useProfilesStore(selector);
  const toast = useToast();

  return (
    <Box>
      <Button size = "md" height = "48px" width = "200px" border = "2px" borderColor = "purple" leftIcon = {<FaTrash />} onClick = {onOpen}>
         Delete Profiles
      </Button>
      <Modal onClose = {onClose}
        isOpen = {isOpen}
        isCentered
        closeOnOverlayClick
        motionPreset = "slideInRight">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign = "center">
             Delete Profiles
          </ModalHeader>
          <ModalBody textAlign = "center">
             This will permanently delete your profiles. Are you sure you want to do it?
          </ModalBody>
          <ModalFooter>
            <HStack alignContent = "center">
              <Box>
                <Button onClick = {onClose}>
                   Close
                </Button>
              </Box>
              <Box>
                <Button bg = "purple" color = "white" onClick = {async () => {
                  await fetchApi('/api/profiles/', 'DELETE');
                  profiles.clear();
                  toast({
                    status: 'info',
                    title: 'Profiles Deletion',
                    description: 'Profiles have been successfully deleted'
                  });
                }}>
                   Delete
                </Button>
              </Box>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DeleteTasks;

