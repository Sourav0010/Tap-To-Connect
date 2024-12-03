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
      const result = await resend.emails.send({
         from: 'onboarding@resend.dev',
         to: email,
         subject: 'Verification Code : Tap To Connect',
         react: EmailTemplate({ username, otp: code }),
      });

      return { success: true, message: 'Verification email sent' };
   } catch (error) {
      return { success: false, message: 'Verification email failed' };
   }
}
