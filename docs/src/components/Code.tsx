import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypePrettyCodeOptions } from "~/../webpack/rehype.config.js";

interface Props {
  code: string;
  className?: string;
}
export default async function Code({ code, className }: Props) {
  const highlightedCode = await highlightCode(code);
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    ></div>
  );
}

async function highlightCode(code: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, rehypePrettyCodeOptions)
    .use(rehypeStringify)
    .process(code);

  return String(file);
}
