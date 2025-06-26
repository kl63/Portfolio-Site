"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Dock Components
export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto flex h-[58px] w-max gap-2 rounded-2xl border p-2 backdrop-blur-md",
);

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = "bottom", // direction is passed to child components
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    return (
      <motion.div
        ref={ref}
        onMouseMove={(event) => {
          const { clientX } = event;
          const { left } = event.currentTarget.getBoundingClientRect();
          mouseX.set(clientX - left);
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(dockVariants(), className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === DockIcon) {
            return React.cloneElement(child as React.ReactElement<DockIconProps>, {
              mouseX,
              magnification,
              distance,
              direction,
            });
          }
          return child;
        })}
      </motion.div>
    );
  },
);
Dock.displayName = "Dock";

// Dock Icon
export interface DockIconProps {
  className?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  mouseX?: import("framer-motion").MotionValue<number>;
  magnification?: number;
  distance?: number;
  direction?: "top" | "middle" | "bottom";
}

export const DockIcon = React.forwardRef<HTMLDivElement, DockIconProps>(
  (
    {
      className,
      icon,
      onClick,
      mouseX,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      direction,
      ...props
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ref,
  ) => {
    const divRef = useRef<HTMLDivElement>(null);

    // Create a default motion value hook (rule of hooks: must be called unconditionally)
    const defaultMotionValue = useMotionValue(Infinity);
    // Use mouseX if provided, otherwise use the default
    const safeMouseX = mouseX ?? defaultMotionValue;
    
    const distanceCalc = useTransform(safeMouseX, (val: number) => {
      if (!divRef.current) return 0;
      const rect = divRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      return -(val - x);
    });

    const widthSync = useTransform(distanceCalc, [-distance, 0, distance], [32, 48 + magnification / 5, 32]);
    const heightSync = useTransform(distanceCalc, [-distance, 0, distance], [32, 48 + magnification / 5, 32]);

    return (
      <motion.div
        ref={divRef}
        style={{
          width: widthSync,
          height: heightSync,
        }}
        className="flex items-center justify-center"
      >
        <motion.div
          className={cn(
            "flex min-h-[32px] min-w-[32px] cursor-pointer items-center justify-center rounded-full bg-white p-1 hover:ring-2 hover:ring-slate-700/20 dark:bg-slate-800 dark:hover:ring-white/20",
            className,
          )}
          onClick={onClick}
          {...props}
        >
          {icon}
        </motion.div>
      </motion.div>
    );
  },
);
DockIcon.displayName = "DockIcon";
