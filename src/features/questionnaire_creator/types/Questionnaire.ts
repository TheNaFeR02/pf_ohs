import { z } from "zod";
import { IdentifierSchema } from "@/features/questionnaire_creator/types/Identifier";
import { CodingSchema } from "@/features/questionnaire_creator/types/Coding";
import { CodeableConceptSchema } from "@/features/questionnaire_creator/types/CodeableConcept";
import { ReferenceSchema } from "@/features/questionnaire_creator/types/Reference";
import { PeriodSchema } from "@/features/questionnaire_creator/types/Period";
import { QuantitySchema } from "@/features/questionnaire_creator/types/Quantity";
import { attachmentSchema } from "@/features/questionnaire_creator/types/Attachment";
import { ContactDetailSchema } from "@/features/questionnaire_creator/types/ContactDetail";
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
} from "@/features/questionnaire_creator/types/dataTypes";
import subjectTypesCodeDisplay from "@/features/questionnaire_creator/constants/subjectTypesCodeDisplay";
import statusCodeDisplay from "@/features/questionnaire_creator/constants/statusCodeDisplay";
import itemTypesCodeDisplay from "@/features/questionnaire_creator/constants/itemTypesCodeDisplay";
import questionnaireEnableOperatorCodeDisplay from "@/features/questionnaire_creator/constants/questionnaireEnableOperatorCodeDisplay";
import questionnaireEnableBehaviorCodeDisplay from "../constants/questionnaireEnableOperatorCoodeDisplay";
import UsageContextSchema from "@/features/questionnaire_creator/types/UsageContext";

const BaseQuestionnaireItemSchema = z.object({
  linkId: stringSchema.optional(),
  definition: uriSchema.optional(),
  code: z.array(CodingSchema).optional(),
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
        question: stringSchema.optional(),
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
        answerCoding: CodingSchema.optional(),
        answerQuantity: QuantitySchema.optional(),
        answerReference: ReferenceSchema.optional(),
      })
    )
    .optional(),
  enableBehavior: z.enum(
    JSON.parse(
      JSON.stringify(
        questionnaireEnableBehaviorCodeDisplay.map((behavior) => behavior.code)
      )
    )
  ),
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
        valueCoding: CodingSchema.optional(),
        valueReference: ReferenceSchema.optional(),
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
        valueCoding: CodingSchema.optional(),
        valueQuantity: QuantitySchema.optional(),
        valueReference: ReferenceSchema.optional(),
      })
    )
    .optional(),
});

export type QuestionnaireItem = z.infer<typeof BaseQuestionnaireItemSchema> & {
  item?: QuestionnaireItem[];
};

const QuestionnaireItemSchema: z.ZodType<QuestionnaireItem> =
  BaseQuestionnaireItemSchema.extend({
    item: z.lazy(() => QuestionnaireItemSchema.array()).optional(),
  });

const QuestionnaireSchema = z.object({
  resourceType: z.literal("Questionnaire"),
  url: urlSchema.optional(),
  identifier: z.array(IdentifierSchema).optional(),
  version: stringSchema.optional(),
  name: stringSchema.optional(),
  title: stringSchema.optional(),
  derivedFrom: z.array(canonicalSchema).optional(),
  status: z.enum(
    JSON.parse(JSON.stringify(statusCodeDisplay.map((status) => status.code)))
  ),
  experimental: booleanSchema.optional(),
  subjectType: z.enum(
    JSON.parse(
      JSON.stringify(
        subjectTypesCodeDisplay.map((subjectType) => subjectType.code)
      )
    )
  ),
  date: dateSchema.optional(),
  publisher: stringSchema.optional(),
  contact: z.array(ContactDetailSchema).optional(),
  description: markdownSchema.optional(),
  useContext: z.array(UsageContextSchema).optional(),
  jurisdiction: z.array(CodeableConceptSchema).optional(),
  purpose: markdownSchema.optional(),
  copyright: markdownSchema.optional(),
  approvalDate: dateSchema.optional(),
  lastReviewDate: dateSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  code: z.array(CodingSchema).optional(),
  item: z.array(QuestionnaireItemSchema),
});

export { QuestionnaireSchema };
