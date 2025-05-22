import mongoose from 'mongoose';

const connections: { isConnected?: number } = {};

const dbConnect = async (): Promise<void> => {
   if (connections.isConnected) {
      console.log('Using existing connection');
      return;
   }
   //

   try {
      const db = await mongoose.connect(process.env.MONOGO_URI!, {});
      connections.isConnected = db.connections[0].readyState;
      console.log('Connected to MongoDB');
   } catch (error: any) {
      console.error('Error while connecting to MongoDB:', error);
      process.exit(1);
   }
};

export default dbConnect;
