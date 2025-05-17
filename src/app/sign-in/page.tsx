'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema } from '@/schemas/SignInSchema';
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

const page = () => {
   const [submitting, setSubmitting] = React.useState(false);

   const form = useForm({
      resolver: zodResolver(SignInSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const { toast } = useToast();
   const router = useRouter();

   async function onSubmit(data: any) {
      setSubmitting(true);
      const response = await signIn('credentials', {
         email: data.email,
         password: data.password,
         redirect: false,
      });
      if (response?.error) {
         toast({
            title: 'Error signing in',
            description: response.error || 'An error occurred',
            variant: 'destructive',
         });
      } else {
         toast({
            title: 'Signed in',
            description: 'You have been signed in',
         });
         if (response?.url) router.push('/dashboard');
      }
      setSubmitting(false);
   }

   return (
      <div className='flex h-svh items-center justify-center '>
         <div className='bg-slate-100 px-7 sm:w-2/3 lg:w-1/3 w-3/4 md:mx-7 py-10 rounded-xl '>
            <h1 className='text-2xl font-bold text-center'>Tap To Connect</h1>
            <p className='text-center text-xs mt-2 mb-5'>
               Sign in to your account
            </p>

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-3'
               >
                  <FormField
                     control={form.control}
                     name='email'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input placeholder='Email' {...field} />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name='password'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder='Password'
                                 {...field}
                                 type='password'
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <Button
                     disabled={submitting}
                     type='submit'
                     className='w-full'
                  >
                     {submitting ? 'Signing In...' : 'Sign In'}
                  </Button>
               </form>
            </Form>
            <div className='mt-4'>
               <p className='text-center text-sm'>
                  Don't have an account?{' '}
                  <Link href='/sign-up'>
                     <span className='text-blue-600'>Sign up</span>
                  </Link>
               </p>
            </div>
            <div className='mt-4'>
               <p className='text-center text-sm'>
                  I Forgot my password?{' '}
                  <Link href='/forgotten-password'>
                     <span className='text-blue-600'>Reset Password</span>
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
};

export default page;
