/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Button, useToast } from '@chakra-ui/react';

const SuccesToast = () => {
  const toast = useToast();
  return (
    <Button onClick = {() =>
      toast({
        title: 'NBHD X UNDFTD S/S TEE',
        description: 'Has successfully checked out.',
        status: 'success',
        duration: 4500,
        isClosable: true,
        position: 'top-right'
      })}
    >
        Show Toast
    </Button>
  );
};

export default SuccesToast;
