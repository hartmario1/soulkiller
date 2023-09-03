import {
  Box, Spacer, Wrap, WrapItem, useStyleConfig, Table, Thead, Tbody, Tr, Th, Button, useDisclosure, Select, HStack, Text
} from '@chakra-ui/react';
import TaskButtons from '../StartStopButtons';
import Task from '../Task';
import { FaPlay, FaStop } from 'react-icons/fa';
import DeleteModal from '../Modals/DeleteTasks';
import CreateTask from '../Modals/CreateTask';
import { useQueryTasks } from '../../hooks/useQueryTasks';
import { FiEdit2 } from 'react-icons/fi';
import EditTask from 'components/Modals/EditTask';
import { BiTask, BiTaskX } from 'react-icons/bi';
import { BsListTask } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import TaskGroup from 'components/Modals/Groups/TaskGroup';
import EditTaskGroup from 'components/Modals/Groups/EditTaskGroup';
import { useState } from 'react';
import { useQueryTaskGroups } from 'hooks/useQueryTaskGroups';
import DeleteTaskGroup from 'components/Modals/Groups/DeleteTaskGroup';

const TaskPage = () => {
  const [groupId, setGroupId] = useState<number | null>(null);
  const styles = useStyleConfig('taskBox');
  const tasks = useQueryTasks();
  const { isOpen: createIsOpen, onClose: createOnClose, onOpen: createOnOpen } = useDisclosure();
  const { isOpen: editIsOpen, onClose: editOnClose, onOpen: editOnOpen } = useDisclosure();
  const taskGroups = useQueryTaskGroups();

  return (
    <Box>
      <TaskGroup isOpen = {createIsOpen} onClose = {createOnClose} />
      <Box>
        <HStack paddingBottom = "12px">
          <Box backgroundColor = "whiteblue" h = "40px" borderRadius = "xl">
            <HStack padding = "9px">
              <Box backgroundColor = "bgblue" borderRadius = "xl" alignContent = "center" paddingX = "7px">
                <HStack>
                  <BiTask />
                  <Text>
                      0
                  </Text>
                </HStack>
              </Box>
              <Box backgroundColor = "bgblue" borderRadius = "xl" alignContent = "center" paddingX = "7px">
                <HStack>
                  <BiTaskX />
                  <Text>
                      0
                  </Text>
                </HStack>
              </Box>
              <Box backgroundColor = "bgblue" borderRadius = "xl" alignContent = "center" paddingX = "7px">
                <HStack>
                  <AiOutlineLoading3Quarters />
                  <Text>
                      0
                  </Text>
                </HStack>
              </Box>
              <Box backgroundColor = "bgblue" borderRadius = "xl" alignContent = "center" paddingX = "7px">
                <HStack>
                  <BsListTask />
                  <Text>
                    {tasks.length}
                  </Text>
                </HStack>
              </Box>
            </HStack>
          </Box>
          <Select variant = "filled" placeholder = "Task Group" onChange = {event => {
            if (event.target.value === 'add') {
              createOnOpen();
            } else {
              setGroupId(parseInt(event.target.value, 10));
            }
          }}>
            <option value = "add">
                Add Task Group
            </option>
            {taskGroups.map(group => (
              <option value = {group.id}>
                {group.name}
              </option>
            ))}
          </Select>
          <EditTaskGroup id = {groupId} />
          <DeleteTaskGroup id = {groupId} />
        </HStack>
        <Box bg = "whiteblue" height = "605px" maxWidth = "1880px" borderRadius = "xl" paddingBottom = "7px"
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
            <Table variant = "simple" size = "sm">
              <Thead>
                <Tr>
                  <Th>
                    Store
                  </Th>
                  <Th>
                    Name/Url
                  </Th>
                  <Th isNumeric>
                    Size
                  </Th>
                  <Th isNumeric>
                    Profile
                  </Th>
                  <Th isNumeric>
                    Status
                  </Th>
                  <Th isNumeric>
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {tasks.filter(task => task.group_id === groupId).map(data => (
                  <Task data = {data} />
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>

      {/* Bot Buttons */}
      <Wrap paddingTop = "10px" maxWidth = "100%">
        <WrapItem paddingRight = "1px">
          <CreateTask groupId = {groupId} />
        </WrapItem>
        <WrapItem>
          <TaskButtons content = "Start Tasks" color = "purple" taskIcon = {<FaPlay />} />
        </WrapItem>
        <WrapItem>
          <Button size = "md" height = "48px" width = "200px" border = "2px" borderColor = "purple" leftIcon = {<FiEdit2 />} onClick = {editOnOpen}>
            Edit Tasks
          </Button>
          <EditTask isOpen = {editIsOpen} onClose = {editOnClose} ids = {tasks.map(task => task.id)} />
        </WrapItem>

        <Spacer />
        <WrapItem>
          <TaskButtons content = "Cancel Tasks" color = "red.600" taskIcon = {<FaStop />} />
        </WrapItem>
        <WrapItem>
          <DeleteModal />
        </WrapItem>
      </Wrap>
    </Box>
  );
};
export default TaskPage;
