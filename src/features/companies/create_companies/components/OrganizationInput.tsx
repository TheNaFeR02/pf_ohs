"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import IdentifierInput from "@/features/companies/create_companies/components/identifierInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import AliasInput from "@/features/companies/create_companies/components/alias";
import { getOrganization } from "@/features/companies/services/getCompanies";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ContactInput from "./contact";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrganizationSchema } from "@/features/companies/types/organization";

const OrganizationInput = () => {
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
  return (
    <Card className="m-5">
      <CardHeader>
        <CardTitle>Crear compañia</CardTitle>
        <CardDescription>Ingrese la información de la compañia</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="my-4 mx-6">
          <div className="my-2 mx-2" >
              <FormField
                control={form.control}
                name={`resourceType`}
                render={({ field }) => (
                    <FormControl>
                        <Input placeholder="Ingrese tipo de Organización" type="text" defaultValue="Organization" readOnly />
                    </FormControl>
                )}
              />
            <IdentifierInput />
            <Label htmlFor="terms1" className="my-2 mr-1">Activo</Label>
            <FormField
                control={form.control}
                name={`active`}
                render={({ field }) => (
                    <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                    </FormControl>
                )}
            />
            <FormField
                control={form.control}
                name={`name`}
                render={({ field }) => (
                    <FormControl>
                      <Input placeholder="Nombre organización" type="text" {...field} className="my-2"/>
                    </FormControl>
                )}
            />
            <AliasInput />
            <ContactInput/>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationInput;
