import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthSessionProvider from '@/components/providers/session-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PublishFlow - LinkedIn Content Scheduling',
  description: 'Compliance-first LinkedIn content scheduling and publishing tool',
  appleWebApp: {
    title: 'PublishFlow',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
