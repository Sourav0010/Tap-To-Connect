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
   Card,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';

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
         image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         name: 'Ethan Foster',
         title: 'Full Stack Developer',
      },
   ];
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
               <Link href='/sign-up'>
                  <Button>Create Account</Button>
               </Link>
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
                           className='max-sm:basis-1/1 max-md:basis-1/2 basis-1/3 w-full'
                           key={index}
                        >
                           <div className='p-1'>
                              <Card>
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
                        <Card key={index} className='w-full max-w-sm'>
                           <CardHeader>
                              <Avatar>
                                 <AvatarImage src={value.image} alt='@shadcn' />
                                 <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <CardTitle className='font-bold max-sm:text-sm max-md:text-base'>
                                 {value.name}
                              </CardTitle>
                              <CardDescription className='max-sm:text-xs max-md:text-sm'>
                                 {value.title}
                              </CardDescription>
                           </CardHeader>
                        </Card>
                     )
                  )}
               </div>
            </div>
            <Separator />

            <footer>
               <div className='flex flex-col items-center justify-center'>
                  <p className='text-sm text-center'>
                     &copy; 2023. All rights reserved.
                  </p>
               </div>
            </footer>
         </main>
      </>
   );
}
