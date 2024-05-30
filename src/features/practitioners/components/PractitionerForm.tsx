"use client";
import React from "react";
import { Form } from "@/components/ui/form";
import PractitionerFormField from "@/features/practitioners/components/PractitionerFormField";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Practitioner, practitionerSchema } from "@/types/Practitioner";
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

interface PractitionerFormProps {
  data?: Practitioner;
  id?: string;
}

const PractitionerForm = ({ data, id }: PractitionerFormProps) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });
  const router = useRouter();

  const form = useForm<Practitioner>({
    resolver: zodResolver(practitionerSchema),
    defaultValues: data
      ? data
      : {
          resourceType: "Practitioner",
          active: true,
          name: [{ family: "", given: [] }],
          telecom: [
            {
              system: "",
              value: "",
            },
            {
              system: "",
              value: "",
            },
          ],
          address: [
            {
              city: "",
              state: "",
              postalCode: "",
              country: "",
              text: "",
            },
          ],
          birthDate: "",
        },
  });

  function onSubmit(practitioner: Practitioner) {
    console.log(practitioner);
    try {
      if (data && id) {
        updateResource({
          id: id,
          data: practitioner,
          schema: practitionerSchema,
          access_token: session?.user?.access_token,
        });
      } else {
        createResource({
          data: practitioner,
          schema: practitionerSchema,
          access_token: session?.user?.access_token,
        });
      }
      router.push("/practitioners");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Create practitioner</CardTitle>
            <CardDescription>
              Use the form below to create a new practitioner
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PractitionerFormField />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/practitioners">
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

export default PractitionerForm;
