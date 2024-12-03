import * as zod from 'zod';

export const SignUpSchema = zod.object({
   username: zod.string().min(3).toLowerCase().max(20).trim(),
   email: zod.string().email(),
   password: zod.string().min(8),
});
