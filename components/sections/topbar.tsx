"use client";
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import Magnet from '@/components/magnet';
import { StarButton } from '@/components/star-button';

export function Topbar() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  const links = [
    { label: 'Method', href: '#method' },
    { label: 'Agents', href: '#agents' },
    { label: 'Process', href: '#process' },
    { label: 'FAQ', href: '#faq' },
  ];

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={cn(
      'sticky top-0 z-50 mx-auto w-full border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out',
      scrolled && !open && 'bg-black/90 border-[var(--color-line)] backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow-[var(--shadow-glow-violet)]',
      open && 'bg-black/95',
    )}>
      <nav className={cn('flex h-16 w-full items-center justify-between px-4 md:transition-all md:ease-out', scrolled && 'md:px-3')}>
        <a href="#top" className="inline-flex items-center gap-2">
          <Image src="/images/lumenosis-logo.png" alt="Lumenosis AI" width={32} height={32} className="rounded-lg" />
          <span className="font-semibold text-white">Lumenosis <span className="text-[var(--color-brand-purple)]">AI</span></span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="px-3 py-2 text-sm text-[var(--color-muted)] hover:text-white transition-colors rounded-md hover:bg-white/5">
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <Magnet padding={60} magnetStrength={5}>
            <StarButton lightColor="#cb6ce6" className="bg-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple)]/90 text-white px-5 h-10 text-sm">
              Book a strategy call
            </StarButton>
          </Magnet>
        </div>
        <button type="button" onClick={() => setOpen(!open)} className="grid size-9 place-items-center rounded-md border border-[var(--color-line)] bg-white/5 text-white md:hidden" aria-label="Toggle menu">
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </button>
      </nav>
      {open && (
        <div className="fixed top-16 inset-x-0 bottom-0 z-50 bg-black/95 flex flex-col p-4 gap-2 md:hidden border-t border-[var(--color-line)]">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="px-4 py-3 text-lg text-white/80 hover:text-white rounded-md hover:bg-white/5 transition-colors">
              {link.label}
            </a>
          ))}
          <div className="mt-auto">
            <StarButton lightColor="#cb6ce6" className="w-full bg-[var(--color-brand-purple)] text-white h-12 text-base justify-center">
              Book a strategy call
            </StarButton>
          </div>
        </div>
      )}
    </header>
  );
}
