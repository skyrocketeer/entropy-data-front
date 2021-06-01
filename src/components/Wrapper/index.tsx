import { Box } from "@chakra-ui/react";

interface Props {
  background?: string;
  borderRadius?: string;
  boxShadow?: string;
  containerWidth?: string
}

export const Wrapper: React.FC<Props> = ({
  children,
  background,
  borderRadius,
  boxShadow,
  containerWidth
}) => {
  return (
    <Box
      w={containerWidth}
      display='flex'
      flexDirection='column'
      px='4'
      py='6'
      m='auto'
      backgroundColor={background}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
    >
      {children}
    </Box>
  );
};
