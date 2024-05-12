// import { questionnaireSchema } from "@/types/Questionnaire"
import { questionnaireSchema } from "@/features/questionnaire_creator/types/Questionnaire";
import GeneralExample from "@/__testsData__/Questionnaire/GeneralExample.json";
import LifelinesExample from "@/__testsData__/Questionnaire/LifelinesExample.json";
import NeonateRecordExample from "@/__testsData__/Questionnaire/NeonateRecordExample.json";
import GlasgowComaScoreExample from "@/__testsData__/Questionnaire/GlasgowComaScoreExample.json";
import ZikaVirusExposureExample from "@/__testsData__/Questionnaire/ZikaVirusExposureExample.json";
import PHQ9HealthQuestionnaireExample from "@/__testsData__/Questionnaire/PHQ9HealthQuestionnaireExample.json";

test("Questionnaire Test -> General questionnaire example", () => {
  const result = questionnaireSchema.safeParse(GeneralExample);
//   console.error(result.error);

  expect(result.success).toBe(true);
});

test("Questionnaire Test -> Real-world lifelines questionnaire (fictively taken from the patient)", () => {
  const result = questionnaireSchema.safeParse(LifelinesExample);
//   console.error(result.error);

  expect(result.success).toBe(true);
});

test('Questionnaire Test -> Neonate record from New South Wales, Australia "My Personal Health Record" example', () => {
  const result = questionnaireSchema.safeParse(NeonateRecordExample);
//   console.error(result.error);

  expect(result.success).toBe(true);
});

test("Questionnaire Test -> Glasgow Coma Score example form", () => {
  const result = questionnaireSchema.safeParse(GlasgowComaScoreExample);
  // console.error(result.error);

  expect(result.success).toBe(true);
});

test("Questionnaire Test -> Example instrument for assessing Zika virus exposure potential", () => {
  const result = questionnaireSchema.safeParse(ZikaVirusExposureExample);
//   console.error(result.error);

  expect(result.success).toBe(true);
});

test("Questionnaire Test -> Questionnaire used to define the questions involved in the PHQ-9 health questionnaire", () => {
  const result = questionnaireSchema.safeParse(PHQ9HealthQuestionnaireExample);
//   console.error(result.error);

  expect(result.success).toBe(true);
});