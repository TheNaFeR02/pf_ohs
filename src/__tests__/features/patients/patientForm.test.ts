import { patientSchema } from "@/features/patients/types/Patient"
import { base64BinarySchema } from "@/features/questionnaire_creator/types/dataTypes"


test('patient form', () => {
  // const result = patientSchema.safeParse({
  //   resourceType: 'Patient',
  //   // identifier: [],
  //   active: true,
  //   name: [{ family: "Garcia", given: ["Fernando", "Acuña"] }],
  //   telecom: [
  //     {
  //       system: "phone",
  //       value: "3114002600"
  //     },
  //     {
  //       system: "email",
  //       value: "acunafer.02@gmail.com"
  //     }
  //   ],
  //   gender: 'male',
  //   birthDate: new Date(),
  //   address: [
  //     {
  //       text: "Calle 64 # 45 - 23",
  //       city: "Barranquilla",
  //       district: "Atlántico",
  //       country: "Colombia"
  //     }
  //   ],
  //   maritalStatus: { text: 'soltero' },
  //   photo: [
  //     {
  //       data: "",
  //     }
  //   ],
  //   contact: [
  //     {
  //       name: {
  //         family: "Barbosa",
  //         given: ["Dayanna"]
  //       },
  //       telecom: [
  //         {
  //           system: "phone",
  //           value: "3004595355"
  //         },
  //         {
  //           system: "email",
  //           value: "dayannamin0903@gmail.com"
  //         }
  //       ],
  //       address: {
  //         text: "Calle 50 # 27 -48",
  //         city: "Barranquilla",
  //         district: "Atlántico",
  //         country: "170"
  //       },
  //       gender: "female"
  //     }
  //   ], //use field array
  //   managingOrganization: {
  //     reference: "/Organization/55",
  //     display: "Medicina Laboral de la Costa IPS S.A.S."
  //   }
  // }
  // )
  // if (!result.success) {
  //   console.error(result.error)
  // }

  const result = base64BinarySchema.safeParse('iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAZ0SURBVHhe7Z0tsOVEEIWfQyKRSCQSiUQikUgkciVuJRKJXLkSiUQikUgkEsvOV7WpDc2Z')
  expect(result.success).toBe(true)
})