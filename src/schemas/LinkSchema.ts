import { z } from 'zod';

export const LinkSchema = z.object({
	type: z.string().min(3).max(20).trim(),
	link: z.string().url({ message: 'Please enter a valid URL.' }),
	title: z.string().min(3).max(20).trim(),
	createdBy: z.string().min(3).max(20).trim(),
});
