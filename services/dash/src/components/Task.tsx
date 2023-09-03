import { Box, HStack, IconButton, Spacer, useStyleConfig, Tr, Td, Flex, useToast, useDisclosure } from '@chakra-ui/react';
import { FaPlay, FaStop, FaTrash } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { HiRefresh } from 'react-icons/hi';
import { ApiPatchTaskStartResult, ApiPatchTaskCancelResult, Status, Store, Task as TaskData } from '@soulkiller/common';
import { TaskState, useTasksStore } from 'stores';
import { fetchApi } from '../util';
import EditTask from './Modals/EditTask';

const selector = (state: TaskState) => state;

const Task = ({ data }: { data: TaskData }) => {
  const taskStyle = useStyleConfig('taskColumn');
  const tasks = useTasksStore(selector);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  let status: string;
  switch (data.status) {
    case Status.idle: {
      status = 'Waiting for start';
      break;
    }

    case Status.stopped: {
      status = 'Task Stopped';
      break;
    }

    case Status.failed: {
      status = 'Task failed';
      break;
    }

    case Status.waiting:
    case Status.loading: {
      status = 'Executing task';
      break;
    }

    case Status.captcha: {
      status = 'Waiting to rezolve Captcha';
      break;
    }

    case Status.waitingForCancel: {
      status = 'Canceling';
      break;
    }

    case Status.checkingOut: {
      status = 'Checking Out';
      break;
    }

    case Status.done: {
      status = 'Checked Out';
      break;
    }
  }

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
        {status}
      </Td>
      <Td isNumeric borderTopRightRadius = "3xl" borderBottomRightRadius = "3xl">
        <Flex>
          <Spacer />
          <HStack>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FaPlay />} size = "sm" onClick = {async () => {
                const task = await fetchApi<ApiPatchTaskStartResult>(`/api/tasks/${data.id}/start`, 'PATCH');
                tasks.add(task);
              }} />
            </Box>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton aria-label = "Search database" icon = {<FaStop />} size = "sm" onClick = {async () => {
                const task = await fetchApi<ApiPatchTaskCancelResult>(`/api/tasks/${data.id}/cancel`, 'PATCH');
                tasks.add(task);
              }} />
            </Box>
            <Box bg = "purple" borderRadius = "xl">
              <IconButton isDisabled = {data.status !== Status.captcha} aria-label = "Search database" icon = {<HiRefresh />} size = "sm" onClick = {async () => {
                console.log(data);
              }} />
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
