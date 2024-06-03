import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        "electric-violet": {
          "50": "#f4f2ff",
          "100": "#eae8ff",
          "200": "#d7d4ff",
          "300": "#bab1ff",
          "400": "#9785ff",
          "500": "#6c47ff",
          "600": "#6430f7",
          "700": "#561ee3",
          "800": "#4818bf",
          "900": "#3c169c",
          "950": "#230b6a",
        },
        hey: {
          "50": "#f4f2ff",
          "100": "#eae8ff",
          "200": "#d7d4ff",
          "300": "#bab1ff",
          "400": "#9785ff",
          "500": "#6c47ff",
          "600": "#6430f7",
          "700": "#561ee3",
          "800": "#4818bf",
          "900": "#3c169c",
          "950": "#230b6a",
        },
      },
    },
  },
};
