/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useDisclosure } from '@chakra-ui/react';
import { FaRedo } from 'react-icons/fa';

const Captcha = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button size = "md" height = "48px" width = "200px" border = "2px" borderColor = "purple" leftIcon = {<FaRedo />} onClick = {onOpen}>
        Captcha
      </Button>

      <Modal onClose = {onClose} isOpen = {isOpen} isCentered closeOnOverlayClick motionPreset = "slideInRight">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align = "center">
            Captcha Harvester
          </ModalHeader>
          <ModalBody>
            <FormControl id = "amount">
              <FormLabel>
                Amount
              </FormLabel>
              <NumberInput max = {10} min = {1}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormHelperText paddingTop = "3px" color = "gray.500" fontSize = "small">
                Select the amount of captcha windows you want to open.
            </FormHelperText>
          </ModalBody>
          <ModalFooter>
            <ModalFooter>
              <HStack>
                <Button onClick = {onClose}>
                    Close
                </Button>
                <Button bg = "purple" color = "white">
                    Create
                </Button>
              </HStack>
            </ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Captcha;
