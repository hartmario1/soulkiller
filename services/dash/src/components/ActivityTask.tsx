/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Tr, Td, useStyleConfig } from '@chakra-ui/react';

const ActivityTask = () => {
  const styles = useStyleConfig('taskColumn');

  return (
    <Tr bg = "bgblue" sx = {styles}>
      <Td borderTopLeftRadius = "3xl" borderBottomLeftRadius = "3xl" paddingY = "13px">
        Undefeated
      </Td>
      <Td>
        NBHD X UNDFTD S/S TEE
      </Td>
      <Td>
        Medium
      </Td>
      <Td isNumeric>
        lpm
      </Td>
      <Td isNumeric>
        Proxy1
      </Td>
      <Td isNumeric color = "green.400" borderTopRightRadius = "3xl" borderBottomRightRadius = "3xl">
        Checked Out
      </Td>
    </Tr>
  );
};

export default ActivityTask;
