"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ReactElement, useCallback, useRef, useState } from "react";
import { Patient, patientSchema } from "@/types/Patient";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CameraIcon } from "@radix-ui/react-icons";
import { TargetIcon } from "@radix-ui/react-icons";
import Webcam from "react-webcam";
import Image from "next/image";
import { administrativeGenderObj } from "@/constants/administrativeGenderCodeDisplay";
import { maritalStatusObj } from "@/constants/maritalStatusCodeDisplay";
import { createPatient } from "@/features/patients/server/createPatient";

const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user",
};

const defaultPhoto =
  "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";

export default function PatientForm() {
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
      birthDate: new Date(),
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
          data: defaultPhoto,
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
      ], //use field array
      managingOrganization: {
        reference: "/Organization/55",
        display: "Medicina Laboral de la Costa IPS S.A.S.",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contact",
  });

  function onSubmit(values: Patient) {
    // We extract the base64 image from the url. Basically we are eliminating the header -> 'data:image/jpeg;base64,/9j/4AAQSk...'
    let base64Image = "";
    if (url !== defaultPhoto) {
      let parts = url?.split(",");
      base64Image = parts ? parts[parts.length - 1] : "";
    }

    // We append the photo data to the final values.
    const finalValues = {
      ...values,
      photo: [{ data: base64Image || defaultPhoto }],
    };
    console.log(finalValues);
    createPatient(finalValues);
  }

  // camera: https://dev.to/sababg/react-webcam-typescript-gh2
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);

  const capture = useCallback(() => {
    setCaptureEnable(false);
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full">
          <div className="border-b border-stroke px-6.5">
            <h3 className="font-medium">Creación del Paciente</h3>
          </div>

          <div className="rounded-2xl border shadow-default bg-white mt-4">
            <div className="flex pr-2 pl-5 pt-5">
              <div className="flex flex-col justify-center pt-4 gap-14">
                <div className="w-1/2 h-40 pl-5">
                  <div className="mt-4 border-dashed border-2 w-1/2 h-full">
                    <div className="picture flex justify-center items-center w-full h-full">
                      {isCaptureEnable && (
                        <Webcam
                          audio={false}
                          width={540}
                          height={360}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          videoConstraints={videoConstraints}
                        />
                      )}
                      {url && isCaptureEnable === false && (
                        <Image
                          src={url}
                          alt="Captured"
                          width={540}
                          height={360}
                        />
                      )}
                    </div>

                    <div className="camera-options inline-flex">
                      <div className="start-camera pt-3  w-10 h-10 flex justify-center items-center">
                        <CameraIcon
                          onClick={() => setCaptureEnable(!isCaptureEnable)}
                          width="24"
                          height="24"
                        />
                      </div>
                      <div className="capture-photo pt-3 w-10 h-10 flex justify-center items-center">
                        <TargetIcon onClick={capture} width="24" height="24" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 grid-cols-1">
                  <FormField
                    control={form.control}
                    name={"name.0.given"}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"Ingresa el Nombre del paciente."}
                            {...field}
                            onChange={(e) => {
                              // -> This is a workaround to split the name into an array. Doing an split for each change.
                              const names = e.target.value.split(" ");
                              field.onChange(names);
                            }}
                            value={
                              field.value?.join(" ")
                                ? field.value?.join(" ")
                                : ""
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Nombre y/o segundo nombre del paciente.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={"name.0.family"}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"Ingresa el Apellido del Paciente."}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Apellidos del paciente.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={"telecom.0.value"}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"Ingresa el teléfono del Paciente."}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Teléfono o celular del paciente.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={"telecom.1.value"}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"Ingresa el email del Paciente."}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Email del paciente.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={"gender"}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Sexo</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={"Selecciona el género."}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {administrativeGenderObj.map(
                              ({ code, display }) => (
                                <SelectItem key={code} value={code}>
                                  {display}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormDescription>Género del paciente.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* birthdate */}
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-100 py-3 px-5 font-medium">
                        <FormLabel>Fecha de nacimiento</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                suppressHydrationWarning // To supress warning about Date mismatch
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal w-full", // w-full just to match the entire width.
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              defaultMonth={new Date()}
                              selected={
                                field.value instanceof Date
                                  ? field.value
                                  : undefined
                              }
                              onSelect={field.onChange}
                              // onSelect={(date) => field.onChange(date as Matcher)}
                              disabled={(date: Date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Fecha de nacimiento del paciente.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={"address.0.text"}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"Ingresa la dirección"}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Dirección de residencia del paciente.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={"address.0.city"}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Input placeholder={"Ingresa la ciudad"} {...field} />
                        </FormControl>
                        <FormDescription>
                          Ciudad de residencia del paciente.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={"address.0.district"}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Departamento</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"Ingresa el departamento"}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Departamento de residencia del paciente.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maritalStatus"
                    render={({ field }): ReactElement => {
                      const handleValueChange = (e: string) => {
                        const selectedMaritalStatus = maritalStatusObj.find(
                          (item) => item.code === e
                        );
                        field.onChange({
                          coding: [
                            {
                              code: e,
                              display: selectedMaritalStatus?.display,
                            },
                          ],
                          text: selectedMaritalStatus?.display,
                        });
                      };

                      return (
                        <FormItem className="w-100 py-3 px-5 font-medium">
                          <FormLabel>Estado civil</FormLabel>
                          <Select onValueChange={handleValueChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona el estado civil" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {maritalStatusObj.map(({ code, display }) => (
                                <SelectItem key={code} value={code}>
                                  {display}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Estado civil del paciente.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <fieldset className="border border-solid border-opacity-60 rounded-lg p-3 mb-5 w-full col-span-full">
                    <legend className="text-sm opacity-60">
                      Información de contacto
                    </legend>
                    <div className="">
                      {fields.map((field, index) => (
                        <React.Fragment key={index}>
                          <div
                            key={field.id}
                            className="grid sm:grid-cols-2 grid-cols-1"
                          >
                            <FormField
                              control={form.control}
                              name={`contact.${index}.name.given`}
                              render={({ field }): ReactElement => (
                                <FormItem className="w-100 py-3 px-5 font-medium">
                                  <FormLabel>Nombre</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={
                                        "Ingresa el Nombre del contacto."
                                      }
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          e.target.value.split(" ")
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Nombre y/o segundo nombre del contacto.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`contact.${index}.name.family`}
                              defaultValue=""
                              render={({ field }): ReactElement => (
                                <FormItem className="w-100 py-3 px-5 font-medium">
                                  <FormLabel>Apellido</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={
                                        "Ingresa el Apellido del contacto."
                                      }
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Apellido del contacto.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              // key={field.id}
                              control={form.control}
                              name={`contact.${index}.telecom.0.value`}
                              defaultValue=""
                              render={({ field }): ReactElement => (
                                <FormItem className="w-100 py-3 px-5 font-medium">
                                  <FormLabel>Teléfono</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={
                                        "Ingresa el teléfono del contacto."
                                      }
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Teléfono o celular del contacto.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`contact.${index}.telecom.1.value`}
                              defaultValue=""
                              render={({ field }): ReactElement => (
                                <FormItem className="w-100 py-3 px-5 font-medium">
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={
                                        "Ingresa el email del contacto."
                                      }
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Email del contacto.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex gap-2 p-5">
                            <Button type="button" onClick={() => append({})}>
                              Add Contact
                            </Button>
                            <Button
                              className="bg-destructive"
                              type="button"
                              onClick={() => remove(index)}
                            >
                              Remove Contact
                            </Button>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="flex justify-end pt-5">
                  <Button className="shadow-xl self-end" type="submit">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
