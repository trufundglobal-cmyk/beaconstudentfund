'use client';

import { useState } from 'react';
import Link from 'next/link';
import { List, X, Student } from '@phosphor-icons/react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'How it Works', href: '/#how-it-works' },
    { name: 'Rates', href: '/#rates' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary text-white p-1.5 rounded-lg group-hover:bg-primary-light transition-colors">
                <Student weight="duotone" size={24} />
              </div>
              <span className="font-outfit font-bold text-xl tracking-tight text-primary">
                TruFund
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/apply"
              className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors shadow-sm"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-light hover:bg-black/5 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X weight="bold" size={24} />
              ) : (
                <List weight="bold" size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/20">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-3 py-4 text-base font-medium text-foreground hover:text-secondary hover:bg-black/5 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/apply"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 px-3 py-3.5 rounded-xl bg-primary text-white text-base font-semibold shadow-sm hover:bg-primary-light transition-colors"
            >
              Check Your Rate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
