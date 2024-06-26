import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { extname } from "node:path";
import { rehypePrettyCodeOptions } from "./rehype.config.js";

export default async function codeLoader(source) {
  const extension = extname(this.resourcePath).substring(1);
  const langHeader = new URLSearchParams(this.resourceQuery).get("code");

  if (!["md", "mdx"].includes(extension)) {
    source = `\`\`\`${extension} ${langHeader}\n${source}\n\`\`\``;
  }
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, rehypePrettyCodeOptions)
    .use(rehypeStringify)
    .process(source);

  return `export default ${JSON.stringify(file.value)}`;
}
