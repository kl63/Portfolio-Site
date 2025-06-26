'use client';

import React, { useEffect, useRef } from 'react';

interface AnimatedGradientBackgroundProps {
  startingGap?: number;
  breathing?: boolean;
  gradientColors?: string[];
  gradientStops?: number[];
  animationSpeed?: number;
  breathingRange?: number;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
  topOffset?: number;
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
  startingGap = 125,
  breathing = true,
  gradientColors = [
    "#0A0A0A",
    "#3B82F6",
    "#8B5CF6",
    "#6366F1",
    "#4F46E5",
    "#3B82F6",
    "#1E40AF"
  ],
  gradientStops = [35, 50, 60, 70, 80, 90, 100],
  animationSpeed = 0.02,
  breathingRange = 5,
  containerStyle = {},
  topOffset = 0,
  containerClassName = "",
}) => {
  if (gradientColors.length !== gradientStops.length) {
    throw new Error(
      `GradientColors and GradientStops must have the same length.
   Received gradientColors length: ${gradientColors.length},
   gradientStops length: ${gradientStops.length}`
    );
  }

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animationFrame: number;
    let width = startingGap;
    let directionWidth = 1;

    const animateGradient = () => {
      if (width >= startingGap + breathingRange) directionWidth = -1;
      if (width <= startingGap - breathingRange) directionWidth = 1;

      if (breathing) {
        width += directionWidth * animationSpeed;
      }

      if (containerRef.current) {
        const container = containerRef.current;
        const gradient = `radial-gradient(circle ${width}rem at 50% ${topOffset}%, ${gradientColors
          .map((color, index) => `${color} ${gradientStops[index]}%`)
          .join(", ")})`;

        container.style.background = gradient;
      }

      animationFrame = requestAnimationFrame(animateGradient);
    };

    animationFrame = requestAnimationFrame(animateGradient);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [
    breathing,
    breathingRange,
    animationSpeed,
    gradientColors,
    gradientStops,
    startingGap,
    topOffset,
  ]);

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      className={`absolute inset-0 -z-10 ${containerClassName}`}
    />
  );
};

export { AnimatedGradientBackground };
