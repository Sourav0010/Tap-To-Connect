'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DashboardSchema } from '@/schemas/DashboardSchema';

const page = () => {
   const { data: session } = useSession();

   const [user, setUser] = React.useState(session?.user);

   const form = useForm({
      resolver: zodResolver(DashboardSchema),
      defaultValues: {
         username: user?.username || '',
         bio: user?.about || '',
      },
   });

   useEffect(() => {
      setUser(session?.user);
      form.setValue('username', user?.username || '');
      form.setValue('bio', user?.about || '');
   }, [user, setUser, session]);

   const onSubmit = (data: any) => {
      console.log(data);
   };

   return (
      <div className='flex items-center   justify-center m-4'>
         <div className=''>
            <h1 className='font-bold text-xl'>Dashboard</h1>
            <p className='text-gray-500'>Welcome to the dashboard</p>

            <div className='mt-4 flex flex-col items-center justify-center w-full'>
               <Avatar className='w-36 h-36'>
                  <AvatarImage src={session?.user.image || ''} />
                  <AvatarFallback className='text-4xl'>U</AvatarFallback>
               </Avatar>
            </div>

            <h6 className='mt-4'>Public URL</h6>

            <div className='mb-4 gap-2 flex items-center justify-center'>
               <Input
                  type='text'
                  value={session?.user.name || ''}
                  contentEditable={false}
               />
               <Button>Copy</Button>
            </div>

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'
               >
                  <FormField
                     control={form.control}
                     name='username'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Username</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder='Username'
                                 {...field}
                                 onChange={(e) =>
                                    field.onChange(e.target.value)
                                 }
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name='bio'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Bio</FormLabel>
                           <FormControl>
                              <Textarea
                                 placeholder='Bio'
                                 {...field}
                                 onChange={(e) =>
                                    field.onChange(e.target.value)
                                 }
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <FormDescription>
                     This information will be displayed on your profile
                  </FormDescription>
                  <Button type='submit'>Submit</Button>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default page;
