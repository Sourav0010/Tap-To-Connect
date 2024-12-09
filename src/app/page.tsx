'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

export default function Home() {
   const accordians = [
      {
         id: 1,
         title: 'Is it styled?',
         content:
            "Yes. It comes with default styles that match the other components' aesthetic.",
      },
      {
         id: 2,
         title: 'Can I customize the styles?',
         content:
            'Yes, you can customize the styles using Tailwind, CSS, or other styling methods.',
      },
      {
         id: 3,
         title: 'Is it responsive?',
         content:
            'Yes, the components are fully responsive and adapt to different screen sizes.',
      },
      {
         id: 4,
         title: 'Does it support dark mode?',
         content:
            'Yes, it has built-in support for dark mode and adapts based on system preferences.',
      },
      {
         id: 5,
         title: 'Is it accessible?',
         content:
            'Yes, the components follow accessibility best practices to ensure usability for all users.',
      },
   ];
   return (
      <>
         <main className='flex min-h-screen flex-col  items-center justify-center h-full'>
            <div className='space-y-4 h-svh flex justify-center flex-col items-center'>
               <h1 className='text-4xl font-bold'>Welcome to Tap To Connect</h1>
               <p className='text-lg'>Connect to people in the metaverse</p>
               <Link href='/sign-up'>
                  <Button>Create Account</Button>
               </Link>
            </div>
            <Separator className='my-4' />
            <div>
               <h1 className='text-4xl my-5 font-bold'>FAQ's</h1>
            </div>
            <div className='flex items-center justify-center gap-10'>
               <div className='w-1/2'>
                  <Accordion type='single' collapsible className='w-full'>
                     {accordians.map((accordian) => (
                        <AccordionItem
                           key={accordian.id}
                           value={accordian.id.toString()}
                        >
                           <AccordionTrigger key={accordian.id}>
                              {accordian.title}
                           </AccordionTrigger>
                           <AccordionContent
                              key={accordian.id}
                              className='space-y-1 w-64'
                           >
                              {accordian.content}
                           </AccordionContent>
                        </AccordionItem>
                     ))}
                  </Accordion>
               </div>
               <div className='w-64 object-cover rounded-lg overflow-hidden  w-1/2'>
                  <img
                     src='https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                     alt='Metaverse'
                  />
               </div>
            </div>
         </main>
      </>
   );
}
