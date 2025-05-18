import mongoose, { Schema, Document } from 'mongoose';

interface UserPreference extends Document {
	themeType: string;
	themeColor: string;
	createdBy: Schema.Types.ObjectId;
}

const userPreferenceSchema = new Schema<UserPreference>(
	{
		themeType: {
			type: String,
			default: '',
		},
		themeColor: {
			type: String,
			default: '',
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

const UserPreference =
	(mongoose.models.UserPreference as mongoose.Model<UserPreference>) ||
	mongoose.model<UserPreference>('UserPreference', userPreferenceSchema);

export default UserPreference;
