import { z } from "zod";

// Custom regex patterns for specific data types
const instantRegex =
  /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))$/;
const dateRegex =
  /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?$/;
const dateTimeRegex =
  /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?$/;
const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?$/;

// Zod schemas for each data type
const booleanSchema = z.boolean();
const integerSchema = z.number().int();
const stringSchema = z.string().max(1024 * 1024); // Maximum size of 1MB
const decimalSchema = z.number();
const uriSchema = z.string().url();
const urlSchema = z
  .string()
  .regex(/^(http|https):\/\/[^\s|]+\|?[^\s#|]*([#][^\s]*)?$/); // URL with optional fragment | NEED TO BE CHECKED
  // const urlSchema = z.string().url() || z.string().regex(/#\w+/);
const canonicalSchema = z.string();
const base64BinarySchema = z.string().regex(/(\s*([0-9a-zA-Z\+\=]){4}\s*)+/);
const instantSchema = z.string().regex(instantRegex);
const dateSchema = z.string().regex(dateRegex);
const dateTimeSchema = z.string().regex(dateTimeRegex);
const timeSchema = z.string().regex(timeRegex);
const codeSchema = z.string().regex(/[^\s]+(\s[^\s]+)*/);
const oidSchema = z.string().regex(/^urn:oid:[0-2](\.(0|[1-9][0-9]*))+$/);
const idSchema = z.string().regex(/[A-Za-z0-9\-\.]{1,64}/);
const markdownSchema = z.string();
const unsignedIntSchema = z.number().int().min(0);
const positiveIntSchema = z.number().int().min(1);

export {
  booleanSchema,
  integerSchema,
  stringSchema,
  decimalSchema,
  uriSchema,
  urlSchema,
  canonicalSchema,
  base64BinarySchema,
  instantSchema,
  dateSchema,
  dateTimeSchema,
  timeSchema,
  codeSchema,
  oidSchema,
  idSchema,
  markdownSchema,
  unsignedIntSchema,
  positiveIntSchema,
};
