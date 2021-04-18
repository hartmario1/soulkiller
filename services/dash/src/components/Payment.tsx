import { Button, useToast } from '@chakra-ui/react';
import { fetchApi } from '../util';
import StandardLayout from './Layouts/Standard';
import type { ApiPostPaymentsCreateResult } from '@soulkiller/common';

const Payment = () => {
  const toast = useToast();

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
      <Button onClick = {onClick}>
        Monke
      </Button>
    </StandardLayout>
  );
};

export default Payment;
