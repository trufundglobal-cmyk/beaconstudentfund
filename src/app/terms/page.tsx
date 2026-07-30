import { FileText } from '@phosphor-icons/react/dist/ssr';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Beacon Student Fund.',
};

export default function TermsPage() {
  return (
    <div className="bg-[var(--color-gray-100)] min-h-[calc(100vh-4rem)] py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[var(--color-gray-200)] p-8 md:p-12">
        
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText size={32} weight="fill" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-gray-900)] mb-4">Terms of Service</h1>
          <p className="text-[var(--color-gray-500)]">Effective Date: October 2024</p>
        </div>

        <div className="prose prose-lg text-[var(--color-gray-600)] max-w-none">
          <p>
            Welcome to Beacon Student Fund. These Terms of Service (&quot;Terms&quot;) govern your use of the Beacon Student Fund website and platform. By accessing our platform and applying for a loan, you agree to comply with these terms.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mt-10 mb-4 border-b border-[var(--color-gray-200)] pb-2">1. Eligibility</h2>
          <p>
            To use the Beacon Student Fund platform, you must be:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>At least 17 years of age (or the age of majority in your state of residence).</li>
            <li>Currently enrolled at least half-time at an eligible US-based university.</li>
            <li>A US citizen or permanent resident.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mt-10 mb-4 border-b border-[var(--color-gray-200)] pb-2">2. Loan Approval and Disbursement</h2>
          <p>
            All loan applications are subject to credit approval and verification of enrollment. Beacon Student Fund reserves the right to reject any application that does not meet our underwriting criteria. Funds will only be disbursed to a verified US bank account in the borrower&apos;s name.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mt-10 mb-4 border-b border-[var(--color-gray-200)] pb-2">3. Document Authenticity</h2>
          <p>
            By uploading documents (such as Government IDs and Transcripts), you certify under penalty of perjury that the documents are authentic, unaltered, and accurately reflect your identity and academic standing. Submitting fraudulent documents may result in immediate loan denial and reporting to law enforcement.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mt-10 mb-4 border-b border-[var(--color-gray-200)] pb-2">4. Repayment Obligations</h2>
          <p>
            If approved, you agree to repay the principal amount plus any accrued interest according to the terms of your Promissory Note. Failure to repay may result in late fees, negative reporting to credit bureaus, and collection activities.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mt-10 mb-4 border-b border-[var(--color-gray-200)] pb-2">5. Platform Integrity</h2>
          <p>
            You agree not to attempt to bypass our security measures, scrape data, or use our platform for any illicit purposes. Beacon Student Fund maintains the right to suspend or terminate accounts suspected of malicious activity.
          </p>
        </div>
      </div>
    </div>
  );
}
