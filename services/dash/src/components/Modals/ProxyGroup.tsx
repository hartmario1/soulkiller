/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { GoPlus } from 'react-icons/go';

const ProxyGroup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button size = "md" height = "48px" width = "200px" border = "2px" borderColor = "purple" leftIcon = {<GoPlus />} onClick = {onOpen} >
            Create Group
      </Button>
      <Modal onClose = {onClose} isOpen = {isOpen} isCentered closeOnOverlayClick motionPreset = "slideInRight">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align = "center">
                Proxy group
          </ModalHeader>
          <ModalBody>
            <FormControl id = "proxy-group">
              <FormLabel>
                    Group Name
              </FormLabel>
              <Input type = "proxy-group" />
              <FormHelperText>
                    Set a name for your proxy group
              </FormHelperText>
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
                    Create
                </Button>
              </Box>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProxyGroup;
