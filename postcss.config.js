import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";
import postcssInlineSvg from "postcss-inline-svg";
import postcssImport from "postcss-import";
import postcssInlineBase64 from "postcss-inline-base64";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const projectDir = dirname(fileURLToPath(import.meta.url));

const config = {
  plugins: [
    postcssImport(),
    postcssInlineBase64({
      baseDir: projectDir,
    }),
    autoprefixer(),
    postcssInlineSvg(),
    cssnanoPlugin({
      preset: [
        "default",
        {
          svgo: {
            plugins: [
              {
                name: "preset-default",
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      ],
    }),
  ],
};

export default config;
