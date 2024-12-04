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
import { set } from 'mongoose';

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
      console.log(data);
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
         console.log(response);
         if (response?.url) router.push('/dashboard');
      }
      setSubmitting(false);
   }

   return (
      <div className='flex h-svh items-center justify-center'>
         <div className='bg-slate-100 px-4 py-5 rounded-xl'>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'
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
                  <Button disabled={submitting} type='submit'>
                     {submitting ? 'Signing In...' : 'Sign In'}
                  </Button>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default page;
