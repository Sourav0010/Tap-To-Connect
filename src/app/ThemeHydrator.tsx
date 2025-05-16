'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';

export function ThemeHydrator() {
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

   return null;
}
