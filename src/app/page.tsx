'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { Separator } from '@/components/ui/separator';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
} from '@/components/ui/carousel';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';

import {
   Card,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';

import Autoplay from 'embla-carousel-autoplay';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
   const testimonials = [
      {
         name: 'John Doe',
         title: 'CEO',
         image: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80',
         description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae debitis laborum modi, quas quam quia consequatur officia rem voluptas accusantium dicta.',
      },
      {
         name: 'John Doe',
         title: 'CEO',
         image: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80',
         description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae debitis laborum modi, quas quam quia consequatur officia rem voluptas accusantium dicta.',
      },
      {
         name: 'John Doe',
         title: 'CEO',
         image: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80',
         description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae debitis laborum modi, quas quam quia consequatur officia rem voluptas accusantium dicta.',
      },
      {
         name: 'John Doe',
         title: 'CEO',
         image: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80',
         description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae debitis laborum modi, quas quam quia consequatur officia rem voluptas accusantium dicta.',
      },
      {
         name: 'John Doe',
         title: 'CEO',
         image: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80',
         description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae debitis laborum modi, quas quam quia consequatur officia rem voluptas accusantium dicta.',
      },
      {
         name: 'John Doe',
         title: 'CEO',
         image: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80',
         description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae debitis laborum modi, quas quam quia consequatur officia rem voluptas accusantium dicta.',
      },
      {
         name: 'John Doe',
         title: 'CEO',
         image: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80',
         description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae debitis laborum modi, quas quam quia consequatur officia rem voluptas accusantium dicta.',
      },
      {
         name: 'John Doe',
         title: 'CEO',
         image: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80',
         description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae debitis laborum modi, quas quam quia consequatur officia rem voluptas accusantium dicta.',
      },
   ];

   const teamMembers = [
      {
         image: 'https://unsplash.com/photos/ILip77SbmOE/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzMzOTk3MTkyfA&auto=format&fit=crop&w=76&q=80',
         name: 'George Harris',
         title: 'DevOps Engineer',
      },
      {
         image: 'https://unsplash.com/photos/ILip77SbmOE/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzMzOTk3MTkyfA&auto=format&fit=crop&w=76&q=80',
         name: 'Diana Evans',
         title: 'Data Analyst',
      },
      {
         image: 'https://unsplash.com/photos/ILip77SbmOE/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzMzOTk3MTkyfA&auto=format&fit=crop&w=76&q=80',
         name: 'Charlie Davis',
         title: 'Data Analyst',
      },
      {
         image: 'https://unsplash.com/photos/ILip77SbmOE/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzMzOTk3MTkyfA&auto=format&fit=crop&w=76&q=80',
         name: 'Ethan Foster',
         title: 'Data Analyst',
      },
      {
         image: 'https://unsplash.com/photos/ILip77SbmOE/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzMzOTk3MTkyfA&auto=format&fit=crop&w=76&q=80',
         name: 'Ethan Foster',
         title: 'Product Manager',
      },
      {
         image: 'https://unsplash.com/photos/ILip77SbmOE/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzMzOTk3MTkyfA&auto=format&fit=crop&w=76&q=80',
         name: 'Ethan Foster',
         title: 'Full Stack Developer',
      },
   ];

   const { data: session } = useSession();
   const router = useRouter();

   const [commits, setCommits] = useState([]);

   async function fetchCommits() {
      const response = await axios(
         'https://api.github.com/repos/sourav0010/Tap-To-Connect/commits'
      );
      setCommits(response.data);
   }
   useEffect(() => {
      fetchCommits();
   }, []);

   return (
      <>
         <main className='flex min-h-screen flex-col  items-center justify-center h-full'>
            <div className='space-y-4 h-svh flex justify-center flex-col items-center'>
               <h1 className='text-4xl max-md:text-3xl max-sm:text-2xl font-bold'>
                  Welcome to Tap To Connect
               </h1>
               <p className='text-lg max-sm:text-sm max-md:text-base'>
                  Connect to people in the metaverse
               </p>

               <Button
                  onClick={() =>
                     router.push(session ? '/dashboard' : '/sign-up')
                  }
               >
                  {session ? 'Go to Dashboard' : 'Create an account'}
               </Button>
            </div>
            <Separator className='my-10' />
            <div>
               <h1 className='text-4xl max-md:text-3xl max-sm:text-2xl my-5 font-bold'>
                  Our Testimonials
               </h1>
            </div>
            <div>
               <Carousel
                  className='w-screen overflow-hidden max-w-6xl h-1/2'
                  plugins={[Autoplay({ delay: 3000 })]}
               >
                  <CarouselContent>
                     {testimonials.map((value, index) => (
                        <CarouselItem
                           className='max-sm:basis-1/1 max-md:basis-1/2 basis-1/3 w-full '
                           key={index}
                        >
                           <div className='p-1'>
                              <Card className='shadow-md'>
                                 <CardHeader>
                                    <Avatar>
                                       <AvatarImage
                                          src={value.image}
                                          alt='@shadcn'
                                       />
                                       <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <CardTitle className='font-bold max-sm:text-sm'>
                                       {value.name}
                                    </CardTitle>
                                    <CardDescription className='max-sm:text-xs'>
                                       {value.description}
                                    </CardDescription>
                                 </CardHeader>
                              </Card>
                           </div>
                        </CarouselItem>
                     ))}
                  </CarouselContent>
               </Carousel>
            </div>
            <Separator className='my-10' />
            <div>
               <h1 className='text-4xl max-md:text-3xl max-sm:text-2xl my-5 font-bold'>
                  Our Team
               </h1>
            </div>
            <div className='w-full  max-w-6xl'>
               <div className='grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {teamMembers.map(
                     (
                        value: { image: string; name: string; title: string },
                        index: number
                     ) => (
                        <Card
                           key={index}
                           className='w-full max-w-sm  hover:shadow-lg transition-shadow duration-300 cursor-pointer'
                        >
                           <CardHeader>
                              <Avatar>
                                 <AvatarImage src={value.image} alt='@shadcn' />
                                 <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <CardTitle className='font-bold max-sm:text-sm max-md:text-base cursor-pointer'>
                                 {value.name}
                              </CardTitle>
                              <CardDescription className='max-sm:text-xs max-md:text-sm cursor-pointer'>
                                 {value.title}
                              </CardDescription>
                           </CardHeader>
                        </Card>
                     )
                  )}
               </div>
            </div>

            <footer>
               <div className='flex mt-10 flex-col items-center justify-center'>
                  <p className='text-sm text-center'>
                     &copy; 2024 Tap To Connect. All rights reserved.
                  </p>

                  <p className='text-sm my-3'>
                     Build by{' '}
                     <Link href={'https://sourav-mohanty-dev.netlify.app/'}>
                        Sourav Mohanty
                     </Link>{' '}
                     <Dialog>
                        <DialogTrigger>
                           <span>Change Log</span>
                        </DialogTrigger>
                        <DialogContent>
                           <DialogHeader>
                              <DialogTitle>Change Logs</DialogTitle>
                              <DialogDescription>
                                 {commits.map((commit: any, index) => (
                                    <p key={commit.sha}>
                                       {index + 1 + ' : '}{' '}
                                       {commit?.commit?.message}
                                    </p>
                                 ))}
                              </DialogDescription>
                           </DialogHeader>
                        </DialogContent>
                     </Dialog>
                  </p>
               </div>
            </footer>
         </main>
      </>
   );
}
