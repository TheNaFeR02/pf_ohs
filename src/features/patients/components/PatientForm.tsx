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

  function onSubmit(patient: Patient) {
    console.log(patient);

    try {
      if (data && id) {
        updateResource({
          id: id,
          data: patient,
          schema: patientSchema,
          access_token: session?.user?.access_token,
        });
      } else {
        createResource({
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
        <div className="flex justify-center">
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
        </div>
      </form>
    </Form>
  );
};

export default PatientForm;
