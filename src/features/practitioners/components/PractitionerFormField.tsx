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
import React, { ReactElement, useCallback, useRef, useState } from "react";
import { Practitioner } from "@/types/Practitioner";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CameraIcon, TargetIcon } from "@radix-ui/react-icons";
import Webcam from "react-webcam";
import Image from "next/image";
import { administrativeGenderObj } from "@/constants/administrativeGenderCodeDisplay";
import { Checkbox } from "@/components/ui/checkbox";

const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user",
};

export default function PractitionerFormField() {
  const { control, setValue } = useFormContext<Practitioner>();

  // camera: https://dev.to/sababg/react-webcam-typescript-gh2
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);

  const capture = useCallback(() => {
    setCaptureEnable(false);
    const imageSrc = webcamRef.current?.getScreenshot();
    const imageData = imageSrc?.split(",")[1];
    if (imageSrc) {
      setUrl(imageSrc);
      setValue("photo.0.data", imageData);
      setValue("photo.0.contentType", "image/jpeg");
    }
  }, [webcamRef, setValue]);

  return (
    <div className="space-y-4">
      <div className="w-72 h-72 flex justify-center items-center mx-auto">
        <div className="mt-4 border-dashed border-4 w-72 h-64">
          <div className="picture flex justify-center items-center w-full h-full">
            {isCaptureEnable && (
              <Webcam
                audio={false}
                width={360}
                height={360}
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
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Enter the first name."}
                  {...field}
                  onChange={(e) => {
                    const names = e.target.value.split(" ");
                    field.onChange(names);
                  }}
                  value={field.value?.join(" ") ? field.value?.join(" ") : ""}
                />
              </FormControl>
              <FormDescription>
                First and/or middle name of the practitioner.
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
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder={"Enter the last name."} {...field} />
              </FormControl>
              <FormDescription>Last name of the practitioner.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={"telecom.0.value"}
          render={({ field }): ReactElement => (
            <FormItem className="w-100 py-3 px-5 font-medium">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Enter the phone number."}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setValue("telecom.0.system", "phone");
                  }}
                />
              </FormControl>
              <FormDescription>
                Phone number of the practitioner.
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
                  placeholder={"Enter the email."}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setValue("telecom.1.system", "email");
                  }}
                />
              </FormControl>
              <FormDescription>Email of the practitioner.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={"gender"}
          render={({ field }): ReactElement => (
            <FormItem className="w-100 py-3 px-5 font-medium">
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"Select gender."} />
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
              <FormDescription>Gender of the practitioner.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col w-100 py-3 px-5 font-medium">
              <FormLabel>Birth Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Enter the birth date."
                  {...field}
                />
              </FormControl>
              <FormDescription>Birth date of the practitioner.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={"address.0.text"}
          render={({ field }): ReactElement => (
            <FormItem className="w-100 py-3 px-5 font-medium">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder={"Enter the address."} {...field} />
              </FormControl>
              <FormDescription>Address of the practitioner.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={"address.0.city"}
          render={({ field }): ReactElement => (
            <FormItem className="w-100 py-3 px-5 font-medium">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder={"Enter the city."} {...field} />
              </FormControl>
              <FormDescription>City of the practitioner.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={"address.0.state"}
          render={({ field }): ReactElement => (
            <FormItem className="w-100 py-3 px-5 font-medium">
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder={"Enter the state."} {...field} />
              </FormControl>
              <FormDescription>State of the practitioner.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={"address.0.postalCode"}
          render={({ field }): ReactElement => (
            <FormItem className="w-100 py-3 px-5 font-medium">
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder={"Enter the postal code."} {...field} />
              </FormControl>
              <FormDescription>
                Postal code of the practitioner.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={"address.0.country"}
          render={({ field }): ReactElement => (
            <FormItem className="w-100 py-3 px-5 font-medium">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder={"Enter the country."} {...field} />
              </FormControl>
              <FormDescription>Country of the practitioner.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Active */}
        <FormField
          control={control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start w-100 py-3 px-5 font-medium space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Active
                </FormLabel>
                <FormDescription>
                  Whether this practitioners record is in active use.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />


        {/* Qualification */}
        {/* <FormField
          control={control}
          name={"qualification.0.code.text"}
          render={({ field }): ReactElement => (
            <FormItem className="w-100 py-3 px-5 font-medium">
              <FormLabel>Qualification</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Enter the qualification."}
                  {...field}
                />
              </FormControl>
              <FormDescription>Qualification of the practitioner.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={"qualification.0.issuer.display"}
          render={({ field }): ReactElement => (
            <FormItem className="w-100 py-3 px-5 font-medium">
              <FormLabel>Issuer</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Enter the issuer."}
                  {...field}
                />
              </FormControl>
              <FormDescription>Issuer of the qualification.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </div>
    </div>
  );
}
