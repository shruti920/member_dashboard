import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { AuthProvider } from '@/lib/AuthContext';
import AnimatedBackground from '@/components/3d/AnimatedBackground';

const geist = Geist({ subsets: ['latin'] });
const geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata = {
  title: 'WebnD - Master Your Skills',
  description: 'A comprehensive platform for learning, competitions, and skill tracking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[#0F0F0F]">
      <body className={`${geist.className} text-[#FFFFFF] bg-[#0F0F0F]`}>
        <AuthProvider>
          <AnimatedBackground />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
