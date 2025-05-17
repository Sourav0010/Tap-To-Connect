import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
   interface Session {
      user: {
         _id?: string;
         isVerified?: boolean;
         username?: string;
         about?: string;
         profilePic?: string;
         socialLinks?: [{ value: string; social: string }];
         themePreference: [
            {
               colorVariant: string;
               isDarkMode: boolean;
            },
         ];
      } & DefaultSession['user'];
   }

   interface User {
      _id?: string;
      isVerified?: boolean;
      username?: string;
      about?: string;
      profilePic?: string;
      socialLinks?: [{ value: string; social: string }];
      themePreference: [
         {
            colorVariant: string;
            isDarkMode: boolean;
         },
      ];
   }
}

declare module 'next-auth/jwt' {
   interface JWT {
      _id?: string;
      isVerified?: boolean;
      username?: string;
      about?: string;
      profilePic?: string;
      socialLinks?: [{ value: string; social: string }];
      themePreference: [
         {
            colorVariant: string;
            isDarkMode: boolean;
         },
      ];
   }
}
