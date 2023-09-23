/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, Input, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { ApiPutProfileGroupResult, ApiPutProfileGroupBody } from '@soulkiller/common';
import { Field, Form, Formik } from 'formik';
import { ProfileGroupState, useProfileGroupStore } from 'stores';
import { fetchApi } from '../../../util';
import * as Yup from 'yup';

interface ProfileGroup {
  name: string;
}

const selector = (state: ProfileGroupState) => state;

const ProfileGroup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const group = useProfileGroupStore(selector);
  const toast = useToast();

  return (
    <Box>
      <Formik<ProfileGroup> initialValues = {{ name: '' }}
        onSubmit = {async values => {
          try {
            const profileGroup = await fetchApi<ApiPutProfileGroupResult, ApiPutProfileGroupBody>('/api/profiles/groups', 'PUT', {
              name: values.name
            });

            toast({
              status: 'info',
              title: 'Profile Group Creation',
              description: 'Profile Group has been successfully created'
            });

            group.add(profileGroup);
          } catch (error: any) {
            toast({
              title: `Failed to create profile group ${values.name}`,
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
                <ModalHeader textAlign = "center">
                   Create Profile Group
                </ModalHeader>
                <ModalBody textAlign = "center">
                  <Field name = "name">
                    {({ field }: { field: any }) => (
                      <FormControl id = "profile-group">
                        <FormLabel>
                           Create Profile Group
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
                         Create
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

export default ProfileGroup;


