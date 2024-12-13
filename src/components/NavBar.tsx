'use client';
import React from 'react';
import { Button } from './ui/button';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from '@/components/ui/drawer';
import { Share } from 'lucide-react';

const NavBar = () => {
   const { data: session } = useSession();
   const router = useRouter();
   async function handleClick(session: any) {
      if (session) {
         await signOut();
      } else {
         router.push('/sign-up');
      }
   }

   return (
      <nav className='bg-slate-800 text-white px-5 py-4 flex items-center justify-between'>
         <Link href='/'>
            <h1>Tap To Connect</h1>
         </Link>
         <div className='flex flex-row gap-4 items-center justify-center'>
            <Button onClick={() => handleClick(session)}>
               {session ? 'Sign Out' : 'Sign Up'}
            </Button>
         </div>
      </nav>
   );
};

export default NavBar;
