import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800",
        className
      )}
      {...props}
    />
  );
}
