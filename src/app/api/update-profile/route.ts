import dbConnect from '@/lib/dbConnect';
import User from '@/model/User.model';

export async function POST(request: Request) {
   await dbConnect();

   const { fullname, username, about, socialLinks, profilePic } = await request.json();
   console.log(socialLinks);

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

      if (user.about != about) {
         user.about = about;
      }

      if (user.profilePic != profilePic) {
         user.profilePic = profilePic;
      }

      if(!user?.fullname || user?.fullname != fullname){
         user.fullname = fullname;
      }

      await user.save();

      user = await User.findOneAndUpdate(
         {
            username,
         },
         {
            $set: {
               socialLinks,
            },
         },
         {
            new: true,
         }
      );

      console.log(user, socialLinks);

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
