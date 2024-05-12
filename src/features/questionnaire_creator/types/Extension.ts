import { z } from "zod";
import { urlSchema } from "./dataTypes";

export const extensionSchema = z.object({
  url: urlSchema,
  value: z.any(),
});

export type Extension = z.infer<typeof extensionSchema>;
