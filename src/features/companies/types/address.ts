import { z } from "zod";

export const AddressSchema = z.object({
    use: z.string().optional(),
    line: z.array(z.string()).optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
});

export type Address = z.infer<typeof AddressSchema>;