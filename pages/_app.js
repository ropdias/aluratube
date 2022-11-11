import { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import RegisterVideo from "../src/components/RegisterVideo";
import ColorModeProvider, { ColorModeContext } from "../src/context/ColorMode";

const theme = {
  light: {
    backgroundBase: "#f9f9f9",
    backgroundLevel1: "#ffffff",
    backgroundLevel2: "#f0f0f0",
    borderBase: "#e5e5e5",
    textColorBase: "#222222",
    scrollRGBA: [0, 0, 0],
  },
  dark: {
    backgroundBase: "#181818",
    backgroundLevel1: "#202020",
    backgroundLevel2: "#313131",
    borderBase: "#383838",
    textColorBase: "#FFFFFF",
    scrollRGBA: [255, 255, 255],
  },
};

// _app.js -> Global definitions from NextJS
// ThemeProvider -> pass the specific theme for the styled components
// ColorModeProvider -> pass the state for the theme for the DarkModeSwitch

// Tip: It's better to have a provider for each problem than a "global provider" that solves all problems

// Here we are defining a ProviderWrapper to make sure that all providers that need to run before MyApp will execute
const ProviderWrapper = (props) => {
  return <ColorModeProvider>{props.children}</ColorModeProvider>;
};

const Root = ({ Component, pageProps }) => {
  const colorModeCtx = useContext(ColorModeContext);

  return (
    <ThemeProvider theme={theme[colorModeCtx.mode]}>
      <CSSReset />
      <Component {...pageProps} />
      <RegisterVideo />
    </ThemeProvider>
  );
};

const _App = (props) => {
  return (
    <ProviderWrapper>
      <Root {...props} />
    </ProviderWrapper>
  );
};

export default _App;
