import { z } from "zod";
import { resourceSchema } from "@/types/Resource";
import { narrativeSchema } from "@/types/Narrative";
import { extensionSchema } from "@/types/Extension";
import { stringSchema } from "@/types/dataTypes";

export const domainResourceSchema = z.object({
  resourceType: stringSchema.optional(),
  resource: resourceSchema.optional(),
  text: narrativeSchema.optional(),
  contained: z.array(resourceSchema).optional(),
  extension: z.array(extensionSchema).optional(),
  modifierExtension: z.array(extensionSchema).optional(),
});

export type DomainResource = z.infer<typeof domainResourceSchema>;
