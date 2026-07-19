import Link from 'next/link';
import { Percent, CalendarBlank, ShieldCheck, CreditCard } from '@phosphor-icons/react/dist/ssr';

export default function RatesPage() {
  return (
    <div className="bg-[var(--color-gray-100)] min-h-[calc(100vh-4rem)] pb-20">
      
      <section className="bg-primary text-white py-16 px-4 border-b border-[var(--color-primary-light)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Rates & Terms</h1>
          <p className="text-lg text-[var(--color-light-teal)] max-w-2xl mx-auto">
            Clear, transparent pricing. No hidden fees. No surprises.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          
          <div className="bg-white rounded-xl shadow-sm border border-[var(--color-gray-200)] overflow-hidden mb-12">
            <div className="p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-4">Fixed Rates from 5.99% to 14.99% APR*</h2>
                <p className="text-[var(--color-gray-600)] mb-6">
                  Your rate is fixed for the life of your loan. It will never increase, regardless of market conditions. 
                  We use alternative data, not just your FICO score, to give you the fairest rate possible.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2 text-[var(--color-gray-700)] font-medium bg-[var(--color-gray-100)] px-4 py-2 rounded-md">
                    <ShieldCheck size={20} className="text-success" weight="fill" /> No Origination Fees
                  </div>
                  <div className="flex items-center gap-2 text-[var(--color-gray-700)] font-medium bg-[var(--color-gray-100)] px-4 py-2 rounded-md">
                    <ShieldCheck size={20} className="text-success" weight="fill" /> No Prepayment Penalties
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <div className="bg-[var(--color-gray-50)] border border-[var(--color-gray-200)] rounded-xl p-6 text-center shadow-inner min-w-[250px]">
                  <p className="text-sm font-semibold text-[var(--color-gray-500)] uppercase tracking-wider mb-2">Check Your Rate</p>
                  <p className="text-xs text-[var(--color-gray-400)] mb-4">(Soft credit pull only)</p>
                  <Link href="/apply" className="block w-full py-3 bg-secondary hover:bg-secondary-hover text-white font-semibold rounded-lg transition-colors">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[var(--color-gray-200)]">
              <div className="w-12 h-12 bg-blue-50 text-primary rounded-lg flex items-center justify-center mb-6">
                <CalendarBlank size={24} weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-gray-900)] mb-3">Flexible Terms</h3>
              <p className="text-[var(--color-gray-600)] mb-4">
                Choose a repayment term that fits your budget. We offer terms of 12, 24, 36, or 48 months. Longer terms mean lower monthly payments, while shorter terms mean you pay less interest overall.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-[var(--color-gray-200)]">
              <div className="w-12 h-12 bg-orange-50 text-accent rounded-lg flex items-center justify-center mb-6">
                <CreditCard size={24} weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-gray-900)] mb-3">AutoPay Discount</h3>
              <p className="text-[var(--color-gray-600)] mb-4">
                Enroll in AutoPay and receive a 0.25% interest rate reduction. Your payments will be automatically deducted from your linked bank account each month, ensuring you never miss a due date.
              </p>
            </div>
          </div>

          <div className="text-sm text-[var(--color-gray-500)] border-t border-[var(--color-gray-300)] pt-8">
            <p className="mb-2">
              * The lowest APRs are available to the most creditworthy applicants. Rates and terms are subject to change without notice. Your actual APR will depend on your credit history, income, loan term, and other factors.
            </p>
            <p>
              Checking your rate involves a soft credit inquiry, which does not affect your credit score. A hard credit inquiry, which may impact your credit score, is only required if you choose a loan offer and proceed with the application.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
