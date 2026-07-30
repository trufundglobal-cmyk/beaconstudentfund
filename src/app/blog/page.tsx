import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest news and insights from Beacon Student Fund.',
};

export default function BlogPage() {
  const posts = [
    {
      title: 'How to Budget Your Remaining Financial Aid',
      category: 'Financial Literacy',
      date: 'Aug 12, 2024',
      readTime: '5 min read',
      excerpt: 'Tips and tricks for making your federal student aid stretch across the entire semester without eating ramen every night.'
    },
    {
      title: 'Understanding Fixed vs. Variable Interest Rates',
      category: 'Student Loans 101',
      date: 'Jul 28, 2024',
      readTime: '7 min read',
      excerpt: 'Why Beacon Student Fund only offers fixed rates, and how variable rates can end up costing you more in the long run.'
    },
    {
      title: 'Top 10 High-Paying Part-Time Jobs for College Students',
      category: 'Income Generation',
      date: 'Jul 15, 2024',
      readTime: '6 min read',
      excerpt: 'From freelance writing to tutoring, here are the best ways to earn extra cash while balancing a full course load.'
    },
    {
      title: 'What Happens When You Default on a Student Loan?',
      category: 'Financial Health',
      date: 'Jun 30, 2024',
      readTime: '4 min read',
      excerpt: 'Understanding the severe consequences of loan default and the steps you can take to avoid it.'
    }
  ];

  return (
    <div className="bg-[var(--color-gray-100)] min-h-[calc(100vh-4rem)] pb-20">
      
      <section className="bg-primary text-white py-16 px-4 border-b border-[var(--color-primary-light)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Beacon Student Fund Blog</h1>
          <p className="text-lg text-[var(--color-light-teal)] max-w-2xl mx-auto">
            Financial literacy, college survival guides, and updates from the Beacon Student Fund team.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, idx) => (
              <article key={idx} className="bg-white rounded-xl shadow-sm border border-[var(--color-gray-200)] overflow-hidden flex flex-col hover:shadow-md transition-shadow cursor-pointer">
                <div className="p-8 flex-1">
                  <div className="flex items-center gap-3 mb-4 text-xs font-semibold uppercase tracking-wider">
                    <span className="text-secondary">{post.category}</span>
                    <span className="text-[var(--color-gray-400)]">&bull;</span>
                    <span className="text-[var(--color-gray-500)]">{post.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-3 leading-tight hover:text-primary transition-colors">
                    <Link href="#">{post.title}</Link>
                  </h2>
                  <p className="text-[var(--color-gray-600)] mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center text-sm font-medium text-primary">
                    Read article &rarr;
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
