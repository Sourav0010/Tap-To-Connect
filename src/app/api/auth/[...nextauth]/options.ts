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
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'Enter Your Eamil: ',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Enter Your Password: ',
				},
			},
			async authorize(credentials: any): Promise<any> {
				// Connecting to the database
				await dbConnect();
				try {
					// Check if the user exists
					const user = await User.findOne({ email: credentials.email });
					// If user not found, throw an error
					if (!user) throw new Error('No user found');
					// If user is not verified, throw an error
					if (user.isVerified === false)
						throw new Error(
							'User not verified, Please verify your email before you login'
						);
					// If user is found, check if the password is correct
					const isPasswordCorrect = await bcrypt.compare(
						credentials.password,
						user.password
					);
					// If password is incorrect, throw an error
					if (!isPasswordCorrect) throw new Error('Password incorrect');
					return user;
				} catch (error: any) {
					throw new Error(error);
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token._id = user._id;
				token.isVerified = user.isVerified;
				token.username = user.username;
				token.about = user.about;
				token.profilePic = user.profilePic;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user._id = token._id;
				session.user.isVerified = token.isVerified;
				session.user.username = token.username;
				session.user.name = token.username;
				session.user.about = token.about;
				session.user.profilePic = token.profilePic;
			}
			return session;
		},
	},
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/sign-in',
	},
};
