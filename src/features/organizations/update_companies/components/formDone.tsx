"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Organization, organizationSchema } from "@/types/Organization";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { getResource } from "@/server/getResource";
import { updateResource } from "@/server/updateResource";

export function FormOrganizationupdate({ id }: { id: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof organizationSchema>>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      resourceType: "Organization",
      identifier: [
        {
          use: "",
          system: "",
          value: "",
        },
      ],
      active: false,
      name: "",
      alias: ["", "", ""],
      contact: [
        {
          telecom: [
            {
              system: "",
              value: "",
              use: "",
            },
          ],
          name: {
            use: "",
            text: "",
            family: "",
            given: [""],
            prefix: [""],
          },
          address: {
            use: "",
            line: [""],
            city: "",
            postalCode: "",
            country: "",
          },
        },
      ],
    },
  });
  try {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getResource({
            id: id,
            resourceType: "Organization",
            schema: organizationSchema,
          });
          if (data !== null) {
            form.reset(data);
          }
        } catch (error) {
          console.error("Error fetching organization data:", error);
        }
      };

      fetchData();
    }, [form, id]);
  } catch (error) {
    console.error("Error fetching organization data:", error);
  }

  function onSubmit(values: Organization) {
    updateResource({ id: id, data: values, schema: organizationSchema });
    router.back();
  }

  const { control } = form;

  const {
    fields: identifierFields,
    append: appendIdentifier,
    remove: removeIdentifier,
  } = useFieldArray({
    control,
    name: "identifier",
  });

  const {
    fields: contactFields,
    append: contactAppend,
    remove: contactRemove,
  } = useFieldArray({
    control,
    name: "contact",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="m-5">
          <CardHeader>
            <CardTitle>Actualizar compañia</CardTitle>
            <CardDescription>
              Ingrese la información de la compañia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="my-4 mx-6">
              <div className="my-2 mx-2">
                <Card className="my-5">
                  <CardHeader>
                    <CardTitle>Identificador</CardTitle>
                    <CardDescription>
                      Ingrese la información de la organización
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {identifierFields.map((field, index) => (
                      <div key={field.id}>
                        <div className="flex flex-row mx-2 my-2">
                          <FormField
                            control={form.control}
                            name={`identifier.${index}.use`}
                            render={({ field }) => (
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormItem className="w-50 mr-5">
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccionar Sistema" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                                <SelectContent>
                                  <SelectItem value="usual">
                                    Habitual
                                  </SelectItem>
                                  <SelectItem value="official">
                                    Oficial
                                  </SelectItem>
                                  <SelectItem value="temp">Temporal</SelectItem>
                                  <SelectItem value="secondary">
                                    Secundario
                                  </SelectItem>
                                  <SelectItem value="old">Viejo</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`identifier.${index}.system`}
                            render={({ field }) => (
                              <FormItem className="w-full ml-5">
                                <FormControl>
                                  <Input
                                    placeholder="Sistema Ej(https://www.rues.org.co)"
                                    type="text"
                                    {...field}
                                    className="ml-5 mr-5"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`identifier.${index}.value`}
                            render={({ field }) => (
                              <FormItem className="w-full ml-10">
                                <FormControl>
                                  <Input
                                    placeholder="NIT"
                                    type="text"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {index > 0 && (
                            <Button
                              type="button"
                              onClick={() => removeIdentifier(index)}
                              className="ml-2 my-1 mx-2 bg-red-500 text-white rounded hover:bg-red-700"
                            >
                              Eliminar Contacto
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        appendIdentifier({ system: "", value: "", use: "" })
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 mx-4 rounded mt-2"
                    >
                      Añadir Contacto
                    </Button>
                  </CardContent>
                </Card>
                <Label htmlFor="terms1" className="my-2 mr-1">
                  Activo
                </Label>
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
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Nombre organización"
                          type="text"
                          {...field}
                          className="my-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row my-5">
                  <FormField
                    control={form.control}
                    name={`alias.0`}
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          placeholder="Alias"
                          type="text"
                          {...field}
                          className="my-2 mr-2 w-23"
                        />
                      </FormControl>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`alias.1`}
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          placeholder="Alias"
                          type="text"
                          {...field}
                          className="my-2 mr-2 w-23"
                        />
                      </FormControl>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`alias.2`}
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          placeholder="Alias"
                          type="text"
                          {...field}
                          className="my-2 mr-2 w-23"
                        />
                      </FormControl>
                    )}
                  />
                </div>
                <Card className="my-5">
                  <CardHeader>
                    <CardTitle>Contacto</CardTitle>
                    <CardDescription>
                      Ingrese la información de contacto de la organización
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {contactFields.map((field, index) => (
                      <div key={field.id}>
                        <FormLabel>Telecom</FormLabel>
                        <div className="flex flex-row">
                          <FormField
                            control={form.control}
                            name={`contact.${index}.telecom.0.system`}
                            render={({ field }) => (
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormItem className="w-50 mr-5">
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccionar Sistema" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                                <SelectContent>
                                  <SelectItem value="phone">
                                    Teléfono
                                  </SelectItem>
                                  <SelectItem value="fax">Fax</SelectItem>
                                  <SelectItem value="email">Email</SelectItem>
                                  <SelectItem value="pager">
                                    Buscapersonas - Pager
                                  </SelectItem>
                                  <SelectItem value="url">Url</SelectItem>
                                  <SelectItem value="sms">Sms</SelectItem>
                                  <SelectItem value="other">Otro</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`contact.${index}.telecom.0.value`}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormControl>
                                  <Input
                                    placeholder="Numero"
                                    type="text"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`contact.${index}.telecom.0.use`}
                            render={({ field }) => (
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormItem className="w-50 ml-5">
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccionar Uso" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                                <SelectContent>
                                  <SelectItem value="home">Casa</SelectItem>
                                  <SelectItem value="work">Trabajo</SelectItem>
                                  <SelectItem value="temp">Temporal</SelectItem>
                                  <SelectItem value="old">Viejo</SelectItem>
                                  <SelectItem value="billing">
                                    Facturación
                                  </SelectItem>
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
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
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
                                  <SelectItem value="billing">
                                    Facturación
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`contact.${index}.address.line.0`}
                            render={({ field }) => (
                              <FormControl>
                                <Input
                                  placeholder="Dirección"
                                  type="text"
                                  className="mx-5"
                                  {...field}
                                />
                              </FormControl>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`contact.${index}.address.city`}
                            render={({ field }) => (
                              <FormControl>
                                <Input
                                  placeholder="Ciudad"
                                  type="text"
                                  className="mx-5"
                                  {...field}
                                />
                              </FormControl>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`contact.${index}.address.postalCode`}
                            render={({ field }) => (
                              <FormControl>
                                <Input
                                  placeholder="Codigo postal"
                                  type="text"
                                  className="mx-5"
                                  {...field}
                                />
                              </FormControl>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`contact.${index}.address.country`}
                            render={({ field }) => (
                              <FormControl>
                                <Input
                                  placeholder="País"
                                  type="text"
                                  {...field}
                                />
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
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl className="w-50 mr-5">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar Uso" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="usual">Usual</SelectItem>
                                  <SelectItem value="official">
                                    Oficial
                                  </SelectItem>
                                  <SelectItem value="temp">Temporal</SelectItem>
                                  <SelectItem value="nickname">
                                    Apodo
                                  </SelectItem>
                                  <SelectItem value="anonymous">
                                    Anonimo
                                  </SelectItem>
                                  <SelectItem value="old">Viejo</SelectItem>
                                  <SelectItem value="maiden">
                                    Doncella
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`contact.${index}.name.text`}
                            render={({ field }) => (
                              <FormControl>
                                <Input
                                  placeholder="Nombre"
                                  type="text"
                                  className="mx-5"
                                  {...field}
                                />
                              </FormControl>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`contact.${index}.name.family`}
                            render={({ field }) => (
                              <FormControl>
                                <Input
                                  placeholder="Apellido"
                                  type="text"
                                  className="mx-5"
                                  {...field}
                                />
                              </FormControl>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`contact.${index}.name.given.0`}
                            render={({ field }) => (
                              <FormControl>
                                <Input
                                  placeholder="Segundo nombre"
                                  type="text"
                                  className="mx-5"
                                  {...field}
                                />
                              </FormControl>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`contact.${index}.name.prefix.0`}
                            render={({ field }) => (
                              <FormControl>
                                <Input
                                  placeholder="Prefijo"
                                  type="text"
                                  {...field}
                                />
                              </FormControl>
                            )}
                          />
                        </div>
                        {index > 0 && (
                          <Button
                            type="button"
                            onClick={() => contactRemove(index)}
                            className="ml-2 my-1 mx-2 bg-red-500 text-white rounded hover:bg-red-700"
                          >
                            Eliminar Contacto
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        contactAppend([
                          {
                            telecom: [
                              {
                                system: "",
                                value: "",
                                use: "",
                              },
                            ],
                            name: {
                              use: "",
                              text: "",
                              family: "",
                              given: [""],
                              prefix: [""],
                            },
                            address: {
                              use: "",
                              line: [""],
                              city: "",
                              postalCode: "",
                              country: "",
                            },
                          },
                        ])
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 mx-4 rounded mt-2"
                    >
                      Añadir Contacto
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
          <div className="flex mb-50 justify-center">
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-700 mb-10"
            >
              Actualizar
            </Button>
          </div>
        </Card>
      </form>
    </Form>
  );
}

export default FormOrganizationupdate;
