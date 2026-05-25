"use client";
import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'purple' | 'blue' | 'green' | 'red' | 'orange';
  customSize?: boolean;
}

const glowColorMap = {
  purple: { base: 280, spread: 300 },
  blue: { base: 220, spread: 200 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

export function GlowCard({ children, className = '', glowColor = 'purple', customSize = true }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // customSize used for potential future sizing — suppress unused warning
  void customSize;

  useEffect(() => {
    const sync = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', x.toFixed(2));
        cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', y.toFixed(2));
        cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };
    document.addEventListener('pointermove', sync);
    return () => document.removeEventListener('pointermove', sync);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const style = {
    '--base': base, '--spread': spread, '--radius': '14', '--border': '1',
    '--backdrop': 'rgba(26, 26, 26, 0.8)',
    '--backup-border': 'rgba(203, 108, 230, 0.15)',
    '--size': '200', '--outer': '1',
    '--border-size': 'calc(var(--border, 1) * 1px)',
    '--spotlight-size': 'calc(var(--size, 150) * 1px)',
    '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
    backgroundImage: `radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(var(--hue, 280) 100% 70% / 0.12), transparent)`,
    backgroundColor: 'var(--backdrop, transparent)',
    backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
    backgroundPosition: '50% 50%',
    backgroundAttachment: 'fixed',
    border: 'var(--border-size) solid var(--backup-border)',
    position: 'relative' as const,
  } as React.CSSProperties;

  const beforeAfterCSS = `[data-glow]::before,[data-glow]::after{pointer-events:none;content:"";position:absolute;inset:calc(var(--border-size)*-1);border:var(--border-size) solid transparent;border-radius:calc(var(--radius)*1px);background-attachment:fixed;background-size:calc(100% + (2*var(--border-size))) calc(100% + (2*var(--border-size)));background-repeat:no-repeat;background-position:50% 50%;mask:linear-gradient(transparent,transparent),linear-gradient(white,white);mask-clip:padding-box,border-box;mask-composite:intersect;}[data-glow]::before{background-image:radial-gradient(calc(var(--spotlight-size)*.75) calc(var(--spotlight-size)*.75) at calc(var(--x,0)*1px) calc(var(--y,0)*1px),hsl(var(--hue,280) 100% 70% / 1),transparent 100%);filter:brightness(2);}[data-glow]::after{background-image:radial-gradient(calc(var(--spotlight-size)*.5) calc(var(--spotlight-size)*.5) at calc(var(--x,0)*1px) calc(var(--y,0)*1px),hsl(0 100% 100% / .5),transparent 100%);}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterCSS }} />
      <div ref={cardRef} data-glow style={style} className={`rounded-2xl relative p-6 backdrop-blur-sm ${className}`}>
        <div data-glow style={{ position: 'absolute', inset: 0, opacity: 'var(--outer,1)', borderRadius: 'calc(var(--radius)*1px)', filter: `blur(calc(var(--border-size)*10))`, pointerEvents: 'none', border: 'none', background: 'none' } as React.CSSProperties} />
        {children}
      </div>
    </>
  );
}
