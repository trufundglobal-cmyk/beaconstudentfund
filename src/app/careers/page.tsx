import { Briefcase, ArrowRight } from '@phosphor-icons/react/dist/ssr';

export default function CareersPage() {
  const jobs = [
    { title: 'Senior Full Stack Engineer', department: 'Engineering', location: 'Remote (US)' },
    { title: 'Credit Risk Analyst', department: 'Risk & Compliance', location: 'New York, NY' },
    { title: 'Student Success Agent', department: 'Customer Support', location: 'Remote (US)' },
    { title: 'Product Designer', department: 'Product', location: 'San Francisco, CA' }
  ];

  return (
    <div className="bg-[var(--color-gray-100)] min-h-[calc(100vh-4rem)] pb-20">
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join the TruFund Team</h1>
          <p className="text-xl text-[var(--color-light-teal)] max-w-2xl mx-auto">
            Help us build the future of accessible education funding. We're looking for passionate individuals to join our mission.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--color-gray-900)] mb-8 text-center">Open Positions</h2>
          
          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-[var(--color-gray-200)] flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 bg-[var(--color-gray-100)] rounded-lg flex items-center justify-center text-[var(--color-gray-500)] group-hover:bg-blue-50 group-hover:text-primary transition-colors">
                    <Briefcase size={20} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-gray-900)] group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-[var(--color-gray-600)] mt-1">
                      <span className="font-medium px-2 py-0.5 bg-[var(--color-gray-100)] rounded">{job.department}</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="flex items-center gap-2 text-primary font-semibold group-hover:translate-x-1 transition-transform">
                    Apply <ArrowRight weight="bold" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
