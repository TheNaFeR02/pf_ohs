import { z } from 'zod'

// Recursive Types: https://github.com/colinhacks/zod#recursive-types

const baseItem = z.object({
  linkId: z.string(),
  text: z.string(),
  type: z.string(),
  required: z.boolean().optional(),
})

export type Item = z.infer<typeof baseItem> & {
  item?: Item[]
}

export const itemSchema: z.ZodType<Item> = baseItem.extend({
  item: z.lazy(() => itemSchema.array()).optional()
}).strict()

export const questionnaireSchema = z.object({
  resourceType: z.string(),
  title: z.string(),
  url: z.string().url(),
  status: z.string(),
  subjectType: z.array(z.string()),
  date: z.date(),
  item: itemSchema.array(),
})

export type Questionnaire = z.infer<typeof questionnaireSchema>