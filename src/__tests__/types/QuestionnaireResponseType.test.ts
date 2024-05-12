import { questionnaireResponseSchema } from "@/types/QuestionnaireResponse"
import QuestionnaireResponseData1 from "@/__testsData__/QuestionnaireResponse/QuestionnaireResponseData1.json"
import QuestionnaireResponseData2 from "@/__testsData__/QuestionnaireResponse/QuestionnaireResponseData2.json"
import QuestionnaireResponseData3 from "@/__testsData__/QuestionnaireResponse/QuestionnaireResponseData3.json"
import QuestionnaireResponseData4 from "@/__testsData__/QuestionnaireResponse/QuestionnaireResponseData4.json"
import QuestionnaireResponseData5 from "@/__testsData__/QuestionnaireResponse/QuestionnaireResponseData5.json"

test('QuestionnaireResponse Test -> General questionnaire response example', () => {
    const result = questionnaireResponseSchema.safeParse(QuestionnaireResponseData1)
    
    expect(result.success).toBe(true)
})

test('QuestionnaireResponse Test -> Real-world lifelines questionnaire response (fictively taken from the patient)', () => {
    const result = questionnaireResponseSchema.safeParse(QuestionnaireResponseData2)
    
    expect(result.success).toBe(true)
})

test('QuestionnaireResponse Test -> Real-world NSW My Personal Health Record example', () => {
    const result = questionnaireResponseSchema.safeParse(QuestionnaireResponseData3)
    
    expect(result.success).toBe(true)
})

test('QuestionnaireResponse Test -> Glasgow Coma Score example answers', () => {
    const result = questionnaireResponseSchema.safeParse(QuestionnaireResponseData4)
    console.error(result.error)
    expect(result.success).toBe(true)
})

test('QuestionnaireResponse Test -> Example response to the SDC-LOINC USSG Family History questionnaire', () => {
    const result = questionnaireResponseSchema.safeParse(QuestionnaireResponseData5)
    
    expect(result.success).toBe(true)
})

