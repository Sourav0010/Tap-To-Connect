import dbConnect from '@/lib/dbConnect';
import User from '@/model/User.model';

export async function POST(request: Request) {
   await dbConnect();

   const { username } = await request.json();

   try {
      const user = await User.findOne({ username, isVerified: true });
      if (user) {
         return Response.json(
            {
               message: 'Username already exists',
               success: false,
            },
            { status: 400 }
         );
      }
      return Response.json(
         {
            message: 'Username is available',
            success: true,
         },
         { status: 200 }
      );
   } catch (error: any) {
      return Response.json(
         {
            message: error.message || 'Error checking username',
            success: false,
         },
         { status: 500 }
      );
   }
}
