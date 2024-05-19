import { z } from "zod";
import { identifierSchema } from "@/types/Identifier";
import { codeableConceptSchema } from "@/types/CodeableConcept";
import { referenceSchema } from "@/types/Reference";
import {
  dateTimeSchema,
  instantSchema,
  positiveIntSchema,
  stringSchema,
  unsignedIntSchema,
} from "@/types/dataTypes";
import { periodSchema } from "@/types/Period";
import { appointmentStatusCode } from "@/constants/appointmentStatusCodeDisplay";
import { participantRequiredCode } from "@/constants/participantRequiredCodeDislay";
import { participantStatusCode } from "@/constants/participantStatusCodeDisplay";
import { domainResourceSchema } from "./DomainResource";
import { resourceSchema } from "./Resource";

export const baseAppointmentSchema = z.object({
  resourceType: z.literal("Appointment"),
  identifier: z.array(identifierSchema).optional(),
  status: z.enum(appointmentStatusCode),
  cancelationReason: codeableConceptSchema.optional(),
  serviceCategory: z.array(codeableConceptSchema).optional(),
  serviceType: z.array(codeableConceptSchema).optional(),
  specialty: z.array(codeableConceptSchema).optional(),
  appointmentType: codeableConceptSchema.optional(),
  reasonCode: z.array(codeableConceptSchema).optional(),
  reasonReference: z.array(referenceSchema).optional(),
  priority: unsignedIntSchema.optional(),
  description: stringSchema.optional(),
  supportingInformation: z.array(referenceSchema).optional(),
  start: instantSchema.optional(),
  end: instantSchema.optional(),
  minutesDuration: positiveIntSchema.optional(),
  slot: z.array(referenceSchema).optional(),
  created: dateTimeSchema.optional(),
  comment: stringSchema.optional(),
  patientInstruction: stringSchema.optional(),
  basedOn: z.array(referenceSchema).optional(),
  participant: z.array(
    z.object({
      type: z.array(codeableConceptSchema),
      actor: referenceSchema.optional(),
      required: z.enum(participantRequiredCode).optional(),
      status: z.enum(participantStatusCode),
      period: periodSchema.optional(),
    })
  ).min(1),
  requestedPeriod: z.array(periodSchema).optional(),
});

export const appointmentSchema = resourceSchema
  .omit({ resourceType: true })
  .merge(domainResourceSchema.omit({ resourceType: true, resource: true }))
  .merge(baseAppointmentSchema);

export type Appointment = z.infer<typeof appointmentSchema>;
