import { z } from "zod";

export const NameSchema = z.object({
    use: z.string().optional(),
    text: z.string().optional(),
    family: z.string().optional(),
    given: z.array(z.string().optional()).optional(),
    prefix: z.array(z.string().optional()).optional(),
});

export type Name = z.infer<typeof NameSchema>;