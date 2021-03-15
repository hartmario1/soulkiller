/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { GoPlus } from 'react-icons/go';

const AddProxy = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button size = "md" height = "48px" width = "200px" border = "2px" borderColor = "purple" leftIcon = {<GoPlus />} onClick = {onOpen} >
        Add Proxies
      </Button>
      <Modal onClose = {onClose} isOpen = {isOpen} isCentered size = "2xl" closeOnOverlayClick motionPreset = "slideInRight">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align = "center">
            Add Proxies
          </ModalHeader>
          <ModalBody>
            <FormControl id = "add-proxy">
              <FormLabel>
                    Proxies
              </FormLabel>
              <Input type = "add-proxy" height = "300px" placeholder = "Paste your proxies in here" />
            </FormControl>
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
                    Add
                </Button>
              </Box>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddProxy;
