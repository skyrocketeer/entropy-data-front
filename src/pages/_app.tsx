import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Head from "next/head";
import { RecoilRoot } from "recoil";

import theme from "~styles/theme";
import "~styles/index.scss";

function MyApp({ Component, pageProps }: any) {
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
        <Component {...pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default MyApp;
