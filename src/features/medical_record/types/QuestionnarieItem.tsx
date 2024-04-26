import { z } from 'zod'

const QuestionnaireItem = z.object({
  linkId: z.string(),
  text: z.string(),
  type: z.string(),
  // Recursive definition for nested items
  item: z.lazy(() => QuestionnaireItemArray),
});

const QuestionnaireItemArray = z.array(QuestionnaireItem);