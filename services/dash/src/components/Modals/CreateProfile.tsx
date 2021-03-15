/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Tabs, TabPanel, TabPanels, TabList, Tab, Button, useDisclosure, Modal, ModalBody, ModalContent, ModalOverlay, ModalHeader, ModalFooter, HStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, PinInput, PinInputField, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { GoPlus } from 'react-icons/go';

const CreateProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box>
      <Button size = "md" height = "48px" width = "200px" border = "2px" borderColor = "purple" leftIcon = {<GoPlus />} onClick = {onOpen} >
        Create Profile
      </Button>
      <Modal onClose = {onClose} isOpen = {isOpen} isCentered size = "3xl" closeOnOverlayClick motionPreset = "slideInRight">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align = "center">
            Create Profile
          </ModalHeader>
          <ModalBody>
            <Tabs defaultIndex = {1} variant = "soft-rounded" colorScheme = "whiteAlpha">
              <TabPanels>
                <TabPanel>
                  <Box color = "purple" fontSize = "xl" fontWeight = "bold" paddingBottom = "15px">
                      General Info
                  </Box>
                  <Box>
                    <HStack paddingBottom = "15px">
                      <FormControl id = "profile">
                        <FormLabel>
                            Profile Name
                        </FormLabel>
                        <Input type = "profile" placeholder = "John Doe" />
                      </FormControl>
                      <FormControl id = "email">
                        <FormLabel>
                            Email
                        </FormLabel>
                        <Input type = "email" placeholder = "johndoe@soulkiller.io" />
                      </FormControl>
                    </HStack>

                    <HStack paddingBottom = "15px">
                      <FormControl id = "firstname">
                        <FormLabel>
                            First Name
                        </FormLabel>
                        <Input type = "firstname" placeholder = "John" />
                      </FormControl>
                      <FormControl id = "lastname">
                        <FormLabel>
                            Last Name
                        </FormLabel>
                        <Input type = "lastname" placeholder = "Doe" />
                      </FormControl>
                      <FormControl id = "phone">
                        <FormLabel>
                            Phone Number
                        </FormLabel>
                        <Input type = "phone" placeholder = "Phone" />
                      </FormControl>
                    </HStack>
                    <HStack>

                      <FormControl id = "username">
                        <FormLabel>
                            Username (Optional)
                        </FormLabel>
                        <Input type = "username" placeholder = "Username" />
                      </FormControl>
                      <FormControl id = "password">
                        <FormLabel>
                            Password (Optional)
                        </FormLabel>
                        <InputGroup size = "md">
                          <Input pr = "4.5rem"
                            type = {show ? 'text' : 'password'}
                            placeholder = "Enter password" />
                          <InputRightElement width = "4.5rem">
                            <Button h = "1.75rem" size = "sm" onClick = {handleClick}>
                              {show ? 'Hide' : 'Show'}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    </HStack>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box color = "purple" fontSize = "xl" fontWeight = "bold" paddingBottom = "15px">
                      Shipping
                  </Box>
                  <Box>
                    <HStack paddingBottom = "15px">
                      <FormControl id = "address">
                        <FormLabel>
                            Address 1
                        </FormLabel>
                        <Input type = "address" placeholder = "Address 1" />
                      </FormControl>
                      <FormControl id = "address2">
                        <FormLabel>
                            Address 2 (Optional)
                        </FormLabel>
                        <Input type = "address2" placeholder = "Address 2" />
                      </FormControl>
                    </HStack>

                    <HStack paddingBottom = "15px">
                      <FormControl id = "City">
                        <FormLabel>
                            City
                        </FormLabel>
                        <Input type = "City" placeholder = "City" />
                      </FormControl>
                      <FormControl id = "zip">
                        <FormLabel>
                            ZIP/PostalCode
                        </FormLabel>
                        <Input type = "zip" placeholder = "ZIP" />
                      </FormControl>
                    </HStack>

                    <HStack>
                      <FormControl id = "country">
                        <FormLabel>
                            Country
                        </FormLabel>
                        <Input type = "country" placeholder = "Country" />
                      </FormControl>
                      <FormControl id = "state">
                        <FormLabel>
                            State / County (Optional)
                        </FormLabel>
                        <Input type = "state" placeholder = "State" />
                      </FormControl>
                    </HStack>
                    {/* <Box align = "right">
                      <Checkbox paddingTop = "5px" colorScheme = "facebook">
                          Same for Billing
                      </Checkbox>
                    </Box> */}
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box color = "purple" fontSize = "xl" fontWeight = "bold" paddingBottom = "15px">
                      Card Info
                  </Box>
                  <Box>
                    <Box paddingBottom = "15px">
                      <FormControl id = "card-name">
                        <FormLabel>
                          Card Name
                        </FormLabel>
                        <Input type = "card-name" placeholder = "John Doe" />
                      </FormControl>
                    </Box>
                    <Box paddingBottom = "15px">
                      <FormControl id = "card-number">
                        <FormLabel>
                            Card Number
                        </FormLabel>
                        <Input type = "card-number" placeholder = "0000 0000 0000 0000" />
                      </FormControl>
                    </Box>
                    <HStack>
                      <FormControl id = "card-date">
                        <FormLabel>
                            Card Date
                        </FormLabel>
                        <HStack>
                          <PinInput>
                            <PinInputField />
                            <PinInputField />
                            <Text>
                              /
                            </Text>
                            <PinInputField />
                            <PinInputField />
                          </PinInput>
                        </HStack>
                      </FormControl>
                      <FormControl id = "card-cvv">
                        <FormLabel>
                            Card CVV
                        </FormLabel>
                        <HStack>
                          <PinInput>
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                          </PinInput>
                        </HStack>
                      </FormControl>
                    </HStack>
                  </Box>
                </TabPanel>
              </TabPanels>
              <TabList>
                <Tab>
                  General
                </Tab>
                <Tab>
                  Shipping
                </Tab>
                <Tab>
                  Card
                </Tab>
              </TabList>
            </Tabs>
          </ModalBody>
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
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateProfile;
