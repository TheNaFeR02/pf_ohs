import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useFieldArray, useForm } from "react-hook-form";
import { OrganizationSchema } from "@/features/companies/types/organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const AliasInput = () => {

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
                    telecom: {
                        system: "",
                        value: "",
                        use: "",
                    },
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
const { control } = form;

const { fields, append, remove } = useFieldArray({
    control,
    name: "contact",
  });

  return (
    <div className="flex flex-row my-5">
      {fields.map((field, index) => (
        <div key={field.id}>
          <div className="flex flex-row">
             <FormField
                control={form.control}
                name={`alias.${index}`}
                render={({ field }) => (
                    <FormControl>
                        <Input placeholder="Alias" type="text" {...field} className="my-2 mr-2 w-23"/>
                    </FormControl>
                )}
              />
          {index > 0 && (
                        <Button onClick={() => remove(index)} className="ml-2 my-1 mx-2 bg-red-500 text-white rounded hover:bg-red-700">Eliminar Contacto</Button>
                    )}
          </div>
          
        </div>
      ))}
      {fields.length < 4 && (
        <Button
          onClick={() => append({})}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 mx-4 rounded mt-2"
        >
          Añadir Contacto
        </Button>
      )}
    </div>
  );
};

export default AliasInput;
