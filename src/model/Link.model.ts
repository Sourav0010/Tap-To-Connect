import mongoose, { Schema, Document } from 'mongoose';

export interface Link extends Document {
	type: string;
	link: string;
	title: string;
	createdBy: Schema.Types.ObjectId;
}

const linkSchema = new Schema<Link>(
	{
		type: {
			type: String,
			required: true,
			enum: ['social', 'shopping'],
		},
		link: {
			type: String,
			required: true,
			trim: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
			min: [3, 'Title is too short'],
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

const Link =
	(mongoose.models.Link as mongoose.Model<Link>) ||
	mongoose.model<Link>('Link', linkSchema);

export default Link;
