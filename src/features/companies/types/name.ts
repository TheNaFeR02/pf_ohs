import { z } from "zod";

export const NameSchema = z.object({
    use: z.string(),
    text: z.string(),
    family: z.string(),
    given: z.array(z.string()),
    prefix: z.array(z.string()),
});

export type Name = z.infer<typeof NameSchema>;
