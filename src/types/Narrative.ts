import { z } from "zod";
import { narrativeStatusCode } from "@/constants/narrativeStatusCodeDisplay";

export const narrativeSchema = z.object({
  status: z.enum(narrativeStatusCode), // generated | extensions | additional | empty
  div: z.string(), // HTML content
});

export type Narrative = z.infer<typeof narrativeSchema>;
