import { EnvelopeSimple, Phone, MapPin } from '@phosphor-icons/react/dist/ssr';

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-gray-100)] min-h-[calc(100vh-4rem)] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--color-gray-900)] mb-4">Get in Touch</h1>
          <p className="text-lg text-[var(--color-gray-600)] max-w-2xl mx-auto">
            Have questions about a loan, your application, or how TruFund works? Our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-[var(--color-gray-200)] text-center">
            <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <EnvelopeSimple size={24} weight="fill" />
            </div>
            <h3 className="font-bold text-[var(--color-gray-900)] mb-2">Email Support</h3>
            <p className="text-[var(--color-gray-600)] text-sm mb-4">We usually respond within 2 hours during business days.</p>
            <a href="mailto:support@trufund.co" className="text-primary font-semibold hover:underline">support@trufund.co</a>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-[var(--color-gray-200)] text-center">
            <div className="w-12 h-12 bg-[var(--color-light-teal)] text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={24} weight="fill" />
            </div>
            <h3 className="font-bold text-[var(--color-gray-900)] mb-2">Phone Support</h3>
            <p className="text-[var(--color-gray-600)] text-sm mb-4">Mon-Fri, 9am - 6pm EST</p>
            <a href="tel:18005550199" className="text-secondary font-semibold hover:underline">1-800-555-0199</a>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-[var(--color-gray-200)] text-center">
            <div className="w-12 h-12 bg-orange-50 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} weight="fill" />
            </div>
            <h3 className="font-bold text-[var(--color-gray-900)] mb-2">Headquarters</h3>
            <p className="text-[var(--color-gray-600)] text-sm">
              123 Financial District<br />
              New York, NY 10004
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[var(--color-gray-200)] overflow-hidden max-w-2xl mx-auto">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-6 text-center">Send us a message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">First Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-[var(--color-gray-300)] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">Last Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-[var(--color-gray-300)] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-[var(--color-gray-300)] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">Message</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-[var(--color-gray-300)] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"></textarea>
              </div>
              <button type="button" className="w-full py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-lg transition-colors">
                Submit Message
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
