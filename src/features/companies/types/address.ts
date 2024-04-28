import { z } from "zod";

export const AddressSchema = z.object({
    use: z.string(),
    line: z.array(z.string()),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
});

export type Address = z.infer<typeof AddressSchema>;