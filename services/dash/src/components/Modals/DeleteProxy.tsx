/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Button, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { ProxyState, useProxiesStore } from 'stores';
import { fetchApi } from '../../util';

const selector = (state: ProxyState) => state;

const DeleteProxy = ({ name }: { name: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const proxies = useProxiesStore(selector);
  const toast = useToast();

  return (
    <Box>
      <Button size = "md" height = "48px" width = "200px" border = "2px" borderColor = "purple" leftIcon = {<FaTrash />} onClick = {onOpen}>
          Delete Proxy Group
      </Button>
      <Modal onClose = {onClose}
        isOpen = {isOpen}
        isCentered
        closeOnOverlayClick
        motionPreset = "slideInRight">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align = "center">
              Delete Proxy Group
          </ModalHeader>
          <ModalBody align = "center">
              This will permanently delete your proxy group. Are you sure you want to do it?
          </ModalBody>
          <ModalFooter>
            <HStack alignContent = "center">
              <Box>
                <Button onClick = {onClose}>
                  Close
                </Button>
              </Box>
              <Box>
                <Button bg = "purple" color = "white" onClick = {async () => {
                  await fetchApi('/api/proxies/', 'DELETE', { proxy_group: name });
                  proxies.clear();
                  toast({
                    status: 'info',
                    title: 'Proxy Group Deletion',
                    description: 'Proxy Group has been successfully deleted'
                  });
                }}>
                    Delete
                </Button>
              </Box>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DeleteProxy;


