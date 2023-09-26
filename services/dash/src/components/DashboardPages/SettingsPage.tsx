/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Text, Center, VStack, useStyleConfig, Button, } from '@chakra-ui/react';
import { ApiPostPaymentsPortalResult, } from '@soulkiller/common';
import { useQueryMe, } from 'hooks/useQueryMe';
import { fetchApi, } from '../../util';

const SettingsPage = () => {
  const styles = useStyleConfig('settingsGradient',);
  const user = useQueryMe()!;

  const onClick = async () => {
    const data = await fetchApi<ApiPostPaymentsPortalResult>('/api/payments/portal', 'POST',).catch(() => null,);
    if (!data) { return; }

    window.location.assign(data.url,);
  };

  return (
    <Box>
      <Box fontSize = "xl" paddingBottom = "5px">
      Delays
      </Box>
      <Box paddingBottom = "20px" paddingTop = "40px" w = "100%">
        <Box sx = {styles} borderRadius = "xl" paddingY = "5px">
          <Center>
            <VStack>
              <Text fontSize = "xl">
                  Welcome back
                {' '}
                {user.username}
                  , hope you are killing every release.
              </Text>
            </VStack>
          </Center>
        </Box>
      </Box>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button onClick = {onClick} width = "100%" borderRadius = {20}>
            Manage billing
      </Button>
    </Box>
  );
};

export default SettingsPage;
