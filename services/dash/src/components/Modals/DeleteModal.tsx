/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const DeleteTasks = ({ title, modalBody, borderColor }: {title: string; modalBody: string; borderColor: string}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button size = "md" height = "48px" width = "200px" border = "2px" borderColor = {borderColor} leftIcon = {<FaTrash />} onClick = {onOpen}>
        {title}
      </Button>
      <Modal onClose = {onClose}
        isOpen = {isOpen}
        isCentered
        closeOnOverlayClick
        motionPreset = "slideInRight">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align = "center">
            {title}
          </ModalHeader>
          <ModalBody align = "center">
            {modalBody}
          </ModalBody>
          <ModalFooter>
            <HStack alignContent = "center">
              <Box>
                <Button onClick = {onClose}>
                  Close
                </Button>
              </Box>
              <Box>
                <Button bg = "purple" color = "white">
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
