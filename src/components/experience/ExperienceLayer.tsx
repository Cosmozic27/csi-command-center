'use client';

import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const position = useRef({ x: -40, y: -40 });
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const update = () => setEnabled(finePointer.matches);
    update();
    finePointer.addEventListener('change', update);
    if (!finePointer.matches) return () => finePointer.removeEventListener('change', update);
    const move = (event: PointerEvent) => {
      position.current = { x: event.clientX, y: event.clientY };
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      const target = event.target as HTMLElement;
      setActive(Boolean(target.closest('a, button, input, textarea, select, [role="button"]')));
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { window.removeEventListener('pointermove', move); finePointer.removeEventListener('change', update); };
  }, []);

  if (!enabled) return null;
  return <><span ref={dotRef} className="custom-cursor-dot" /><span ref={ringRef} className={`custom-cursor-ring ${active ? 'is-active' : ''}`} /></>;
}

export function Magnetic({ children, strength = 0.18, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const handleMove = (event: MouseEvent<HTMLSpanElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
    event.currentTarget.style.setProperty('--mag-x', `${Math.max(-8, Math.min(8, x))}px`);
    event.currentTarget.style.setProperty('--mag-y', `${Math.max(-8, Math.min(8, y))}px`);
  };
  const reset = () => { if (ref.current) { ref.current.style.setProperty('--mag-x', '0px'); ref.current.style.setProperty('--mag-y', '0px'); } };
  return <span ref={ref} onMouseMove={handleMove} onMouseLeave={reset} className={`magnetic-wrap ${className}`}>{children}</span>;
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { node.classList.add('is-visible'); observer.unobserve(node); } }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties} className={`reveal-on-scroll ${className}`}>{children}</div>;
}

export function SpotlightCard({ children, className = '', tilt = false }: { children: ReactNode; className?: string; tilt?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    node.style.setProperty('--spot-x', `${x}px`);
    node.style.setProperty('--spot-y', `${y}px`);
    if (tilt) { node.style.setProperty('--tilt-x', `${((y / rect.height) - 0.5) * -3}deg`); node.style.setProperty('--tilt-y', `${((x / rect.width) - 0.5) * 3}deg`); }
  };
  const leave = () => { const node = ref.current; if (node) { node.style.setProperty('--tilt-x', '0deg'); node.style.setProperty('--tilt-y', '0deg'); } };
  return <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`spotlight-card ${tilt ? 'spotlight-tilt' : ''} ${className}`}>{children}</div>;
}
