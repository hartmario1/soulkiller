/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, Input, FormControl, FormLabel, useDisclosure, Text } from '@chakra-ui/react';
import { ProfileGroupState, useProfileGroupStore } from 'stores';
import { ApiPatchProfileGroupResult, ApiPatchProfileGroupBody } from '@soulkiller/common';
import { fetchApi } from '../../../util';
import { FiEdit } from 'react-icons/fi';
import ProfileGroup from './ProfileGroup';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const selector = (state: ProfileGroupState) => state;

const EditProxyGroup = ({ id }: { id: number }) => {
  const group = useProfileGroupStore(selector);
  const toast = useToast();
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Box>
      <Button onClick = {onOpen}>
        <FiEdit />
      </Button>
      <Formik<ProfileGroup> initialValues = {{ name: '' }}
        onSubmit = {async values => {
          try {
            const profileGroup = await fetchApi<ApiPatchProfileGroupResult, ApiPatchProfileGroupBody>(`/api/profiles/groups/${id}`, 'PATCH', {
              name: values.name
            });

            toast({
              status: 'info',
              title: 'Profile Group Editing',
              description: 'Profile Group has been successfully edited'
            });

            group.add(profileGroup);
          } catch (error: any) {
            toast({
              title: `Failed to edit profile group ${values.name}`,
              description: error.message ?? error.toString(),
              status: 'error'
            });
            console.error(error);
          }
        }}
        validationSchema = {Yup.object().shape({
          name: Yup.string().required('This field is required!'),
        })}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form>
            <Modal onClose = {onClose}
              isOpen = {isOpen}
              isCentered
              closeOnOverlayClick
              motionPreset = "slideInRight"
              size = "xl">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader align = "center">
                    Edit Profile Group
                </ModalHeader>
                <ModalBody align = "center">
                  <Field name = "name">
                    {({ field }: { field: string }) => (
                      <FormControl id = "profile-group">
                        <FormLabel>
                            Edit Profile Group
                        </FormLabel>
                        <Input placeholder = "Profile Group Name" {...field} id = "name" />
                      </FormControl>
                    )}
                  </Field>
                  {errors.name && touched.name
                    ? (
                      <Text color = "red.500">
                        {errors.name}
                      </Text>
                    )
                    : null}
                </ModalBody>
                <ModalFooter>
                  <HStack alignContent = "center">
                    <Box>
                      <Button onClick = {onClose}>
                          Close
                      </Button>
                    </Box>
                    <Box>
                      <Button bg = "purple" color = "white" onClick = {event => handleSubmit(event as any)}>
                          Edit
                      </Button>
                    </Box>
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

export default EditProxyGroup;


