import { z } from "zod";
import { identifierSchema } from "@/types/Identifier";
import { codingSchema } from "@/types/Coding";
import { codeableConceptSchema } from "@/types/CodeableConcept";
import { referenceSchema } from "@/types/Reference";
import { periodSchema } from "@/types/Period";
import { quantitySchema } from "@/types/Quantity";
import { attachmentSchema } from "@/types/Attachment";
import { contactDetailSchema } from "@/types/ContactDetail";
import { usageContextSchema } from "@/types/UsageContext";
import {
  booleanSchema,
  integerSchema,
  stringSchema,
  decimalSchema,
  uriSchema,
  urlSchema,
  canonicalSchema,
  dateSchema,
  dateTimeSchema,
  timeSchema,
  markdownSchema,
} from "@/types/dataTypes";
import subjectTypesCodeDisplay from "@/constants/subjectTypesCodeDisplay";
import statusCodeDisplay from "@/constants/statusCodeDisplay";
import itemTypesCodeDisplay from "@/constants/itemTypesCodeDisplay";
import questionnaireEnableOperatorCodeDisplay from "@/constants/questionnaireEnableOperatorCodeDisplay";
import questionnaireEnableBehaviorCodeDisplay from "@/constants/questionnaireEnableBehaviorCodeDisplay";
import { resourceSchema } from "@/types/Resource";
import { domainResourceSchema } from "@/types/DomainResource";

const baseQuestionnaireItemSchema = z.object({
  linkId: stringSchema,
  definition: uriSchema.optional(),
  code: z.array(codingSchema).optional(),
  prefix: stringSchema.optional(),
  text: stringSchema.optional(),
  type: z.enum(
    JSON.parse(
      JSON.stringify(itemTypesCodeDisplay.map((itemType) => itemType.code))
    )
  ),
  enableWhen: z
    .array(
      z.object({
        question: stringSchema,
        operator: z.enum(
          JSON.parse(
            JSON.stringify(
              questionnaireEnableOperatorCodeDisplay.map(
                (operator) => operator.code
              )
            )
          )
        ),
        answerBoolean: booleanSchema.optional(),
        answerDecimal: decimalSchema.optional(),
        answerInteger: integerSchema.optional(),
        answerDate: dateSchema.optional(),
        answerDateTime: dateTimeSchema.optional(),
        answerTime: timeSchema.optional(),
        answerString: stringSchema.optional(),
        answerCoding: codingSchema.optional(),
        answerQuantity: quantitySchema.optional(),
        answerReference: referenceSchema.optional(),
      })
    )
    .optional(),
  enableBehavior: z
    .enum(
      JSON.parse(
        JSON.stringify(
          questionnaireEnableBehaviorCodeDisplay.map(
            (behavior) => behavior.code
          )
        )
      )
    )
    .optional(),
  required: booleanSchema.optional(),
  repeats: booleanSchema.optional(),
  readOnly: booleanSchema.optional(),
  maxLength: integerSchema.optional(),
  answerValueSet: canonicalSchema.optional(),
  answerOption: z
    .array(
      z.object({
        valueInteger: integerSchema.optional(),
        valueDate: dateSchema.optional(),
        valueTime: timeSchema.optional(),
        valueString: stringSchema.optional(),
        valueCoding: codingSchema.optional(),
        valueReference: referenceSchema.optional(),
        initialSelected: booleanSchema.optional(),
      })
    )
    .optional(),
  initial: z
    .array(
      z.object({
        valueBoolean: booleanSchema.optional(),
        valueDecimal: decimalSchema.optional(),
        valueInteger: integerSchema.optional(),
        valueDate: dateSchema.optional(),
        valueDateTime: dateTimeSchema.optional(),
        valueTime: timeSchema.optional(),
        valueString: stringSchema.optional(),
        valueUri: uriSchema.optional(),
        valueAttachment: attachmentSchema.optional(),
        valueCoding: codingSchema.optional(),
        valueQuantity: quantitySchema.optional(),
        valueReference: referenceSchema.optional(),
      })
    )
    .optional(),
});

export type QuestionnaireItem = z.infer<typeof baseQuestionnaireItemSchema> & {
  item?: QuestionnaireItem[];
};

export const questionnaireItemSchema: z.ZodType<QuestionnaireItem> =
  baseQuestionnaireItemSchema.extend({
    item: z.lazy(() => questionnaireItemSchema.array()).optional(),
  });

const baseQuestionnaireSchema = z.object({
  resourceType: z.literal("Questionnaire"),
  url: urlSchema.optional(),
  identifier: z.array(identifierSchema).optional(),
  version: stringSchema.optional(),
  name: stringSchema.optional(),
  title: stringSchema.optional(),
  derivedFrom: z.array(canonicalSchema).optional(),
  status: z.enum(
    JSON.parse(JSON.stringify(statusCodeDisplay.map((status) => status.code)))
  ),
  experimental: booleanSchema.optional(),
  subjectType: z
    .array(
      z.enum(
        JSON.parse(
          JSON.stringify(
            subjectTypesCodeDisplay.map((subjectType) => subjectType.code)
          )
        )
      )
    )
    .optional(),
  date: dateTimeSchema.optional(),
  publisher: stringSchema.optional(),
  contact: z.array(contactDetailSchema).optional(),
  description: markdownSchema.optional(),
  useContext: z.array(usageContextSchema).optional(),
  jurisdiction: z.array(codeableConceptSchema).optional(),
  purpose: markdownSchema.optional(),
  copyright: markdownSchema.optional(),
  approvalDate: dateSchema.optional(),
  lastReviewDate: dateSchema.optional(),
  effectivePeriod: periodSchema.optional(),
  code: z.array(codingSchema).optional(),
  item: z.array(questionnaireItemSchema).optional(),
});

export const questionnaireSchema = resourceSchema
  .omit({ resourceType: true })
  .merge(domainResourceSchema.omit({ resourceType: true, resource: true }))
  .merge(baseQuestionnaireSchema);

export type Questionnaire = z.infer<typeof questionnaireSchema>;
