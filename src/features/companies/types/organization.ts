import { z } from "zod";
import { ContactSchema } from "@/features/companies/types/contact";


export const OrganizationSchema = z.object({
    resourceType: z.string().optional(),
    identifier: z.array(
        z.object({
            use: z.string().optional(),
            system: z.string().optional(),
            value: z.string().optional(),
        })
    ).optional(),
    active: z.boolean().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    alias: z.array(z.string().optional()).optional(),
    contact: z.array(ContactSchema).optional(),
});

export type Organization = z.infer<typeof OrganizationSchema>;