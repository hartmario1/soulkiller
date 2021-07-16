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
  Text
} from '@chakra-ui/react';
import { TiPlus } from 'react-icons/ti';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { fetchApi } from '../../util';
import { ApiPutTaskResult, ApiPutTasksBody, Store } from '@soulkiller/common';

interface Task {
  store: Store;
  category: string;
  name: string;
  profile: string;
  proxy: string;
  size: number;
  amount: number;
  recurring: boolean;
}

const CreateTask = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button size = "md" height = "48px" width = "200px" border = "2px" borderColor = "purple" leftIcon = {<TiPlus />} onClick = {onOpen}>
        Create Task
      </Button>
      <Formik<Task> initialValues = {{ store: 0, category: '', name: '', profile: '', proxy: '', size: 0, amount: 0, recurring: true }}
        onSubmit = {values =>
          fetchApi<ApiPutTaskResult, ApiPutTasksBody>('/api/tasks', 'put', {
            store: values.store,
            recurring: values.recurring
          })}
        validationSchema = {Yup.object().shape({
          store: Yup.number()
            .min(Store.supreme)
            .max(Store.undefeated)
            .required('This field is required!'),
          category: Yup.string().required('This field is required!'),
          name: Yup.string().required('This field is required!'),
          profile: Yup.string().required('This field is required!'),
          proxy: Yup.string().required('This field is required!'),
          size: Yup.number().required('This field is required!'),
          amount: Yup.number().required('This field is required!'),
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
                        <Text color = "red.200">
                          {errors.store}
                        </Text>
                      )
                      : null}

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
                            <option value = "shoe">
                          shoe
                            </option>
                            <option value = "jackets">
                          jackets
                            </option>
                            <option value = "hoodies">
                          hoodies
                            </option>
                            <option value = "t-shirts">
                          t-shirts
                            </option>
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    {errors.category && touched.category
                      ? (
                        <Text color = "red.200">
                          {errors.category}
                        </Text>
                      )
                      : null}
                  </HStack>

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
                      <Text color = "red.200">
                        {errors.name}
                      </Text>
                    )
                    : null}

                  <HStack paddingBottom = "10px">
                    <Field name = "profile" as = "select">
                      {({ field }: { field: string }) => (
                        <FormControl>
                          <FormLabel>
                            Profile
                          </FormLabel>
                          <Select name = "profile" placeholder = "Select Option" {...field}>
                            <option value = "profile 1">
                              profile 1
                            </option>
                            <option value = "profile 2">
                              profile 2
                            </option>
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    {errors.profile && touched.profile
                      ? (
                        <Text color = "red.200">
                          {errors.profile}
                        </Text>
                      )
                      : null}

                    <Field name = "proxy" as = "select" >
                      {({ field }: { field: string }) => (
                        <FormControl id = "country">
                          <FormLabel>
                            Proxy
                          </FormLabel>
                          <Select name = "proxy" placeholder = "Select Option" {...field}>
                            <option value = "proxy 1">
                          proxy 1
                            </option>
                            <option value = "proxy 2">
                          proxy 2
                            </option>
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    {errors.proxy && touched.proxy
                      ? (
                        <Text color = "red.200">
                          {errors.proxy}
                        </Text>
                      )
                      : null}
                  </HStack>

                  <HStack>
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
                        <Text color = "red.200">
                          {errors.size}
                        </Text>
                      )
                      : null}
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
                        <Text color = "red.200">
                          {errors.amount}
                        </Text>
                      )
                      : null}
                  </HStack>
                </ModalBody>
                <ModalFooter>
                  <Checkbox defaultIsChecked>
                    Reccuring
                  </Checkbox>
                  <Box>
                    <Button size = "md" height = "48px" width = "200px" onClick = {onClose} border = "2px" borderColor = "purple">
                    Close
                    </Button>
                  </Box>
                  <Box paddingLeft = "15px">
                    <Button size = "md" height = "48px" width = "200px" bg = "purple" color = "white" type = "submit" onClick = {handleSubmit as any}>
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
