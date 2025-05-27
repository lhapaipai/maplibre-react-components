import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";
import postcssNesting from "postcss-nesting";
import postcssInlineSvg from "postcss-inline-svg";
import postcssImport from "postcss-import";
import postcssInlineBase64 from "postcss-inline-base64";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const projectDir = dirname(fileURLToPath(import.meta.url));

const config = {
  plugins: [
    postcssImport(),
    postcssNesting(),
    postcssInlineBase64({
      baseDir: projectDir,
    }),
    autoprefixer(),
    postcssInlineSvg(),
    cssnanoPlugin({
      preset: ["default"],
    }),
  ],
};

export default config;
