import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
import { rehypePrettyCodeOptions } from "./webpack/rehype.config.js";
const projectDir = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // tsconfigPath: "./tsconfig.build.json",
  },
  output: "export",
  pageExtensions: ["mdx", "ts", "tsx"],
  // reactStrictMode: false,
  webpack(config, options) {
    config.resolve.alias["next-mdx-import-source-file"] = [
      "private-next-root-dir/src/components/Mdx",
      "@mdx-js/react",
    ];

    config.module.rules.push(
      // {
      //   test: /\.(ts|tsx)$/,
      //   include: [
      //     resolve(projectDir, 'src'),
      //     resolve(projectDir, 'node_modules/pentatrion-design')
      //   ],
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['next/babel'],
      //     },
      //   },
      // },
      {
        test: /\.mdx$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: "@mdx-js/loader",
            options: {
              providerImportSource: "next-mdx-import-source-file",
              remarkPlugins: [],
              rehypePlugins: [
                [rehypePrettyCode, rehypePrettyCodeOptions],
                rehypeSlug,
                [rehypeExternalLinks, { rel: ["nofollow"] }],
              ],
            },
          },
        ],
      },
      {
        test: /\.(tsx?|postcss|html|bash)$/,
        resourceQuery: /code/,
        use: [resolve(projectDir, "webpack/codeLoader.js")],
      },
    );

    return config;
  },

  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
