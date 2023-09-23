/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, Input, FormControl, FormLabel, Text, useDisclosure } from '@chakra-ui/react';
import { ApiPatchTaskGroupBody, ApiPatchTaskGroupResult } from '@soulkiller/common';
import { Field, Form, Formik } from 'formik';
import { TaskGroupState, useTaskGroupStore } from 'stores';
import * as Yup from 'yup';
import { FiEdit } from 'react-icons/fi';
import { fetchApi } from '../../../util';
import TaskGroup from './TaskGroup';

const selector = (state: TaskGroupState) => state;

const EditTaskGroup = ({ id }: { id: number | null }) => {
  const group = useTaskGroupStore(selector);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

  return (
    <Box>
      <Button onClick = {onOpen}>
        <FiEdit />
      </Button>
      <Formik<TaskGroup> initialValues = {{ name: '', monitorDelay: 0, retryDelay: 0 }}
        onSubmit = {async values => {
          try {
            const taskGroup = await fetchApi<ApiPatchTaskGroupResult, ApiPatchTaskGroupBody>(`/api/tasks/groups/${id}`, 'PATCH', {
              name: values.name,
              monitor_delay: values.monitorDelay,
              retry_delay: values.retryDelay
            });

            toast({
              status: 'info',
              title: 'Task Group Editing',
              description: 'Task Group has been successfully edited'
            });

            group.add(taskGroup);
          } catch (error: any) {
            toast({
              title: `Failed to edit task group ${values.name}`,
              description: error.message ?? error.toString(),
              status: 'error'
            });
            console.error(error);
          }
        }}
        validationSchema = {Yup.object().shape({
          name: Yup.string().required('This field is required!'),
          monitorDelay: Yup.number()
            .required('This field is required!')
            .min(1),
          retryDelay: Yup.number()
            .required('This field is required!')
            .min(1)
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
                   Edit Task Group
                </ModalHeader>
                <ModalBody textAlign = "center">
                  <Field name = "name">
                    {({ field }: { field: any }) => (
                      <FormControl id = "task-group">
                        <FormLabel>
                           Edit Task Group
                        </FormLabel>
                        <Input placeholder = "Task Group Name" {...field} id = "name" />
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
                  <HStack paddingTop = "13px">
                    <Field name = "monitorDelay">
                      {({ field }: { field: any }) => (
                        <FormControl id = "monitor-delay">
                          <FormLabel>
                              Monitor Delay
                          </FormLabel>
                          <Input placeholder = "Edit Monitor Delay" {...field} id = "monitorDelay" />
                        </FormControl>
                      )}
                    </Field>
                    {errors.monitorDelay && touched.monitorDelay
                      ? (
                        <Text color = "red.500">
                          {errors.monitorDelay}
                        </Text>
                      )
                      : null}
                    <Field name = "retryDelay">
                      {({ field }: { field: any }) => (
                        <FormControl id = "retry-delay">
                          <FormLabel>
                             Retry Delay
                          </FormLabel>
                          <Input placeholder = "Edit Retry Delay" {...field} id = "retryDelay" />
                        </FormControl>
                      )}
                    </Field>
                    {errors.retryDelay && touched.retryDelay
                      ? (
                        <Text color = "red.500">
                          {errors.retryDelay}
                        </Text>
                      )
                      : null}
                  </HStack>
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

export default EditTaskGroup;


