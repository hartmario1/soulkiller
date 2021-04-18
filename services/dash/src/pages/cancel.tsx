import { Box, Center, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import StandardLayout from 'components/Layouts/Standard';
import Head from 'next/head';

const CancelPage = () => {
  const Title = () => (
    <div>
      <Head>
        <title>
            Out Of Stock
        </title>
      </Head>
    </div>
  );

  return (
    <StandardLayout>
      <Title />
      <Box paddingX = "100px">
        <Center>
          <Box bg = "whiteblue" borderRadius = "xl">
            <HStack padding = "30px">
              <Box>
                <Image src = "/Soulkiller.png" maxWidth = "350px" />
              </Box>
              <Box>
                <VStack>
                  <Heading>
                    Something went wrong!
                  </Heading>
                  <Text fontSize = "xl">
                    Your payment did not went trough.
                  </Text>
                  <Text>
                    Our product may be out of stock!
                  </Text>
                </VStack>
              </Box>
            </HStack>
          </Box>
        </Center>

      </Box>
    </StandardLayout>
  );
};

export default CancelPage;
