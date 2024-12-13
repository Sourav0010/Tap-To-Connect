import dbConnect from '@/lib/dbConnect';
import User from '@/model/User.model';

export async function POST(request: Request) {
   await dbConnect();
   const { username } = await request.json();

   try {
      const user = await User.findOne({ username }).select(
         '-password -isVerified -otp'
      );

      if (!user) {
         return Response.json(
            {
               success: false,
               message: 'User not found',
            },
            { status: 404 }
         );
      }

      return Response.json({
         success: true,
         message: 'User Found',
         data: user,
      });
   } catch (error: any) {
      return Response.json(
         {
            success: false,
            message: error.message || 'Error while getting user',
         },
         { status: 500 }
      );
   }
}
