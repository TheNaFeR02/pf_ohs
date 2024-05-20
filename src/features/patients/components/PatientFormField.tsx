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
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Patient, patientSchema } from "@/types/Patient";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
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
import { createResource, createResourceProps } from "@/server/createResource";
import { useRouter } from "next/navigation";
import { getResourceBundle } from "@/server/getResourceBundle";
import { Bundle, BundleEntry } from "@/types/Bundle";
import { Organization } from "@/types/Organization";

const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user",
};

export default function PatientForm() {
  const [entryData, setEntryData] = useState<BundleEntry<Organization>[]>([]);
  const { control, setValue } = useFormContext<Patient>();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "contact",
  });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getResourceBundle({ resourceType: "Organization" });
        setEntryData(res.entry || []);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <div className="w-72 h-72 flex justify-center items-center mx-auto">
        <div className="mt-4 border-dashed border-4 w-72 h-64">
          <div className="picture flex justify-center items-center w-full h-full">
            {isCaptureEnable && (
              <Webcam
                audio={false}
                width={360} //540
                height={360} //360
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
            )}
            {url && isCaptureEnable === false && (
              <Image src={url} alt="Captured" width={540} height={360} />
            )}
          </div>
        </div>
        <div className="camera-options inline-block">
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
      <div className="grid sm:grid-cols-2 grid-cols-1">
        <FormField
          control={control}
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
                  value={field.value?.join(" ") ? field.value?.join(" ") : ""}
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
          control={control}
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
              <FormDescription>Apellidos del paciente.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
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
          control={control}
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
          control={control}
          name={"gender"}
          render={({ field }): ReactElement => (
            <FormItem className="w-100 py-3 px-5 font-medium">
              <FormLabel>Sexo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"Selecciona el género."} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {administrativeGenderObj.map(({ code, display }) => (
                    <SelectItem key={code} value={code}>
                      {display}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Género del paciente.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* birthdate */}
        <FormField
          control={control}
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
                      field.value instanceof Date ? field.value : undefined
                    }
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
                Fecha de nacimiento del paciente.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={"address.0.text"}
          render={({ field }): ReactElement => (
            <FormItem className="w-100 py-3 px-5 font-medium">
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder={"Ingresa la dirección"} {...field} />
              </FormControl>
              <FormDescription>
                Dirección de residencia del paciente.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
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
          control={control}
          name={"address.0.district"}
          render={({ field }): ReactElement => (
            <FormItem className="w-100 py-3 px-5 font-medium">
              <FormLabel>Departamento</FormLabel>
              <FormControl>
                <Input placeholder={"Ingresa el departamento"} {...field} />
              </FormControl>
              <FormDescription>
                Departamento de residencia del paciente.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
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
                <FormDescription>Estado civil del paciente.</FormDescription>
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
              <div key={field.id}>
                <div className="grid sm:grid-cols-2 grid-cols-1">
                  <FormField
                    control={control}
                    name={`contact.${index}.name.given`}
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"Ingresa el Nombre del contacto."}
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value.split(" "))
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
                    control={control}
                    name={`contact.${index}.name.family`}
                    defaultValue=""
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"Ingresa el Apellido del contacto."}
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
                    control={control}
                    name={`contact.${index}.telecom.0.value`}
                    defaultValue=""
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"Ingresa el teléfono del contacto."}
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
                    control={control}
                    name={`contact.${index}.telecom.1.value`}
                    defaultValue=""
                    render={({ field }): ReactElement => (
                      <FormItem className="w-100 py-3 px-5 font-medium">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"Ingresa el email del contacto."}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Email del contacto.</FormDescription>
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
                    variant='destructive'
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Remove Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </fieldset>
        <fieldset className="border border-solid border-opacity-60 rounded-lg p-3 mb-5 w-full col-span-full">
          <legend className="text-sm opacity-60">
            Información de la organización
          </legend>
          <div className="grid sm:grid-cols-2 grid-cols-1">
            <FormField
              control={control}
              name={"managingOrganization.reference"}
              render={({ field }): ReactElement => (
                <FormItem className="w-100 py-3 px-5 font-medium">
                  <FormLabel>Referencia</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={"Selecciona la organización"}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {entryData.map((item, index) => (
                        <SelectItem
                          key={index}
                          value={`Organization/${item.resource?.id}` ?? ""}
                          onChange={() =>
                            setValue(
                              "managingOrganization.display",
                              item.resource?.name
                            )
                          }
                        >
                          {item.resource?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Referencia de la organización.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>
      </div>
    </div>
  );
}
