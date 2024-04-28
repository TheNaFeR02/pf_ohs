import { z } from "zod";
import { AddressSchema } from "./address";
import { NameSchema } from "./name";


export const ContactSchema = z.object({
    telecom: z.array(
        z.object({
            system: z.string(),
            value: z.string(),
            use: z.string(),
        })
    ),
    name: NameSchema.optional(),
    address: AddressSchema.optional(),
});

export type Contact = z.infer<typeof ContactSchema>;