import React from "react";
import { Affix, Group, MantineProvider, Transition } from "@mantine/core";
import { useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { AppProps } from "next/app";
import Head from "next/head";

import "styles/global.css";
import { emotionCache } from "styles/emotion-cache";
import { mantineTheme } from "styles/theme";
import { getMetaImage, sizzyLogoUrl } from "utils/get-meta-image";
import { CookieProvider } from "hooks/useCookies";
import PlausibleProvider from "next-plausible";


export const SIZZY_TAGLINE = "The browser for web developers";
export const SIZZY_TITLE = `Sizzy — ${SIZZY_TAGLINE}`;
export const SIZZY_DESCRIPTION = `Develop, debug and test your website with ease and speed. Intuitive and quick development tools help you focus on your product and ideas.`;

const InnerApp: React.FC<AppProps> = (props) => {
  const { pageProps } = props;
  const Component = props.Component as any;
  const [scroll] = useWindowScroll();
  const mightBeDesktop = useMediaQuery("(min-width: 900px)");

  return (
    <>
      <Component {...pageProps} />
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={mightBeDesktop && scroll.y > 0}>
          {(transitionStyles) => (
            <Group
              style={transitionStyles}
              sx={(theme) => ({
                background: theme.colors.gray[0],
                padding: theme.spacing.xs,
                borderRadius: theme.radius.md,
                color: theme.colors.gray[6],
                fontSize: theme.fontSizes.xs,
              })}
            >
              Press Ctrl/⌘ + K to jump to any page.
            </Group>
          )}
        </Transition>
      </Affix>
    </>
  );
};

const App: React.FC<AppProps> = (props) => {
  const socialImage = getMetaImage({
    preset: "netlify",
    logo: sizzyLogoUrl,
    title: SIZZY_TITLE,
    gradientColors: ["#412593", "#24145b", "#10062c"],
    ctaColor: "black",
    ctaBg: "#ffffff",
  });

  return (
    <>
      <Head>
        <title>{SIZZY_TITLE}</title>
        <meta name="title" content={SIZZY_TITLE} />
        <meta name="description" content={SIZZY_DESCRIPTION} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sizzy.co/" />
        <meta property="og:title" content={SIZZY_TITLE} />
        <meta property="og:description" content={SIZZY_DESCRIPTION} />

        <meta property="twitter:url" content="https://sizzy.co/" />
        <meta property="twitter:title" content={SIZZY_TITLE} />
        <meta property="twitter:description" content={SIZZY_DESCRIPTION} />

        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="image" content={socialImage} />
        <meta itemProp="image" content={socialImage} />
        <meta name="twitter:image" content={socialImage} />
        <meta property="og:image" content={socialImage} />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes ="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

        <PlausibleProvider domain={"sizzy.co"}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            emotionCache={emotionCache}
            theme={mantineTheme}
          >
            <CookieProvider>
              <InnerApp {...props} />
            </CookieProvider>
          </MantineProvider>
        </PlausibleProvider>
    </>
  );
};

export default App;
