import { z } from "zod";
import itemTypesCodeDisplay from "@/features/questionnaire_creator/constants/itemTypesCodeDisplay";
import statusCodeDisplay from "@/features/questionnaire_creator/constants/statusCodeDisplay";
import subjectTypesCodeDisplay from "@/features/questionnaire_creator/constants/subjectTypesCodeDisplay";

// Recursive Types: https://github.com/colinhacks/zod#recursive-types

const baseItem = z.object({
  linkId: z.string(),
  text: z.string(),
  type: z.enum(
    JSON.parse(JSON.stringify(itemTypesCodeDisplay.map((item) => item.code)))
  ),
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
  resourceType: z.literal("Questionnaire"),
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .regex(/^[\p{L}\p{N} ]+$/u, {
      message: "Title must be alphanumeric",
    }),

  url: z.string().url(),
  status: z.enum(
    JSON.parse(JSON.stringify(statusCodeDisplay.map((item) => item.code))),
    { message: "Status is required" }
  ),
  subjectType: z.enum(
    JSON.parse(
      JSON.stringify(subjectTypesCodeDisplay.map((item) => item.code))
    ),
    { message: "Subject Type is required" }
  ),
  date: z.date(),
  item: itemSchema.array(),
});

export type Questionnaire = z.infer<typeof questionnaireSchema>;
