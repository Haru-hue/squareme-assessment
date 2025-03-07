import { extendTheme } from "@chakra-ui/react"; // Import extendTheme function

const customTheme = extendTheme({
  components: {
    fonts: {
        heading: "Inter",
        body: "Inter"
    },
    Table: {
      th: {
        fontFamily: "Inter, sans-serif", // Set your desired font family
      },
    },
  },
});

export default customTheme;
