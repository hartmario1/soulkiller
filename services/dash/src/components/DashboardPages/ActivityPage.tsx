/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Divider, Stat, StatGroup, StatLabel, StatNumber, useStyleConfig, Table, Thead, Tr, Th, Tbody } from '@chakra-ui/react';
import ActivityTask from '../ActivityTask';

const ActivityPage = () => {
  const styles = useStyleConfig('taskBox');

  return (
    <Box>
      <Box paddingBottom = "15px">
        <StatGroup>
          <Stat>
            <StatLabel>
            Total Tasks Created
            </StatLabel>
            <StatNumber color = "purple">
            107
            </StatNumber>
          </Stat>

          <Stat>
            <StatLabel>
            Total Checkouts
            </StatLabel>
            <StatNumber color = "purple">
            74
            </StatNumber>
          </Stat>

          <Stat>
            <StatLabel>
            Succesfull Checkouts
            </StatLabel>
            <StatNumber color = "green.400">
            74
            </StatNumber>
          </Stat>

          <Stat>
            <StatLabel>
            Failed Tasks
            </StatLabel>
            <StatNumber color = "red.400">
            33
            </StatNumber>
          </Stat>
        </StatGroup>
      </Box>
      <Divider />
      <Box paddingTop = "15px">
        <Box bg = "whiteblue" height = "624px" maxWidth = "1880px" borderRadius = "xl" sx = {styles}
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
          <Box paddingY = "10px" paddingX = "20px">
            <Table variant = "simple" size = "sm">
              <Thead>
                <Tr>
                  <Th>
                    Store
                  </Th>
                  <Th>
                    Name/url
                  </Th>
                  <Th>
                    size
                  </Th>
                  <Th isNumeric>
                    profile
                  </Th>
                  <Th isNumeric>
                    proxy
                  </Th>
                  <Th isNumeric>
                    status
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <ActivityTask />
                <ActivityTask />
                <ActivityTask />
                <ActivityTask />
                <ActivityTask />
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ActivityPage;
