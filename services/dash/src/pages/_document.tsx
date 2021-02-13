/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import theme from '../theme';
import { ColorModeScript } from '@chakra-ui/react';

class Document extends NextDocument {
  public static getInitialProps(ctx: DocumentContext) {
    return NextDocument.getInitialProps(ctx);
  }

  public render() {
    return (
      <Html lang = "en" style = {{ overflowX: 'hidden' }}>
        <Head />
        <body>
          <ColorModeScript initialColorMode = {theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
