import { z } from "zod";
import { attachmentSchema } from "@/features/questionnaire_creator/types/Attachment";
import { codingSchema } from "@/features/questionnaire_creator/types/Coding";
import { identifierSchema } from "@/features/questionnaire_creator/types/Identifier";
import { quantitySchema } from "@/features/questionnaire_creator/types/Quantity";
import { referenceSchema } from "@/features/questionnaire_creator/types/Reference";
import {
  booleanSchema,
  decimalSchema,
  integerSchema,
  stringSchema,
  uriSchema,
  dateSchema,
  dateTimeSchema,
  timeSchema,
  canonicalSchema,
} from "@/features/questionnaire_creator/types/dataTypes";
import questionnaireAnswersStatusCodeDisplay from "@/features/questionnaire_creator/constants/questionnaireAnswersStatusCodeDisplay";
import { domainResourceSchema } from "@/features/questionnaire_creator/types/DomainResource";
import { resourceSchema } from "@/features/questionnaire_creator/types/Resource";

const baseQuestionnaireResponseItem = z.object({
  linkId: stringSchema,
  definition: uriSchema.optional(),
  text: stringSchema.optional(),
});

export type QuestionnaireResponseItem = z.infer<
  typeof baseQuestionnaireResponseItem
> & {
  item?: QuestionnaireResponseItem[];
  answer?: z.infer<typeof questionnaireResponseItemAnswerSchema>[];
};

const questionnaireResponseItemSchema: z.ZodType<QuestionnaireResponseItem> =
  baseQuestionnaireResponseItem.extend({
    item: z.lazy(() => questionnaireResponseItemSchema.array()).optional(),
    answer: z
      .lazy(() => questionnaireResponseItemAnswerSchema.array())
      .optional(),
  });

const questionnaireResponseItemAnswerSchema = z.object({
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
  item: questionnaireResponseItemSchema.array().optional(),
});

export const baseQuestionnaireResponseSchema = z.object({
  resourceType: z.literal("QuestionnaireResponse"),
  identifier: identifierSchema.optional(),
  basedOn: z.array(referenceSchema).optional(), // Reference to the CarePlan or ServiceRequest
  partOf: z.array(referenceSchema).optional(), // Reference to the Observation or Procedure
  questionnaire: canonicalSchema.optional(), // Canonical to the Questionnaire
  status: z.enum(
    JSON.parse(
      JSON.stringify(
        questionnaireAnswersStatusCodeDisplay.map((item) => item.code)
      )
    )
  ),
  subject: referenceSchema.optional(), // Reference to any
  authored: dateTimeSchema.optional(),
  author: referenceSchema.optional(), // Reference to Device|Practitioner|PractitionerRole|Patient|RelatedPerson|Organization
  source: referenceSchema.optional(), // Reference to Patient|Practitioner|PractitionerRole|RelatedPerson
  item: questionnaireResponseItemSchema.array().optional(),
});

export const questionnaireResponseSchema = resourceSchema
  .omit({ resourceType: true })
  .merge(domainResourceSchema.omit({ resourceType: true, resource: true }))
  .merge(baseQuestionnaireResponseSchema);

export type QuestionnaireResponse = z.infer<typeof questionnaireResponseSchema>;
