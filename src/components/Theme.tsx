import { BaseTheme, createText, createTheme } from "@shopify/restyle";

const theme: BaseTheme = createTheme({
  colors: {
    primary: "#2CB9B0",
    white: "white",
    title: "#0C0D34",
    text: "rgba(12, 13, 52, 0.7)",
    grey: "rgba(12, 13, 52, 0.05)",
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {},
  textVariants: {
    hero: {
      fontSize: 80,
      color: "white",
      textAlign: "center",
      lineHeight: 80,
      fontFamily: "SFProText-Bold",
    },
    title1: {
      fontSize: 28,
      color: "title",
      fontFamily: "SFProText-Semibold",
    },
    title2: {
      fontSize: 24,
      lineHeight: 30,
      fontFamily: "SFProText-Semibold",
      color: "title",
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: "SFProText-Semibold",
      color: "text",
    },
    button: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: "SFProText-Semibold",
      color: "text",
    },
  },
});

export type Theme = typeof theme;

export const Text = createText<Theme>();
export default theme;
