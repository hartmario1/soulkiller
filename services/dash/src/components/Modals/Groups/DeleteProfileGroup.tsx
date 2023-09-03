/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, useDisclosure } from '@chakra-ui/react';
import { ProfileGroupState, useProfileGroupStore } from 'stores';
import { fetchApi } from '../../../util';
import { FiTrash2 } from 'react-icons/fi';

const selector = (state: ProfileGroupState) => state;

const DeleteProfileGroup = ({ id }: { id: number }) => {
  const group = useProfileGroupStore(selector);
  const toast = useToast();
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Box>
      <Button onClick = {onOpen}>
        <FiTrash2 />
      </Button>
      <Modal isOpen = {isOpen}
        onClose = {onClose}
        isCentered
        closeOnOverlayClick
        motionPreset = "slideInRight">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align = "center">
             Delete Profile Group
          </ModalHeader>
          <ModalBody align = "center">
             This will permanently delete your profile group. Are you sure you want to do it?
          </ModalBody>
          <ModalFooter>
            <HStack alignContent = "center">
              <Box>
                <Button onClick = {onClose}>
                   Close
                </Button>
              </Box>
              <Box>
                <Button bg = "purple" color = "white" onClick = {() => {
                  void fetchApi(`/api/profiles/groups/${id}`, 'DELETE');
                  group.clear();
                  toast({
                    status: 'info',
                    title: 'Profile group Deletion',
                    description: 'Profile group has been successfully deleted'
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

export default DeleteProfileGroup;

