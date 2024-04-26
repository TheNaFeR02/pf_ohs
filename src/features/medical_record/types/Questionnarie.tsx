import { z } from 'zod'

// Recursive Types: https://github.com/colinhacks/zod#recursive-types

const baseItem = z.object({
  linkId: z.string(),
  text: z.string(),
  type: z.string(),
})

type Item = z.infer<typeof baseItem> & {
  item?: Item[]
}

const itemSchema: z.ZodType<Item> = baseItem.extend({
  item: z.lazy(() => itemSchema.array()).optional()
}).strict()

export const questionnarieSchema = z.object({
  resourceType: z.string(),
  title: z.string(),
  url: z.string().url(),
  status: z.string(),
  subjectType: z.array(z.string()),
  date: z.string(),
  item: itemSchema.array(),
})

export type Questionnarie = z.infer<typeof questionnarieSchema>

