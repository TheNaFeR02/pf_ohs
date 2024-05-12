import { z } from "zod";
import { resourceSchema } from "@/features/questionnaire_creator/types/Resource";
import { narrativeSchema } from "@/features/questionnaire_creator/types/Narrative";
import { extensionSchema } from "@/features/questionnaire_creator/types/Extension";
import { stringSchema } from "@/features/questionnaire_creator/types/dataTypes";

export const domainResourceSchema = z.object({
  resourceType: stringSchema.optional(),
  resource: resourceSchema.optional(),
  text: narrativeSchema.optional(),
  contained: z.array(resourceSchema).optional(),
  extension: z.array(extensionSchema).optional(),
  modifierExtension: z.array(extensionSchema).optional(),
});

export type DomainResource = z.infer<typeof domainResourceSchema>;
