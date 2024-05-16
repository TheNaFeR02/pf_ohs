import { z } from "zod";
import {
  codeSchema,
  base64BinarySchema,
  urlSchema,
  unsignedIntSchema,
  stringSchema,
  dateTimeSchema,
} from "@/types/dataTypes";
import { languagesCode } from "@/constants/languagesCodeDisplay";


export const attachmentSchema = z.object({
  contentType: codeSchema.optional(),
  language: z.enum(languagesCode).optional(),
  data: base64BinarySchema.optional(),
  url: urlSchema.optional(),
  size: unsignedIntSchema.optional(),
  hash: base64BinarySchema.optional(),
  title: stringSchema.optional(),
  creation: dateTimeSchema.optional(),
});

export type Attachment = z.infer<typeof attachmentSchema>;
