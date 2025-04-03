import React from "react";
import Document, { DocumentContext, Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

import { ServerStyles, createStylesServer } from "@mantine/next";
import { emotionCache } from "styles/emotion-cache";

const stylesServer = createStylesServer(emotionCache);

export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />,
      ],
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <Script
            src="https://umami.server.kitze.io/script.js"
            data-website-id="dd595059-80de-4cb6-8c1c-a2a7d57d2a46"
            strategy="lazyOnload"
          />
        </body>
      </Html>
    );
  }
}
