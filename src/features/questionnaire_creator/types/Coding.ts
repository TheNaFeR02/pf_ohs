import { z } from 'zod';

export const CodingSchema = z.object({
    system: z.string().url().optional(),
    version: z.string().optional(),
    code: z.string().optional(),
    display: z.string().optional(),
    userSelected: z.boolean().optional(),
  });

export type Coding = z.infer<typeof CodingSchema>;

  