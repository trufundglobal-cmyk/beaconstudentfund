'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShieldChevron, LockKey, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Check routing logic
      if (email.toLowerCase().includes('admin') || data.user?.email?.toLowerCase().includes('admin')) {
        router.push('/admin');
      } else {
        // Since Student Dashboard isn't built yet, we show an alert and redirect home
        alert("The Student Dashboard is currently under construction. We will notify you when it's ready!");
        router.push('/');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[var(--color-gray-100)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-[var(--color-gray-200)] flex items-center justify-center">
              <ShieldChevron weight="fill" size={28} className="text-primary" />
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-[var(--color-gray-900)] tracking-tight">
            Welcome back
          </h2>
          <p className="text-[var(--color-gray-600)] mt-2 text-sm">
            Log in to manage your TruFund account.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md border border-[var(--color-gray-200)]">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeSimple className="text-[var(--color-gray-400)]" size={20} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-[var(--color-gray-300)] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow text-[var(--color-gray-900)]"
                  placeholder="you@university.edu"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-[var(--color-gray-700)]">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary-light">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockKey className="text-[var(--color-gray-400)]" size={20} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-[var(--color-gray-300)] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow text-[var(--color-gray-900)]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 transition-colors"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm text-[var(--color-gray-600)]">
          Don't have an account?{' '}
          <Link href="/apply" className="font-semibold text-primary hover:text-primary-light">
            Check your rate
          </Link>
        </p>
      </div>
    </div>
  );
}
