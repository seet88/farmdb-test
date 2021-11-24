import { createTheme } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";

export const customTheme = createTheme({
  palette: {
    primary: {
      dark: grey[700],
      main: grey[500],
      light: grey[400],
      lighter: grey[200],
    },
    secondary: {
      main: yellow[300],
      light: yellow[100],
      dark: yellow[600],
    },
  },
});
