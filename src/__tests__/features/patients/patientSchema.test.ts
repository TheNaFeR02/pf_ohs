import { patientSchema } from "@/features/patients/types/Patient"
import GeneralPersonExample from "@/__testsData__/Patient/GeneralPersonExample.json"
import Patient1ForLinking from "@/__testsData__/Patient/Patient1ForLinking.json"
import Patient2ForLinking from "@/__testsData__/Patient/Patient2ForLinking.json"
import DeceasedPatientTime from "@/__testsData__/Patient/DeceasedPatientTime.json"
import DeceasedPatientBoolean from "@/__testsData__/Patient/DeceasedPatientBoolean.json"
import StockPeople from "@/__testsData__/Patient/StockPeople.json"
import ExamplePeopleCypressProject from "@/__testsData__/Patient/ExamplePeopleCypressProject.json"
import SecondPersonExample from "@/__testsData__/Patient/SecondPersonExample.json"
import XDSPatient from "@/__testsData__/Patient/XDSPatient.json"
import AnimalExample from "@/__testsData__/Patient/AnimalExample.json"
import DICOMSample from "@/__testsData__/Patient/DICOMSample.json"
import IHEPCDExample from "@/__testsData__/Patient/IHEPCDExample.json"
import RealWorldPatientExample1 from "@/__testsData__/Patient/RealWorldPatientExample1.json"
import RealWorldPatientExample2 from "@/__testsData__/Patient/RealWorldPatientExample2.json"
import GlossyExample from "@/__testsData__/Patient/GlossyExample.json"
import GeneticRiskAssessmentPerson from "@/__testsData__/Patient/GeneticRiskAssessmentPerson.json"
import AdditionalGeneticsExample from "@/__testsData__/Patient/AdditionalGeneticsExample.json"
import ChineseContentExample from "@/__testsData__/Patient/ChineseContentExample.json"
import NewbornPatientExample from "@/__testsData__/Patient/NewbornPatientExample.json"
import MotherOfNewbornPatientExample from "@/__testsData__/Patient/MotherOfNewbornPatientExample.json"
import NewbornEldestTwinExample from "@/__testsData__/Patient/NewbornEldestTwinExample.json"
import NewbornYoungestTwinExample from "@/__testsData__/Patient/NewbornYoungestTwinExample.json"
import PreBirthFetalInfantExample from "@/__testsData__/Patient/PreBirthFetalInfantExample.json"
import MotherOfInfantTwinsAndFetalInfant from "@/__testsData__/Patient/MotherOfInfantTwinsAndFetalInfant.json"


test('Patient Test -> General person example', () => {
    const result = patientSchema.safeParse(GeneralPersonExample)
    console.error(result.error)
    expect(result.success).toBe(true)
})

test('Patient Test -> Patient 1 for linking', () => {
    const result = patientSchema.safeParse(Patient1ForLinking)
    expect(result.success).toBe(true)
})

test('Patient Test -> Patient 2 for linking', () => {
    const result = patientSchema.safeParse(Patient2ForLinking)
    console.error(result.error)
    expect(result.success).toBe(true)
})

test('Patient Test -> Deceased patient time', () => {
    const result = patientSchema.safeParse(DeceasedPatientTime)
    expect(result.success).toBe(true)
})

test('Patient Test -> Deceased patient boolean', () => {
    const result = patientSchema.safeParse(DeceasedPatientBoolean)
    expect(result.success).toBe(true)
})

test('Patient Test -> Stock people', () => {
    const result = patientSchema.safeParse(StockPeople)
    expect(result.success).toBe(true)
})

test('Patient Test -> Example people cypress project', () => {
    const result = patientSchema.safeParse(ExamplePeopleCypressProject)
    expect(result.success).toBe(true)
})

test('Patient Test -> Second person example', () => {
    const result = patientSchema.safeParse(SecondPersonExample)
    expect(result.success).toBe(true)
})

test('Patient Test -> XDS patient', () => {
    const result = patientSchema.safeParse(XDSPatient)
    expect(result.success).toBe(true)
})

test('Patient Test -> Animal example', () => {
    const result = patientSchema.safeParse(AnimalExample)
    expect(result.success).toBe(true)
})

test('Patient Test -> DICOM sample', () => {
    const result = patientSchema.safeParse(DICOMSample)
    expect(result.success).toBe(true)
})

test('Patient Test -> IHE PCD example', () => {
    const result = patientSchema.safeParse(IHEPCDExample)
    expect(result.success).toBe(true)
})

test('Patient Test -> Real world patient example 1', () => {
    const result = patientSchema.safeParse(RealWorldPatientExample1)
    expect(result.success).toBe(true)
})

test('Patient Test -> Real world patient example 2', () => {
    const result = patientSchema.safeParse(RealWorldPatientExample2)
    expect(result.success).toBe(true)
})

test('Patient Test -> Glossy example', () => {
    const result = patientSchema.safeParse(GlossyExample)
    expect(result.success).toBe(true)
})

test('Patient Test -> Genetic risk assessment person', () => {
    const result = patientSchema.safeParse(GeneticRiskAssessmentPerson)
    expect(result.success).toBe(true)
})

test('Patient Test -> Additional genetics example', () => {
    const result = patientSchema.safeParse(AdditionalGeneticsExample)
    expect(result.success).toBe(true)
})

test('Patient Test -> Chinese content example', () => {
    const result = patientSchema.safeParse(ChineseContentExample)
    expect(result.success).toBe(true)
})

test('Patient Test -> Newborn patient example', () => {
    const result = patientSchema.safeParse(NewbornPatientExample)
    expect(result.success).toBe(true)
})

test('Patient Test -> Mother of newborn patient example', () => {
    const result = patientSchema.safeParse(MotherOfNewbornPatientExample)
    expect(result.success).toBe(true)
})

test('Patient Test -> Newborn eldest twin example', () => {
    const result = patientSchema.safeParse(NewbornEldestTwinExample)
    expect(result.success).toBe(true)
})

test('Patient Test -> Newborn youngest twin example', () => {
    const result = patientSchema.safeParse(NewbornYoungestTwinExample)
    expect(result.success).toBe(true)
})

test('Patient Test -> Pre birth fetal infant example', () => {
    const result = patientSchema.safeParse(PreBirthFetalInfantExample)
    expect(result.success).toBe(true)
})

test('Patient Test -> Mother of infant twins and fetal infant', () => {
    const result = patientSchema.safeParse(MotherOfInfantTwinsAndFetalInfant)
    expect(result.success).toBe(true)
})