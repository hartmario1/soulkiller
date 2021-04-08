/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, HStack, Spacer, Text, Wrap, WrapItem, useStyleConfig } from '@chakra-ui/react';
import TaskButtons from '../StartStopButtons';
import Task from '../Task';
import { FaPlay, FaStop } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import DeleteModal from '../Modals/DeleteModal';
import CreateTask from '../Modals/CreateTask';
import Captcha from 'components/Modals/Captcha';
import SuccesToast from 'components/SuccesToast';

const TaskPage = () => {
  const styles = useStyleConfig('taskBox');

  return (
    <Box>
      <Box>
        <Box bg = "whiteblue" height = "666px" maxWidth = "1880px" borderRadius = "xl" paddingBottom = "7px"
          sx = {styles}
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
          <Box paddingY = "10px" paddingX = "30px">
            <Box>
              <HStack paddingX = "20px" paddingY = "5px">
                <Text>
                  Store
                </Text>
                <Spacer />
                <Text isTruncated>
                  Name/Url
                </Text>
                <Spacer />
                <Text isTruncated>
                  Size
                </Text>
                <Spacer />
                <Text isTruncated>
                  Profile
                </Text>
                <Spacer />
                <Text isTruncated>
                  Status
                </Text>
                <Spacer />
                <Text isTruncated>
                  Actions
                </Text>
              </HStack>
            </Box>
          </Box>

          {/* Tasks */}
          <Box>
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
          </Box>
          <SuccesToast />
        </Box>
      </Box>

      {/* Bot Buttons */}
      <Wrap paddingTop = "10px">
        <WrapItem paddingRight = "1px">
          <CreateTask />
        </WrapItem>
        <WrapItem>
          <TaskButtons content = "Start Tasks" color = "purple" taskIcon = {<FaPlay />} />
        </WrapItem>

        <Spacer />
        <WrapItem>
          <TaskButtons content = "Cancel Tasks" color = "red.600" taskIcon = {<FaStop />} />
        </WrapItem>
        <WrapItem>
          <DeleteModal title = "Delete Tasks" modalBody = "This will permanently delete your tasks. Are you sure you want to do it?" borderColor = "red.600" />
        </WrapItem>

        <Spacer />
        <WrapItem>
          <TaskButtons content = "Edit Tasks" color = "purple" taskIcon = {<FiEdit2 />} />
        </WrapItem>
        <WrapItem>
          <Captcha />
        </WrapItem>
      </Wrap>
    </Box>
  );
};
export default TaskPage;
