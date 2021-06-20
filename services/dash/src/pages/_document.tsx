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
        <Head>
          <meta charSet = "utf-8" />
          <meta name = "viewport" content = "width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name = "description" content = "Soulkiller.AIO it's one of the best automated checkout softwares the money can buy. A program built with style and simplicity that will help you cop any item at release." />
          <meta name = "author" content = "Soulkiller" />
        </Head>
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
