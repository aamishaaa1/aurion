import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aurion - Reality Integrity Engine',
  description: 'Collective Digital Immune System for AI - Verifying truth through decentralized consensus'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Aurion</h1>
              <div className="flex gap-4">
                <a href="/" className="hover:underline">Home</a>
                <a href="/verify" className="hover:underline">Verify</a>
                <a href="/publish" className="hover:underline">Publish</a>
                <a href="/identity" className="hover:underline">Identity</a>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
