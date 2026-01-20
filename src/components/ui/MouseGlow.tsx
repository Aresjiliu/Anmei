import React, { useEffect, useRef } from 'react';

export const MouseGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed w-64 h-64 pointer-events-none z-10"
      style={{
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, rgba(124, 58, 237, 0.1) 40%, transparent 70%)',
        filter: 'blur(40px)',
        opacity: 0.6,
      }}
    />
  );
};
