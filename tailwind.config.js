
import {nextui} from "@nextui-org/react";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      theme: {
        extend: {
          backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
              "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          },
          colors: {
            lamaSky: "#C3EBFA",
            lamaSkyLight: "#EDF9FD",
            lamaPurple: "#CFCEFF",
            lamaPurpleLight: "#F1F0FF",
            lamaYellow: "#FAE27C",
            lamaYellowLight: "#FEFCE8",
          },
        },
      },
    },
  },
  plugins: [nextui()],
};