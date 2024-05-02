"use client"
import Image from "next/image";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { z } from "zod"
import { fakePatient, FakePatient } from "./types/fakePatient";
import { createPatient } from "@/server/createPatient";


export default function profileForm() {
  // 1. Define your form.
  const form = useForm<FakePatient>({
    resolver: zodResolver(fakePatient),
    defaultValues: {
      resourceType: "Patient",
      active: true,
      name: {
        family: "",
        given: "",
      },
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(patient: FakePatient) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(patient)

    try {
      await createPatient(patient);
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name.given"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="nombre" {...field} />
                </FormControl>
                <FormDescription>
                  This is your given name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name.family"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="apellido" {...field} />
                </FormControl>
                <FormDescription>
                  This is your family name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}
