import { z } from "zod";
import subjectTypes from "@/features/questionnaire_creator/data/subjectTypes.json";

// Recursive Types: https://github.com/colinhacks/zod#recursive-types


const baseItem = z.object({
  linkId: z.string(),
  text: z.string(),
  type: z.enum(["group", "string", "choice", "integer"]), // attachment, boolean, decimal, text,
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

const subjectTypeFromJson = (content: string) => {
  return z.enum(JSON.parse(content));
}

export const questionnaireSchema = z.object({
  resourceType: z.string(),
  title: z.string(),
  url: z.string().url(),
  status: z.enum(["draft", "active", "retired", "unknown"]),
  subjectType: subjectTypeFromJson(JSON.stringify(subjectTypes.concept.map((item) => item.code))),
  date: z.date(),
  item: itemSchema.array(),
});

export type Questionnaire = z.infer<typeof questionnaireSchema>;
