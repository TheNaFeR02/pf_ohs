"use client";
import React from "react";
import { Form } from "@/components/ui/form";
import AppointmentFormField from "@/features/appointments/components/AppointmentFormField";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Appointment, appointmentSchema } from "@/types/Appointment";
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
import { updateResource } from "@/server/updateResource";
interface AppointmentFormProps {
  data?: Appointment;
  id?: string;
}

const AppointmentForm = ({ data, id }: AppointmentFormProps) => {
  const form = useForm<Appointment>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: data
      ? data
      : {
          resourceType: "Appointment",
          identifier: [],
          status: "proposed",
          cancelationReason: {
            coding: [],
            text: "",
          },
          serviceCategory: [],
          serviceType: [],
          specialty: [],
          appointmentType: {
            coding: [],
            text: "",
          },
          reasonCode: [],
          reasonReference: [],
          priority: 0,
          description: "",
          supportingInformation: [],
          start: new Date().toISOString(),
          end: new Date().toISOString(),
          minutesDuration: 1,
          slot: [],
          created: new Date().toISOString(),
          comment: "",
          patientInstruction: "",
          basedOn: [],
          participant: [
            {
              type: [
                {
                  coding: [],
                  text: "Patient",
                },
              ],
              actor: {
                reference: "",
                display: "",
              },
              required: "required",
              status: "accepted",
              period: {
                start: new Date().toISOString(),
                end: new Date().toISOString(),
              },
            },
          ],
          requestedPeriod: [
            {
              start: new Date().toISOString(),
              end: new Date().toISOString(),
            },
          ],
        },
  });

  async function onSubmit(appointment: Appointment) {
    try {
      await form.handleSubmit(async (data) => {
        if (data && id) {
          await updateResource({ id: id, data: appointment, schema: appointmentSchema });
        } else {
          await createResource({data: appointment, schema: appointmentSchema});
        }
      })();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Create appointment</CardTitle>
            <CardDescription>
              Use the form below to create a new appointment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentFormField />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/appointments">
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

export default AppointmentForm;
