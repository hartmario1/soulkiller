import { Box, HStack, IconButton, Spacer, Text, useStyleConfig } from '@chakra-ui/react';
import { FaPlay, FaTrash } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import type { Task as TaskData } from '@soulkiller/common';

const STORES = [
  'supreme'
] as const;

const Task = ({ data }: { data: TaskData }) => {
  const taskStyle = useStyleConfig('taskColumn');

  return (
    <Box paddingX = "10px" paddingBottom = "5px">
      <Box bg = "bgblue" borderRadius = "xl" sx = {taskStyle}>
        <HStack paddingX = "20px" paddingY = "5px">
          <Text>
            {STORES[data.store]}
          </Text>
          <Spacer />
          <Text isTruncated>
            {data.name}
          </Text>
          <Spacer />
          <Text isTruncated>
            {data.size}
          </Text>
          <Spacer />
          <Text isTruncated>
            Profile 1
          </Text>
          <Spacer />
          <Text isTruncated>
            Waiting for start
          </Text>
          <Spacer />
          <HStack>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FaPlay />} size = "sm" />
            </Box>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FiEdit2 />} size = "sm" />
            </Box>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FaTrash />} size = "sm" />
            </Box>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default Task;
