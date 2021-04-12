/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import BotMenu from 'components/BotMenu';
import Head from 'next/head';
import { BsPersonFill } from 'react-icons/bs';
import { FaServer, FaTasks } from 'react-icons/fa';
import { FiActivity } from 'react-icons/fi';
import { RiSettings5Fill } from 'react-icons/ri';
import DashboardLayout from 'components/Layouts/Dashboard';
import ProxiePage from 'components/DashboardPages/ProxyPage';
import TaskPage from 'components/DashboardPages/TaskPage';
import ActivityPage from 'components/DashboardPages/ActivityPage';
import ProfilePage from 'components/DashboardPages/ProfilePage';
import SettingsPage from 'components/DashboardPages/SettingsPage';
import Protected from 'HOCs/Protected';

const Dashboard = () => {
  const Title = () => (
    <div>
      <Head>
        <title>
            Dashboard
        </title>
      </Head>
    </div>
  );

  return (
    <DashboardLayout>
      <Box>
        <Title />
        <Tabs paddingBottom = "8px" colorScheme = "facebook">
          <TabList>
            <Tab>
              <BotMenu content = "Tasks" iconMenu = {<FaTasks />} />
            </Tab>
            <Tab>
              <BotMenu content = "Profiles" iconMenu = {<BsPersonFill />} />
            </Tab>
            <Tab>
              <BotMenu content = "Proxies" iconMenu = {<FaServer />} />
            </Tab>
            <Tab>
              <BotMenu content = "Activity" iconMenu = {<FiActivity />} />
            </Tab>
            <Spacer />
            <Tab>
              <BotMenu content = "Settings" iconMenu = {<RiSettings5Fill />} />
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <TaskPage />
            </TabPanel>
            <TabPanel>
              <ProfilePage />
            </TabPanel>
            <TabPanel>
              <ProxiePage />
            </TabPanel>
            <TabPanel>
              <ActivityPage />
            </TabPanel>
            <TabPanel>
              <SettingsPage />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </DashboardLayout>
  );
};

export default Protected(Dashboard);
