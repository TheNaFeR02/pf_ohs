import { z } from "zod";

const baseItem = z.object({
  linkId: z.string(),
  text: z.string().optional(),
});

export type Item = z.infer<typeof baseItem> & {
  item?: Item[];
  answer?: z.infer<typeof answerSchema>[];
};

const itemSchema: z.ZodType<Item> = baseItem.extend({
  item: z.lazy(() => itemSchema.array()).optional(),
  answer: z.lazy(() => answerSchema.array()).optional(),
});

const answerSchema = z.object({
  valueBoolean: z.boolean().optional(),
  valueDecimal: z.number().optional(),
  valueInteger: z.number().int().optional(),
  // valueDate: z.string().date().optional(),
  // valueDateTime: z.string().dateTime().optional(),
  // valueTime: z.string().optional(),
  valueString: z.string().optional(),
  // valueUri: z.string().url().optional(),
  // valueAttachment: z.object({
  // Define the schema for Attachment if needed
  // }).optional(),
  valueCoding: z
    .object({
      code: z.string().optional(),
      display: z.string().optional(),
    })
    .optional(),
  // valueQuantity: z.object({
  //   // Define the schema for Quantity if needed
  // }).optional(),
  // valueReference: z.object({
  //   // Define the schema for Reference if needed
  // }).optional(),
  item: itemSchema.array().optional(),
});

export const questionnaireResponseSchema = z.object({
  resourceType: z.string().optional(),
  questionnaire: z.string().optional(),
  authored: z.string().optional(),
  author: z.object({
    reference: z.string().optional(),
    type: z.string().optional(),
  }).optional(),
  status: z
    .string()
    .refine((status) =>
      [
        "in-progress",
        "completed",
        "amended",
        "entered-in-error",
        "stopped",
      ].includes(status)
    ).optional(),
  item: itemSchema.array().optional(),
});

export type QuestionnaireResponse = z.infer<typeof questionnaireResponseSchema>;
