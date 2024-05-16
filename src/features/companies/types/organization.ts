import { z } from "zod";
import { ContactSchema } from "@/features/companies/types/contact";


export const OrganizationSchema = z.object({
    resourceType: z.string().optional(),
    identifier: z.array(
        z.object({
            use: z.string().min(3,{ message: "Requerido un uso"}),
            system: z.string().min(3,{ message: "Requerido un system"}),
            value: z.string().min(3,{ message: "Requerido un valor"}),
        })
    ),
    active: z.boolean().optional(),
    id: z.string().optional(),
    name: z.string().min(3,{ message: "Requerido un nombre" }),
    alias: z.array(z.string().optional()).optional(),
    contact: z.array(ContactSchema).optional(),
});

export type Organization = z.infer<typeof OrganizationSchema>;