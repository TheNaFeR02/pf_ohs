import addressTypeCodeDisplay from '@/features/questionnaire_creator/constants/addressTypeCodeDisplay';
import addressUseCodeDisplay from '@/features/questionnaire_creator/constants/addressUseCodeDisplay';
import administrativeGenderCodeDisplay from '@/features/questionnaire_creator/constants/administrativeGenderCodeDisplay';
import linkTypeCodeDisplay from '@/features/questionnaire_creator/constants/linkTypeCodeDisplay';
import nameUseCodeDisplay from '@/features/questionnaire_creator/constants/nameUseCodeDisplay';
import { attachmentSchema } from '@/features/questionnaire_creator/types/Attachment';
import { codeableConceptSchema } from '@/features/questionnaire_creator/types/CodeableConcept';
import { contactPointSchema } from '@/features/questionnaire_creator/types/ContactPoint';
import { domainResourceSchema } from '@/features/questionnaire_creator/types/DomainResource';
import { identifierSchema } from '@/features/questionnaire_creator/types/Identifier';
import { periodSchema } from '@/features/questionnaire_creator/types/Period';
import { referenceSchema } from '@/features/questionnaire_creator/types/Reference';
import { resourceSchema } from '@/features/questionnaire_creator/types/Resource';
import { booleanSchema, dateSchema, dateTimeSchema, integerSchema, stringSchema } from '@/features/questionnaire_creator/types/dataTypes';
import { z } from 'zod';


const humanNameSchema = z.object({
  use: z.enum(JSON.parse(JSON.stringify(nameUseCodeDisplay.map((nameUse) => nameUse.code)))).optional(),
  text: stringSchema.optional(),
  family: stringSchema.optional(),
  given: z.array(stringSchema).optional(),
  prefix: z.array(stringSchema).optional(),
  suffix: z.array(stringSchema).optional(),
  period: periodSchema.optional(),
});

const addressSchema = z.object({
  use: z.enum(JSON.parse(JSON.stringify(addressUseCodeDisplay.map((addressUse) => addressUse.code)))).optional(),
  type: z.enum(JSON.parse(JSON.stringify(addressTypeCodeDisplay.map((addressType) => addressType.code)))).optional(),
  text: stringSchema.optional(),
  line: z.array(stringSchema).optional(),
  city: stringSchema.optional(),
  district: stringSchema.optional(),
  state: stringSchema.optional(),
  postalCode: stringSchema.optional(),
  country: stringSchema.optional(),
  period: periodSchema.optional(),
});


const basePatientSchema = z.object({
  resourceType: z.literal("Patient").optional(),
  identifier: z.array(identifierSchema).optional(),
  active: booleanSchema.optional(),
  name: z.array(humanNameSchema).optional(),
  telecom: z.array(contactPointSchema).optional(),
  gender: z.enum(JSON.parse(JSON.stringify(administrativeGenderCodeDisplay.map((administrativeGender) => administrativeGender.code)))).optional(),
  birthDate: dateSchema.optional().or(z.date({ required_error: "A date of birth is required." }).optional()).optional(), //<date>
  deceasedBoolean: booleanSchema.optional(),
  deceasedDateTime: dateTimeSchema.optional(),// <dateTime>
  address: z.array(addressSchema).optional(),
  maritalStatus: z.object({
    text: z.string().optional(),
  }).optional(),
  multipleBirthBoolean: booleanSchema.optional(),
  multipleBirthInteger: integerSchema.optional(),
  photo: z.array(attachmentSchema).optional(),
  contact: z.array(z.object({
    relationship: z.array(codeableConceptSchema).optional(),
    name: humanNameSchema.optional(),
    telecom: z.array(contactPointSchema).optional(),
    address: addressSchema.optional(),
    gender: z.enum(JSON.parse(JSON.stringify(administrativeGenderCodeDisplay.map((administrativeGender) => administrativeGender.code)))).optional(),
    reference: referenceSchema.optional(),
    period: periodSchema.optional(),
  })).optional(), // This is simulating {HumanName} to pass all the Tests. Eventually change to the actual HumanChange schema.
  communication: z.array(z.object({
    language: codeableConceptSchema,
    preferred: booleanSchema.optional(),
  })).optional(),
  generalPractitioner: z.array(referenceSchema).optional(),
  managingOrganization: referenceSchema.optional(),
  link: z.array(z.object({
    other: referenceSchema,
    type: z.enum(JSON.parse(JSON.stringify(linkTypeCodeDisplay.map((linkType) => linkType.code)))).optional(),
  })).optional(),
});

export const patientSchema = resourceSchema
  .omit({ resourceType: true })
  .merge(domainResourceSchema.omit({ resourceType: true, resource: true }))
  .merge(basePatientSchema);

export type Patient = z.infer<typeof patientSchema>