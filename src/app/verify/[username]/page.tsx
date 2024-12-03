'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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

import {
   InputOTP,
   InputOTPGroup,
   InputOTPSlot,
} from '@/components/ui/input-otp';
import { ValidationSchema } from '@/schemas/ValidationSchema';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const page = () => {
   const form = useForm({
      resolver: zodResolver(ValidationSchema),
      defaultValues: {
         otp: '',
      },
   });

   const params = useParams();

   const { toast } = useToast();

   const router = useRouter();

   const onSubmit = async (data: { otp: string }) => {
      try {
         const response = await axios.post(`/api/verify`, {
            username: params.username,
            otp: data.otp,
         });

         if (response.data.success) {
            toast({
               title: 'Success',
               description: response.data.message,
            });
            router.push('/sign-in');
         } else {
            toast({
               title: 'Error',
               description: response.data.message,
               variant: 'destructive',
            });
         }
      } catch (error: any) {
         console.error(error);
         toast({
            title: 'Error',
            description: error.response.data.message || 'Cannot verify OTP',
            variant: 'destructive',
         });
      }
   };

   return (
      <div className='h-svh flex items-center justify-center'>
         <div className='px-4 py-5'>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='w-2/3 space-y-6'
               >
                  <FormField
                     control={form.control}
                     name='otp'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>One-Time Password</FormLabel>
                           <FormControl>
                              <InputOTP maxLength={6} {...field}>
                                 <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                 </InputOTPGroup>
                              </InputOTP>
                           </FormControl>
                           <FormDescription>
                              Please enter the one-time password sent to your
                              email.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <Button type='submit'>Submit</Button>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default page;
