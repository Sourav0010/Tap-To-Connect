import dbConnect from '@/lib/dbConnect';
import User from '@/model/User.model';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
   providers: [
      CredentialsProvider({
         name: 'Credentials',
         id: 'credentials',
         credentials: {
            email: { label: 'Email', type: 'email' },
            password: { label: 'Password', type: 'password' },
         },
         async authorize(credentials: any): Promise<any> {
            await dbConnect();
            try {
               const user = await User.findOne({ email: credentials.email });
               if (!user) throw new Error('No user found');
               if (user.isVerified === false)
                  throw new Error('User not verified');
               const isPasswordCorrect = await bcrypt.compare(
                  credentials.password,
                  user.password
               );
               if (!isPasswordCorrect) throw new Error('Password incorrect');
               return user;
            } catch (error: any) {
               throw new Error(error);
            }
         },
      }),
   ],

   session: {
      strategy: 'jwt',
   },
   secret: process.env.SECRET,
   pages: {
      signIn: '/sign-in',
   },
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token._id = user._id?.toString();
            token.isVerified = user.isVerified;
            token.username = user.username;
            token.email = user.email;
         }
         return token;
      },
      async session({ session, token }) {
         if (token) {
            session._id = token._id;
            session.isVerified = token.isVerified;
            session.username = token.username;
            session.email = token.email as string;
         }
         return session;
      },
   },
};
