"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function Glow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div
            className="mx-auto h-[600px] w-[600px] -translate-y-[200px] bg-[radial-gradient(circle_500px_at_50%_300px,rgba(82,109,255,0.1),rgba(82,109,255,0))]"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
