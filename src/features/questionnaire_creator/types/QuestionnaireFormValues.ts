import { z } from "zod";

// Recursive Types: https://github.com/colinhacks/zod#recursive-types

const baseItem = z.object({
  linkId: z.string(),
  text: z.string(),
  type: z.string(),
  required: z.boolean().optional(),
  answerOption: z.array(
    z.object({
      valueCoding: z.object({
        code: z.string(),
        display: z.string(),
      }),
    })
  ),
});

export type Item = z.infer<typeof baseItem> & {
  item?: Item[];
};

export const itemSchema: z.ZodType<Item> = baseItem
  .extend({
    item: z.lazy(() => itemSchema.array()).optional(),
  })
  .strict();

export const QuestionnaireFormValuesSchema = z.object({
  resourceType: z.string(),
  title: z.string(),
  url: z.string().url(),
  status: z.string(),
  subjectType: z.string(),
  date: z.date(),
  item: itemSchema.array(),
});

export type QuestionnaireFormValues = z.infer<
  typeof QuestionnaireFormValuesSchema
>;
