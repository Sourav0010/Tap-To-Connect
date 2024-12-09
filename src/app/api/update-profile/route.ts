import dbConnect from '@/lib/dbConnect';
import User from '@/model/User.model';

export async function POST(request: Request) {
   await dbConnect();

   const { username, about, socialLinks, profilePic } = await request.json();

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

      if (user.about != about) {
         user.about = about;
      }

      if (user.socialLinks != socialLinks) {
         user.socialLinks = socialLinks;
      }

      if (user.profilePic != profilePic) {
         user.profilePic = profilePic;
      }

      await user.save();

      return Response.json(
         {
            success: true,
            message: 'Profile updated successfully',
            data: user,
         },
         { status: 200 }
      );
   } catch (error) {
      return Response.json(
         {
            success: false,
            message: 'Error while updating profile',
         },
         { status: 500 }
      );
   }
}
