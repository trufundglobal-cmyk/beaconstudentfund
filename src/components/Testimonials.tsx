export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Nia S.",
      school: "University of Michigan",
      degree: "B.S. Nursing, Class of 2019",
      imagePath: "/student_portrait_1.png",
      quote: "My financial aid came through short by about $2,400 — not enough to cover my clinical rotation fees and uniform costs. I was looking at having to push back my graduation by a full semester. TruFund got me the money in 48 hours. The whole application took me maybe 10 minutes on my phone between classes.",
    },
    {
      id: 2,
      name: "Jack H.",
      school: "University of Texas at Austin",
      degree: "M.S. Mechanical Engineering, Class of 2021",
      imagePath: "/student_portrait_2.png",
      quote: "I lost my campus job mid-semester when the department froze hiring. I was behind on rent and couldn't ask my parents again. I applied to TruFund on a Wednesday night and had a decision by Thursday morning. No cosigner, no drama. I paid it back over two years — it's built into my budget like a phone bill.",
    },
    {
      id: 3,
      name: "Chloe C.",
      school: "New York University",
      degree: "MBA, Class of 2023",
      imagePath: "/student_portrait_3.png",
      quote: "Rent in New York is no joke. My stipend covered most of it but I kept coming up short in the last month of each semester. I used TruFund twice — once for $3,000 and once for $4,500. The rate was better than my credit card and I actually knew what I was signing up for, which I appreciated.",
    }
  ];

  return (
    <section className="bg-white py-20 px-4 border-y border-[var(--color-gray-200)]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-semibold text-[var(--color-gray-400)] uppercase tracking-widest mb-3">Student Stories</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-gray-900)] mb-3">
            What students say about TruFund
          </h2>
          <p className="text-[var(--color-gray-600)] max-w-xl">
            We've been helping students cover funding gaps since 2013. These are a few of the stories we've heard along the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-[var(--color-gray-50)] rounded-xl p-7 border border-[var(--color-gray-200)] flex flex-col">
              <p className="text-[var(--color-gray-700)] leading-relaxed text-sm mb-8 flex-1">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-[var(--color-gray-200)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.imagePath} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-gray-900)] text-sm">{t.name}</p>
                  <p className="text-xs text-[var(--color-gray-500)]">{t.school}</p>
                  <p className="text-xs text-[var(--color-gray-400)]">{t.degree}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-[var(--color-gray-200)]">
          <p className="text-xs font-semibold text-[var(--color-gray-400)] uppercase tracking-widest mb-8">
            Trusted by students at
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-4 items-center opacity-50">
            <span className="text-base font-bold text-[var(--color-gray-900)] font-serif">Arizona State University</span>
            <span className="text-base font-bold text-[var(--color-gray-900)] font-serif">Penn State</span>
            <span className="text-base font-bold text-[var(--color-gray-900)] font-serif">Texas A&amp;M</span>
            <span className="text-base font-bold text-[var(--color-gray-900)] font-serif">Ohio State</span>
            <span className="text-base font-bold text-[var(--color-gray-900)] font-serif">UCLA</span>
            <span className="text-base font-bold text-[var(--color-gray-900)] font-serif">NYU</span>
          </div>
        </div>
      </div>
    </section>
  );
}
