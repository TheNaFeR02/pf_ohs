import { z } from "zod";

// This is the anatomy of the errors that are returned by the server
export const OperationOutcomeSchema = z.object({
    resourceType: z.literal("OperationOutcome"),
    text: z.object({
        status: z.literal("generated"),
        div: z.string(),
    }),
    issue: z.array(
        z.object({
            severity: z.literal("error"),
            code: z.literal("processing"),
            diagnostics: z.string().optional(),
        })
    ),
});

export type OperationOutcome = z.infer<typeof OperationOutcomeSchema>;
