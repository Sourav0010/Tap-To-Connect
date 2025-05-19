import EmailTemplate from '@/components/EmailTemplate';
import { ApiResponse } from '@/types/ApiResponse';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND);

export async function sendVerificationEmail(
	email: string,
	username: string,
	code: string
): Promise<ApiResponse> {
	try {
		const { data, error } = await resend.emails.send({
			from: 'onboarding@resend.dev',
			to: email,
			subject: 'Verification Code : Tap To Connect',
			react: EmailTemplate({ username, otp: code }),
		});

		if (error) {
			return {
				success: false,
				message: error.message || 'Verification email failed',
				data: { code },
			};
		}

		return { success: true, message: 'Verification email sent', data };
	} catch (error: any) {
		console.log(error);
		return {
			success: false,
			message: error.message || 'Verification email failed',
		};
	}
}
