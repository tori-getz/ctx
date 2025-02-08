import { z } from 'zod';

export const TabSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export type Tab = z.infer<typeof TabSchema>;
