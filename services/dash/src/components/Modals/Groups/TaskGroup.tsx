/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, Input, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { ApiPutTaskGroupBody, ApiPutTaskGroupResult } from '@soulkiller/common';
import { Field, Form, Formik } from 'formik';
import { TaskGroupState, useTaskGroupStore } from 'stores';
import * as Yup from 'yup';
import { fetchApi } from '../../../util';

interface TaskGroup {
  name: string;
  monitorDelay: number;
  retryDelay: number;
}

const selector = (state: TaskGroupState) => state;

const TaskGroup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const group = useTaskGroupStore(selector);
  const toast = useToast();

  return (
    <Box>
      <Formik<TaskGroup> initialValues = {{ name: '', monitorDelay: 0, retryDelay: 0 }}
        onSubmit = {async values => {
          console.log(values);
          try {
            const taskGroup = await fetchApi<ApiPutTaskGroupResult, ApiPutTaskGroupBody>('/api/tasks/groups', 'PUT', {
              name: values.name,
              monitor_delay: values.monitorDelay,
              retry_delay: values.retryDelay
            });

            toast({
              status: 'info',
              title: 'Task Group Creation',
              description: 'Task Group has been successfully created'
            });

            group.add(taskGroup);
          } catch (error: any) {
            toast({
              title: `Failed to create task group ${values.name}`,
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
                  Create Task Group
                </ModalHeader>
                <ModalBody textAlign = "center">
                  <Field name = "name">
                    {({ field }: { field: any }) => (
                      <FormControl id = "task-group">
                        <FormLabel>
                          Create Task Group
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
                          <Input placeholder = "Enter Monitor Delay" {...field} id = "monitorDelay" />
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
                          <Input placeholder = "Enter Retry Delay" {...field} id = "retryDelay" />
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

export default TaskGroup;

