import React, { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "lead"
  | "large"
  | "small"
  | "muted";

type TextWeight = "light" | "regular" | "medium" | "semibold" | "bold";
type TextFont = "title" | "heading" | "body";

interface TextProps {
  children: ReactNode;
  size?: TextVariant;
  weight?: TextWeight;
  font?: TextFont;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

export function Text({
  children,
  size = "p",
  weight = "regular",
  font = "body",
  className,
  as,
  ...props
}: TextProps) {
  // Mapping variants to appropriate styles
  const sizeStyles: Record<TextVariant, string> = {
    h1: "text-4xl sm:text-5xl lg:text-6xl tracking-tight",
    h2: "text-3xl sm:text-4xl lg:text-5xl tracking-tight",
    h3: "text-2xl sm:text-3xl lg:text-4xl",
    h4: "text-xl sm:text-2xl",
    h5: "text-lg sm:text-xl",
    h6: "text-base sm:text-lg font-semibold",
    p: "text-base leading-7",
    lead: "text-xl leading-7",
    large: "text-lg",
    small: "text-sm",
    muted: "text-sm text-text/70",
  };

  // Mapping weights to font-weight classes
  const weightStyles: Record<TextWeight, string> = {
    light: "font-light",
    regular: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  // Mapping fonts to font-family classes
  const fontStyles: Record<TextFont, string> = {
    title: "font-title",
    heading: "font-heading",
    body: "font-body",
  };

  // Determine which HTML element to render
  const Component =
    as ||
    (size === "p" ||
    size === "lead" ||
    size === "large" ||
    size === "small" ||
    size === "muted"
      ? "p"
      : size);

  return (
    <Component
      className={cn(
        "transition-colors duration-75",
        sizeStyles[size],
        weightStyles[weight],
        fontStyles[font],
        className
      )}
      style={props.style}
      {...props}
    >
      {children}
    </Component>
  );
}
