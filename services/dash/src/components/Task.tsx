import { Box, HStack, IconButton, Spacer, useStyleConfig, Tr, Td, Flex, useToast, useDisclosure } from '@chakra-ui/react';
import { FaPlay, FaTrash } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { Store, Task as TaskData } from '@soulkiller/common';
import { TaskState, useTasksStore } from 'stores';
import { fetchApi } from '../util';
import EditTask from './Modals/EditTask';

const selector = (state: TaskState) => state;

const Task = ({ data }: { data: TaskData }) => {
  const taskStyle = useStyleConfig('taskColumn');
  const tasks = useTasksStore(selector);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Tr bg = "bgblue" sx = {taskStyle}>
      <Td borderTopLeftRadius = "3xl" borderBottomLeftRadius = "3xl">
        {Store[data.store]?.toUpperCase()}
      </Td>
      <Td>
        {data.name}
      </Td>
      <Td isNumeric>
        {data.size}
      </Td>
      <Td isNumeric>
        Profile
        {data.profile}
      </Td>
      <Td isNumeric>
        Waiting for start
      </Td>
      <Td isNumeric borderTopRightRadius = "3xl" borderBottomRightRadius = "3xl">
        <Flex>
          <Spacer />
          <HStack>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FaPlay />} size = "sm" />
            </Box>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FiEdit2 />} size = "sm" onClick = {onOpen} />
              <EditTask isOpen = {isOpen} onClose = {onClose} ids = {[data.id]} />
            </Box>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FaTrash />} size = "sm" onClick = {async () => {
                await fetchApi(`/api/tasks/${data.id}`, 'DELETE');
                tasks.remove(data);
                toast({
                  status: 'info',
                  title: 'Task Deletion',
                  description: 'Task has been successfully deleted'
                });
              }} />
            </Box>
          </HStack>
        </Flex>
      </Td>
    </Tr>
  );
};

export default Task;
