import Link from 'next/link';
import { 
  ShieldCheck, 
  Lightning, 
  Bank, 
  CheckCircle,
  ArrowRight,
  Student
} from '@phosphor-icons/react/dist/ssr';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
        <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4">
          <div className="w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl"></div>
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-secondary-hover text-sm font-semibold mx-auto md:mx-0">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            Rates as low as 3.99% APR
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tight font-outfit leading-tight">
            Fund your future with <span className="text-gradient">confidence.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto md:mx-0">
            TruFund provides transparent, secure, and lightning-fast student loans designed for modern education. No hidden fees, ever.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Link 
              href="/apply" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary-light transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Check Your Rate <ArrowRight weight="bold" />
            </Link>
            <p className="text-sm text-slate-500 font-medium">Takes 2 minutes. Won't affect your credit score.</p>
          </div>
        </div>

        {/* Hero Image/Card Placeholder */}
        <div className="flex-1 w-full max-w-md relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-secondary/20 rounded-3xl blur-2xl transform rotate-3"></div>
          <div className="relative glass-dark rounded-3xl p-8 text-white shadow-2xl border border-white/10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-white/60 text-sm font-medium mb-1">Approved Loan</p>
                <p className="text-3xl font-bold font-outfit">$24,500</p>
              </div>
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                <Bank weight="duotone" size={24} className="text-secondary" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-secondary to-accent rounded-full"></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Disbursement</span>
                <span className="font-medium text-secondary">Processing</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
              <CheckCircle weight="fill" className="text-green-400" size={20} />
              <p className="text-sm text-white/80">Institution-grade security</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
            Trusted by students at over 500 universities
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-4 text-secondary">
                <Lightning weight="duotone" size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2 font-outfit">Fast Approval</h3>
              <p className="text-slate-600">Get your rate in 2 minutes. Receive funds as soon as the next business day.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-primary">
                <ShieldCheck weight="duotone" size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2 font-outfit">Bank-Level Security</h3>
              <p className="text-slate-600">Your data is encrypted using AES-256. We never sell your personal information.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-4 text-accent">
                <Bank weight="duotone" size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2 font-outfit">No Hidden Fees</h3>
              <p className="text-slate-600">No origination fees, no prepayment penalties, and no late fees. Transparency first.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Mobile Optimized Vertical Timeline) */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-outfit mb-4">How it works</h2>
          <p className="text-lg text-slate-600">Three simple steps to fund your education.</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] md:left-1/2 md:-ml-[1px] top-4 bottom-4 w-[2px] bg-slate-200 z-0"></div>

          <div className="space-y-12 relative z-10">
            {[
              {
                step: "01",
                title: "Check your rate",
                desc: "Fill out a quick form to see your options in 2 minutes without affecting your credit score."
              },
              {
                step: "02",
                title: "Choose your terms",
                desc: "Select the repayment plan that fits your budget. Upload a few documents for verification."
              },
              {
                step: "03",
                title: "Get funded",
                desc: "Once approved, we send the funds directly to your school or your bank account."
              }
            ].map((item, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 flex md:justify-end">
                  <div className={`hidden md:block text-right ${idx % 2 !== 0 ? 'md:text-left' : ''}`}>
                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                    <p className="text-slate-600 mt-2">{item.desc}</p>
                  </div>
                </div>
                
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center font-bold text-primary shadow-sm z-10 relative">
                  {item.step}
                </div>

                <div className="md:w-1/2">
                  <div className="md:hidden">
                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                    <p className="text-slate-600 mt-2">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white font-outfit leading-tight">
            Ready to take control of your student loans?
          </h2>
          <p className="text-white/80 text-lg md:text-xl">
            Join thousands of students who have chosen TruFund.
          </p>
          <div className="pt-4">
            <Link 
              href="/apply" 
              className="inline-flex px-8 py-4 rounded-full bg-accent text-white font-bold text-lg hover:bg-accent-hover transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-light py-12 px-4 sm:px-6 lg:px-8 text-white/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-white/10 pb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-white/10 p-1.5 rounded-lg text-white">
                <Student weight="duotone" size={24} />
              </div>
              <span className="font-outfit font-bold text-xl tracking-tight text-white">
                TruFund
              </span>
            </Link>
            <p className="text-sm max-w-sm leading-relaxed">
              Making student loans transparent, fair, and accessible for everyone. 
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Licenses</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} TruFund Financial, LLC. All rights reserved.</p>
          <p>Equal Housing Lender.</p>
        </div>
      </footer>
    </div>
  );
}
