import { z } from "zod";
import narrativeStatusCodeDisplay from "@/features/questionnaire_creator/constants/narrativeStatusCodeDisplay";

export const narrativeSchema = z.object({
  status: z.enum(
    JSON.parse(
      JSON.stringify(narrativeStatusCodeDisplay.map((status) => status.code))
    )
  ),
  div: z.string(), // HTML content
});

export type Narrative = z.infer<typeof narrativeSchema>;
