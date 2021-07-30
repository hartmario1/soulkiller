import {
  Box, Spacer, Wrap, WrapItem, useStyleConfig, Table, Thead, Tbody, Tr, Th, Button, useDisclosure
} from '@chakra-ui/react';
import TaskButtons from '../StartStopButtons';
import Task from '../Task';
import { FaPlay, FaStop } from 'react-icons/fa';
import DeleteModal from '../Modals/DeleteModal';
import CreateTask from '../Modals/CreateTask';
import Captcha from 'components/Modals/Captcha';
import { useQueryTasks } from '../../hooks/useQueryTasks';
import { FiEdit2 } from 'react-icons/fi';
import EditTask from 'components/Modals/EditTask';

const TaskPage = () => {
  const styles = useStyleConfig('taskBox');
  const tasks = useQueryTasks();
  const { isOpen, onClose, onOpen } = useDisclosure();

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
                {tasks.map(data => (<Task data = {data} />))}
              </Tbody>
            </Table>
          </Box>
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
          <Button size = "md" height = "48px" width = "200px" border = "2px" borderColor = "purple" leftIcon = {<FiEdit2 />} onClick = {onOpen}>
            Edit Tasks
          </Button>
          <EditTask isOpen = {isOpen} onClose = {onClose} />
        </WrapItem>
        <WrapItem>
          <Captcha />
        </WrapItem>
      </Wrap>
    </Box>
  );
};
export default TaskPage;
