import { z } from 'zod'

export const fakePatient = z.object({
  resourceType: z.literal('Patient'),
  active: z.boolean(),
  name: z.object({
    family: z.string(),
    given: z.string()
  })
})

export type FakePatient = z.infer<typeof fakePatient>
