import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bgColor: "#040D12",
        color: "white",
      },
    },
  },
  fonts: {
    body: "Anta, sans-serif",
    heading: "Anta, serif",
  },
});
