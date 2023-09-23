/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, useDisclosure } from '@chakra-ui/react';
import { TaskGroupState, useTaskGroupStore } from 'stores';
import { fetchApi } from '../../../util';
import { FiTrash2 } from 'react-icons/fi';

const selector = (state: TaskGroupState) => state;

const DeleteTaskGroup = ({ id }: { id: number | null }) => {
  const group = useTaskGroupStore(selector);
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
          <ModalHeader textAlign = "center">
            Delete Task Group
          </ModalHeader>
          <ModalBody textAlign = "center">
            This will permanently delete your task group. Are you sure you want to do it?
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
                  void fetchApi(`/api/tasks/groups/${id}`, 'DELETE');
                  group.clear();
                  toast({
                    status: 'info',
                    title: 'Task group Deletion',
                    description: 'Task group has been successfully deleted'
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

export default DeleteTaskGroup;
