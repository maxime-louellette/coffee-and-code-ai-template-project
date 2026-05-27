import type * as React from "react";

import { cn } from "@design-system/lib/utils";

interface SpinnerProps extends React.ComponentProps<"span"> {
  size?: "sm" | "md" | "lg";
}

function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-current border-t-transparent",
        size === "sm" && "size-4",
        size === "md" && "size-6",
        size === "lg" && "size-8",
        className,
      )}
      {...props}
    />
  );
}

export { Spinner };
