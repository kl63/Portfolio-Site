"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  language?: string;
  lineNumbers?: boolean;
}

export function CodeBlock({
  children,
  language = "typescript",
  lineNumbers = false,
  className,
  ...props
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg bg-black/90 p-4 font-mono text-sm text-gray-100 shadow-md",
        className
      )}
      {...props}
    >
      <div className="absolute left-3 top-2 flex space-x-2">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
      </div>
      <div className="mt-4 space-y-2">{children}</div>
    </div>
  );
}

export function CodeLine({
  children,
  className,
  indent = 0,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { indent?: number }) {
  return (
    <div
      className={cn("min-h-[1.25rem] pl-[calc(1rem*var(--indent))]", className)}
      style={{ "--indent": indent } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
