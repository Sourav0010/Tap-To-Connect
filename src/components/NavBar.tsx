'use client';
import React from 'react';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NavBar = () => {
   const { data: session } = useSession();
   const router = useRouter();
   function handleClick(session: any) {
      console.log('clicked');
      if (session) {
      } else {
         router.push('/sign-up');
      }
   }

   return (
      <nav className='bg-slate-800 text-white px-5 py-4 flex items-center justify-between'>
         <Link href='/'>
            <h1>Tap To Connect</h1>
         </Link>
         <Button onClick={() => handleClick(session)}>
            {session ? 'Sign Out' : 'Sign Up'}
         </Button>
      </nav>
   );
};

export default NavBar;
