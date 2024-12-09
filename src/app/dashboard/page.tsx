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
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DashboardSchema } from '@/schemas/DashboardSchema';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { set } from 'mongoose';

const page = () => {
   const [user, setUser] = React.useState({
      username: '',
      about: '',
      socialLinks: [],
      profilePic: '',
      _id: '',
   });

   const form = useForm<z.infer<typeof DashboardSchema>>({
      resolver: zodResolver(DashboardSchema),
      defaultValues: {
         username: user?.username,
         about: user?.about,
         socialLinks: user?.socialLinks,
      },
   });

   const formImage = useForm();

   const [loading, setLoading] = React.useState(false);
   const [isSubmitting, setIsSubmitting] = React.useState(false);
   const { data: session } = useSession();

   const fetchUser = async () => {
      try {
         const response = await axios.post('/api/get-user', {
            username: session?.user?.username,
         });
         setUser(response.data.data);
         updateFields(response.data.data);
      } catch (error) {
         console.error(error);
      }
   };

   const updateFields = (data: z.infer<typeof DashboardSchema>) => {
      form.setValue('username', data.username);
      form.setValue('about', data.about);
      form.setValue('socialLinks', data.socialLinks);
   };

   useEffect(() => {
      fetchUser();
   }, [session]);

   const { toast } = useToast();

   async function onSubmit(data: z.infer<typeof DashboardSchema>) {
      setIsSubmitting(true);
      try {
         const result = await axios.post('/api/update-profile', {
            username: user?.username,
            profilePic: user?.profilePic,
            about: data?.about,
            socialLinks: data.socialLinks,
         });
         updateFields(result.data.data);
         setUser(result.data.data);
         console.log(result.data);
         if (result.data.success) {
            toast({
               title: 'Success',
               description: result.data.message,
            });
         } else {
            toast({
               title: 'Error',
               description: result.data.message,
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
   }

   const { fields, append } = useFieldArray({
      name: 'socialLinks',
      control: form.control,
   });

   async function uploadProfileImage(data: any) {
      const prevPic = user?.profilePic || '';
      const profilePic = data.profilePic;
      setLoading(true);
      try {
         const formData = new FormData();
         formData.append('profilePic', profilePic);

         const response = await axios.post('/api/upload-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
         });

         if (response.data.url) {
            if (prevPic) {
               const public_id = prevPic.split('/').pop()?.split('.')[0];

               const response = await axios.delete('/api/delete-image', {
                  data: { public_id },
               });

               if (response.data.success) {
                  console.log('Image deleted successfully');
               } else {
                  console.error('Failed to delete image');
               }
            }
         }

         const result = await axios.post('/api/update-profile', {
            username: user?.username,
            profilePic: response.data.url,
            about: user?.about,
            socialLinks: user?.socialLinks,
         });

         if (result.data) {
            toast({
               title: 'Profile updated successfully',
               description: 'Your profile has been updated successfully.',
            });
            console.log('got data: ', result);
            setUser(result.data.data);
         }

         console.log(result.data);
      } catch (error) {
         console.error('Upload failed:', error);
         toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Something went wrong while uploading the image.',
         });
      } finally {
         setLoading(false);
      }
   }

   return (
      <div className='flex items-center   justify-center m-4'>
         <div className=''>
            <h1 className='font-bold text-xl'>Dashboard</h1>
            <p className='text-gray-500'>Welcome to the dashboard</p>

            <div className='mt-4 flex flex-col items-center justify-center w-full'>
               <Avatar className='w-36 h-36'>
                  <AvatarImage src={user?.profilePic || ''} />
                  <AvatarFallback className='text-4xl'>U</AvatarFallback>
               </Avatar>
            </div>

            <h6 className='mt-4'>Public URL</h6>

            <div className='mb-4 gap-2 flex items-center justify-center'>
               <Input
                  type='text'
                  value={
                     `${window.location.protocol}//${window.location.host}` +
                     '/u/' +
                     (user?.username || '')
                  }
                  contentEditable={false}
               />
               <Button
                  onClick={() =>
                     navigator.clipboard.writeText(
                        `${window.location.protocol}//${window.location.host}` +
                           '/u/' +
                           (session?.user.username || '')
                     )
                  }
               >
                  Copy
               </Button>
            </div>

            <Form {...formImage}>
               <form
                  onSubmit={formImage.handleSubmit(uploadProfileImage)}
                  className=' flex items-center gap-2'
               >
                  <FormField
                     control={formImage.control}
                     name='profilePic'
                     render={({
                        field: { value, onChange, ...fieldProps },
                     }) => (
                        <FormItem>
                           <FormLabel>Profile Picture</FormLabel>
                           <FormControl>
                              <Input
                                 {...fieldProps}
                                 placeholder='Picture'
                                 type='file'
                                 accept='image/*, application/pdf'
                                 onChange={(event) =>
                                    onChange(
                                       event.target.files &&
                                          event.target.files[0]
                                    )
                                 }
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />

                  <Button type='submit' className='self-end '>
                     {loading ? (
                        <>
                           <Loader2 className='mr-2 h-4 w-4 animate-spin' />{' '}
                           'Please Wait..'
                        </>
                     ) : user?.profilePic ? (
                        'Update'
                     ) : (
                        'Upload'
                     )}
                  </Button>
               </form>
            </Form>

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
                                 disabled
                              />
                           </FormControl>
                           <FormDescription>
                              You can't change your username at any time. If you
                              want to then contact us.
                           </FormDescription>
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name='about'
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

                  <div>
                     {fields.map((field, index) => (
                        <FormField
                           control={form.control}
                           key={field.id}
                           name={`socialLinks.${index}.value`}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>{`Social Link  ${
                                    index + 1
                                 }`}</FormLabel>
                                 <FormDescription>
                                    Add links to your website, blog, or social
                                    media profiles.
                                 </FormDescription>
                                 <FormControl>
                                    <Input {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     ))}
                     <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        className='mt-2'
                        onClick={() => append({ value: '' })}
                     >
                        Add URL
                     </Button>
                  </div>

                  <Button type='submit'>
                     {isSubmitting ? (
                        <>
                           <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                           'Please Wait..'
                        </>
                     ) : (
                        'Update'
                     )}
                  </Button>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default page;
