import { z } from 'zod';

export const DashboardSchema = z.object({
   username: z.string().min(3).max(20),
   about: z.string().min(3).max(100),
   socialLinks: z
      .array(
         z.object({
            value: z.string().url({ message: 'Please enter a valid URL.' }),
         })
      )
      .optional(),
});
