"use client";
import React, { useState } from "react";
import PatientFormField from "../patients/components/PatientFormField";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { executeBundle } from "@/server/executeBundle";
import { Bundle, BundleEntry, bundleSchema } from "@/types/Bundle";
import { Patient, patientSchema } from "@/types/Patient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Encounter } from "@/types/Encounter";
import router from "next/router";

const NewEncounter = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });
  const form = useForm<Patient>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
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
      ],
    },
  });

  function onSubmit(data: Patient) {
    const patientEncounter: Bundle = {
      resourceType: "Bundle",
      type: "transaction",
      entry: [
        {
          resource: data,
          fullUrl: `urn:uuid:patient-1`,
          request: {
            method: "POST",
            url: "Patient",
          },
        },
        {
          resource: {
            resourceType: "Encounter",
            status: "arrived",
            class: {
              system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
              code: "IMP",
              display: "default encounter (testing porposes)",
            },
            subject: {
              reference: "urn:uuid:patient-1",
            },
          },
          request: {
            method: "POST",
            url: "Encounter",
          },
        },
      ],
    };

    try {
      const response = executeBundle<Bundle>({
        data: patientEncounter,
        schema: bundleSchema,
        access_token: session?.user?.access_token,
      });
      console.log("Response: ", response);
      router.push("/encounters");
    } catch (error) {
      console.error("Error submitting data: ", error);
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

export default NewEncounter;
