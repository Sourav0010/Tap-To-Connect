import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
   fullname: string;
   username: string;
   email: string;
   password: string;
   about: string;
   profilePic: string;
   isVerified: boolean;
   otp: string;
   socialLinks: [{ value: string; social: string }];
   themePreference: [
      {
         colorVariant: string;
         isDarkMode: boolean;
      },
   ];
}

const userSchema = new Schema<User>({
   fullname: {
      type: String,
      default: '',
   },
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
   socialLinks: [
      {
         value: String,
         social: String,
      },
   ],
   themePreference: [
      {
         colorVariant: String,
         isDarkMode: Boolean,
      },
   ],
});

const User =
   (mongoose.models.User as mongoose.Model<User>) ||
   mongoose.model<User>('User', userSchema);

export default User;
