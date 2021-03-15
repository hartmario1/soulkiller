import { Box, Button, Center, FormControl, FormLabel, HStack, Image, Input, Link, Text } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import StandardLayout from 'components/Layouts/Standard';
import Head from 'next/head';

const Purchase = () => {
  const Title = () => (
    <div>
      <Head>
        <title>
              Purchase
        </title>
      </Head>
    </div>
  );

  return (
    <StandardLayout>
      <Box>
        <Title />
        <Box bg = "whiteblue" borderRadius = "xl" padding = "20px">
          <Center paddingY = "5px">
            <Image src = "/Soulkiller.png" maxWidth = "350px" />
          </Center>
          <Box>
            <Box paddingY = "6px">
              <FormControl id = "card-name">
                <FormLabel>
                Card Name
                </FormLabel>
                <Input type = "card-name" placeholder = "John Doe" />
              </FormControl>
            </Box>
            <Box paddingY = "6px">
              <FormControl id = "card-number">
                <FormLabel>
                Card Number
                </FormLabel>
                <Input type = "card-number" placeholder = "0000 0000 0000 0000" />
              </FormControl>
            </Box>
            <HStack paddingY = "6px">
              <FormControl id = "card-expiration">
                <FormLabel>
                    Expiration Date
                </FormLabel>
                <Input type = "card-expiration" placeholder = "00 / 00" />
              </FormControl>
              <FormControl id = "card-cvv">
                <FormLabel>
                    Card CVV
                </FormLabel>
                <Input type = "card-cvv" placeholder = "000" />
              </FormControl>
            </HStack>
          </Box>
          <Box paddingTop = "20px">
            <Center>
              <Button bg = "purple" leftIcon = {<FiShoppingCart />} size = "md"
                height = "48px"
                width = "200px">
                Purchase
              </Button>
            </Center>
            <Center paddingY = "10px">
              <Text color = "gray.500">
                By purchasing our product you acknowledge and agree to our
                {' '}
                <Link href = "/terms" color = "purple">
                terms
                </Link>
                {' '}
                and
                {' '}
                <Link href = "/privacy" color = "purple">
                privacy.
                </Link>
                {' '}
              </Text>
            </Center>
          </Box>
        </Box>

      </Box>
    </StandardLayout>
  );
};

export default Purchase;
