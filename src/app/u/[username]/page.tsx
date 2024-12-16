'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BadgeCheck } from 'lucide-react';
const page = () => {
   const { username } = useParams();

   const [user, setUser] = React.useState({
      fullname: '',
      username: '',
      about: '',
      socialLinks: [
         {
            social: '',
            value: '',
            _id: '',
         },
      ],
      profilePic: '',
   });
   const [loading, setLoading] = React.useState(false);

   async function getUser() {
      setLoading(true);
      try {
         const response = await axios.post('/api/get-user', { username });
         setUser(response.data.data);
         console.log(response.data.data);
      } catch (error) {
         throw error;
      } finally {
         setLoading(false);
      }
   }
   useEffect(() => {
      getUser();
   }, []);

   return loading ? (
      <div className='w-full  h-svh flex items-center justify-center'>
         <div className='space-y-4 flex flex-col items-center'>
            <div>
               <Skeleton className='h-20 w-20 rounded-full' />
            </div>
            <Skeleton className='h-12 w-60 ' />
            <Skeleton className='h-12 w-60 ' />
            <Skeleton className='h-12 w-60 ' />
         </div>
      </div>
   ) : user.username ? (
      <div className='w-full  h-svh flex items-center justify-center'>
         <div className='space-y-4 flex flex-col items-center'>
            <div className='mt-4 flex flex-col items-center justify-center w-full'>
               <Avatar className='w-20 h-20'>
                  <AvatarImage src={user.profilePic || ''} />
                  <AvatarFallback className='text-4xl'>U</AvatarFallback>
               </Avatar>
            </div>

            <h2 className='text-lg font-bold'>
               {user?.fullname || ''}{' '}
               <span className='font-normal text-sm'>
                  (@{user?.username || ''})
               </span>
            </h2>

            <p className='text-center max-sm:max-w-52 text-sm p-0 m-0'>
               {user?.about || ''}
            </p>
            <div className='flex w-full gap-2 flex-col p-2 border rounded-lg'>
               {user?.socialLinks?.map(({ social, value, _id }) => {
                  return (
                     <Link href={value} key={_id} target='_blank'>
                        <Button  className={`w-full`} key={_id}>
                           {social}
                        </Button>
                     </Link>
                  );
               })}
            </div>
            <div className='flex flex-row gap-2 items-center text-slate-600 mt-4'>
               <p>Build with</p>
               <Link href='/sign-in'>
                  <h2 className='text-sm border border-gray-400 p-2 '>
                     Tap To Connect
                  </h2>
               </Link>
            </div>
         </div>
      </div>
   ) : (
      <div className='w-full  h-svh flex items-center justify-center'>
         <h2 className='text-lg font-bold'>User not found || 404</h2>
      </div>
   );
};

export default page;
