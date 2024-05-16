import {z} from "zod";
import { OrganizationSchema } from "@/features/companies/types/organization";

export const jsonverify = z.object({
    fullUrl: z.string().optional(),
    resource: z.object({OrganizationSchema}).optional(),
    search: z.object({ mode: z.string().optional()}).optional(),

});

export type jsonverify = z.infer<typeof jsonverify>;