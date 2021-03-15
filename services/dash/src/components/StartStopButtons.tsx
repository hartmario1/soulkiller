/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Button } from '@chakra-ui/react';

const TaskButtons = ({ content, color, taskIcon }: { content: string; color?: string; taskIcon: JSX.Element }) => (
  <Button size = "md"
    height = "48px"
    width = "200px"
    border = "2px"
    borderColor = {color}
    leftIcon = {taskIcon}>
    {content}
  </Button>
);

export default TaskButtons;
