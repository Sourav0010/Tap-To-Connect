'use client';
import React from 'react';
import Retero from '@/themes/Retero';
import { useToast } from '@/hooks/use-toast';
import {
   ResizableHandle,
   ResizablePanel,
   ResizablePanelGroup,
} from '@/components/ui/resizable';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const FormSchema = z.object({
   type: z.enum(['all', 'mentions', 'none'], {
      required_error: 'You need to select a notification type.',
   }),
});

const page = () => {
   const { toast } = useToast();
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
   });

   function onSubmit(data: z.infer<typeof FormSchema>) {
      toast({
         title: 'Theme Changed',
         description: 'You have successfully changed the theme.',
      });
   }

   return (
      <div className=' flex flex-col gap-4 w-full'>
         <ResizablePanelGroup direction='horizontal'>
            <ResizablePanel>
               <h1 className='text-lg font-bold p-4'>Appearance</h1>
               <div className='flex flex-col items-center justify-center w-full h-svh'>
                  <Form {...form}>
                     <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-2/3 space-y-6'
                     >
                        <FormField
                           control={form.control}
                           name='type'
                           render={({ field }) => (
                              <FormItem className='space-y-3'>
                                 <FormLabel className='text-lg font-bold'>
                                    Choose The Theme
                                 </FormLabel>
                                 <FormControl>
                                    <RadioGroup
                                       onValueChange={field.onChange}
                                       defaultValue={field.value}
                                       className='flex flex-col space-y-1'
                                    >
                                       <FormItem className='flex items-center space-x-3 space-y-0'>
                                          <FormControl>
                                             <RadioGroupItem value='all' />
                                          </FormControl>
                                          <FormLabel className='font-normal'>
                                             Retero
                                          </FormLabel>
                                       </FormItem>
                                       <FormItem className='flex items-center space-x-3 space-y-0'>
                                          <FormControl>
                                             <RadioGroupItem value='mentions' />
                                          </FormControl>
                                          <FormLabel className='font-normal'>
                                             Moody
                                          </FormLabel>
                                       </FormItem>
                                       <FormItem className='flex items-center space-x-3 space-y-0'>
                                          <FormControl>
                                             <RadioGroupItem value='none' />
                                          </FormControl>
                                          <FormLabel className='font-normal'>
                                             ChillPill
                                          </FormLabel>
                                       </FormItem>
                                    </RadioGroup>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <Button type='submit'>Submit</Button>
                     </form>
                  </Form>
               </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
               <div>
                  <h1 className='text-lg font-bold p-4'>Preview</h1>
                  <Retero />
               </div>
            </ResizablePanel>
         </ResizablePanelGroup>
      </div>
   );
};

export default page;
