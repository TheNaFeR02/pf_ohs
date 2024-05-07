import { questionnaireSchema } from "@/types/Questionnaire"
import GeneralExample from "@/__testsData__/Questionnaire/GeneralExample.json"
import LifelinesExample from "@/__testsData__/Questionnaire/LifelinesExample.json"
import NeonateRecordExample from "@/__testsData__/Questionnaire/NeonateRecordExample.json"
import GlasgowComaScoreExample from "@/__testsData__/Questionnaire/GlasgowComaScoreExample.json"
import ZikaVirusExposureExample from "@/__testsData__/Questionnaire/ZikaVirusExposureExample.json"
import SurgeonGeneralFamilyHistoryExample from "@/__testsData__/Questionnaire/SurgeonGeneralFamilyHistoryExample.json"
import PHQ9HealthQuestionnaireExample from "@/__testsData__/Questionnaire/PHQ9HealthQuestionnaireExample.json"

test('Questionnaire Test -> General questionnaire example', () => {
    const result = questionnaireSchema.safeParse(GeneralExample)
    
    expect(result.success).toBe(true)
})

test('Questionnaire Test -> Real-world lifelines questionnaire (fictively taken from the patient)', () => {
    const result = questionnaireSchema.safeParse(LifelinesExample)
    
    expect(result.success).toBe(true)
})

test('Questionnaire Test -> Neonate record from New South Wales, Australia "My Personal Health Record" example', () => {
    const result = questionnaireSchema.safeParse(NeonateRecordExample)
    
    expect(result.success).toBe(true)
})

test('Questionnaire Test -> Glasgow Coma Score example form', () => {
    const result = questionnaireSchema.safeParse(GlasgowComaScoreExample)
    
    expect(result.success).toBe(true)
})

test('Questionnaire Test -> Example instrument for assessing Zika virus exposure potential', () => {
    const result = questionnaireSchema.safeParse(ZikaVirusExposureExample)
    
    expect(result.success).toBe(true)
})

test('Questionnaire Test -> LOINC US Surgeon General family history including value sets', () => {
    const result = questionnaireSchema.safeParse(SurgeonGeneralFamilyHistoryExample)
    
    expect(result.success).toBe(true)
})

test('Questionnaire Test -> Questionnaire used to define the questions involved in the PHQ-9 health questionnaire', () => {
    const result = questionnaireSchema.safeParse(PHQ9HealthQuestionnaireExample)
    
    expect(result.success).toBe(true)
})