'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InteractiveCalculator() {
  const [amount, setAmount] = useState(5000);
  const [term, setTerm] = useState(36);
  
  // Standard fixed rate of 8.99% for estimation purposes
  const apr = 0.0899; 
  
  // Amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1]
  const monthlyRate = apr / 12;
  const numerator = amount * monthlyRate * Math.pow(1 + monthlyRate, term);
  const denominator = Math.pow(1 + monthlyRate, term) - 1;
  const estimatedPayment = Math.round(numerator / denominator);

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border border-[var(--color-gray-200)] relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      <h3 className="text-[var(--color-gray-900)] font-semibold mb-6 text-center text-sm tracking-widest uppercase">
        Interactive Calculator
      </h3>
      
      <div className="space-y-6">
        <div>
          <label className="flex justify-between text-sm font-medium text-[var(--color-gray-600)] mb-2">
            <span>How much do you need?</span>
            <span className="font-bold text-[var(--color-gray-900)]">${amount.toLocaleString()}</span>
          </label>
          <input 
            type="range" 
            min="1000" 
            max="15000" 
            step="100" 
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-[var(--color-gray-200)] rounded-lg appearance-none cursor-pointer accent-secondary"
          />
          <div className="flex justify-between text-xs text-[var(--color-gray-400)] mt-1 font-medium">
            <span>$1,000</span>
            <span>$15,000</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-gray-600)] mb-2">
            Repayment Term (Months)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[12, 24, 36, 48].map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={`py-2 text-sm rounded-md transition-colors ${
                  term === t 
                    ? 'text-primary bg-blue-50 border-2 border-primary font-semibold' 
                    : 'text-[var(--color-gray-600)] bg-[var(--color-gray-100)] border border-[var(--color-gray-200)] hover:bg-[var(--color-gray-200)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[var(--color-gray-100)] p-4 rounded-lg border border-[var(--color-gray-200)] text-center">
          <p className="text-xs text-[var(--color-gray-600)] uppercase tracking-wider font-semibold mb-1">
            Estimated Monthly Payment
          </p>
          <p className="text-4xl font-bold text-[var(--color-gray-900)]">${estimatedPayment}<span className="text-lg text-[var(--color-gray-500)] font-medium">/mo</span></p>
          <p className="text-xs text-[var(--color-gray-500)] mt-1">Based on 8.99% fixed APR</p>
        </div>

        <Link 
          href="/apply" 
          className="block w-full py-3.5 bg-primary hover:bg-primary-light text-white text-center font-semibold rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Check Your Real Rate
        </Link>
      </div>
    </div>
  );
}
