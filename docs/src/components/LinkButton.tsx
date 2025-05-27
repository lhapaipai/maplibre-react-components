"use client";

import {
  ComponentPropsWithRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import clsx from "clsx";
import { useRipple } from "pentatrion-design/hooks";
import { ButtonProps, buttonVariants } from "pentatrion-design/button";
import Link from "next/link";

export type LinkButtonProps = ComponentPropsWithRef<"a"> & Pick<ButtonProps, "withRipple" | "variant" | "size" | "color" | "selected" | "icon" | "disabled" | "width"> & {
  href: string;

  children?: React.ReactNode;

  focusable?: boolean;
}

export default forwardRef<HTMLAnchorElement, LinkButtonProps>(function Button(
  {
    withRipple = true,
    variant = "contained",
    color = "yellow",
    size = "medium",
    focusable = true,
    width,
    className,
    children,
    selected = false,
    icon = false,
    href,
    ...props
  },
  ref,
) {
  const anchorRef = useRef<HTMLAnchorElement>(null!);

  useImperativeHandle<HTMLAnchorElement | null, HTMLAnchorElement | null>(
    ref,
    () => anchorRef.current,
  );

  const ripples = useRipple(anchorRef);

  // check if overflow-clip-margin: 1px; is needed ?
  return (
    <Link
      tabIndex={focusable ? 0 : -1}
      role="button"
      href={href}
      ref={anchorRef}
      className={clsx(
        buttonVariants({
          variant,
          size,
          width: icon ? "custom" : width,
          icon: size === "custom" ? "custom" : icon,
        }),
        className,
        selected && "active",
      )}
      data-variant={variant}
      {...props}
    >
      {withRipple && ripples}
      {children}
    </Link>
  );
});
