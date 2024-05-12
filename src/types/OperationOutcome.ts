import { z } from "zod";
import issueSeverityCodeDisplay from "@/features/questionnaire_creator/constants/issueSeverityCodeDisplay";
import issueTypeCodeDisplay from "@/features/questionnaire_creator/constants/issueTypeCodeDisplay";
import { codeableConceptSchema } from "@/features/questionnaire_creator/types/CodeableConcept";
import { stringSchema } from "@/features/questionnaire_creator/types/dataTypes";
import { domainResourceSchema } from "@/features/questionnaire_creator/types/DomainResource";
import { resourceSchema } from "@/features/questionnaire_creator/types/Resource";

export const baseOperationOutcomeSchema = z.object({
  resourceType: z.literal("OperationOutcome"),
  issue: z.array(
    z.object({
      severity: z.enum(
        JSON.parse(
          JSON.stringify(issueSeverityCodeDisplay.map((item) => item.code))
        )
      ),
      code: z.enum(
        JSON.parse(
          JSON.stringify(issueTypeCodeDisplay.map((item) => item.code))
        )
      ),
      details: codeableConceptSchema.optional(),
      diagnostics: stringSchema.optional(),
      location: z.array(stringSchema).optional(),
      expression: z.array(stringSchema).optional(),
    })
  ),
});

export const OperationOutcomeSchema = resourceSchema
  .omit({ resourceType: true })
  .merge(domainResourceSchema.omit({ resourceType: true, resource: true }))
  .merge(baseOperationOutcomeSchema);

export type OperationOutcome = z.infer<typeof OperationOutcomeSchema>;
