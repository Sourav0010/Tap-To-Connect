import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUpoloadResult {
   secure_url: string;
   public_id: string;
}

export async function POST(req: Request, res: Response) {
   const formData = await req.formData();
   const file = (formData.get('image') as File) || null;
   if (!file) {
      return Response.json({ error: 'No file uploaded' }, { status: 400 });
   }
   const arrayBuffer = await file.arrayBuffer();
   const buffer = Buffer.from(arrayBuffer);

   const result = await new Promise<CloudinaryUpoloadResult>(
      (resolve, reject) => {
         cloudinary.uploader
            .upload_stream({ resource_type: 'image' }, (error, result) => {
               if (error) {
                  reject(error);
               } else {
                  resolve(result as CloudinaryUpoloadResult);
               }
            })
            .end(buffer);
      }
   );

   return Response.json(
      {
         url: result.secure_url,
         public_id: result.public_id,
      },
      { status: 200 }
   );
}
