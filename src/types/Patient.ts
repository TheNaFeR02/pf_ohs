import { addressTypeCode } from "@/constants/addressTypeCodeDisplay";
import { addressUseCode } from "@/constants/addressUseCodeDisplay";
import { administrativeGenderCode } from "@/constants/administrativeGenderCodeDisplay";
import { linkTypeCode } from "@/constants/linkTypeCodeDisplay";
import { nameUseCode } from "@/constants/nameUseCodeDisplay";
import { attachmentSchema } from "./Attachment";
import { codeableConceptSchema } from "./CodeableConcept";
import { contactPointSchema } from "./ContactPoint";
import { domainResourceSchema } from "./DomainResource";
import { identifierSchema } from "./Identifier";
import { periodSchema } from "./Period";
import { referenceSchema } from "./Reference";
import { resourceSchema } from "./Resource";
import {
  booleanSchema,
  dateSchema,
  dateTimeSchema,
  integerSchema,
  stringSchema,
} from "./dataTypes";
import { z } from "zod";
import { humanNameSchema } from "@/types/HumanName";
import { addressSchema } from "@/types/Address";

const basePatientSchema = z.object({
  resourceType: z.literal("Patient").optional(),
  identifier: z.array(identifierSchema).optional(),
  active: booleanSchema.optional(),
  name: z.array(humanNameSchema).optional(),
  telecom: z.array(contactPointSchema).optional(),
  gender: z.enum(administrativeGenderCode).optional(),
  birthDate: dateSchema
    .optional()
    .or(z.date({ required_error: "A date of birth is required." }).optional())
    .optional(), //<date>
  deceasedBoolean: booleanSchema.optional(),
  deceasedDateTime: dateTimeSchema.optional(), // <dateTime>
  address: z.array(addressSchema).optional(),
  maritalStatus: codeableConceptSchema.optional(),
  multipleBirthBoolean: booleanSchema.optional(),
  multipleBirthInteger: integerSchema.optional(),
  photo: z.array(attachmentSchema).optional(),
  contact: z
    .array(
      z.object({
        relationship: z.array(codeableConceptSchema).optional(),
        name: humanNameSchema.optional(),
        telecom: z.array(contactPointSchema).optional(),
        address: addressSchema.optional(),
        gender: z.enum(administrativeGenderCode).optional(),
        reference: referenceSchema.optional(),
        period: periodSchema.optional(),
      })
    )
    .optional(), // This is simulating {HumanName} to pass all the Tests. Eventually change to the actual HumanChange schema.
  communication: z
    .array(
      z.object({
        language: codeableConceptSchema,
        preferred: booleanSchema.optional(),
      })
    )
    .optional(),
  generalPractitioner: z.array(referenceSchema).optional(),
  managingOrganization: referenceSchema.optional(),
  link: z
    .array(
      z.object({
        other: referenceSchema,
        type: z.enum(linkTypeCode).optional(),
      })
    )
    .optional(),
});

export const patientSchema = resourceSchema
  .omit({ resourceType: true })
  .merge(domainResourceSchema.omit({ resourceType: true, resource: true }))
  .merge(basePatientSchema);

export type Patient = z.infer<typeof patientSchema>;
