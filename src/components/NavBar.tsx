'use client';
import React from 'react';
import { Button } from './ui/button';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NavBar = () => {
   const { data: session } = useSession();
   const router = useRouter();
   async function handleClick(session: any) {
      if (session) {
         await signOut();
      } else {
         router.push('/sign-in');
      }
   }

   return (
      <nav className='bg-slate-800 text-white px-5 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md'>
         <Link href='/'>
            <h1>Tap To Connect</h1>
         </Link>
         <div className='flex flex-row gap-4 items-center justify-center'>
            <Button onClick={() => handleClick(session)}>
               {session ? 'Sign Out' : 'Sign In'}
            </Button>
         </div>
      </nav>
   );
};

export default NavBar;
