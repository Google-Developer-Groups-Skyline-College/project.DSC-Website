import type React from "react";
import { cn } from "@/app/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  children: React.ReactNode;
  background?: "white" | "gray" | "primary";
}

export function Section({
  title,
  children,
  className,
  background = "white",
  ...props
}: SectionProps) {
  const bgClasses = {
    white: "bg-white",
    gray: "bg-gray-100",
    primary: "bg-primary text-primary-foreground",
  };

  return (
    <section
      className={cn(
        "py-12 md:py-16 min-h-screen",
        bgClasses[background],
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 md:px-6">
        {title && (
          <h2 className="text-3xl font-bold tracking-tighter mb-8 md:mb-12">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
