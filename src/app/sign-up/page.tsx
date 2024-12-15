'use client';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema } from '@/schemas/SignUpSchema';
import { useDebounceCallback } from 'usehooks-ts';
import Link from 'next/link';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const page = () => {
   const router = useRouter();

   const [username, setUsername] = React.useState('');
   const [isChecking, setIsChecking] = React.useState(false);
   const [errorMessage, setErrorMessage] = React.useState('');
   const [isLoading, setIsLoading] = React.useState(false);

   const debounced = useDebounceCallback(setUsername, 500);

   const form = useForm({
      resolver: zodResolver(SignUpSchema),
      defaultValues: {
         username: '',
         email: '',
         password: '',
      },
   });

   async function checkUsername(username: string) {
      try {
         setErrorMessage('');
         const response = await axios.post('/api/check-username', { username });
         if (response.data.success) {
            setIsChecking(false);
            setErrorMessage(response.data.message);
         } else {
            setErrorMessage(response.data.message);
         }
      } catch (error: any) {
         console.log(error);
         setErrorMessage(error.response.data.message);
         setIsChecking(false);
      }
   }

   async function onSubmit(data: any) {
      setIsLoading(true);
      try {
         const response = await axios.post('/api/sign-up', data);

         if (response.data?.success) {
            toast({
               title: 'Success',
               description:
                  response.data.message || 'Account created successfully',
            });
            router.replace(`/verify/${data.username}`);
         } else {
            toast({
               title: 'Error',
               description: response.data.message || 'Something went wrong',
            });
         }
      } catch (error: any) {
         console.log(error);
         toast({
            title: 'Error',
            description: error.response.data.message || 'Something went wrong',
         });
      } finally {
         setIsLoading(false);
      }
   }

   useEffect(() => {
      if (username) {
         checkUsername(username);
      }
   }, [username]);
   return (
      <div className='flex items-center justify-center h-svh'>
         <div className='bg-slate-100 px-7 py-10 rounded-xl '>
            <h1 className='text-2xl font-bold text-center'>Tap To Connect</h1>
            <p className='text-center text-xs mt-2 mb-5'>
               Sign up to your account
            </p>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-3'
               >
                  <FormField
                     name='username'
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Username</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder='Username'
                                 {...field}
                                 onChange={(e) => {
                                    field.onChange(e);
                                    debounced(e.target.value);
                                 }}
                              />
                           </FormControl>
                           <FormDescription
                              className={`${
                                 errorMessage == 'Username already exists'
                                    ? 'text-red-500'
                                    : 'text-green-500'
                              }`}
                           >
                              {errorMessage && errorMessage}
                           </FormDescription>
                        </FormItem>
                     )}
                  />
                  <FormField
                     name='email'
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder='Email'
                                 type='email'
                                 {...field}
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <FormField
                     name='password'
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <Input
                                 type='password'
                                 placeholder='Password'
                                 {...field}
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <Button disabled={isLoading} type='submit' className='w-full'>
                     {!isLoading ? 'Sign Up' : 'Submitting...'}
                  </Button>
               </form>
            </Form>
            <div className='mt-4'>
               <p className='text-center text-sm'>
                  Already have an account?{' '}
                  <Link href='/sign-in'>
                     <span className='text-blue-600'>Sign In</span>
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
};

export default page;
