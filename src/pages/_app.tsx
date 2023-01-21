import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import Head from "next/head";
import { RecoilRoot } from "recoil";

import theme from "~styles/theme";
import "~styles/index.scss";
import type { NextComponentType, NextPageContext } from "next"
import nookies from 'nookies'

function MyApp({ Component, pageProps, authToken }: any) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Head>
        <link
          rel="shortcut icon"
          href="https://res.cloudinary.com/dnlthcx1a/image/upload/v1616222866/Group_6_2x_ukk0nq.png"
        />
        <title>Readit - Online blog platform</title>
      </Head>
      <RecoilRoot>
        <Component {...pageProps} token={authToken} />
      </RecoilRoot>
    </ChakraProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//

MyApp.getInitialProps = async (
  { Component, ctx }: { Component: NextComponentType<NextPageContext>, ctx: NextPageContext }
) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const authToken = nookies.get(ctx)['auth-token']
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps, authToken }
}

export default MyApp
