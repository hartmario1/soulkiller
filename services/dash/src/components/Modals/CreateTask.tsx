/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, useDisclosure } from '@chakra-ui/react';
import { TiPlus } from 'react-icons/ti';

const CreateTask = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button size = "md" height = "48px" width = "200px" border = "2px" borderColor = "purple" leftIcon = {<TiPlus />} onClick = {onOpen}>
            Create Task
      </Button>
      <Modal isCentered
        onClose = {onClose}
        isOpen = {isOpen}
        closeOnOverlayClick
        motionPreset = "slideInRight"
        size = "2xl" >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align = "center">
                Create Tasks
          </ModalHeader>
          <ModalBody>
            <HStack paddingBottom = "8px">
              <FormControl id = "store">
                <FormLabel>
                      Store
                </FormLabel>
                <Select placeholder = "Select store">
                  <option>
                      Supreme
                  </option>
                  <option>
                      NikeSNKRS
                  </option>
                  <option>
                      ShoePalace
                  </option>
                  <option>
                      Bodega
                  </option>
                  <option>
                      Undefeated
                  </option>
                </Select>
              </FormControl>

              <FormControl id = "category">
                <FormLabel>
                    Category
                </FormLabel>
                <Select placeholder = "Select store">
                  <option >
                    all
                  </option>
                  <option >
                    new
                  </option>
                  <option>
                    jackets
                  </option>
                  <option>
                    shirts
                  </option>
                  <option>
                    tops/sweaters
                  </option>
                  <option>
                    sweatshirts
                  </option>
                  <option>
                    pants
                  </option>
                  <option>
                    shorts
                  </option>
                  <option>
                    hats
                  </option>
                  <option>
                    bags
                  </option>
                  <option>
                    accessories
                  </option>
                  <option>
                    shoes
                  </option>
                  <option>
                    skate
                  </option>
                </Select>
              </FormControl>
            </HStack>

            <FormControl id = "name" paddingBottom = "10px">
              <FormLabel>
                Name / Url
              </FormLabel>
              <Input placeholder = "Enter item name or url" />
            </FormControl>

            <HStack paddingBottom = "10px">
              <FormControl id = "profile">
                <FormLabel>
                      Profile
                </FormLabel>
                <Select placeholder = "Select store">
                  <option>
                      Profile 1
                  </option>
                  <option>
                      Profile 2
                  </option>
                </Select>
              </FormControl>

              <FormControl id = "proxie">
                <FormLabel>
                    Proxie
                </FormLabel>
                <Select placeholder = "Select store">
                  <option >
                    Proxie 1
                  </option>
                  <option >
                    Proxie 2
                  </option>
                  <option>
                    Proxie 3
                  </option>
                </Select>
              </FormControl>
            </HStack>

            <HStack>
              <FormControl id = "size">
                <FormLabel>
                  Size
                </FormLabel>
                <Input placeholder = "Enter item size" />
              </FormControl>

              <FormControl id = "amount">
                <FormLabel>
                  Amount of tasks
                </FormLabel>
                <NumberInput min = {1}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Box>
              <Button size = "md" height = "48px" width = "200px" onClick = {onClose} border = "2px" borderColor = "purple">
                Close
              </Button>
            </Box>
            <Box paddingLeft = "15px">
              <Button size = "md" height = "48px" width = "200px" bg = "purple" color = "white">
                Create
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateTask;
