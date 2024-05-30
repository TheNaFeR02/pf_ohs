import { z } from "zod";
import { identifierSchema } from "@/types/Identifier";
import { booleanSchema, dateSchema } from "@/types/dataTypes";
import { humanNameSchema } from "@/types/HumanName";
import { contactPointSchema } from "@/types/ContactPoint";
import { addressSchema } from "@/types/Address";
import { administrativeGenderCode } from "@/constants/administrativeGenderCodeDisplay";
import { attachmentSchema } from "@/types/Attachment";
import { codeableConceptSchema } from "@/types/CodeableConcept";
import { periodSchema } from "@/types/Period";
import { referenceSchema } from "@/types/Reference";
import { domainResourceSchema } from "@/types/DomainResource";
import { resourceSchema } from "@/types/Resource";

export const basePractitionerSchema = z.object({
  resourceType: z.literal("Practitioner"),
  identifier: z.array(identifierSchema).optional(),
  active: booleanSchema.optional(),
  name: z.array(humanNameSchema).optional(),
  telecom: z.array(contactPointSchema).optional(),
  address: z.array(addressSchema).optional(),
  gender: z.enum(administrativeGenderCode).optional(),
  birthDate: dateSchema.optional(),
  photo: z.array(attachmentSchema).optional(),
  qualification: z
    .array(
      z.object({
        identifier: identifierSchema.optional(),
        code: z.array(codeableConceptSchema), // R!
        period: periodSchema.optional(),
        issuer: referenceSchema.optional(), // Reference(Organization)
      })
    )
    .optional(),
  communication: z.array(codeableConceptSchema).optional(),
});

export const practitionerSchema = resourceSchema
  .omit({ resourceType: true })
  .merge(domainResourceSchema.omit({ resourceType: true, resource: true }))
  .merge(basePractitionerSchema);

export type Practitioner = z.infer<typeof practitionerSchema>;
