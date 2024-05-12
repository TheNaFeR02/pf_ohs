"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { Patient, patientSchema } from "./types/Patient";
import { useFieldArray, useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { CameraIcon } from "@radix-ui/react-icons"
import { TargetIcon } from "@radix-ui/react-icons"
import Webcam from "react-webcam";
// import { Matcher } from "react-day-picker";

const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user"
};

export default function PatientForm() {
  const form = useForm<Patient>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      resourceType: 'Patient',
      // identifier: [],
      active: true,
      name: [{ family: "", given: "" }],
      telecom: [
        {
          system: "phone",
          value: ""
        },
        {
          system: "email",
          value: ""
        }
      ],
      gender: 'male',
      birthDate: new Date(),
      address: [
        {
          text: "",
          city: "",
          district: "",
          country: ""
        }
      ],
      maritalStatus: { text: 'soltero' },
      photo: [
        {
          data: "",
        }
      ],
      contact: [
        {
          name: {
            family: "Barbosa",
            given: "Dayanna"
          },
          telecom: [
            {
              system: "phone",
              value: "3004595355"
            },
            {
              system: "email",
              value: "dayannamin0903@gmail.com"
            }
          ],
          address: {
            text: "Calle 50 # 27 -48",
            city: "Barranquilla",
            district: "Atlántico",
            country: "170"
          },
          gender: "female"
        }
      ], //use field array
      managingOrganization: {
        reference: "/Organization/55",
        display: "Medicina Laboral de la Costa IPS S.A.S."
      }
    }
  })

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control: form.control,
    name: 'contact',
  })

  function onSubmit(values: Patient) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // We append the photo data to the final values.
    const finalValues = {
      ...values,
      photo: [{ data: url }]
    }
    console.log(finalValues)
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
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full">

          <div className="border-b border-stroke px-6.5">
            <h3 className="font-medium">
              Creación del Paciente
            </h3>
          </div>

          <div className="rounded-2xl border shadow-default bg-white mt-4">
            <div className="flex pr-2 pl-5 pt-5">
              <div className="flex flex-col justify-center pt-4 gap-14">

                <div className="w-1/2 h-40 pl-5">
                  <div className="mt-4 border-dashed border-2 w-1/2 h-full">

                    <div className="picture flex justify-center items-center w-full h-full">
                      {isCaptureEnable &&
                        <Webcam
                          audio={false}
                          width={540}
                          height={360}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          videoConstraints={videoConstraints}
                        />
                      }
                      {url && isCaptureEnable === false && <img src={url} alt="Captured" />}
                      {/* <div className="relative z-1 upload-file border-solid border-x border-y h-3 w-3"></div> */}
                      {/* {image && <img src={image} alt="Captured" />}
                    {showVideo && !image && <video className="video" ref={videoRef} autoPlay></video>} */}
                    </div>

                    <div className="camera-options inline-flex">
                      <div className="start-camera pt-3  w-10 h-10 flex justify-center items-center"><CameraIcon onClick={() => setCaptureEnable(!isCaptureEnable)} width="24" height="24" /></div>
                      <div className="capture-photo pt-3 w-10 h-10 flex justify-center items-center"><TargetIcon onClick={capture} width="24" height="24" /></div>
                    </div>


                    {/* <canvas ref={canvasRef} className="hidden"></canvas> This canvas can be hidden; it's just used to grab frames */}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 grid-cols-1">
                  <FormField
                    control={form.control}
                    name={'name.0.given'}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder={"Ingresa el Nombre del paciente."} {...field} />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={'name.0.family'}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder={"Ingresa el Apellido del Paciente."} {...field} />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={'telecom.0.value'}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input placeholder={"Ingresa el teléfono del Paciente."} {...field} />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={'telecom.1.value'}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder={"Ingresa el email del Paciente."} {...field} />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={'gender'}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Sexo</FormLabel>
                        <Select
                          onValueChange={field.onChange} defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={'Selecciona el género.'} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={"male"}>Hombre</SelectItem>
                            <SelectItem value={"female"}>Mujer</SelectItem>
                            <SelectItem value={"other"}>Otro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {/* You can manage identification types in your settings. */}
                        </FormDescription>
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
                        <FormLabel>Date of birth</FormLabel>
                        <Popover >
                          <PopoverTrigger asChild>
                            <FormControl >
                              <Button
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
                              selected={field.value} // selected now expects a string as well(module augmentation), but this is only because z.date is required in the schema for the calendar to work, but at the same time FHIR is neccesary to validate using z.string.regex() 
                              onSelect={field.onChange}
                              // onSelect={(date) => field.onChange(date as Matcher)}
                              disabled={(date: Date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Your date of birth is used to calculate your age.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* ... */}

                  <FormField
                    control={form.control}
                    name={'address.0.text'}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Input placeholder={"Ingresa la dirección"} {...field} />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={'address.0.city'}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Input placeholder={"Ingresa la ciudad"} {...field} />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={'address.0.district'}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Departamento</FormLabel>
                        <FormControl>
                          <Input placeholder={"Ingresa el departamento"} {...field} />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={'maritalStatus.text'}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Estado Civil</FormLabel>
                        <Select
                          onValueChange={field.onChange} defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={'Selecciona el género.'} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={"soltero"}>Soltero/a</SelectItem>
                            <SelectItem value={"casado"}>Casado/a</SelectItem>
                            <SelectItem value={"union_libre"}>Unión Libre</SelectItem>
                            <SelectItem value={"separado"}>Separado/a</SelectItem>
                            <SelectItem value={"divorciado"}>Divorciado/a</SelectItem>
                            <SelectItem value={"viudo"}>Viudo/a</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <fieldset className="border border-solid border-opacity-60 rounded-lg p-3 mb-5 w-full col-span-full">
                    <legend className="text-sm opacity-60">Información de contacto</legend>
                    <div className="">
                      {fields.map((field, index) => (
                        <React.Fragment key={index}>
                          <div key={field.id} className="grid sm:grid-cols-2 grid-cols-1">
                            <FormField
                              // key={field.id}
                              control={form.control}
                              name={`contact.${index}.name.given`}
                              defaultValue=""
                              render={({ field }): ReactElement => (
                                <FormItem className="w-100 py-3 px-5 font-medium">
                                  <FormLabel>Nombre</FormLabel>
                                  <FormControl>
                                    <Input placeholder={"Ingresa el Nombre del contacto."} {...field} />
                                  </FormControl>
                                  <FormDescription>

                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              // key={field.id}
                              control={form.control}
                              name={`contact.${index}.name.family`}
                              defaultValue=""
                              render={({ field }): ReactElement => (
                                <FormItem className="w-100 py-3 px-5 font-medium">
                                  <FormLabel>Apellido</FormLabel>
                                  <FormControl>
                                    <Input placeholder={"Ingresa el Apellido del contacto."} {...field} />
                                  </FormControl>
                                  <FormDescription>

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
                                    <Input placeholder={"Ingresa el teléfono del contacto."} {...field} />
                                  </FormControl>
                                  <FormDescription>

                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              // key={field.id}
                              control={form.control}
                              name={`contact.${index}.telecom.1.value`}
                              defaultValue=""
                              render={({ field }): ReactElement => (
                                <FormItem className="w-100 py-3 px-5 font-medium">
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder={"Ingresa el email del contacto."} {...field} />
                                  </FormControl>
                                  <FormDescription>

                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex gap-2 p-5">
                            <Button type="button" onClick={() => append({})}>Add Contact</Button>
                            <Button className="bg-destructive" type="button" onClick={() => remove(index)}>Remove Contact</Button>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </fieldset>

                </div>

                <div className="flex justify-end pt-5">
                  <Button className="shadow-xl self-end"
                    type="submit">Submit</Button>
                </div>

              </div>
            </div>
          </div>
        </div>




      </form>
    </Form >
  )
}