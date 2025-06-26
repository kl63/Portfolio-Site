'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Glow Effect Component
export type GlowEffectProps = {
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  mode?: 'rotate' | 'pulse' | 'breathe' | 'colorShift' | 'flowHorizontal' | 'static';
  blur?: number | 'softest' | 'soft' | 'medium' | 'strong' | 'stronger' | 'strongest' | 'none';
  scale?: number;
  duration?: number;
};

export function GlowEffect({
  className,
  style,
  colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'],
  mode = 'rotate',
  blur = 'medium',
  scale = 1,
  duration = 5,
}: GlowEffectProps) {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: duration,
    ease: 'linear',
  };

  const animations = {
    rotate: {
      background: [
        `conic-gradient(from 0deg at 50% 50%, ${colors.join(', ')})`,
        `conic-gradient(from 360deg at 50% 50%, ${colors.join(', ')})`,
      ],
      transition: BASE_TRANSITION,
    },
    pulse: {
      background: colors.map(
        (color) =>
          `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
      ),
      scale: [1 * scale, 1.1 * scale, 1 * scale],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        ...BASE_TRANSITION,
        repeatType: 'mirror',
      },
    },
    breathe: {
      background: [
        `radial-gradient(circle at 50% 50%, ${colors[0]} 0%, transparent 50%)`,
        `radial-gradient(circle at 50% 50%, ${colors[0]} 0%, transparent 70%)`,
        `radial-gradient(circle at 50% 50%, ${colors[0]} 0%, transparent 50%)`,
      ],
      scale: [1 * scale, 1.05 * scale, 1 * scale],
      opacity: [0.6, 0.8, 0.6],
      transition: {
        ...BASE_TRANSITION,
        repeatType: 'mirror',
      },
    },
    colorShift: {
      background: colors.map(
        (color) => `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 70%)`
      ),
      transition: BASE_TRANSITION,
    },
    flowHorizontal: {
      x: ['0%', '100%', '0%'],
      transition: BASE_TRANSITION,
    },
    static: {},
  };

  const getBlurValue = () => {
    if (typeof blur === 'number') return `${blur}px`;
    
    const blurValues = {
      none: '0px',
      softest: '40px',
      soft: '80px',
      medium: '120px',
      strong: '160px',
      stronger: '200px',
      strongest: '240px',
    };
    
    return blurValues[blur] || '120px';
  };

  return (
    <motion.div
      className={cn('absolute inset-0 -z-10 opacity-70', className)}
      style={{
        filter: `blur(${getBlurValue()})`,
        ...style,
      }}
      animate={animations[mode] || animations.rotate}
    />
  );
}

export default GlowEffect;
