import { z } from "zod";
import { IdentifierSchema } from "@/features/questionnaire_creator/types/Identifier";
import { ResourceSchema } from "@/features/questionnaire_creator/types/Resource";
import { SignatureSchema } from "@/features/questionnaire_creator/types/Signature";

const BundleLinkSchema = z.object({
  relation: z.enum(["self", "alternate", "prev", "next"]),
  url: z.string().url(),
});

const BundleSearchSchema = z.object({
  mode: z.enum(["match", "include", "outcome"]),
  score: z.number().min(0).max(1),
});

const BundleRequestSchema = z.object({
  method: z.enum(["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH"]),
  url: z.string().url(),
  ifNoneMatch: z.string().optional(),
  ifModifiedSince: z
    .string()
    .regex(
      /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))/
    )
    .optional(),
  ifMatch: z.string().optional(),
  ifNoneExist: z.string().optional(),
});

const BundleResponseSchema = z.object({
  status: z.string(),
  location: z.string().url().optional(),
  etag: z.string().optional(),
  lastModified: z
    .string()
    .regex(
      /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))/
    )
    .optional(),
  outcome: ResourceSchema.optional(),
});

const BundleEntrySchema = z.object({
  link: z.array(BundleLinkSchema).optional(),
  fullUrl: z.string().url().optional(),
  resource: ResourceSchema.optional(),
  search: BundleSearchSchema.optional(),
  request: BundleRequestSchema.optional(),
  response: BundleResponseSchema.optional(),
});

export const BundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  identifier: z.array(IdentifierSchema).optional(),
  type: z.enum([
    "document",
    "message",
    "transaction",
    "transaction-response",
    "batch",
    "batch-response",
    "history",
    "searchset",
    "collection",
  ]),
  timestamp: z
    .string()
    .regex(
      /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))/
    )
    .optional(),
  total: z.number().int().positive().optional(), // Total number of entries in the bundle form 0 to infinity
  link: z.array(BundleLinkSchema),
  entry: z.array(BundleEntrySchema),
  signature: SignatureSchema.optional(),
});

export type Bundle = z.infer<typeof BundleSchema>;
