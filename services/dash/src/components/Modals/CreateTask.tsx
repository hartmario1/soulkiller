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
  useDisclosure,
  Select,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Checkbox,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react';
import { TiPlus } from 'react-icons/ti';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { fetchApi } from '../../util';
import { ApiPutTaskResult, ApiPutTasksBody, Store } from '@soulkiller/common';
import { TaskState, useTasksStore } from 'stores';

interface Task {
  store: number;
  category: string;
  name: string;
  profile: number;
  proxy: number;
  size: number;
  amount: number;
  recurring: boolean;
}

const selector = (state: TaskState) => state;

const CreateTask = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const tasks = useTasksStore(selector);

  return (
    <Box>
      <Button size = "md" height = "48px" width = "200px" border = "2px" borderColor = "purple" leftIcon = {<TiPlus />} onClick = {onOpen}>
        Create Task
      </Button>
      <Formik<Task> initialValues = {{ store: 0, category: '', name: '', profile: 0, proxy: 0, size: 0, amount: 0, recurring: true }}
        onSubmit = {async values => {
          const promises = [];
          for (let i = 0; i < values.amount; i++) {
            promises.push(
              fetchApi<ApiPutTaskResult, ApiPutTasksBody>('/api/tasks', 'PUT', {
                store: values.store,
                name: values.name,
                profile: values.profile,
                proxy: values.proxy,
                size: values.size,
                recurring: values.recurring
              })
            );
          }

          for (const promise of await Promise.allSettled(promises)) {
            if (promise.status === 'rejected') {
              toast({
                title: `Failed to create task ${values.name}`,
                description: promise.reason.message ?? promise.reason.toString(),
                status: 'error'
              });
              console.error(promise.reason);
            } else {
              tasks.add(promise.value);
            }
          }
        }}
        validationSchema = {Yup.object().shape({
          store: Yup.number()
            .min(Store.supreme)
            .max(Store.undefeated)
            .required('This field is required!'),
          category: Yup.string().required('This field is required!'),
          name: Yup.string().required('This field is required!'),
          profile: Yup.number().required('This field is required!'),
          proxy: Yup.number().required('This field is required!'),
          size: Yup.number().required('This field is required!'),
          amount: Yup.number().min(1, 'You need to create at least 1 task').required('This field is required!'),
          recurring: Yup.boolean()
        })}>
        {({ handleSubmit, errors, touched }) => (
          <Form>
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
                    <VStack w = "100%">
                      <Field name = "store" as = "select">
                        {({ field }: { field: string }) => (
                          <FormControl>
                            <FormLabel>
                            Store
                            </FormLabel>
                            <Select name = "store" placeholder = "Select Option" {...field}>
                              <option value = {Store.snkrs}>
                              NikeSnkrs
                              </option>
                              <option value = {Store.supreme}>
                              Supreme
                              </option>
                              <option value = {Store.bodega}>
                              Bodega
                              </option>
                              <option value = {Store.shoepalace}>
                              ShoePalace
                              </option>
                              <option value = {Store.undefeated}>
                              Undefeated
                              </option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      {errors.store && touched.store
                        ? (
                          <Text color = "red.500">
                            {errors.store}
                          </Text>
                        )
                        : null}
                    </VStack>

                    <VStack w = "100%">
                      <Field as = "select" name = "category">
                        {({ field }: { field: string }) => (
                          <FormControl id = "country">
                            <FormLabel>
                          Category
                            </FormLabel>

                            <Select name = "category" placeholder = "Select Option" {...field}>
                              <option value = "all">
                              all
                              </option>
                              <option value = "new">
                              new
                              </option>
                              <option value = "jackets">
                              jackets
                              </option>
                              <option value = "shirts">
                              shirts
                              </option>
                              <option value = "tops/sweaters">
                              tops/sweaters
                              </option>
                              <option value = "sweatshirts">
                              sweatshirts
                              </option>
                              <option value = "pants">
                              pants
                              </option>
                              <option value = "shorts">
                              shorts
                              </option>
                              <option value = "hats">
                              hats
                              </option>
                              <option value = "bags">
                              bags
                              </option>
                              <option value = "accessories">
                              accessories
                              </option>
                              <option value = "shoes">
                              shoes
                              </option>
                              <option value = "skate">
                              skate
                              </option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      {errors.category && touched.category
                        ? (
                          <Text color = "red.500">
                            {errors.category}
                          </Text>
                        )
                        : null}
                    </VStack>
                  </HStack>

                  <VStack>
                    <Field name = "name">
                      {({ field }: { field: string }) => (
                        <FormControl paddingBottom = "10px">
                          <FormLabel htmlFor = "name">
                          Item Name
                          </FormLabel>
                          <Input {...field} id = "name" placeholder = "Item Name" />
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
                  </VStack>

                  <HStack>
                    <VStack w = "100%">
                      <Field name = "profile" as = "select">
                        {({ field }: { field: number }) => (
                          <FormControl paddingBottom = "10px">
                            <FormLabel>
                            Profile
                            </FormLabel>
                            <Select name = "profile" placeholder = "Select Option" {...field}>
                              <option value = {1}>
                              profile 1
                              </option>
                              <option value = {2}>
                              profile 2
                              </option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      {errors.profile && touched.profile
                        ? (
                          <Text color = "red.500">
                            {errors.profile}
                          </Text>
                        )
                        : null}
                    </VStack>

                    <VStack w = "100%">
                      <Field name = "proxy" as = "select">
                        {({ field }: { field: number }) => (
                          <FormControl paddingBottom = "10px">
                            <FormLabel>
                              Proxy Group
                            </FormLabel>
                            <Select name = "proxy" placeholder = "Select Option" {...field}>
                              <option value = {1}>
                                Proxy 1
                              </option>
                              <option value = {2}>
                                Proxy 2
                              </option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      {errors.proxy && touched.proxy
                        ? (
                          <Text color = "red.500">
                            {errors.proxy}
                          </Text>
                        )
                        : null}
                    </VStack>
                  </HStack>

                  <HStack>
                    <VStack w = "100%">
                      <Field name = "size">
                        {({ field }: { field: string }) => (
                          <FormControl>
                            <FormLabel htmlFor = "size">
                          Size
                            </FormLabel>
                            <Input {...field} id = "size" placeholder = "Item Size" />
                          </FormControl>
                        )}
                      </Field>
                      {errors.size && touched.size
                        ? (
                          <Text color = "red.500">
                            {errors.size}
                          </Text>
                        )
                        : null}
                    </VStack>

                    <VStack w = "100%">
                      <Field name = "amount">
                        {({ field }: { field: string }) => (
                          <FormControl>
                            <FormLabel htmlFor = "amount">
                            Amount of tasks
                            </FormLabel>
                            <Input {...field} id = "amount" placeholder = "Amount of tasks created" />
                          </FormControl>
                        )}
                      </Field>
                      {errors.amount && touched.amount
                        ? (
                          <Text color = "red.500">
                            {errors.amount}
                          </Text>
                        )
                        : null}
                    </VStack>
                  </HStack>
                </ModalBody>
                <ModalFooter>
                  <Box paddingRight = "113px">
                    <Checkbox defaultIsChecked>
                      Reccuring
                    </Checkbox>
                  </Box>
                  <Box>
                    <Button size = "md" height = "48px" width = "200px" onClick = {onClose} border = "2px" borderColor = "purple">
                    Close
                    </Button>
                  </Box>
                  <Box paddingLeft = "15px">
                    <Button size = "md" height = "48px" width = "200px" bg = "purple" color = "white" type = "submit" onClick = {event => {
                      handleSubmit(event as any);
                      toast({
                        status: 'info',
                        title: 'Tasks Creation',
                        description: 'Tasks have been successfully created'
                      });
                    }}>
                      Create
                    </Button>
                  </Box>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateTask;
