import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
interface PolicyLayoutProps {
  title: string;
  children: ReactNode;
}

export default function PolicyLayout({ title, children }: PolicyLayoutProps) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{title} | Devinvo</title>
        <meta name="description" content={`${title} for Devinvo`} />
      </Head>



      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 pb-4 border-b-2 border-orange-500">
            {title}
          </h2>
          {children}
        </div>
      </main>

    
    </div>
  );
}