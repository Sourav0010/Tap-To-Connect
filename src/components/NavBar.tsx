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
   DrawerDescription,
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
            {!window.location.pathname.startsWith('/u/') && (
               <Button onClick={() => handleClick(session)}>
                  {session ? 'Sign Out' : 'Sign Up'}
               </Button>
            )}
            {window.location.pathname.startsWith('/u/') && (
               <Drawer>
                  <DrawerTrigger>
                     <Button>
                        <Share />
                     </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                     <DrawerHeader>
                        <DrawerTitle>Share Your Profile</DrawerTitle>
                     </DrawerHeader>
                     <DrawerFooter className='flex flex-col items-center justify-center'>
                        <Button
                           onClick={() =>
                              navigator.clipboard.writeText(
                                 window.location.protocol +
                                    window.location.host +
                                    window.location.pathname
                              )
                           }
                           className='w-20'
                           variant={'secondary'}
                        >
                           Copy
                        </Button>
                        <DrawerClose>
                           <Button variant='outline'>Cancel</Button>
                        </DrawerClose>
                     </DrawerFooter>
                  </DrawerContent>
               </Drawer>
            )}
         </div>
      </nav>
   );
};

export default NavBar;
