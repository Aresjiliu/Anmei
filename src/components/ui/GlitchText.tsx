import React from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  children: string;
  className?: string;
}

export const GlitchText = ({ children, className }: GlitchTextProps) => {
  return (
    <div className={cn('relative inline-block', className)}>
      {/* 原始文本 */}
      <span className="relative z-10 block">{children}</span>

      {/* 第一个重影 */}
      <span
        className="absolute top-0 left-0 z-0 text-tech-blue opacity-70 animate-glitch"
        style={{
          animation: 'glitch 0.3s ease-in-out infinite',
          animationDelay: '-0.1s',
        }}
      >
        {children}
      </span>

      {/* 第二个重影 */}
      <span
        className="absolute top-0 left-0 z-0 text-tech-purple opacity-70 animate-glitch"
        style={{
          animation: 'glitch 0.3s ease-in-out infinite',
          animationDelay: '-0.2s',
        }}
      >
        {children}
      </span>
    </div>
  );
};
