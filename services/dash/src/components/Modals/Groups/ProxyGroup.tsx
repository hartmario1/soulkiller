/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, Input, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { ApiPutProxyGroupBody, ApiPutProxyGroupResult } from '@soulkiller/common';
import { Field, Form, Formik } from 'formik';
import { ProxyGroupState, useProxyGroupStore } from 'stores';
import * as Yup from 'yup';
import { fetchApi } from '../../../util';

interface ProxyGroup {
  name: string;
}

const selector = (state: ProxyGroupState) => state;

const ProxyGroup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const group = useProxyGroupStore(selector);
  const toast = useToast();

  return (
    <Box>
      <Formik<ProxyGroup> initialValues = {{ name: '' }}
        onSubmit = {async values => {
          try {
            const proxyGroup = await fetchApi<ApiPutProxyGroupResult, ApiPutProxyGroupBody>('/api/proxies/groups', 'PUT', {
              name: values.name
            });

            toast({
              status: 'info',
              title: 'Proxy Group Creation',
              description: 'Proxy Group has been successfully created'
            });

            group.add(proxyGroup);
          } catch (error: any) {
            toast({
              title: `Failed to create proxy group ${values.name}`,
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
                   Create Proxy Group
                </ModalHeader>
                <ModalBody align = "center">
                  <Field name = "name">
                    {({ field }: { field: string }) => (
                      <FormControl id = "proxy-group">
                        <FormLabel>
                           Create Proxy Group
                        </FormLabel>
                        <Input placeholder = "Proxy Group Name" {...field} id = "name" />
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

export default ProxyGroup;
