/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, Editable, EditableInput, EditablePreview, FormControl, FormHelperText, FormLabel, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { GiAerialSignal } from 'react-icons/gi';

const TestProxy = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button size = "md" height = "48px" width = "200px" border = "2px" borderColor = "purple" leftIcon = {<GiAerialSignal />} onClick = {onOpen} >
        Test
      </Button>
      <Modal onClose = {onClose} isOpen = {isOpen} isCentered closeOnOverlayClick motionPreset = "slideInRight">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align = "center">
            Test Proxies
          </ModalHeader>
          <ModalBody>
            <FormControl id = "proxy-group">
              <FormLabel>
                Website
              </FormLabel>
              <Editable defaultValue = "https://soulkiller.io">
                <EditablePreview />
                <EditableInput />
              </Editable>
              <FormHelperText>
                Test your proxies on a specific website
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
                    Test
                </Button>
              </Box>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TestProxy;
