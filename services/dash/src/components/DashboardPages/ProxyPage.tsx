/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import {
  Box,
  Center,
  Divider,
  HStack,
  Spacer,
  Tab,
  TabList,
  Tabs,
  Text,
  useStyleConfig,
  VStack,
  Table,
  Thead,
  Tbody,
  Tooltip,
  Tr,
  Th,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import TaskButtons from '../StartStopButtons';
import AddProxy from '../Modals/AddProxy';
import { useQueryProxies } from 'hooks/useQueryProxy';
import ProxyUi from '../Proxy';
import { useState } from 'react';
import DeleteProxy from 'components/Modals/DeleteProxy';

const ProxiePage = () => {
  const greypale = useStyleConfig('taskBox');
  const white = useStyleConfig('taskColumn');
  const proxies = useQueryProxies();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box bg = "whiteblue" height = "724px" maxWidth = "1880px" borderRadius = "xl" sx = {greypale}>
      <HStack padding = "15px">

        <Box bg = "bgblue" borderRadius = "xl" height = "638px" width = "400px" sx = {white}>
          <Center>
            <Text fontSize = "md">
              Proxy Group
            </Text>
          </Center>
          <Divider />

          <Box paddingY = "10px">
            <Center>
              <Tabs variant = "solid-rounded" colorScheme = "facebook" onChange = {index => setTabIndex(index)}>
                <TabList mb = "1em">
                  <VStack>
                    {Object.keys(proxies).map(proxy => (
                      <Tab>
                        {proxy}
                      </Tab>
                    ))}
                  </VStack>
                </TabList>
              </Tabs>
            </Center>
          </Box>
        </Box>
        <Box bg = "bgblue" borderRadius = "xl" height = "638px" width = "1408px" sx = {white}
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
                      label = "The ping may appear to be higher than it actually is, because connections aren't kept around like they would be for tasks."
                    >
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
      </HStack>
      <HStack paddingX = "15px">
        <Box>
          <AddProxy />
        </Box>
        <Spacer />
        <Box>
          <TaskButtons content = "Delete bad ones" color = "purple" taskIcon = {<FaTrash />} />
        </Box>
        <Box>
          <DeleteProxy name = {Object.keys(proxies)[tabIndex]!} />
        </Box>
      </HStack>
    </Box>
  );
};

export default ProxiePage;
