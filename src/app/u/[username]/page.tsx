'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { User } from 'next-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const page = () => {
   const { username } = useParams();
   const [user, setUser] = React.useState({} as User);
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
   ) : user ? (
      <div className='w-full  h-svh flex items-center justify-center'>
         <div className='space-y-4 flex flex-col items-center'>
            <div className='mt-4 flex flex-col items-center justify-center w-full'>
               <Avatar className='w-20 h-20'>
                  <AvatarImage src={user.image || ''} />
                  <AvatarFallback className='text-4xl'>U</AvatarFallback>
               </Avatar>
            </div>
            <h2>{user?.username || ''}</h2>
            <p>{user?.about || ''}</p>
            <div className='flex gap-2 flex-col'>
               {user?.socialLinks?.map(({ value, _id }, index) => (
                  <Link href={value} key={_id} target='_blank'>
                     <Button key={_id}>{`Social Link ${index + 1}`}</Button>
                  </Link>
               ))}
            </div>
         </div>
      </div>
   ) : (
      '...'
   );
};

export default page;
