import { z } from 'zod';

export const ValidationSchema = z.object({
   otp: z.string().min(6).max(6),
});
