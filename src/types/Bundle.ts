import { z } from "zod";
import { identifierSchema } from "@/types/Identifier";
import { resourceSchema } from "@/types/Resource";
import { signatureSchema } from "@/types/Signature";
import {
  decimalSchema,
  instantSchema,
  stringSchema,
  unsignedIntSchema,
  uriSchema,
} from "@/types/dataTypes";
import { searchEntryModeCode } from "@/constants/searchEntryModeCodeDisplay";
import { httpVerbCode } from "@/constants/httpVerbCodeDisplay";
import { bundleTypeCode } from "@/constants/bundleTypeCodeDisplay";

const bundleLinkSchema = z.object({
  relation: stringSchema, // R!
  url: uriSchema, // R! The reference details for the link
});
type BundleLink = z.infer<typeof bundleLinkSchema>;

const bundleSearchSchema = z.object({
  mode: z.enum(searchEntryModeCode).optional(),
  score: decimalSchema.min(0).max(1).optional(),
});
type BundleSearch = z.infer<typeof bundleSearchSchema>;

const bundleRequestSchema = z.object({
  method: z.enum(httpVerbCode), // R!  GET | POST | PUT | DELETE
  url: uriSchema, // R!  URL for the resource
  ifNoneMatch: stringSchema.optional(),
  ifModifiedSince: instantSchema.optional(),
  ifMatch: stringSchema.optional(),
  ifNoneExist: stringSchema.optional(),
});

type BundleRequest = z.infer<typeof bundleRequestSchema>;

const bundleResponseSchema = z.object({
  status: stringSchema, // R!  Status response code (text optional)
  location: uriSchema.optional(),
  etag: z.string().optional(),
  lastModified: instantSchema.optional(),
  outcome: resourceSchema.optional(),
});

type BundleResponse = z.infer<typeof bundleResponseSchema>;

export type BundleEntry<T> = {
  link?: BundleLink[];
  fullUrl?: string;
  resource?: T;
  search?: BundleSearch;
  request?: BundleRequest;
  response?: BundleResponse;
};

// Crear un esquema Zod basado en el tipo BundleEntry
export const bundleEntrySchema = <T>(resourceSchema: z.ZodType<T>) =>
  z.object({
    link: z.array(bundleLinkSchema).optional(),
    fullUrl: stringSchema.optional(),
    resource: resourceSchema.optional(),
    search: bundleSearchSchema.optional(),
    request: bundleRequestSchema.optional(),
    response: bundleResponseSchema.optional(),
  });

const baseBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  identifier: z.array(identifierSchema).optional(),
  type: z.enum(bundleTypeCode), // R!  document | message | transaction | transaction-response | batch | batch-response | history | searchset | collection
  timestamp: instantSchema.optional(),
  total: unsignedIntSchema.optional(),
  link: z.array(bundleLinkSchema).optional(),
  entry: z.array(bundleEntrySchema(z.any())).optional(),
  signature: signatureSchema.optional(),
});

export const bundleSchema = resourceSchema
  .omit({ resourceType: true })
  .merge(baseBundleSchema);

export type Bundle = z.infer<typeof bundleSchema>;
