// расширяем DefaultTheme из styled-components
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bg: string;
      btnBg: string;
      panel: string;
      text: string;
      muted: string;
      textBlack: string;
      textWhite: string;
      primary: string;
      primaryHover: string;
      primaryButtons: string;
      primaryButtonsHover: string;
      border: string;
    };
    radius: string;
    shadow: string;
    container: string;
  }
}
