import { z } from "zod";
import { identifierSchema } from "@/types/Identifier";
import { encounterStatusCode } from "@/constants/encounterStatusCodeDisplay";
import { periodSchema } from "@/types/Period";
import { codingSchema } from "@/types/Coding";
import { codeableConceptSchema } from "./CodeableConcept";
import { referenceSchema } from "@/types/Reference";
import { positiveIntSchema } from "@/types/dataTypes";
import { durationSchema } from "@/types/Duration";
import { encounterLocationStatusCode } from "@/constants/encounterLocationStatusCodeDisplay";
import { domainResourceSchema } from "@/types/DomainResource";
import { resourceSchema } from "@/types/Resource";

const baseEncounterSchema = z.object({
  resourceType: z.literal("Encounter"),
  identifier: z.array(identifierSchema).optional(),
  status: z.enum(encounterStatusCode), // R!
  statusHistory: z
    .array(
      z.object({
        status: z.enum(encounterStatusCode), // R!
        period: periodSchema, // R!
      })
    )
    .optional(),
  class: codingSchema, // R!
  classHistory: z
    .array(
      z.object({
        class: codingSchema, // R!
        period: periodSchema, // R!
      })
    )
    .optional(),
  type: z.array(codeableConceptSchema).optional(),
  serviceType: codeableConceptSchema.optional(),
  priority: codeableConceptSchema.optional(),
  subject: referenceSchema.optional(), // Reference to Patient or Group
  episodeOfCare: z.array(referenceSchema).optional(), // Reference to EpisodeOfCare
  basedOn: z.array(referenceSchema).optional(), // Reference to ServiceRequest
  participant: z
    .array(
      z.object({
        type: z.array(codeableConceptSchema).optional(),
        period: periodSchema.optional(),
        individual: referenceSchema, // Reference to Practitioner, PractitionerRole or RelatedPerson
      })
    )
    .optional(),
  appointment: z.array(referenceSchema).optional(), // Reference to Appointment
  period: periodSchema.optional(),
  length: durationSchema.optional(),
  reasonCode: z.array(codeableConceptSchema).optional(),
  reasonReference: z.array(referenceSchema).optional(), // Reference to Condition, Procedure, Observation or ImmunizationRecommendation
  diagnosis: z
    .array(
      z.object({
        condition: referenceSchema, // Reference to Condition
        use: codeableConceptSchema.optional(),
        rank: positiveIntSchema.optional(),
      })
    )
    .optional(),
  account: z.array(referenceSchema).optional(), // Reference to Account
  hospitalization: z
    .object({
      preAdmissionIdentifier: identifierSchema.optional(),
      origin: referenceSchema.optional(), // Reference to Location or Organization
      admitSource: codeableConceptSchema.optional(),
      reAdmission: codeableConceptSchema.optional(),
      dietPreference: z.array(codeableConceptSchema).optional(),
      specialCourtesy: z.array(codeableConceptSchema).optional(),
      specialArrangement: z.array(codeableConceptSchema).optional(),
      destination: referenceSchema.optional(), // Reference to Location or Organization
      dischargeDisposition: codeableConceptSchema.optional(),
    })
    .optional(),
  location: z
    .array(
      z.object({
        location: referenceSchema, // Reference to Location
        status: z.enum(encounterLocationStatusCode).optional(), // R!
        physicalType: codeableConceptSchema.optional(),
        period: periodSchema.optional(),
      })
    )
    .optional(),
  serviceProvider: referenceSchema.optional(), // Reference to Organization
  partOf: referenceSchema.optional(), // Reference to Encounter
});

export const encounterSchema = resourceSchema
  .omit({ resourceType: true })
  .merge(domainResourceSchema.omit({ resourceType: true, resource: true }))
  .merge(baseEncounterSchema);

export type Encounter = z.infer<typeof encounterSchema>;
