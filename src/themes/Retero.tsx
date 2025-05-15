'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
const page = () => {
   const user = {
      fullname: 'Sourav Mohanty',
      username: 'sourav0010',
      about: `I'm a full-stack developer.`,
      socialLinks: [
         {
            social: 'Social 1',
            value: 'https://www.facebook.com/sourav.mohanty.1000',
            _id: '2',
         },
         {
            social: 'Social 2',
            value: 'https://www.instagram.com/sourav.mohanty.1000',
            _id: '1',
         },
         {
            social: 'Social 3',
            value: 'https://www.instagram.com/sourav.mohanty.1000',
            _id: '3',
         },
      ],
      shops: [
         {
            value: 'https://www.amazon.in/Hero-MAVRICK-Celestial-Booking-Ex-Showroom/dp/B0D1VVJJ29/?_encoding=UTF8&ref_=pd_hp_d_btf_ls_gwc_pc_en4_',
            social: 'Product 2',
            _id: '2',
         },
         {
            value: 'https://www.amazon.in/Bajaj-Consumption-Protection-Delivery-Warranty/dp/B07NY1M1Z6/?_encoding=UTF8&ref_=pd_hp_d_btf_ls_gwc_pc_en2_',
            social: 'Product 1',
            _id: '1',
         },
         {
            value: 'https://www.amazon.in/Morphy-Richards-capacity-Soleplate-Self-Cleaning/dp/B0DHRQVL7G/?_encoding=UTF8&ref_=pd_hp_d_btf_ls_gwc_pc_en2_',
            social: 'Product 3',
            _id: '3',
         },
      ],
      profilePic: '',
   };

   return (
      <div className='w-full  h-svh flex items-center justify-center'>
         <div className='space-y-4 flex flex-col items-center'>
            <div className='mt-4 flex flex-col items-center justify-center w-full '>
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
            <Tabs defaultValue='links' className='w-full max-sm:max-w-52'>
               <TabsList className='w-full flex justify-center items-center'>
                  <TabsTrigger value='links'>Links</TabsTrigger>
                  <TabsTrigger value='shopping'>Shop</TabsTrigger>
               </TabsList>
               <TabsContent value='links'>
                  {user.socialLinks.length > 0 && (
                     <div className='flex w-full gap-2 flex-col p-2 border rounded-lg'>
                        {user?.socialLinks?.map(({ social, value, _id }) => {
                           return (
                              <Link href={value} key={_id} target='_blank'>
                                 <Button
                                    variant={'secondary'}
                                    className={`w-full`}
                                    key={_id}
                                 >
                                    {social}
                                 </Button>
                              </Link>
                           );
                        })}
                     </div>
                  )}
               </TabsContent>
               <TabsContent value='shopping'>
                  {user.shops.length > 0 && (
                     <div className='flex w-full gap-2 flex-col p-2 border rounded-lg'>
                        {user?.shops?.map(({ social, value, _id }) => {
                           return (
                              <Link href={value} key={_id} target='_blank'>
                                 <Button
                                    variant={'secondary'}
                                    className={`w-full`}
                                    key={_id}
                                 >
                                    {social}
                                 </Button>
                              </Link>
                           );
                        })}
                     </div>
                  )}
               </TabsContent>
            </Tabs>

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
   );
};

export default page;
