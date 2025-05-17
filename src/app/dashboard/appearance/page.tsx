'use client';
import React, { useEffect } from 'react';
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
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
} from '@/components/ui/form';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useDispatch, useSelector } from 'react-redux';
import { setColorVariant, toggleDarkMode } from '@/lib/features/themeSlice';
import axios from 'axios';
import { User } from '@/model/User.model';

const FormSchema = z.object({
   enable_dark_mode: z.boolean(),
   theme_color: z.string().optional(),
});

const page = () => {
   const { toast } = useToast();

   const [isSubmitting, setIsSubmitting] = React.useState(false);

   interface ThemeState {
      themeSlice: {
         colorVariant: string;
         isDarkMode: boolean;
      };
      userSlice: {
         user: User;
      };
   }

   const state = useSelector((state: ThemeState) => state.themeSlice);
   const stateUser = useSelector((state: ThemeState) => state.userSlice);
   const dispatch = useDispatch();

   const onSubmit = async (data: any) => {
      dispatch(toggleDarkMode(data.enable_dark_mode));
      if (data.theme_color) {
         dispatch(setColorVariant(data.theme_color));
      }
      console.log('stateUser', stateUser);
      try {
         setIsSubmitting(true);
         const response = await axios.post('/api/update-theme', {
            username: stateUser.user.username,
            themePreference: {
               isDarkMode: data.enable_dark_mode,
               colorVariant: data.theme_color,
            },
         });

         if (response?.data?.success) {
            toast({
               title: 'Success',
               description: 'Dark mode has been updated.',
               variant: 'default',
            });
         } else {
            toast({
               title: 'Error',
               description: response.data.message || 'Something went wrong',
               variant: 'destructive',
            });
         }
      } catch (error) {
         console.error(error);
         toast({
            title: 'Error',
            description: 'Something went wrong',
            variant: 'destructive',
         });
      } finally {
         setIsSubmitting(false);
      }
   };

   const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         enable_dark_mode: true,
         theme_color: '',
      },
   });

   useEffect(() => {
      form.setValue('enable_dark_mode', state.isDarkMode);
   }, []);

   return (
      <div className=' flex flex-col gap-4 w-full'>
         <ResizablePanelGroup direction='horizontal'>
            <ResizablePanel>
               <h1 className='text-lg font-bold p-4'>Appearance</h1>
               <div className='flex flex-col gap-4 p-4'>
                  <Form {...form}>
                     <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-full space-y-6'
                     >
                        <div>
                           <div className='space-y-4'>
                              <FormField
                                 control={form.control}
                                 name='enable_dark_mode'
                                 render={({ field }) => (
                                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                                       <div className='space-y-0.5'>
                                          <FormLabel>
                                             Enable Dark Mode
                                          </FormLabel>
                                          <FormDescription>
                                             Enable dark mode for the app.
                                          </FormDescription>
                                       </div>
                                       <FormControl>
                                          <Switch
                                             checked={field.value}
                                             onCheckedChange={field.onChange}
                                          />
                                       </FormControl>
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name='theme_color'
                                 render={({ field }) => (
                                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                                       <div className='space-y-0.5'>
                                          <FormLabel>
                                             Choose Theme Color
                                          </FormLabel>
                                          <FormDescription>
                                             Choose a color variant for the app.
                                          </FormDescription>
                                       </div>
                                       <FormControl>
                                          <Select
                                             onValueChange={field.onChange}
                                             defaultValue={field.value}
                                          >
                                             <SelectTrigger className='w-[180px]'>
                                                <SelectValue placeholder='Select a color' />
                                             </SelectTrigger>
                                             <SelectContent>
                                                <SelectGroup>
                                                   <SelectLabel>
                                                      Colors
                                                   </SelectLabel>
                                                   <SelectItem value='theme-red'>
                                                      Red
                                                   </SelectItem>
                                                   <SelectItem value='theme-rose'>
                                                      Rose
                                                   </SelectItem>
                                                   <SelectItem value='theme-orange'>
                                                      Orange
                                                   </SelectItem>
                                                   <SelectItem value='theme-green'>
                                                      Green
                                                   </SelectItem>
                                                   <SelectItem value='theme-blue'>
                                                      Blue
                                                   </SelectItem>
                                                   <SelectItem value='theme-yellow'>
                                                      Yellow
                                                   </SelectItem>
                                                   <SelectItem value='theme-purple'>
                                                      Purple
                                                   </SelectItem>
                                                </SelectGroup>
                                             </SelectContent>
                                          </Select>
                                       </FormControl>
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                        <Button type='submit' size={'lg'}>
                           Apply Preferences
                        </Button>
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
