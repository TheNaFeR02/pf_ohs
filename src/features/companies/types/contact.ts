import { z } from "zod";
import { AddressSchema } from "@/features/companies/types/address";
import { NameSchema } from "@/features/companies/types/name";


export const ContactSchema = z.object({
    telecom:  z.array(
        z.object({
            system: z.string().min(3, { message: "Requerido un tipo de sistema"}),
            value: z.string().min(3, { message: "Requerido un valor de sistema"}),
            use: z.string().min(3, { message: "Requerido un uso"}),
        })
    ),
    name: NameSchema.optional(),
    address: AddressSchema.optional(),
});

export type Contact = z.infer<typeof ContactSchema>;