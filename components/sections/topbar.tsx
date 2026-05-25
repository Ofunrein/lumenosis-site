"use client";
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import Magnet from '@/components/magnet';
import { StarButton } from '@/components/star-button';
import { useTheme } from 'next-themes';

export function Topbar() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

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
      scrolled && !open && 'bg-[var(--color-bg-cream)]/90 border-[var(--color-line)] backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow-[var(--shadow-glow-violet)]',
      open && 'bg-[var(--color-bg-cream)]/95',
    )}>
      <nav className={cn('flex h-16 w-full items-center justify-between px-4 md:transition-all md:ease-out', scrolled && 'md:px-3')}>
        <a href="#top" className="inline-flex items-center gap-2">
          <Image src="/images/lumenosis-logo.png" alt="Lumenosis AI" width={32} height={32} className="rounded-lg" />
          <span className="font-semibold text-[var(--color-ink-charcoal)]">Lumenosis <span className="text-[var(--color-brand-purple)]">AI</span></span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="px-3 py-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-ink-charcoal)] transition-colors rounded-md hover:bg-[var(--color-brand-violet-soft)]">
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="grid size-9 place-items-center rounded-lg border border-[var(--color-line)] bg-[var(--color-brand-violet-soft)] text-[var(--color-brand-violet)] hover:bg-[var(--color-brand-violet-soft)] transition-colors"
              aria-label="Toggle dark/light mode"
            >
              {resolvedTheme === 'dark' ? (
                <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                  <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                  <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm9-9h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM3 12H2a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm15.66-6.24-.7-.7a1 1 0 0 0-1.42 1.42l.7.7a1 1 0 0 0 1.42-1.42zm-12.02 12.02-.7-.7a1 1 0 0 0-1.42 1.42l.7.7a1 1 0 0 0 1.42-1.42zm12.02 0a1 1 0 0 0-1.42 0l-.7.7a1 1 0 0 0 1.42 1.42l.7-.7a1 1 0 0 0 0-1.42zm-12.02-12.02a1 1 0 0 0 0 1.42l-.7.7a1 1 0 1 0 1.42-1.42l-.7-.7a1 1 0 0 0-1.42 0z"/>
                </svg>
              )}
            </button>
          )}
          <Magnet padding={60} magnetStrength={5}>
            <StarButton lightColor="#cb6ce6" className="bg-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple)]/90 text-white px-5 h-10 text-sm">
              Book a strategy call
            </StarButton>
          </Magnet>
        </div>
        <button type="button" onClick={() => setOpen(!open)} className="grid size-9 place-items-center rounded-md border border-[var(--color-line)] bg-[var(--color-brand-violet-soft)] text-[var(--color-ink-charcoal)] md:hidden" aria-label="Toggle menu">
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </button>
      </nav>
      {open && (
        <div className="fixed top-16 inset-x-0 bottom-0 z-50 bg-[var(--color-bg-cream)]/95 flex flex-col p-4 gap-2 md:hidden border-t border-[var(--color-line)]">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="px-4 py-3 text-lg text-[var(--color-muted)] hover:text-[var(--color-ink-charcoal)] rounded-md hover:bg-[var(--color-brand-violet-soft)] transition-colors">
              {link.label}
            </a>
          ))}
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-2 px-4 py-3 text-lg text-[var(--color-muted)] hover:text-[var(--color-ink-charcoal)] rounded-md hover:bg-[var(--color-brand-violet-soft)] transition-colors"
              aria-label="Toggle dark/light mode"
            >
              {resolvedTheme === 'dark' ? (
                <>
                  <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
                    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
                  </svg>
                  Switch to light mode
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
                    <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm9-9h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM3 12H2a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm15.66-6.24-.7-.7a1 1 0 0 0-1.42 1.42l.7.7a1 1 0 0 0 1.42-1.42zm-12.02 12.02-.7-.7a1 1 0 0 0-1.42 1.42l.7.7a1 1 0 0 0 1.42-1.42zm12.02 0a1 1 0 0 0-1.42 0l-.7.7a1 1 0 0 0 1.42 1.42l.7-.7a1 1 0 0 0 0-1.42zm-12.02-12.02a1 1 0 0 0 0 1.42l-.7.7a1 1 0 1 0 1.42-1.42l-.7-.7a1 1 0 0 0-1.42 0z"/>
                  </svg>
                  Switch to dark mode
                </>
              )}
            </button>
          )}
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
