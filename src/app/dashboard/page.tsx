'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { setUser as setUserAction } from '@/lib/features/userSlice';
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
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import {
   ResizableHandle,
   ResizablePanel,
   ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
   const dispatch = useDispatch();

   const [user, setUser] = useState({
      fullname: '',
      username: '',
      about: '',
      socialLinks: [],
      profilePic: '',
      _id: '',
   });

   const form = useForm<z.infer<typeof DashboardSchema>>({
      resolver: zodResolver(DashboardSchema),
      defaultValues: {
         fullname: user?.fullname,
         username: user?.username,
         about: user?.about,
         socialLinks: user?.socialLinks,
      },
   });

   const formImage = useForm({
      defaultValues: {
         profilePic: new File([], ''),
      },
   });

   const [loading, setLoading] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
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
      form.setValue('fullname', data.fullname || '');
      form.setValue('username', data.username);
      form.setValue('about', data.about);
      form.setValue('socialLinks', data.socialLinks);
   };

   useEffect(() => {
      session?.user?.username && fetchUser();
   }, [session]);

   const [baseUrl, setBaseUrl] = useState(() => {
      if (typeof window !== 'undefined') {
         return window.location.origin;
      } else {
         return '';
      }
   });

   const { toast } = useToast();

   async function onSubmit(data: z.infer<typeof DashboardSchema>) {
      setIsSubmitting(true);
      try {
         const result = await axios.post('/api/update-profile', {
            fullname: data.fullname,
            username: user?.username,
            profilePic: user?.profilePic,
            about: data?.about,
            socialLinks: data.socialLinks,
         });
         if (result.data.success) {
            updateFields(result.data.data);
            setUser(result.data.data);
            dispatch(setUserAction(result.data.data));
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

   const { fields, append, remove } = useFieldArray({
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
            if (typeof prevPic === 'string' && prevPic) {
               const public_id = prevPic?.split('/').pop()?.split('.')[0];

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
            setUser(result.data.data);
            dispatch(setUserAction(result.data.data));
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

   interface ThemeState {
      themeSlice:
         | {
              theme: string;
              isDarkMode: boolean;
           }
         | undefined;
   }

   const state = useSelector((state: ThemeState) => state.themeSlice);

   useEffect(() => {
      if (state?.isDarkMode) {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }
   }, []);

   return (
      <ResizablePanelGroup direction='horizontal'>
         <ResizablePanel>
            <div className='p-5 flex flex-col  w-full'>
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
                     readOnly
                     value={baseUrl + '/u/' + (user?.username || '')}
                  />
                  <Button
                     onClick={() =>
                        navigator.clipboard.writeText(
                           baseUrl + '/u/' + (session?.user.username || '')
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
                              Please Wait..
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
                     className='space-y-6 mt-4'
                  >
                     <FormField
                        control={form.control}
                        name='fullname'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder='Fullname'
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
                        name='username'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder='Username'
                                    {...field}
                                    readOnly
                                 />
                              </FormControl>
                              <FormDescription>
                                 * You can't change your username at any time.
                                 If you want to then contact us.
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

                     <div className='w-full'>
                        {fields.map((field, index) => (
                           <div
                              className='flex flex-row gap-4 my-2 w-full'
                              key={field.id}
                           >
                              <FormField
                                 control={form.control}
                                 key={field.id + Math.random()}
                                 name={`socialLinks.${index}.social`}
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Select
                                             defaultValue={field.value}
                                             onValueChange={(e) => {
                                                field.onChange(e);
                                             }}
                                             {...field}
                                          >
                                             <SelectTrigger className='w-[180px]'>
                                                <SelectValue placeholder='Select Link' />
                                             </SelectTrigger>
                                             <SelectContent>
                                                <SelectGroup>
                                                   <SelectLabel>
                                                      Social Media
                                                   </SelectLabel>
                                                   <SelectItem value='TikTok'>
                                                      TikTok
                                                   </SelectItem>
                                                   <SelectItem value='Facebook'>
                                                      Facebook
                                                   </SelectItem>
                                                   <SelectItem value='Snapchat'>
                                                      Snapchat
                                                   </SelectItem>
                                                   <SelectItem value='Threads'>
                                                      Threads
                                                   </SelectItem>
                                                   <SelectItem value='Twitter'>
                                                      Twitter
                                                   </SelectItem>
                                                   <SelectItem value='LinkedIn'>
                                                      LinkedIn
                                                   </SelectItem>
                                                   <SelectItem value='GitHub'>
                                                      GitHub
                                                   </SelectItem>
                                                   <SelectItem value='Reddit'>
                                                      Reddit
                                                   </SelectItem>
                                                   <SelectItem value='Youtube'>
                                                      Youtube
                                                   </SelectItem>
                                                   <SelectItem value='Portfolio'>
                                                      Portfolio
                                                   </SelectItem>
                                                   <SelectItem value='Instagram'>
                                                      Instagram
                                                   </SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                   <SelectLabel>
                                                      Developer
                                                   </SelectLabel>
                                                   <SelectItem value='Stack Overflow'>
                                                      Stack Overflow
                                                   </SelectItem>
                                                   <SelectItem value='Dev.to'>
                                                      Dev.to
                                                   </SelectItem>
                                                   <SelectItem value='Hashnode'>
                                                      Hashnode
                                                   </SelectItem>
                                                   <SelectItem value='Medium'>
                                                      Medium
                                                   </SelectItem>
                                                   <SelectItem value='Discord/Slack Communities'>
                                                      Discord/Slack Communities
                                                   </SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                   <SelectLabel>
                                                      Social Media Influencer
                                                   </SelectLabel>
                                                   <SelectItem value='Pinterest'>
                                                      Pinterest
                                                   </SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                   <SelectLabel>
                                                      Graphics Designer
                                                   </SelectLabel>
                                                   <SelectItem value='Behance'>
                                                      Behance
                                                   </SelectItem>
                                                   <SelectItem value='Dribbble'>
                                                      Dribbble
                                                   </SelectItem>
                                                   <SelectItem value='DeviantArt'>
                                                      DeviantArt
                                                   </SelectItem>
                                                   <SelectItem value='ArtStation'>
                                                      ArtStation
                                                   </SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                   <SelectLabel>
                                                      Video & Photo Editor
                                                   </SelectLabel>
                                                   <SelectItem value='Vimeo'>
                                                      Vimeo
                                                   </SelectItem>
                                                </SelectGroup>
                                             </SelectContent>
                                          </Select>
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 key={field.id + Math.random()}
                                 name={`socialLinks.${index}.value`}
                                 render={({ field }) => (
                                    <FormItem className='w-full'>
                                       <FormControl className='w-full'>
                                          <Input
                                             {...field}
                                             className='w-full'
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                        ))}

                        <div className='flex flex-row gap-5'>
                           <Button
                              type='button'
                              variant='outline'
                              size='sm'
                              className='mt-2'
                              onClick={() => append({ value: '', social: '' })}
                           >
                              Add URL
                           </Button>
                           <Button
                              type='button'
                              variant='outline'
                              size='sm'
                              className='mt-2'
                              onClick={() => remove(0)}
                           >
                              Remove URL
                           </Button>
                        </div>
                        <FormDescription className='mt-4'>
                           * After adding and removing please update so that it
                           will be reflected on website.
                        </FormDescription>
                     </div>

                     <Button type='submit'>
                        {isSubmitting ? (
                           <>
                              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                              Please Wait..
                           </>
                        ) : (
                           'Update'
                        )}
                     </Button>
                  </form>
               </Form>
            </div>
         </ResizablePanel>
         <ResizableHandle withHandle />
         <ResizablePanel>
            <div className=' flex flex-col  items-center  justify-center w-full'>
               <div className=' self-start py-4 px-4'>
                  <h2 className='text-xl font-bold'>Mockup</h2>
                  <p className='text-gray-500'>This is the mockup</p>
               </div>
               <div className='w-full  h-svh flex items-center justify-center '>
                  <div className='space-y-4 flex flex-col items-center'>
                     <div className='mt-4 flex flex-col items-center justify-center w-full'>
                        <Avatar className='w-20 h-20'>
                           <AvatarImage src={user.profilePic || ''} />
                           <AvatarFallback className='text-4xl'>
                              U
                           </AvatarFallback>
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
                     <div className='flex w-full gap-2 flex-col p-2 border rounded-lg'>
                        {user?.socialLinks?.map(({ social, value, _id }) => {
                           return (
                              <Link href={value} key={_id} target='_blank'>
                                 <Button className={`w-full`} key={_id}>
                                    {social}
                                 </Button>
                              </Link>
                           );
                        })}
                     </div>
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
            </div>
         </ResizablePanel>
      </ResizablePanelGroup>
   );
};

export default page;
