/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Tabs,
  Text,
  useToast,
  VStack,
  TabPanels,
  TabPanel,
  InputGroup,
  InputRightElement,
  Tab,
  TabList
} from '@chakra-ui/react';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { fetchApi } from '../../util';
import { ApiPatchProfileBody, ApiPatchProfileResult } from '@soulkiller/common';
import { ProfileState, useProfilesStore } from 'stores/profiles';

interface Profile {
  profile_name: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  username?: string;
  password?: string;
  address1: string;
  address2?: string;
  city: string;
  zip: number;
  country: string;
  state?: string;
  cname: string;
  cnumber: string;
  month: number;
  year: number;
  cvv: number;
}

const selector = (state: ProfileState) => state;

const EditProfile = ({ isOpen, onClose, name }: { isOpen: boolean; onClose: () => void; name: string }) => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const profiles = useProfilesStore(selector);

  return (
    <Box>
      <Formik<Profile> initialValues = {{
        profile_name: '',
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        address1: '',
        city: '',
        zip: 0,
        country: '',
        state: '',
        cname: '',
        cnumber: '',
        month: 0,
        year: 0,
        cvv: 0
      }}
      onSubmit = {async values => {
        try {
          const profile = await fetchApi<ApiPatchProfileResult, ApiPatchProfileBody>(`/api/profiles/${encodeURIComponent(name)}`, 'PATCH', {
            profile_name: values.profile_name,
            email: values.email,
            first_name: values.first_name,
            last_name: values.last_name,
            phone: values.phone,
            username: values.username,
            password: values.password,
            address1: values.address1,
            address2: values.address2,
            city: values.city,
            zip: values.zip,
            country: values.country,
            state: values.state,
            cname: values.cname,
            cnumber: values.cnumber,
            month: values.month,
            year: values.year,
            cvv: values.cvv
          });

          toast({
            status: 'info',
            title: 'Profile Editing',
            description: 'Profile has been successfully edited'
          });

          profiles.add(profile);
        } catch (error) {
          toast({
            title: `Failed to edit profile ${values.profile_name}`,
            description: error.message ?? error.toString(),
            status: 'error'
          });
          console.error(error);
        }
      }}
      validationSchema = {Yup.object().shape({
        profile_name: Yup.string().required('This field is required!'),
        email: Yup.string().required('This field is required!'),
        first_name: Yup.string().required('This field is required!'),
        last_name: Yup.string().required('This field is required!'),
        phone: Yup.string().required('This field is required!'),
        username: Yup.string(),
        password: Yup.string(),

        address1: Yup.string().required('This field is required!'),
        address2: Yup.string(),
        city: Yup.string().required('This field is required!'),
        zip: Yup.number().required('This field is required!'),
        country: Yup.string().required('This field is required!'),
        state: Yup.string(),

        cname: Yup.string().required('This field is required!'),
        cnumber: Yup.string().length(16, 'Please enter a valid card number').required('This field is required!'),
        month: Yup.number()
          .min(1, 'Enter a valid month')
          .max(12, 'Enter a valid month')
          .required('This field is required!'),
        year: Yup.number()
          .min(new Date().getFullYear())
          .max(3050)
          .required('This field is required!'),
        cvv: Yup.number()
          .min(100)
          .max(999)
          .required('This field is required!')
      })}>
        {({ handleSubmit, errors, touched }) => (
          <Form>
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
                            <VStack w = "100%">
                              <Field name = "profile_name">
                                {({ field }: { field: string }) => (
                                  <FormControl id = "profile">
                                    <FormLabel>
                                    Profile Name
                                    </FormLabel>
                                    <Input {...field} type = "profile" placeholder = "John Doe" />
                                  </FormControl>
                                )}
                              </Field>
                              {errors.profile_name && touched.profile_name
                                ? (
                                  <Text color = "red.500">
                                    {errors.profile_name}
                                  </Text>
                                )
                                : null}
                            </VStack>

                            <VStack w = "100%">
                              <Field name = "email">
                                {({ field }: { field: string }) => (
                                  <FormControl id = "email">
                                    <FormLabel>
                                  Email
                                    </FormLabel>
                                    <Input {...field} type = "email" placeholder = "johndoe@soulkiller.io" />
                                  </FormControl>
                                )}
                              </Field>
                              {errors.email && touched.email
                                ? (
                                  <Text color = "red.500">
                                    {errors.email}
                                  </Text>
                                )
                                : null}
                            </VStack>
                          </HStack>

                          <HStack paddingBottom = "15px">
                            <VStack w = "100%">
                              <Field name = "first_name">
                                {({ field }: { field: string }) => (
                                  <FormControl id = "firstname">
                                    <FormLabel>
                                  First Name
                                    </FormLabel>
                                    <Input {...field} type = "firstname" placeholder = "John" />
                                  </FormControl>
                                )}
                              </Field>
                              {errors.first_name && touched.first_name
                                ? (
                                  <Text color = "red.500">
                                    {errors.first_name}
                                  </Text>
                                )
                                : null}
                            </VStack>
                            <VStack w = "100%">
                              <Field name = "last_name">
                                {({ field }: { field: string }) => (
                                  <FormControl id = "lastname">
                                    <FormLabel>
                                  Last Name
                                    </FormLabel>
                                    <Input {...field} type = "lastname" placeholder = "Doe" />
                                  </FormControl>
                                )}
                              </Field>
                              {errors.last_name && touched.last_name
                                ? (
                                  <Text color = "red.500">
                                    {errors.last_name}
                                  </Text>
                                )
                                : null}
                            </VStack>
                            <VStack w = "100%">
                              <Field name = "phone">
                                {({ field }: { field: string }) => (
                                  <FormControl id = "phone">
                                    <FormLabel>
                                  Phone Number
                                    </FormLabel>
                                    <Input {...field} type = "phone" placeholder = "Phone" />
                                  </FormControl>
                                )}
                              </Field>
                              {errors.phone && touched.phone
                                ? (
                                  <Text color = "red.500">
                                    {errors.phone}
                                  </Text>
                                )
                                : null}
                            </VStack>
                          </HStack>

                          <HStack>
                            <Field name = "username">
                              {({ field }: { field: string }) => (
                                <FormControl id = "username">
                                  <FormLabel>
                                  Username (Optional)
                                  </FormLabel>
                                  <Input {...field} type = "username" placeholder = "Username" />
                                </FormControl>
                              )}
                            </Field>
                            {errors.username && touched.username
                              ? (
                                <Text color = "red.500">
                                  {errors.username}
                                </Text>
                              )
                              : null}

                            <Field name = "password">
                              {({ field }: { field: string }) => (
                                <FormControl id = "password">
                                  <FormLabel>
                                Password (Optional)
                                  </FormLabel>
                                  <InputGroup size = "md">
                                    <Input pr = "4.5rem"
                                      type = {show ? 'text' : 'password'}
                                      placeholder = "Enter password"
                                      {...field} />
                                    <InputRightElement width = "4.5rem">
                                      <Button h = "1.75rem" size = "sm" onClick = {handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                      </Button>
                                    </InputRightElement>
                                  </InputGroup>
                                </FormControl>
                              )}
                            </Field>
                            {errors.password && touched.password
                              ? (
                                <Text color = "red.500">
                                  {errors.password}
                                </Text>
                              )
                              : null}
                          </HStack>
                        </Box>
                      </TabPanel>
                      <TabPanel>
                        <Box color = "purple" fontSize = "xl" fontWeight = "bold" paddingBottom = "15px">
                        Shipping
                        </Box>
                        <Box>
                          <HStack paddingBottom = "15px">
                            <VStack w = "100%">
                              <Field name = "address1">
                                {({ field }: { field: string }) => (
                                  <FormControl id = "address">
                                    <FormLabel>
                                  Address 1
                                    </FormLabel>
                                    <Input {...field} type = "address" placeholder = "Address 1" />
                                  </FormControl>
                                )}
                              </Field>
                              {errors.address1 && touched.address1
                                ? (
                                  <Text color = "red.500">
                                    {errors.address1}
                                  </Text>
                                )
                                : null}
                            </VStack>

                            <Field name = "address2">
                              {({ field }: { field: string }) => (
                                <FormControl id = "address2">
                                  <FormLabel>
                                  Address 2 (Optional)
                                  </FormLabel>
                                  <Input {...field} type = "address2" placeholder = "Address 2" />
                                </FormControl>
                              )}
                            </Field>
                            {errors.address2 && touched.address2
                              ? (
                                <Text color = "red.500">
                                  {errors.address2}
                                </Text>
                              )
                              : null}
                          </HStack>

                          <HStack paddingBottom = "15px">
                            <VStack w = "100%">
                              <Field name = "city">
                                {({ field }: { field: string }) => (
                                  <FormControl id = "City">
                                    <FormLabel>
                                  City
                                    </FormLabel>
                                    <Input {...field} type = "City" placeholder = "City" />
                                  </FormControl>
                                )}
                              </Field>
                              {errors.city && touched.city
                                ? (
                                  <Text color = "red.500">
                                    {errors.city}
                                  </Text>
                                )
                                : null}
                            </VStack>
                            <VStack w = "100%">
                              <Field name = "zip">
                                {({ field }: { field: string }) => (
                                  <FormControl id = "zip">
                                    <FormLabel>
                                  ZIP/PostalCode
                                    </FormLabel>
                                    <Input {...field} type = "zip" placeholder = "ZIP" />
                                  </FormControl>
                                )}
                              </Field>
                              {errors.zip && touched.zip
                                ? (
                                  <Text color = "red.500">
                                    {errors.zip}
                                  </Text>
                                )
                                : null}
                            </VStack>
                          </HStack>

                          <HStack>
                            <VStack w = "100%">
                              <Field name = "country">
                                {({ field }: { field: string }) => (
                                  <FormControl id = "country">
                                    <FormLabel>
                                  Country
                                    </FormLabel>
                                    <Input {...field} type = "country" placeholder = "Country" />
                                  </FormControl>
                                )}
                              </Field>
                              {errors.country && touched.country
                                ? (
                                  <Text color = "red.500">
                                    {errors.country}
                                  </Text>
                                )
                                : null}
                            </VStack>

                            <Field name = "state">
                              {({ field }: { field: string }) => (
                                <FormControl id = "state">
                                  <FormLabel>
                                  State / County (Optional)
                                  </FormLabel>
                                  <Input {...field} type = "state" placeholder = "State" />
                                </FormControl>
                              )}
                            </Field>
                            {errors.state && touched.state
                              ? (
                                <Text color = "red.500">
                                  {errors.state}
                                </Text>
                              )
                              : null}
                          </HStack>
                        </Box>
                      </TabPanel>
                      <TabPanel>
                        <Box color = "purple" fontSize = "xl" fontWeight = "bold" paddingBottom = "15px">
                        Card Info
                        </Box>
                        <Box>
                          <Box paddingBottom = "15px">
                            <VStack w = "100%">
                              <Field name = "cname">
                                {({ field }: { field: string }) => (
                                  <FormControl id = "card-name">
                                    <FormLabel>
                                  Card Name
                                    </FormLabel>
                                    <Input {...field} type = "card-name" placeholder = "John Doe" />
                                  </FormControl>
                                )}
                              </Field>
                              {errors.cname && touched.cname
                                ? (
                                  <Text color = "red.500">
                                    {errors.cname}
                                  </Text>
                                )
                                : null}
                            </VStack>
                          </Box>
                          <Box paddingBottom = "15px">
                            <VStack w = "100%">
                              <Field name = "cnumber">
                                {({ field }: { field: string }) => (
                                  <FormControl id = "card-number">
                                    <FormLabel>
                                  Card Number
                                    </FormLabel>
                                    <Input {...field} type = "card-number" placeholder = "0000 0000 0000 0000" />
                                  </FormControl>
                                )}
                              </Field>
                              {errors.cnumber && touched.cnumber
                                ? (
                                  <Text color = "red.500">
                                    {errors.cnumber}
                                  </Text>
                                )
                                : null}
                            </VStack>
                          </Box>
                          <HStack>
                            <VStack w = "100%">
                              <Field name = "month">
                                {({ field }: { field: string }) => (
                                  <FormControl id = "card-month">
                                    <FormLabel>
                                  Card Month
                                    </FormLabel>
                                    <Input {...field} type = "card-month" placeholder = "04" />
                                  </FormControl>
                                )}
                              </Field>
                              {errors.month && touched.month
                                ? (
                                  <Text color = "red.500">
                                    {errors.month}
                                  </Text>
                                )
                                : null}
                            </VStack>
                            <VStack w = "100%">
                              <Field name = "year">
                                {({ field }: { field: string }) => (
                                  <FormControl id = "card-year">
                                    <FormLabel>
                                  Card Year
                                    </FormLabel>
                                    <Input {...field} type = "card-year" placeholder = "2056" />
                                  </FormControl>
                                )}
                              </Field>
                              {errors.year && touched.year
                                ? (
                                  <Text color = "red.500">
                                    {errors.year}
                                  </Text>
                                )
                                : null}
                            </VStack>
                            <VStack w = "100%">
                              <Field name = "cvv">
                                {({ field }: { field: string }) => (
                                  <FormControl id = "card-cvv">
                                    <FormLabel>
                                  Card CVV
                                    </FormLabel>
                                    <Input {...field} type = "card-cvv" placeholder = "000" />
                                  </FormControl>
                                )}
                              </Field>
                              {errors.cvv && touched.cvv
                                ? (
                                  <Text color = "red.500">
                                    {errors.cvv}
                                  </Text>
                                )
                                : null}
                            </VStack>
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
                    <Button bg = "purple" color = "white" onClick = {event => handleSubmit(event as any)}>
                      Edit
                    </Button>
                  </HStack>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditProfile;

