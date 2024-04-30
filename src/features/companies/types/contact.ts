import { z } from "zod";
import { AddressSchema } from "@/features/companies/types/address";
import { NameSchema } from "@/features/companies/types/name";


export const ContactSchema = z.object({
    telecom: z.array(
        z.object({
            system: z.string().optional(),
            value: z.string().optional(),
            use: z.string().optional(),
        })
    ),
    name: NameSchema.optional(),
    address: AddressSchema.optional(),
});

export type Contact = z.infer<typeof ContactSchema>;