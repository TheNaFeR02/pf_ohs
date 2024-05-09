import { z } from "zod";
import subjectTypes from "@/features/questionnaire_creator/data/subjectTypes.json";

// Recursive Types: https://github.com/colinhacks/zod#recursive-types
const baseItem = z.object({
  linkId: z.string(),
  text: z.string().optional(),
  type: z.enum(["group", "string", "choice", "integer", "boolean", "decimal", "text", // these are the supported types
  "date", "dateTime", "time", "url", "open-choice", "attachment", "reference", "quantity", "question"]), // these are the unsupported types yet!
   // attachment is pending to implement
  required: z.boolean().optional(),
  answerOption:
    z.array(
      z.object({
        valueCoding: z.object({
          code: z.string().optional(),
          display: z.string().optional(),
        }),
      }).optional()
    ).optional(),
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
  resourceType: z.string().optional(),
  title: z.string().optional(),
  url: z.string().url().optional(),
  status: z.enum(["draft", "active", "retired", "unknown"]).optional(),
  subjectType: subjectTypeFromJson(JSON.stringify(subjectTypes.concept.map((item) => item.code))).optional()
    .or(z.array(z.string())).optional(),
  // date: z.string().date().optional(),
  date: z.string().regex(
    /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?/
  ).optional(),
  item: itemSchema.array().optional(),
});

export type Questionnaire = z.infer<typeof questionnaireSchema>;