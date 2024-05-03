import { z } from "zod";
import itemTypesCodeDisplay from "@/features/questionnaire_creator/utils/itemTypesCodeDisplay";
import statusCodeDisplay from "@/features/questionnaire_creator/utils/statusCodeDisplay";
import subjectTypesCodeDisplay from "@/features/questionnaire_creator/utils/subjectTypesCodeDisplay";

// Recursive Types: https://github.com/colinhacks/zod#recursive-types

const baseItem = z.object({
  linkId: z.string(),
  text: z.string(),
  type: z.enum(JSON.parse(JSON.stringify(itemTypesCodeDisplay))),
  required: z.boolean().optional(),
  answerOption: z
    .array(
      z.object({
        valueCoding: z.object({
          code: z.string(),
          display: z.string(),
        }),
      })
    )
    .optional(),
});

export type Item = z.infer<typeof baseItem> & {
  item?: Item[];
};

const itemSchema: z.ZodType<Item> = baseItem.extend({
  item: z.lazy(() => itemSchema.array()).optional(),
});

export const questionnaireSchema = z.object({
  resourceType: z.string(),
  title: z.string(),
  url: z.string().url(),
  status: z.enum(
    JSON.parse(JSON.stringify(statusCodeDisplay.map((item) => item.code)))
  ),
  subjectType: z.enum(
    JSON.parse(JSON.stringify(subjectTypesCodeDisplay.map((item) => item.code)))
  ),
  date: z.date(),
  item: itemSchema.array(),
});

export type Questionnaire = z.infer<typeof questionnaireSchema>;
