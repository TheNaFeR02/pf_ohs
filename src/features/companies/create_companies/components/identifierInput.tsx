import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useFieldArray, useForm } from "react-hook-form";
import { OrganizationSchema } from "@/features/companies/types/organization";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const IdentifierInput = () => {
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
      <Card className="my-5">
        <CardHeader>
          <CardTitle>Identificador</CardTitle>
          <CardDescription>Ingrese la información de la organización</CardDescription>
        </CardHeader>
        <CardContent>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex flex-row mx-2 my-2">
                        <FormField
                        control={form.control}
                        name={`identifier.${index}.use`}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="w-50 mr-5">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar Sistema" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="usual">Habitual</SelectItem>
                                    <SelectItem value="official">Oficial</SelectItem>
                                    <SelectItem value="temp">Temporal</SelectItem>
                                    <SelectItem value="secondary">Secundario</SelectItem>
                                    <SelectItem value="old">Viejo</SelectItem>
                                    </SelectContent>
                                </Select>
                        )}  
                        /> 
                        <FormField
                            control={form.control}
                            name={`identifier.${index}.system`}
                            render={({ field }) => (
                                <FormControl>
                                    <Input placeholder="Sistema Ej(https://www.rues.org.co)" type="text" {...field} className="ml-5 mr-5"/>
                                </FormControl>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`identifier.${index}.value`}
                            render={({ field }) => (
                              <FormControl>
                                <Input placeholder="NIT" type="text" {...field}/>
                            </FormControl>
                            )}
                        />
                        {index > 0 && (
                        <Button onClick={() => remove(index)} className="ml-2 my-1 mx-2 bg-red-500 text-white rounded hover:bg-red-700">Eliminar Contacto</Button>
                    )}
              </div>
            </div>
      ))}
        <Button
          onClick={() => append({})}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 mx-4 rounded mt-2"
        >
          Añadir Contacto
        </Button>
        </CardContent>
      </Card>
    );
};

export default IdentifierInput;