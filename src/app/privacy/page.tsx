import { ShieldCheck, LockKey } from '@phosphor-icons/react/dist/ssr';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Beacon Student Fund.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--color-gray-100)] min-h-[calc(100vh-4rem)] py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[var(--color-gray-200)] p-8 md:p-12">
        
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[var(--color-light-teal)] text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} weight="fill" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-gray-900)] mb-4">Privacy Policy</h1>
          <p className="text-[var(--color-gray-500)]">Last Updated: October 2024</p>
        </div>

        <div className="prose prose-lg text-[var(--color-gray-600)] max-w-none">
          <p>
            At Beacon Student Fund, we take your privacy and the security of your data extremely seriously. We are committed to protecting the personal information you share with us to secure your educational bridge loan.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mt-10 mb-4 border-b border-[var(--color-gray-200)] pb-2">1. Information We Collect</h2>
          <p>
            When you apply for a loan, we collect the following information:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Personal Identity:</strong> Full name, date of birth, gender, and government-issued ID (Passport or Driver&apos;s License).</li>
            <li><strong>Contact Details:</strong> Email address, phone number, and physical address.</li>
            <li><strong>Educational Data:</strong> University name, enrollment status, and academic transcripts.</li>
            <li><strong>Financial Information:</strong> Bank account details for loan disbursement and AutoPay (if enrolled).</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mt-10 mb-4 border-b border-[var(--color-gray-200)] pb-2">2. How We Protect Your Data</h2>
          <div className="bg-[var(--color-gray-50)] p-6 rounded-xl border border-[var(--color-gray-200)] mb-6 flex items-start gap-4">
            <LockKey size={28} className="text-primary flex-shrink-0 mt-1" weight="fill" />
            <div>
              <h3 className="font-bold text-[var(--color-gray-900)] text-lg mb-2">Bank-Level Security</h3>
              <p className="text-sm">
                All data transmitted to and from Beacon Student Fund is encrypted using industry-standard 256-bit TLS encryption. Your government IDs and transcripts are stored in encrypted vaults and are only accessible by authorized underwriting personnel.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mt-10 mb-4 border-b border-[var(--color-gray-200)] pb-2">3. Soft Credit Inquiries</h2>
          <p>
            When you check your rate, Beacon Student Fund performs a &quot;soft pull&quot; on your credit report. This does <strong>not</strong> impact your credit score. We only perform a hard pull if you accept a loan offer and finalize the application process.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mt-10 mb-4 border-b border-[var(--color-gray-200)] pb-2">4. Third-Party Sharing</h2>
          <p>
            We do not sell your personal data to third parties. We only share data with trusted partners (such as credit bureaus and payment processors) strictly for the purpose of underwriting your loan, disbursing funds, and servicing your account.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mt-10 mb-4 border-b border-[var(--color-gray-200)] pb-2">5. Data Retention</h2>
          <p>
            We retain your data only for as long as necessary to service your loan and comply with federal and state financial regulations. Once your loan is paid in full and the regulatory retention period expires, your documents are securely deleted.
          </p>
        </div>
      </div>
    </div>
  );
}
