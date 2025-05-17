import dbConnect from '@/lib/dbConnect';
import User from '@/model/User.model';

export async function POST(request: Request) {
   await dbConnect();

   const { username, themePreference } = await request.json();

   try {
      let user = await User.findOne({ username });

      if (!user) {
         return Response.json(
            {
               success: false,
               message: 'User not found',
            },
            { status: 404 }
         );
      }

      user = await User.findOneAndUpdate(
         {
            username,
         },
         {
            $set: {
               themePreference,
            },
         },
         {
            new: true,
         }
      );

      return Response.json(
         {
            success: true,
            message: 'Profile updated successfully',
            data: user,
         },
         { status: 200 }
      );
   } catch (error: any) {
      return Response.json(
         {
            success: false,
            message: error.message || 'Error while updating profile',
         },
         { status: 500 }
      );
   }
}
