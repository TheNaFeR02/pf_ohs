import { z } from "zod";
import { identifierSchema } from "./Identifier";
import { booleanSchema, stringSchema } from "./dataTypes";
import { codeableConceptSchema } from "./CodeableConcept";
import { contactPointSchema } from "./ContactPoint";
import { addressSchema } from "@/types/Address";
import { referenceSchema } from "./Reference";
import { humanNameSchema } from "./HumanName";
import { domainResourceSchema } from "./DomainResource";
import { resourceSchema } from "./Resource";

export const baseOrganizationSchema = z.object({
  resourceType: z.literal("Organization"),
  identifier: z.array(identifierSchema).optional(),
  active: booleanSchema.optional(),
  type: z.array(codeableConceptSchema).optional(),
  name: stringSchema.optional(),
  alias: z.array(stringSchema).optional(),
  telecom: z.array(contactPointSchema).optional(),
  address: z.array(addressSchema).optional(),
  partOf: referenceSchema.optional(), // Reference to another organization
  contact: z
    .array(
      z.object({
        purpose: codeableConceptSchema.optional(),
        name: humanNameSchema.optional(),
        telecom: z.array(contactPointSchema).optional(),
        address: addressSchema.optional(),
      })
    )
    .optional(),
  endpoint: z.array(referenceSchema).optional(), // Reference to endpoint
});

export const organizationSchema = resourceSchema
  .omit({ resourceType: true })
  .merge(domainResourceSchema.omit({ resourceType: true, resource: true }))
  .merge(baseOrganizationSchema);

export type Organization = z.infer<typeof organizationSchema>;
