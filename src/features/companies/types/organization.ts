import { z } from "zod";

export const OrganizationSchema = z.object({
    resourceType: z.string().optional(),
    identifier: z.array(
        z.object({
            use: z.string().optional(),
            system: z.string().url().optional(),
            value: z.string().optional(),
        })
    ).optional(),
    active: z.boolean().optional(),
    id: z.string().optional(),
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }).optional(),
    alias: z.array(z.string()).optional(),
    contact: z.array(z.object({
        telecom: z.union([z.object({
            system: z.string().optional(),
            value: z.string().optional(),
            use: z.string().optional(),
        }), z.array(z.object({
            system: z.string().optional(),
            value: z.string().optional(),
            use: z.string().optional(),
        }))]).optional(),
        name: z.object({
            use: z.string().optional(),
            text: z.string().optional(),
            family: z.string().optional(),
            given: z.array(z.string()).optional(),
            prefix: z.array(z.string()).optional(),
        }).optional(),
        address: z.object({
            use: z.string().optional(),
            line: z.array(z.string()).optional(),
            city: z.string().optional(),
            postalCode: z.string().optional(),
            country: z.string().optional(),
        }).optional(),
    })).optional(),
});

export type Organization = z.infer<typeof OrganizationSchema>;
