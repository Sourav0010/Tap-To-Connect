import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
   username: string;
   email: string;
   password: string;
   about: string;
   profilePic: string;
   isVerified: boolean;
   otp: string;
   socialLinks: [{ value: string }];
}

const userSchema = new Schema<User>({
   username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      min: [3, 'Username is too short'],
      lowercase: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
   },
   password: {
      type: String,
      required: true,
   },
   about: {
      type: String,
      default: '',
   },
   profilePic: {
      type: String,
      default: '',
   },
   isVerified: {
      type: Boolean,
      default: false,
   },
   otp: {
      type: String,
      required: true,
   },
   socialLinks: {
      type: [{ value: String }],
      default: [{ value: '' }],
   },
});

const User =
   (mongoose.models.User as mongoose.Model<User>) ||
   mongoose.model<User>('User', userSchema);

export default User;
