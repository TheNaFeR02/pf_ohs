import { z } from "zod";
import { codingSchema } from "./Coding";
import { referenceSchema } from "./Reference";
import {
  base64BinarySchema,
  codeSchema,
  instantSchema,
} from "./dataTypes";

export const signatureSchema = z.object({
  type: z.array(codingSchema),
  when: instantSchema, // When the signature was created
  who: referenceSchema, // { Reference(Practitioner|PractitionerRole|RelatedPerson|Patient|Device|Organization) }, Who signed
  onBehalfOf: referenceSchema.optional(),
  targetFormat: codeSchema,
  sigFormat: codeSchema.optional(), // The technical format of the signature
  data: base64BinarySchema,
});

export type Signature = z.infer<typeof signatureSchema>;
