import dbConnect from '@/lib/dbConnect';
import User from '@/model/User.model';

export async function POST(request: Request) {
	await dbConnect();

	const { username, socialLink } = await request.json();

	console.log(username, socialLink);

	let user = await User.findOne({ username });

    socialLink.createdBy = user._id;

	console.log(typeof socialLink);

	console.log(user);

	return Response.json(
		{
			success: true,
			message: 'Shopping list updated successfully',
		},
		{ status: 200 }
	);

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

		user = await User.findOneAndUpdate(
			{
				username,
			},
			{
				$set: {
					shoppingCard,
				},
			},
			{
				new: true,
			}
		);

		return Response.json(
			{
				success: true,
				message: 'Shopping list updated successfully',
				data: user,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return Response.json(
			{
				success: false,
				message: error.message || 'Error while updating shopping list',
			},
			{ status: 500 }
		);
	}
}
