import { z } from "zod";
import { ContactSchema } from "./contact";


export const OrganizationSchema = z.object({
    resourceType: z.string(),
    identifier: z.array(
        z.object({
            use: z.string(),
            system: z.string().url(),
            value: z.string(),
        })
    ),
    active: z.boolean(),
    name: z.string(),
    alias: z.array(z.string()),
    contact: z.array(ContactSchema),
});

export type Organization = z.infer<typeof OrganizationSchema>;