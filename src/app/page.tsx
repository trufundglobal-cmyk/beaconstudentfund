import Link from 'next/link';
import InteractiveCalculator from '@/components/InteractiveCalculator';
import Testimonials from '@/components/Testimonials';
import { 
  LockKey,
  Lightning, 
  CheckCircle,
  CaretDown
} from '@phosphor-icons/react/dist/ssr';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Beacon Student Fund',
    url: 'https://beaconstudentfund.com',
    description: 'A modern, highly trusted US-based student loan platform offering flexible funding for tuition, room, and board.',
    areaServed: 'US',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    serviceType: 'Student Loans',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Check your rate with no impact to your credit score.',
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-gray-100)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="bg-primary pt-24 pb-20 md:pt-32 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-[var(--color-primary-light)]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Column: Copy */}
          <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              BRIDGE YOUR TUITION GAP
            </h1>
            <p className="text-lg text-[var(--color-light-teal)] max-w-xl mx-auto lg:mx-0 font-medium">
              Unsecured student loans from $1,000 to $15,000.
            </p>
            <ul className="text-white/90 text-left space-y-3 max-w-md mx-auto lg:mx-0 inline-block font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle weight="bold" className="text-secondary" /> No cosigner required
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle weight="bold" className="text-secondary" /> Fixed rates
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle weight="bold" className="text-secondary" /> Decision in minutes
              </li>
            </ul>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                href="/apply" 
                className="w-full sm:w-auto px-8 py-4 bg-[#ed8936] hover:bg-[#dd6b20] text-white font-bold rounded-lg text-lg transition-colors shadow-md text-center uppercase tracking-wide"
              >
                Check Your Rate
              </Link>
              <span className="text-sm text-[var(--color-gray-400)]">No impact to your credit score</span>
            </div>
          </div>

          {/* Right Column: Calculator */}
          <div className="flex-1 w-full max-w-md">
            <InteractiveCalculator />
          </div>

        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-white border-b border-[var(--color-gray-200)] py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-[var(--color-gray-600)] text-sm font-medium">
          <div className="flex items-center gap-2">
            <LockKey weight="bold" className="text-[var(--color-gray-400)]" size={18} /> 256-bit SSL Encryption
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle weight="bold" className="text-[var(--color-gray-400)]" size={18} /> No Hidden Fees
          </div>
          <div className="flex items-center gap-2">
            <Lightning weight="bold" className="text-[var(--color-gray-400)]" size={18} /> Decision in 2 Minutes
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-gray-100)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-gray-900)] text-center mb-4 uppercase tracking-wider">
            How Beacon Student Fund Works
          </h2>
          <p className="text-center text-[var(--color-gray-600)] mb-16 max-w-xl mx-auto">
            From application to funding in as little as two business days.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line visible on desktop */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-[var(--color-gray-200)] z-0"></div>

            {/* Step 1 */}
            <div className="card p-8 text-center flex flex-col items-center relative z-10">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mb-6 shadow-sm">
                1
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-gray-900)] mb-2">Apply Online</h3>
              <p className="text-[var(--color-gray-600)] text-sm leading-relaxed">Fill out our short application. Takes about 5 minutes. No impact to your credit score.</p>
            </div>

            {/* Step 2 */}
            <div className="card p-8 text-center flex flex-col items-center relative z-10">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mb-6 shadow-sm">
                2
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-gray-900)] mb-2">Upload Your Documents</h3>
              <p className="text-[var(--color-gray-600)] text-sm leading-relaxed">Securely upload a government-issued ID and your most recent transcript. All files are 256-bit encrypted.</p>
            </div>

            {/* Step 3 */}
            <div className="card p-8 text-center flex flex-col items-center relative z-10">
              <div className="w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold mb-6 shadow-sm">
                3
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-gray-900)] mb-2">Get Funded</h3>
              <p className="text-[var(--color-gray-600)] text-sm leading-relaxed">Once approved, funds are deposited directly into your bank account — as fast as 2 business days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <Testimonials />

      {/* FAQ Preview */}
      <section id="faq" className="py-20 px-4 bg-[var(--color-gray-100)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-gray-900)] text-center mb-12 uppercase tracking-wider">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <div className="card p-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-[var(--color-gray-900)] text-lg">Will checking my rate affect my credit score?</h4>
                <CaretDown className="text-[var(--color-gray-400)]" />
              </div>
              <p className="text-[var(--color-gray-600)]">No, we use a soft credit pull to show your estimated rates. A hard inquiry is only performed if you choose a loan and continue the application.</p>
            </div>
            
            <div className="card p-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-[var(--color-gray-900)] text-lg">What documents do I need?</h4>
                <CaretDown className="text-[var(--color-gray-400)]" />
              </div>
              <p className="text-[var(--color-gray-600)]">You will need to upload a valid Government-issued ID (like a driver&apos;s license or passport) and a recent transcript showing your enrollment status.</p>
            </div>

            <div className="card p-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-[var(--color-gray-900)] text-lg">How long until I get my money?</h4>
                <CaretDown className="text-[var(--color-gray-400)]" />
              </div>
              <p className="text-[var(--color-gray-600)]">Once approved and your documents are verified, funds are typically disbursed within 2 to 5 business days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white pt-16 pb-8 px-4 border-t border-[var(--color-primary-light)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center mb-4 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-white.png"
                alt="Beacon Student Fund"
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[var(--color-gray-400)] max-w-sm leading-relaxed">
              True to Your Potential. Modern, transparent student loans designed for your future.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Products</h4>
            <ul className="space-y-4 text-sm text-[var(--color-gray-400)]">
              <li><Link href="/apply" className="hover:text-white transition-colors">Student Loans</Link></li>
              <li><Link href="/rates" className="hover:text-white transition-colors">Rates & Terms</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-sm text-[var(--color-gray-400)]">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--color-gray-400)]">
          <p>© {new Date().getFullYear()} Beacon Student Fund. All rights reserved.</p>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="flex items-center gap-1"><LockKey /> 256-bit SSL Secure</span>
            <span>Equal Housing Lender</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
