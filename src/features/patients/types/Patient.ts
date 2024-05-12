import { z } from 'zod';

// const PatientSchema = z.object({
//     resourceType: z.string().optional(),
//     identifier: z.array(IdentifierSchema).optional(),
//     active: z.boolean().optional(),
//     name: z.array(HumanNameSchema).optional(),
//     telecom: z.array(ContactPointSchema).optional(),
//     gender: z.enum(["male", "female", "other", "unknown"]).optional(),
//     birthDate: z.string().regex(
//         /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/
//       ).optional(), //<date>
//     deceasedBoolean: z.boolean().optional(),
//     deceasedDateTime: z.string().regex(
//         /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?/)
//         .optional(),// <dateTime>
//     address: z.array(AddressSchema).optional(),
//     maritalStatus: CodeableConceptSchema.optional(),
//     multipleBirthBoolean: z.boolean().optional(),
//     multipleBirthInteger: z.number().optional(),
//     photo: z.array(AttachmentSchema).optional(),
//     contact: z.array(ContactSchema).optional(),
//     communication: z.array(z.object({
//         language: CodeableConceptSchema,
//         preferred: z.boolean().optional(),
//     })).optional(),
//     generalPractitioner: z.array(ReferenceSchema).optional(),
//     managingOrganization: ReferenceSchema.optional(),
//     link: z.array(LinkSchema).optional(),
// });

// Nota: Necesitarás definir los esquemas para Identifier, HumanName, ContactPoint, Address, CodeableConcept, Attachment, Contact, Communication, Reference y Link basándote en sus respectivas estructuras.

const datePattern = /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/

export const patientSchema = z.object({
  resourceType: z.string().optional(),
  identifier: z.array(z.object({})).optional(),
  active: z.boolean().optional(),
  name: z.array(
    z.object({ // This is the temporal object for pf purpose
      family: z.string().optional(),
      given: z.string().optional()
    })
      .or(z.object({})).optional() // This is simulating {HumanName} to pass all the Tests. Eventually change to the actual HumanChange schema.
  ).optional(),
  telecom: z.array(
    z.object({ // This is the temporal object for pf purpose
      system: z.string().optional(),
      value: z.string().optional()
    })
      .or(z.object({})) // simulating {ContactPoint}
      .optional()).optional(),
  gender: z.enum(["male", "female", "other", "unknown"]).optional(),
  // birthDate: z.string().regex(
  //       /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/
  //   ).optional(),
  birthDate: z.string().regex(
    /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/
  ).optional().or(z.date({ required_error: "A date of birth is required." }).optional()).optional(), //<date>
  // birthDate: z.date().refine((date)=>{date.toDateString().match(datePattern) === null, {message: "Invalid date format"}}).optional(),
  // birthDate: z.date().refine(date => datePattern.test(date.toString()), { message: "Invalid date format" }).optional(),
  deceasedBoolean: z.boolean().optional(),
  deceasedDateTime: z.string().regex(
    /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?/)
    .optional(),// <dateTime>
  address: z.array(
    z.object({
      text: z.string().optional(),
      city: z.string().optional(),
      district: z.string().optional(),
      country: z.string().optional()
    }).or(z.object({})).optional() // simulating {Address}

  ).optional(),
  maritalStatus: z.object({
    text: z.string().optional(),
  }).optional(),
  multipleBirthBoolean: z.boolean().optional(),
  multipleBirthInteger: z.number().optional(),
  photo: z.array(z.object({
    data: z.string().optional(),
    contentType: z.string().optional(),
    url: z.string().optional()
  })).optional(),
  contact: z.array(z.object({
    relationship: z.array(z.object({})).optional(),
    name: z.array(
      z.object({ // This is the temporal object for pf purpose
        family: z.string().optional(),
        given: z.string().optional()
      }))
        .or(z.object({
          family: z.string().optional(),
          given: z.string().optional()
        }).or(z.object({})).optional()).optional(), // This is simulating {HumanName} to pass all the Tests. Eventually change to the actual HumanChange schema.
    telecom: z.array(
      z.object({ // This is the temporal object for pf purpose
        system: z.string().optional(),
        value: z.string().optional()
      }).optional())
        .or(z.object({})) // simulating {ContactPoint}
        .optional(),
    address: z.array(
      z.object({
        text: z.string().optional(),
        city: z.string().optional(),
        district: z.string().optional(),
        country: z.string().optional()
      })).or(z.object({})).optional(), // simulating {Address}.optional(),
    gender: z.enum(["male", "female", "other", "unknown"]).optional(),
  })).optional(),
  communication: z.array(z.object({
    language: z.object({}).optional(),
    preferred: z.boolean().optional(),
  })).optional(),
  generalPractitioner: z.array(z.object({})).optional(),
  managingOrganization: z.object({}).optional(),
  link: z.array(z.object({})).optional(),
});

export type Patient = z.infer<typeof patientSchema>