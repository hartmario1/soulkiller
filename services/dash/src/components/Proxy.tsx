/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Tr, Td, useStyleConfig, Flex, Spacer, HStack, Box, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { ProxyState, ProxyWithStatus, useProxiesStore } from 'stores';
import { fetchApi } from '../util';

const selector = (state: ProxyState) => state;

const ProxyUi = ({ data }: { data: ProxyWithStatus }) => {
  const proxyColor = useStyleConfig('proxyColumn');
  const proxies = useProxiesStore(selector);
  const toast = useToast();

  return (
    <Tr bg = "bgblue" sx = {proxyColor}>
      <Td borderTopLeftRadius = "3xl" borderBottomLeftRadius = "3xl" paddingY = "13px">
        {data.ip}
      </Td>
      <Td>
        {data.port}
      </Td>
      <Td isNumeric>
        {data.username}
      </Td>
      <Td isNumeric>
        {data.password}
      </Td>
      <Td isNumeric>
        {data.ping ? `${data.ping.toFixed(0)} ms` : 'unknown'}
      </Td>
      <Td isNumeric borderTopRightRadius = "3xl" borderBottomRightRadius = "3xl">
        <Flex>
          <Spacer />
          <HStack>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FaTrash />} size = "sm" onClick = {async () => {
                await fetchApi(`/api/proxies/${data.ip}:${data.port}`, 'DELETE');
                proxies.remove(data);
                toast({
                  status: 'info',
                  title: 'Proxy Deletion',
                  description: 'Proxy has been successfully deleted'
                });
              }} />
            </Box>
          </HStack>
        </Flex>
      </Td>
    </Tr>
  );
};

export default ProxyUi;
