import { Wrapper } from "~components/Wrapper";
import { NavBar } from "~components/NavBar";
import { Box, Flex } from "@chakra-ui/react";
import BackToTopButton from "~components/Button/BackToTop";
import FloatingButton from "~components/Button/Floating";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { isLoggedIn } from "~store/auth";
import { isClient } from "~utils/helper";
import { useEffect, useState } from "react";
// import { Footer } from "../Footer";

const noEditFloatingPages = ['/reviews/new', '/account/login', '/account/register', '/oauth2/redirect']

export const Layout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter()
  const [auth, setAuth] = useState<boolean>(false)
  const authState = useRecoilValue(isLoggedIn)

  useEffect(() => {
    setAuth(authState)
  }, [])

  return (
    <Flex flexDirection='column'>
      <NavBar />
      <Box
        style={{
          minHeight: "calc(100vh - 265px)",
        }}
        id="top"
      >
        <Wrapper containerWidth='75%'>{children}</Wrapper>
        {auth && !noEditFloatingPages.includes(router.pathname) ? (<FloatingButton />) : null}
        <BackToTopButton />
      </Box>
      {/* <Footer /> */}
    </Flex>
  );
};
