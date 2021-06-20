import { Box, Button, Center, Heading, HStack, Image, Text, useToast, VStack } from '@chakra-ui/react';
import { fetchApi } from '../util';
import StandardLayout from './Layouts/Standard';
import type { ApiPostPaymentsCreateResult } from '@soulkiller/common';
import Head from 'next/head';

const Payment = () => {
  const toast = useToast();

  const Title = () => (
    <div>
      <Head>
        <title>
          Purchase
        </title>
      </Head>
    </div>
  );

  const onClick = async () => {
    const loadStripe = await import('@stripe/stripe-js').then(mod => mod.loadStripe);
    const Stripe = (await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!))!;

    const data = await fetchApi<ApiPostPaymentsCreateResult>('/api/payments/create', 'post').catch(() => null);
    if (!data) return;

    const { error } = await Stripe.redirectToCheckout({ sessionId: data.sessionId });
    toast({
      status: 'error',
      title: 'Payment error',
      description: error.message
    });
  };

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
                    Purchase soulkiller.aio
                  </Heading>
                  <Text fontSize = "xl">
                    To purchase our product click the button below.
                  </Text>
                  <Box paddingTop = "20px">
                    <Button onClick = {onClick}>
                      Purchase soulkiller
                    </Button>
                  </Box>
                </VStack>
              </Box>
            </HStack>
          </Box>
        </Center>
      </Box>
    </StandardLayout>
  );
};

export default Payment;
