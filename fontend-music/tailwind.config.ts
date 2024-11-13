import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundColor: {
        profile: "rgba(0, 0, 0, .8)",
      },
      boxShadow: {
        custom: "0 2px 7px -1px rgba(0, 0, 0, .4)",
      },
    },
  },
  plugins: [],
};
export default config;
