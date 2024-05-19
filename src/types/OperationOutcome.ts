import { z } from "zod";
import { issueSeverityCode } from "@/constants/issueSeverityCodeDisplay";
import { issueTypeCode } from "@/constants/issueTypeCodeDisplay";
import { codeableConceptSchema } from "@/types/CodeableConcept";
import { stringSchema } from "@/types/dataTypes";
import { domainResourceSchema } from "@/types/DomainResource";
import { resourceSchema } from "@/types/Resource";

export const baseOperationOutcomeSchema = z.object({
  resourceType: z.literal("OperationOutcome"),
  issue: z.array(
    z.object({
      severity: z.enum(issueSeverityCode),
      code: z.enum(issueTypeCode),
      details: codeableConceptSchema.optional(),
      diagnostics: stringSchema.optional(),
      location: z.array(stringSchema).optional(),
      expression: z.array(stringSchema).optional(),
    })
  ),
});

export const operationOutcomeSchema = resourceSchema
  .omit({ resourceType: true })
  .merge(domainResourceSchema.omit({ resourceType: true, resource: true }))
  .merge(baseOperationOutcomeSchema);

export type OperationOutcome = z.infer<typeof operationOutcomeSchema>;
