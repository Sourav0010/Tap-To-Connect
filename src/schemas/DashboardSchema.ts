import { z } from 'zod';

export const DashboardSchema = z.object({
   username: z.string().min(3).max(20),
});
