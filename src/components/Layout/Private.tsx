import { Wrapper } from "~components/Wrapper";
import { NavBar } from "~components/NavBar";
import { Box, Flex } from "@chakra-ui/react";
// import { Footer } from "../Footer";

type Props = {
  direction?: "column" | "row"
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Flex flexDirection='column'>
      <NavBar />
      <Box
        style={{
          minHeight: "calc(100vh - 265px)",
        }}
      >
        <Wrapper containerWidth='75%'>{children}</Wrapper>
      </Box>
      {/* <Footer /> */}
    </Flex>
  );
};
