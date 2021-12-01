import {
  BaseTheme,
  createBox,
  createText,
  createTheme,
} from "@shopify/restyle";

const theme: BaseTheme = createTheme({
  colors: {
    primary: "#2CB9B0",
    white: "white",
    secondary: "#0C0D34",
    danger: "#FF0058",
    text: "rgba(12, 13, 52, 0.7)",
    grey: "#F4F0EF",
    darkGrey: "#8A8D90",
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  breakpoints: {},
  textVariants: {
    hero: {
      fontSize: 80,
      color: "white",
      textAlign: "center",
      lineHeight: 80,
      fontFamily: "SFProDisplay-Bold",
    },
    title1: {
      fontSize: 28,
      color: "secondary",
      fontFamily: "SFProDisplay-Semibold",
    },
    title2: {
      fontSize: 24,
      lineHeight: 30,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: "SFProDisplay-Semibold",
      color: "text",
    },
    button: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: "SFProDisplay-Semibold",
      color: "text",
    },
  },
});

export type Theme = typeof theme;

export const Text = createText<Theme>();
export const Box = createBox<Theme>();
export default theme;
