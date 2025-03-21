import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssScss from "postcss-scss";

const config = {
  syntax: postcssScss, // Указываем, что используем синтаксис SCSS
  plugins: [tailwindcss(), autoprefixer()],
};

export default config;
