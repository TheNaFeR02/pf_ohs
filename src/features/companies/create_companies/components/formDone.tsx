"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Organization, OrganizationSchema } from "@/features/companies/types/organization"
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
import { toast } from "@/components/ui/use-toast"
import OrganizationInput from "./OrganizationInput"


export function FormOrganization() {
  const form = useForm<z.infer<typeof OrganizationSchema>>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
            resourceType: "",
            identifier: [],
            active: false,
            name: "",
            alias: [],
            contact: [
                {
                    telecom: [{
                        system: "",
                        value: "",
                        use: "",
                    }],
                    name: {
                        use: "",
                        text: "",
                        family: "",
                        given: [],
                        prefix: [],
                    },
                    address: {
                        use: "",
                        line: [],
                        city: "",
                        postalCode: "",
                        country: "",
                    },
                },
            ],
        },
})

//   function onSubmit(data: ) {
//     toast({
//       title: "You submitted the following values:",
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     })
//   }

    const onSubmit = (data: Organization) =>
        console.log("Datos del formulario", data.active);

    const fieldState = form.getFieldState("name");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <OrganizationInput />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default FormOrganization;