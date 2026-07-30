import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply Now',
  description: 'Apply for a Beacon Student Fund loan in minutes. Check your rate with no impact to your credit score.',
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
