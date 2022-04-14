import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    primary: {
      50: "#e5f6ff",
      100: "#bedbf6",
      200: "#95bdea",
      300: "#6c9fe0",
      400: "#447ed6",
      500: "#2a60bc",
      600: "#1f4793",
      700: "#14386a",
      800: "#082642",
      900: "#00101c",
    },
    secondary: {
      50: "#faebff",
      100: "#e4c7ed",
      200: "#cda3dd",
      300: "#b67ece",
      400: "#9c59bf",
      500: "#803fa5",
      600: "#613181",
      700: "#49235d",
      800: "#301439",
      900: "#150518",
    },
    surface: {
      50: "#1e1d23", 
      100: "#28272d", // light 
      200: "#2b2d35", // circles
      400: "#292832",
      500: "#191a1f" // dark 
    },
    main: {
      100: "#0f0f11"
    },
    light: {
      50: "#fff",
      100: "#eee",
      200: "#ddd",
      300: "#ccc",
      400: "#bfbfbf",
      500: "#afafaf",
      600: "#6f6f6f"
    },
    error: {
      50: "#ffe7e7",
      100: "#f4c1c2",
      200: "#e6999b",
      300: "#da7175",
      400: "#cf4a4e",
      500: "#b53034",
      600: "#8e2527",
      700: "#66191c",
      800: "#3f0d0f",
      900: "#1c0103",
    },
  },
});

export default theme;