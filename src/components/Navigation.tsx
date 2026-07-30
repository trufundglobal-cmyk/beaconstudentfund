'use client';

import { useState } from 'react';
import Link from 'next/link';
import { List, X } from '@phosphor-icons/react';

const LOGO_PATH = '/logo.png';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Rates', href: '/rates' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-[var(--color-gray-200)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LOGO_PATH}
                alt="Beacon Student Fund"
                height={36}
                className="h-9 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[var(--color-gray-600)] hover:text-[var(--color-gray-900)] text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/apply"
              className="px-4 py-2 bg-[#38b2ac] hover:bg-[#319795] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/login"
              className="text-[var(--color-gray-600)] hover:text-[var(--color-gray-900)] text-sm font-semibold transition-colors border border-[var(--color-gray-200)] px-4 py-2 rounded-lg hover:bg-[var(--color-gray-100)]"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[var(--color-gray-600)] hover:text-primary hover:bg-[var(--color-gray-100)] focus:outline-none transition-colors"
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
        <div className="md:hidden bg-white border-t border-[var(--color-gray-200)]">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block w-full px-3 py-4 text-base font-medium text-[var(--color-gray-600)] hover:text-primary hover:bg-[var(--color-gray-100)] rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/apply"
              onClick={() => setIsOpen(false)}
              className="block w-full px-3 py-3 text-base font-semibold text-white bg-[#38b2ac] hover:bg-[#319795] rounded-lg transition-colors text-center mt-2"
            >
              Apply Now
            </Link>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full px-3 py-4 text-base font-semibold text-[var(--color-gray-600)] hover:text-primary hover:bg-[var(--color-gray-100)] rounded-lg transition-colors border-t border-[var(--color-gray-200)] mt-2"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
