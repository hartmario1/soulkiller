/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Text, HStack, FormControl, FormLabel, NumberIncrementStepper, NumberDecrementStepper, NumberInput, NumberInputField, NumberInputStepper, Center, VStack, useStyleConfig, Button } from '@chakra-ui/react';
import { useQueryMe } from 'hooks/useQueryMe';
import { fetchApi } from '../../util';
import { ApiPostPaymentsPortalResult } from '@soulkiller/common';

const SettingsPage = () => {
  const styles = useStyleConfig('settingsGradient');
  const user = useQueryMe()!;

  const onClick = async () => {
    const data = await fetchApi<ApiPostPaymentsPortalResult>('/api/payments/portal', 'POST').catch(() => null);
    if (!data) return;

    window.location.assign(data.url);
  };

  return (
    <Box>
      <Box fontSize = "xl" paddingBottom = "5px">
      Delays
      </Box>
      <HStack paddingX = "10px">
        <FormControl id = "monitor-delay">
          <FormLabel>
          Monitor Delay
          </FormLabel>
          <NumberInput min = {100}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl id = "retry-delay">
          <FormLabel>
          Retry-delay
          </FormLabel>
          <NumberInput min = {100}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </HStack>
      <HStack>
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
        <Box paddingTop = "20px">
          <Button onClick = {onClick}>
            Manage billing
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default SettingsPage;
