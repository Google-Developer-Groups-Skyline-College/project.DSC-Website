import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/app/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  children: ReactNode;
  background?: "default" | "muted" | "primary" | "secondary" | "foreground";
  fullHeight?: boolean;
}

export function Section({
  title,
  children,
  className,
  background = "default",
  fullHeight = false,
  ...props
}: SectionProps) {
  // Theme-aware background classes
  const bgClasses = {
    default: "bg-background text-foreground",
    muted: "bg-muted text-foreground",
    primary: "bg-primary text-foreground",
    secondary: "bg-secondary text-foreground",
    foreground: "bg-foreground text-secondary",
  };

  return (
    <section
      className={cn(
        // Base styling
        "py-12 md:py-16 w-full transition-colors duration-300",
        // Dynamic height: either full viewport height minus navbar or normal padding
        fullHeight ? "min-h-[calc(100vh-4rem)]" : "",
        // Background color based on theme
        bgClasses[background],
        // Any additional classes passed to the component
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 md:px-6">
        {title && (
          <h2 className="text-3xl font-bold tracking-tighter mb-8 md:mb-12 transition-colors duration-300">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
