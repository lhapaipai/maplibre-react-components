import { ComponentProps, ElementType } from "react";

import { MDXComponents } from "mdx/types";
import Link from "next/link";
import clsx from "clsx";

type HeadingProps<T extends ElementType> = ComponentProps<T> & {
  as?: T;
};

const Heading = <T extends ElementType>({
  as: HeaderTag = "div",
  id,
  className,
  children,
  ...props
}: HeadingProps<T>) => {
  return (
    <HeaderTag id={id} className={clsx("mdx-header", className)} {...props}>
      {children}
      {id && (
        <a aria-hidden="true" tabIndex={-1} href={`#${id}`}>
          <i className="fe-link"></i>
        </a>
      )}
    </HeaderTag>
  );
};

// const H1 = ({ ...props }: HeadingProps<"h1">) => <Heading as="h1" {...props} />;
const H2 = ({ ...props }: HeadingProps<"h2">) => <Heading as="h2" {...props} />;
const H3 = ({ ...props }: HeadingProps<"h3">) => <Heading as="h3" {...props} />;
const H4 = ({ ...props }: HeadingProps<"h4">) => <Heading as="h4" {...props} />;
const H5 = ({ ...props }: HeadingProps<"h5">) => <Heading as="h5" {...props} />;
const H6 = ({ ...props }: HeadingProps<"h6">) => <Heading as="h6" {...props} />;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, ...rest }) => {
      if (!href) {
        return <a {...rest} />;
      }
      return <Link href={href} {...rest} />;
    },
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    ...components,
  };
}
