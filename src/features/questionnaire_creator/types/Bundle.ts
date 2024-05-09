import { z } from "zod";
import { identifierSchema } from "@/features/questionnaire_creator/types/Identifier";
import { resourceSchema } from "@/features/questionnaire_creator/types/Resource";
import { signatureSchema } from "@/features/questionnaire_creator/types/Signature";
import {
  decimalSchema,
  instantSchema,
  stringSchema,
  unsignedIntSchema,
  uriSchema,
} from "@/features/questionnaire_creator/types/dataTypes";
import searchEntryModeCodeDisplay from "@/features/questionnaire_creator/constants/searchEntryModeCodeDisplay";
import httpVerbCodeDisplay from "@/features/questionnaire_creator/constants/httpVerbCodeDisplay";
import bundleTypeCodeDisplay from "@/features/questionnaire_creator/constants/bundleTypeCodeDisplay";

const bundleLinkSchema = z.object({
  relation: stringSchema, // R!
  url: uriSchema, // R! The reference details for the link
});

const bundleSearchSchema = z.object({
  mode: z
    .enum(
      JSON.parse(
        JSON.stringify(
          searchEntryModeCodeDisplay.map(
            (searchEntryMode) => searchEntryMode.code
          )
        )
      )
    )
    .optional(),
  score: decimalSchema.min(0).max(1).optional(),
});

const bundleRequestSchema = z.object({
  method: z.enum(
    JSON.parse(
      JSON.stringify(httpVerbCodeDisplay.map((httpVerb) => httpVerb.code))
    )
  ), // R!  GET | HEAD | POST | PUT | DELETE | PATCH
  url: uriSchema, // R!  URL for the resource
  ifNoneMatch: stringSchema.optional(),
  ifModifiedSince: instantSchema.optional(),
  ifMatch: stringSchema.optional(),
  ifNoneExist: stringSchema.optional(),
});

const bundleResponseSchema = z.object({
  status: stringSchema, // R!  Status response code (text optional)
  location: uriSchema.optional(),
  etag: z.string().optional(),
  lastModified: instantSchema.optional(),
  outcome: resourceSchema.optional(),
});

const bundleEntrySchema = z.object({
  link: z.array(bundleLinkSchema).optional(),
  fullUrl: uriSchema.optional(),
  resource: resourceSchema.optional(),
  search: bundleSearchSchema.optional(),
  request: bundleRequestSchema.optional(),
  response: bundleResponseSchema.optional(),
});

export const bundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  identifier: z.array(identifierSchema).optional(),
  type: z.enum(
    JSON.parse(
      JSON.stringify(bundleTypeCodeDisplay.map((bundleType) => bundleType.code))
    )
  ), // R!  document | message | transaction ...
  timestamp: instantSchema.optional(),
  total: unsignedIntSchema.optional(),
  link: z.array(bundleLinkSchema).optional(),
  entry: z.array(bundleEntrySchema).optional(),
  signature: signatureSchema.optional(),
});

export type Bundle = z.infer<typeof bundleSchema>;
export type BundleEntry = z.infer<typeof bundleEntrySchema>;
