import Link from 'next/link';
import { Users, Target, ShieldCheck } from '@phosphor-icons/react/dist/ssr';

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-gray-100)] min-h-[calc(100vh-4rem)] pb-20">
      {/* Hero */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Bridging the Tuition Gap</h1>
          <p className="text-xl text-[var(--color-light-teal)] max-w-2xl mx-auto leading-relaxed">
            We believe that no student should have to drop out because of a temporary financial shortfall. TruFund was built to provide fast, transparent, and fair funding to students when they need it most.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[var(--color-gray-200)] text-center">
              <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Target size={32} weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-gray-900)] mb-3">Our Mission</h3>
              <p className="text-[var(--color-gray-600)]">
                To empower students to finish their degrees by providing accessible bridge loans that cover unexpected educational expenses without hidden fees.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-[var(--color-gray-200)] text-center">
              <div className="w-16 h-16 bg-[var(--color-light-teal)] text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-gray-900)] mb-3">Transparency</h3>
              <p className="text-[var(--color-gray-600)]">
                We don't do hidden fees, tricky compounding, or surprise rate hikes. What you see is exactly what you get, backed by bank-level security.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-[var(--color-gray-200)] text-center">
              <div className="w-16 h-16 bg-orange-50 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-gray-900)] mb-3">Student-First</h3>
              <p className="text-[var(--color-gray-600)]">
                Our platform is designed around the student experience. We don't require cosigners for our standard gap loans, trusting in your future potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-20 px-4 border-y border-[var(--color-gray-200)]">
        <div className="max-w-3xl mx-auto prose prose-lg text-[var(--color-gray-600)]">
          <h2 className="text-3xl font-bold text-[var(--color-gray-900)] text-center mb-8">Our Story</h2>
          <p>
            TruFund was founded in 2024 after our founders witnessed countless classmates struggle to cover small gaps in their tuition and living expenses. Federal aid often falls just short, and traditional private loans require lengthy processes, high minimums, and cosigners that many students simply don't have.
          </p>
          <p>
            We realized there was a need for a "bridge"—a fast, reliable, and fair way to secure funding for the last $1,000 to $15,000 needed to stay enrolled. By leveraging modern technology and alternative data, TruFund provides instant decisions and fast funding, keeping students in the classroom where they belong.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-6">Ready to bridge your gap?</h2>
        <Link 
          href="/apply" 
          className="inline-flex justify-center items-center px-8 py-4 bg-secondary hover:bg-secondary-hover text-white font-semibold rounded-lg transition-colors shadow-md text-lg"
        >
          Check Your Rate Today
        </Link>
      </section>
    </div>
  );
}
