import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(req: Request, res: Response) {
   const { public_id } = await req.json();

   try {
      await cloudinary.uploader.destroy(public_id);

      return Response.json(
         { message: 'Image deleted successfully', success: true },
         { status: 200 }
      );
   } catch (error) {
      return Response.json(
         { message: 'Failed to delete image', success: false },
         { status: 500 }
      );
   }
}
