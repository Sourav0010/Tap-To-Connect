'use client';
import React from 'react';
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
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

const page = () => {
   function onSubmit(values: any) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
   }

   const form = useForm({});

   return (
      <div className='max-w-lg mx-auto h-screen flex flex-col justify-center items-center'>
         {/* <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
               <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Enter your email</FormLabel>
                        <FormControl>
                           <Input
                              type='email'
                              placeholder='taptoconnect@gmail.com'
                              {...field}
                           />
                        </FormControl>
                        <FormDescription>
                           This is your public display name.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button type='submit'>Submit</Button>
            </form>
         </Form> */}
         <h2 className='text-2xl font-bold'>Forgotten Password</h2>
         <p className='text-sm font-thin text-center'>
            This is under construction 🚧
         </p>
      </div>
   );
};

export default page;
