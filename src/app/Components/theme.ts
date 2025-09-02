"use client";
import { createGlobalStyle, DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    bg: "#F5F5F5",
    btnBg: "#F5F5F5",
    panel: "#151935",
    text: "#292929",
    muted: "#8b91a7",
    textBlack: "#000",
    textWhite: "#fff",
    primary: "#F4C017",
    primaryHover: "#EAF7F6",
    primaryButtons: "#00857A",
    primaryButtonsHover: "#EAF7F6",
    border: "#2a2f49",
  },
  radius: "16px",
  shadow: "0 10px 30px rgba(0,0,0,.25)",
  container: "1120px",
};

export const GlobalStyle = createGlobalStyle`
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  html,body { height: 100%; }
  body {
    margin: 0;
    // font: 16px/1.6 Inter, system-ui, -apple-system, Segoe UI, Roboto;
    color: ${({ theme }) => theme.colors.text};
    background: #fff;
  }
  a { color: inherit; text-decoration: none; }
  .container { 
    // max-width: ${({ theme }) => theme.container}; 
    margin: 0 auto; 
    padding: 16px 40px; 
  }
`;
