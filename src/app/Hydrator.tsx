'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';
import { useSession } from 'next-auth/react';
import { clearUser, setUser } from '@/lib/features/userSlice';
import { setColorVariant, toggleDarkMode } from '@/lib/features/themeSlice';

export function Hydrator() {
   const { data: session, status } = useSession();

   const dispatch = useDispatch();

   const darkMode = useSelector(
      (state: RootState) => state.themeSlice.isDarkMode
   );
   const colorVariant = useSelector(
      (state: RootState) => state.themeSlice.colorVariant
   );

   useEffect(() => {
      // Remove all previous theme color classes from <body>
      const body = document.body;
      body.className = '';

      if (darkMode && colorVariant) {
         // Add dark mode class
         body.classList.add('dark');
         document.documentElement.classList.add('dark');
         // Add theme color class
         body.classList.add(colorVariant);
         document.documentElement.classList.add(colorVariant);
      } else if (!darkMode && colorVariant) {
         // Add theme color class
         body.classList.remove('dark');
         document.documentElement.classList.remove('dark');
         body.classList.add(colorVariant);
         document.documentElement.classList.add(colorVariant);
      } else if (darkMode && !colorVariant) {
         // Add dark mode class
         body.classList.add('dark');
         document.documentElement.classList.add('dark');
      } else {
         // Remove dark mode class
         body.classList.remove('dark');
         document.documentElement.classList.remove('dark');
      }
   }, [darkMode, colorVariant]);

   useEffect(() => {
      if (status === 'authenticated' && session?.user) {
         console.log('session', session);
         dispatch(
            setColorVariant(session.user.themePreference[0].colorVariant)
         );
         dispatch(toggleDarkMode(session.user.themePreference[0].isDarkMode));
         dispatch(setUser(session.user));
      } else if (status === 'unauthenticated') {
         dispatch(clearUser());
      }
   }, [session, status, dispatch]);

   return null;
}
