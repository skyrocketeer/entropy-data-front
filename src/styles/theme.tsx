import {
  theme as chakraTheme,
  extendTheme
} from "@chakra-ui/react";

const fonts = {
  heading: "Lato, SF Pro Display, -apple-system, sans-serif",
  body: "Lato, -apple-system, sans-serif",
  mono: "Lato, -apple-system, sans-serif",
};

const fontWeight = {
  normal: 400,
  medium: 500,
  bold: 700,
};

const configs = {
  initialColorMode: "light",
  useSystemColorMode: true,
  colors: {
    ...chakraTheme.colors,
    black: "#16161D",
  },
  fontWeight,
  fonts,
  // breakpoints: breakpoints,
  icons: {
    // ...chakraTheme.icons,
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: "0 0 3000 3163",
    },
  },
  components: {
    Button: {
      variants: {
        solid: (props: any) => ({
          bg: "green.300",
        }),
      }
    },
    Card: {
      // The styles all Cards have in common
      baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        alignItems: 'center',
        gap: 6,
      },
      // Two variants: rounded and smooth
      variants: {
        rounded: {
          padding: 8,
          borderRadius: 'xl',
          boxShadow: 'xl',
        },
        smooth: {
          padding: 6,
          borderRadius: 'base',
          boxShadow: 'md',
        },
      },
      // The default variant value
      defaultProps: {
        variant: 'smooth',
      },
    }
  }
};

const theme = extendTheme({
  ...chakraTheme,
  configs,
});

export default theme;
