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

export const Appointment = z.object({
  resourceType: z.literal("Appointment"),
  identifier: z.array(identifierSchema).optional(),
  status: z
    .enum([
      "proposed",
      "pending",
      "booked",
      "arrived",
      "fulfilled",
      "cancelled",
      "noshow",
      "entered-in-error",
      "checked-in",
      "waitlist",
    ])
    .optional(),
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
      required: z.enum(["required", "optional", "information-only"]).optional(),
      status: z.enum(["accepted", "declined", "tentative", "needs-action"]),
      period: z.object({
        start: instantSchema.optional(),
        end: instantSchema.optional(),
      }),
    })
  ),
  requestedPeriod: periodSchema.optional(),
});
