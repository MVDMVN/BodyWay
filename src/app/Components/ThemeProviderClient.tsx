"use client";

import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./theme";

export default function ThemeProviderClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
