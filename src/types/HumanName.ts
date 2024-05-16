import { nameUseCode } from '@/constants/nameUseCodeDisplay';
import {z} from 'zod';
import { periodSchema } from '@/types/Period';
import { stringSchema } from '@/types/dataTypes';

export const humanNameSchema = z.object({
    use: z.enum(nameUseCode).optional(),
    text: stringSchema.optional(),
    family: stringSchema.optional(),
    given: z.array(stringSchema).optional(),
    prefix: z.array(stringSchema).optional(),
    suffix: z.array(stringSchema).optional(),
    period: periodSchema.optional(),
  });

export type HumanName = z.infer<typeof humanNameSchema>;
