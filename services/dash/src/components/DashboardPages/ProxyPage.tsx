/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import {
  Box,
  HStack,
  Spacer,
  useStyleConfig,
  Table,
  Thead,
  Tbody,
  Tooltip,
  Tr,
  Th,
  Select,
  useDisclosure
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import TaskButtons from '../StartStopButtons';
import AddProxy from '../Modals/AddProxy';
import { useQueryProxies } from 'hooks/useQueryProxy';
import ProxyUi from '../Proxy';
import { useState } from 'react';
import ProxyGroup from 'components/Modals/Groups/ProxyGroup';
import EditProxyGroup from 'components/Modals/Groups/EditProxyGroup';
import DeleteProxyGroup from 'components/Modals/Groups/DeleteProxyGroup';
import { useQueryProxyGroups } from 'hooks/useQueryProxyGroups';

const ProxiePage = () => {
  const [groupId, setGroupId] = useState<number | null>(null);
  const greypale = useStyleConfig('taskBox');
  const proxies = useQueryProxies();
  const [tabIndex] = useState(0);
  const { isOpen: createIsOpen, onClose: createOnClose, onOpen: createOnOpen } = useDisclosure();
  const proxyGroups = useQueryProxyGroups();

  return (
    <Box>
      <ProxyGroup isOpen = {createIsOpen} onClose = {createOnClose} />
      <HStack paddingBottom = "12px">
        <Select variant = "filled" placeholder = "Proxy Group" onChange = {event => {
          if (event.target.value === 'add') {
            createOnOpen();
          } else {
            setGroupId(parseInt(event.target.value, 10));
          }
        }}>
          <option value = "add">
            Add Proxy Group
          </option>
          {proxyGroups.map(group => (
            <option value = {group.id}>
              {group.name}
            </option>
          ))}
        </Select>
        <EditProxyGroup id = {groupId} />
        <DeleteProxyGroup id = {groupId} />
      </HStack>
      <Box bg = "whiteblue" height = "605px" maxWidth = "1880px" borderRadius = "xl" sx = {greypale}
        overflowY = "auto"
        css = {{
          '&::-webkit-scrollbar': {
            width: '4px'
          },
          '&::-webkit-scrollbar-track': {
            width: '6px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#7252ff',
            borderRadius: '24px'
          }
        }}>

        <Box paddingX = "15px" paddingY = "5px">
          <Table variant = "simple" size = "sm">
            <Thead>
              <Tr>
                <Th>
                  IP
                </Th>
                <Th>
                  Port
                </Th>
                <Th isNumeric>
                  User
                </Th>
                <Th isNumeric>
                  Password
                </Th>
                <Th isNumeric>
                  <Tooltip hasArrow
                    aria-label = "A tooltip"
                    bg = "purple"
                    color = "white"
                    placement = "top"
                    label = "The ping may appear to be higher than it actually is, because connections aren't kept around like they would be for tasks.">
                      Speed
                  </Tooltip>
                </Th>
                <Th isNumeric>
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.values(proxies)[tabIndex]?.map(data => (<ProxyUi data = {data} />))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      <HStack paddingTop = "10px">
        <Box>
          <AddProxy groupId = {groupId} />
        </Box>
        <Spacer />
        <Box>
          <TaskButtons content = "Delete bad ones" color = "purple" taskIcon = {<FaTrash />} />
        </Box>
      </HStack>
    </Box>

  );
};

export default ProxiePage;
