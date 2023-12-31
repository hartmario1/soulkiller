/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Textarea, Text, useToast, Button, FormControl, FormLabel, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { GoPlus } from 'react-icons/go';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { fetchApi } from '../../util';
import { ApiPutProxyBody, ApiPutProxyResult } from '@soulkiller/common';
import { ProxyState, useProxiesStore } from 'stores';

const proxyPattern = /^(?<ip>(?:[0-9]{1,3}\.){3}[0-9]{1,3}):(?<port>[0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]):(?<username>\w+):(?<password>\w+)$/mg;
const selector = (state: ProxyState) => state;

const AddProxy = ({ groupId }: { groupId: number | null }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const proxies = useProxiesStore(selector);

  return (
    <Box>
      <Button size = "md" height = "48px" width = "200px" border = "2px" borderColor = "purple" leftIcon = {<GoPlus />} onClick = {onOpen} >
        Add Proxies
      </Button>
      <Formik<{proxies: string}> initialValues = {{ proxies: '' }}
        onSubmit = {async values => {
          const promises = [];
          for (const match of values.proxies.matchAll(proxyPattern)) {
            const data = match.groups as { ip: string; port: string; username: string; password: string };
            promises.push(
              fetchApi<ApiPutProxyResult, ApiPutProxyBody>('/api/proxies/', 'PUT', {
                ...data,
                group_id: groupId
              })
            );
          }

          for (const promise of await Promise.allSettled(promises)) {
            if (promise.status === 'rejected') {
              toast({
                title: 'Failed to create proxies',
                description: promise.reason.message ?? promise.reason.toString(),
                status: 'error'
              });
              console.error(promise.reason);
            } else {
              proxies.add({ ...promise.value, ping: null });
            }
          }
        }}
        validationSchema = {Yup.object().shape({
          proxies: Yup
            .string()
            .matches(proxyPattern, 'One of the proxies is invalid')
            .required('This field is required!'),
        })}>
        {({ handleSubmit, errors, touched }) => (
          <Form>
            <Modal onClose = {onClose} isOpen = {isOpen} isCentered size = "2xl" closeOnOverlayClick motionPreset = "slideInRight">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader textAlign = "center">
                Add Proxies
                </ModalHeader>
                <ModalBody>
                  <Field name = "proxies">
                    {({ field }: { field: any }) => (
                      <FormControl id = "add-proxy">
                        <FormLabel>
                        Proxies
                        </FormLabel>
                        <Textarea {...field} type = "add-proxy" height = "300px" placeholder = "Paste proxies as ip:port:username:password" />
                      </FormControl>
                    )}
                  </Field>
                  {errors.proxies && touched.proxies
                    ? (
                      <Text color = "red.500">
                        {errors.proxies}
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
                      Add
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

export default AddProxy;
