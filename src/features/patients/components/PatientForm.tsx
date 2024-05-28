"use client";
import React from "react";
import { Form } from "@/components/ui/form";
import PatientFormField from "@/features/patients/components/PatientFormField";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Patient, patientSchema } from "@/types/Patient";
import { updateResource } from "@/server/updateResource";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { createResource } from "@/server/createResource";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


interface PatientFormProps {
  data?: Patient;
  id?: string;
}

const defaultPhoto =
  "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";

const PatientForm = ({ data, id }: PatientFormProps) => {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });
  
  const router = useRouter();

  const form = useForm<Patient>({
    resolver: zodResolver(patientSchema),
    defaultValues: data
      ? data
      : {
          resourceType: "Patient",
          active: true,
          name: [{ family: "Garcia", given: ["Fernando", "Acuña"] }],
          telecom: [
            {
              system: "phone",
              value: "3114002600",
            },
            {
              system: "email",
              value: "acunafer.02@gmail.com",
            },
          ],
          gender: "male",
          // Only date without time
          birthDate: new Date().toISOString().split("T")[0],
          address: [
            {
              text: "Calle 64 # 45 - 23",
              city: "Barranquilla",
              district: "Atlántico",
              country: "Colombia",
            },
          ],
          photo: [
            {
              contentType: "image/png",
              data: defaultPhoto,
            },
          ],
          contact: [
            {
              name: {
                family: "Barbosa",
                given: ["Dayanna"],
              },
              telecom: [
                {
                  system: "phone",
                  value: "3004595355",
                },
                {
                  system: "email",
                  value: "dayannamin0903@gmail.com",
                },
              ],
              address: {
                text: "Calle 50 # 27 -48",
                city: "Barranquilla",
                district: "Atlántico",
                country: "170",
              },
              gender: "female",
            },
          ], //use field array
          // managingOrganization: {
          //   reference: "/Organization/55",
          //   display: "Medicina Laboral de la Costa IPS S.A.S.",
          // },
        },
  });

  async function onSubmit(patient: Patient) {
    console.log(patient)
    
    try {
      if (data && id) {
        await updateResource({
          id: id,
          data: patient,
          schema: patientSchema,
          access_token: session?.user?.access_token,
        });
      } else {
        await createResource({
          data: patient,
          schema: patientSchema,
          access_token: session?.user?.access_token,
        });
      }
      router.push("/patients");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Create patient</CardTitle>
            <CardDescription>
              Use the form below to create a new patient
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PatientFormField />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/patients">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default PatientForm;
