import { extendTheme } from "@chakra-ui/react";
import { menu } from "./menu";

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
  components: {
    Menu: menu,
  },
});
