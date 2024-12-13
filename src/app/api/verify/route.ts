import dbConnect from '@/lib/dbConnect';
import User from '@/model/User.model';

export async function POST(request: Request) {
   await dbConnect();
   const { username, otp } = await request.json();

   try {
      const user = await User.findOne({ username });
      if (!user) {
         return Response.json(
            {
               success: false,
               message: 'User not found',
            },
            { status: 404 }
         );
      }

      if (user.otp !== otp) {
         return Response.json(
            {
               success: false,
               message: 'Invalid OTP',
            },
            { status: 400 }
         );
      }

      user.isVerified = true;
      await user.save();

      return Response.json(
         {
            success: true,
            message: 'User verified successfully',
         },
         { status: 200 }
      );
   } catch (error: any) {
      return Response.json(
         {
            success: false,
            message: error.message || 'Error verifying OTP',
         },
         { status: 500 }
      );
   }
}
