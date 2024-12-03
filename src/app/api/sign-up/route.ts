import { sendVerificationEmail } from '@/helpers/SendVerificationEmail';
import dbConnect from '@/lib/dbConnect';
import User from '@/model/User.model';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
   await dbConnect();
   const { username, email, password } = await request.json();
   let user;
   const salt = await bcrypt.genSalt(10);
   const encryptedPassword = await bcrypt.hash(password, salt);
   const otp = Math.floor(100000 + Math.random() * 900000).toString();

   try {
      const userNotVerified = await User.findOne({
         email,
         isVerified: false,
         username,
      });

      if (userNotVerified) {
         user = await User.findOneAndUpdate(
            { email, username },
            { password: encryptedPassword, otp },
            { new: true }
         );
         console.log(user);
         user = await User.findById(user?._id).select('-password');
      } else {
         user = await User.create({
            username,
            email,
            password: encryptedPassword,
            otp,
         });
         console.log(user);

         if (!user) {
            return Response.json(
               {
                  success: false,
                  message: 'User creation failed',
               },
               { status: 400 }
            );
         }
         user = await User.findOne({ email, username }).select('-password');
      }

      sendVerificationEmail(email, username, otp);

      return Response.json(
         {
            success: true,
            message: 'User created successfully',
            user,
         },
         { status: 201 }
      );
   } catch (error) {
      return Response.json(
         {
            success: false,
            message: 'User creation failed',
            error,
         },
         { status: 400 }
      );
   }
}
