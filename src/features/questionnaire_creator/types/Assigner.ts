import { z } from "zod";


export const AssignerSchema = z.object({
  reference: z.string().optional(),
  type: z.string().url(),
  //   identifier: IdentifierSchema.optional(),
  display: z.string().optional(),
});

export type Assigner = z.infer<typeof AssignerSchema>;
