/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, useDisclosure } from '@chakra-ui/react';
import { TaskState, useTasksStore } from 'stores';
import { fetchApi } from '../../util';
import { FaTrash } from 'react-icons/fa';

const selector = (state: TaskState) => state;

const DeleteTasks = () => {
  const tasks = useTasksStore(selector);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button size = "md" height = "48px" width = "200px" border = "2px" borderColor = "red.600" leftIcon = {<FaTrash />} onClick = {onOpen}>
        Delete Tasks
      </Button>
      <Modal isOpen = {isOpen}
        onClose = {onClose}
        isCentered
        closeOnOverlayClick
        motionPreset = "slideInRight">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align = "center">
            Delete Tasks
          </ModalHeader>
          <ModalBody align = "center">
            This will permanently delete your tasks. Are you sure you want to do it?
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
                  void fetchApi('/api/tasks/', 'DELETE');
                  tasks.clear();
                  toast({
                    status: 'info',
                    title: 'Tasks Deletion',
                    description: 'Tasks have been successfully deleted'
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
