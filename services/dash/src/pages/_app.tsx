/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme = {theme}>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
