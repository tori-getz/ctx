import { z } from 'zod';

export const TabSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  url: z.string().url(),
  icon: z.string(),
  loading: z.boolean(),
});

export type Tab = z.infer<typeof TabSchema>;
