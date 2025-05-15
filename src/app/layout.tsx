import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';
import AuthProvider from '@/context/AuthProvider';
import { Toaster } from '@/components/ui/toaster';


export const metadata: Metadata = {
   title: 'Tap To Connect',
   description:
      'An interactive application to connect with people in the meta-verse',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang='en'>
         <AuthProvider>
            <body>
               <NavBar />
               {children}
               <Toaster />
            </body>
         </AuthProvider>
      </html>
   );
}
