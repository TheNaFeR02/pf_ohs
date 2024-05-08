import {z} from 'zod';
import {stringSchema, positiveIntSchema} from './dataTypes';
import {PeriodSchema} from '@/features/questionnaire_creator/types/Period';

export const ContactPointSchema = z.object({
    system: stringSchema.optional(), // C? phone | fax | email | pager | url | sms | other
    value: stringSchema.optional(), // The actual contact point details
    use: stringSchema.optional(), // home | work | temp | old | mobile - purpose of this contact point
    rank: positiveIntSchema.optional(), // Specify preferred order of use (1 = highest)
    period: PeriodSchema.optional(), // Time period when the contact point was/is in use
  });

  export type ContactPoint = z.infer<typeof ContactPointSchema>;