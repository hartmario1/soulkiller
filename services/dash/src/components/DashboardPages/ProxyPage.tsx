/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Center, Divider, HStack, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useStyleConfig, VStack } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import TaskButtons from '../StartStopButtons';
import ProxyGroup from '../Modals/ProxyGroup';
import AddProxy from '../Modals/AddProxy';
import Proxy from '../Proxy';
import TestProxy from '../Modals/TestProxy';

const ProxiePage = () => {
  const greypale = useStyleConfig('taskBox');
  const white = useStyleConfig('taskColumn');

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
              <Tabs variant = "solid-rounded" colorScheme = "facebook">
                <TabList mb = "1em">
                  <VStack>
                    <Tab>
                    Supreme
                    </Tab>
                    <Tab>
                    NikeSnkrs
                    </Tab>
                  </VStack>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <p>
                    one!
                    </p>
                  </TabPanel>
                  <TabPanel>
                    <p>
                    two!
                    </p>
                  </TabPanel>
                  <TabPanel>
                    <p>
                    three!
                    </p>
                  </TabPanel>
                </TabPanels>
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
          <HStack paddingX = "30px">
            <Text fontSize = "md">
              IP
            </Text>
            <Spacer />
            <Text fontSize = "md" isTruncated>
              User
            </Text>
            <Spacer />
            <Text fontSize = "md" isTruncated>
              Password
            </Text>
            <Spacer />
            <Text fontSize = "md">
              Speed
            </Text>
            <Spacer />
            <Text fontSize = "md" isTruncated>
              Actions
            </Text>
          </HStack>
          <Divider />
          <Box paddingY = "5px">
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
            <Proxy />
          </Box>
        </Box>
      </HStack>
      <HStack paddingX = "15px">
        <Box>
          <ProxyGroup />
        </Box>
        <Spacer />
        <Box>
          <AddProxy />
        </Box>
        <Box>
          <TestProxy />
        </Box>
        <Box>
          <TaskButtons content = "Delete all" color = "purple" taskIcon = {<FaTrash />} />
        </Box>
        <Box>
          <TaskButtons content = "Delete bad ones" color = "purple" taskIcon = {<FaTrash />} />
        </Box>
      </HStack>
    </Box>
  );
};

export default ProxiePage;
