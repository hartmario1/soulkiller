/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Center, Image, Link, Text, VStack } from '@chakra-ui/react';
import StandardLayout from 'components/Layouts/Standard';
import Head from 'next/head';

const Custom404 = () => {
  const Title = () => (
    <div>
      <Head>
        <title>
            Error 404
        </title>
      </Head>
    </div>
  );

  return (
    <StandardLayout>
      <Center>
        <Title />
        <Box shadow = "dark-lg" borderRadius = "lg" maxWidth = "700px">
          <VStack>
            <Center paddingTop = "50px" paddingBottom = "20px">
              <Image src = "/Soulkiller.png" width = "300px" />
            </Center>
            <Center paddingX = "30px" paddingBottom = "10px">
              <Text fontSize = "3xl" fontWeight = "bold" align = "center">
                The page you are looking for does not exist.
                {' '}
                <Link color = "purple" href = "/">
                Return home?
                </Link>
              </Text>
            </Center>
          </VStack>
        </Box>
      </Center>
    </StandardLayout>
  );
};

export default Custom404;
