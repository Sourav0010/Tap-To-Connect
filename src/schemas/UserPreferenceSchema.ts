import { z } from 'zod';

export const UserPreferenceSchema = z.object({
	themeType: z.string().min(3).max(20).trim(),
	themeColor: z.string().min(3).max(20).trim().optional(),
	createdBy: z.string().min(3).max(20).trim(),
});
