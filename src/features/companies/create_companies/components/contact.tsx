"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

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

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import { Organization, OrganizationSchema } from "@/features/companies/types/organization"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function InputForm() {

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
        <CardTitle>Contacto</CardTitle>
        <CardDescription>
          Ingrese la información de contacto de la organización
        </CardDescription>
      </CardHeader>
        <CardContent>
            {fields.map((field, index) => (
                <div key={field.id}>
                    <FormLabel>Telecom</FormLabel>
                    <div className="flex flex-row">
                        <FormField
                        control={form.control}
                        name={`contact.${index}.telecom.system`}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="w-50 mr-5">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar Sistema" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="phone">Teléfono</SelectItem>
                                    <SelectItem value="fax">Fax</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="pager">Buscapersonas - Pager</SelectItem>
                                    <SelectItem value="url">Url</SelectItem>
                                    <SelectItem value="sms">Sms</SelectItem>
                                    <SelectItem value="other">Otro</SelectItem>
                                    </SelectContent>
                                </Select>
                        )}  
                        /> 
                        <FormField
                            control={form.control}
                            name={`contact.${index}.telecom.value`}
                            render={({ field }) => (
                                <FormControl>
                                    <Input placeholder="Numero" type="text" {...field}/>
                                </FormControl>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`contact.${index}.telecom.system`}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="w-50 ml-5">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar Uso" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="home">Casa</SelectItem>
                                    <SelectItem value="work">Trabajo</SelectItem>
                                    <SelectItem value="temp">Temporal</SelectItem>
                                    <SelectItem value="old">Viejo</SelectItem>
                                    <SelectItem value="billing">Facturación</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <FormLabel>Dirección</FormLabel>
                    <div className="flex flex-row">
                        <FormField
                            control={form.control}
                            name={`contact.${index}.address.use`}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="w-50 mr-5">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar Uso" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="home">Casa</SelectItem>
                                    <SelectItem value="work">Trabajo</SelectItem>
                                    <SelectItem value="temp">Temporal</SelectItem>
                                    <SelectItem value="old">Viejo</SelectItem>
                                    <SelectItem value="billing">Facturación</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`contact.${index}.address.line`}
                            render={({ field }) => (
                                <FormControl>
                                    <Input placeholder="Dirección" type="text" className="mx-5"{...field}/>
                                </FormControl>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`contact.${index}.address.city`}
                            render={({ field }) => (
                                <FormControl>
                                    <Input placeholder="Ciudad" type="text" className="mx-5" {...field}/>
                                </FormControl>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`contact.${index}.address.postalCode`}
                            render={({ field }) => (
                                <FormControl>
                                    <Input placeholder="Codigo postal" type="text"  className="mx-5" {...field}/>
                                </FormControl>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`contact.${index}.address.country`}
                            render={({ field }) => (
                                <FormControl>
                                    <Input placeholder="País" type="text" {...field}/>
                                </FormControl>
                            )}
                        />
                    </div>
                    <FormLabel>Nombre Persona</FormLabel>
                    <div className="flex flex-row mb-5">
                            <FormField
                                control={form.control}
                                name={`contact.${index}.name.use`}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className="w-50 mr-5">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar Uso" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="usual">Usual</SelectItem>
                                        <SelectItem value="official">Oficial</SelectItem>
                                        <SelectItem value="temp">Temporal</SelectItem>
                                        <SelectItem value="nickname">Apodo</SelectItem>
                                        <SelectItem value="anonymous">Anonimo</SelectItem>
                                        <SelectItem value="old">Viejo</SelectItem>
                                        <SelectItem value="maiden">Doncella</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`contact.${index}.name.text`}
                                render={({ field }) => (
                                    <FormControl>
                                        <Input placeholder="Nombre" type="text" className="mx-5" {...field}/>
                                    </FormControl>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`contact.${index}.name.family`}
                                render={({ field }) => (
                                    <FormControl>
                                        <Input placeholder="Apellido" type="text" className="mx-5" {...field}/>
                                    </FormControl>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`contact.${index}.name.given`}
                                render={({ field }) => (
                                    <FormControl>
                                        <Input placeholder="Segundo nombre" type="text" className="mx-5" {...field}/>
                                    </FormControl>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`contact.${index}.name.prefix`}
                                render={({ field }) => (
                                    <FormControl>
                                        <Input placeholder="Prefijo" type="text" {...field}/>
                                    </FormControl>
                                )}
                            />
                    </div>
                    {index > 0 && (
                        <Button onClick={() => remove(index)} className="ml-2 my-1 mx-2 bg-red-500 text-white rounded hover:bg-red-700">Eliminar Contacto</Button>
                    )}
                </div>
            ))}
            <Button onClick={() => append({})} className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 mx-4 rounded mt-2">Añadir Contacto</Button>
        </CardContent>
    </Card>
  )
}

export default InputForm;