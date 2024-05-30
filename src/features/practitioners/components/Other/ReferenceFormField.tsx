"use client";
import React, { FunctionComponent } from "react";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { Reference } from "@/types/Reference";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import IdentifierFormField from "./IdentifierFormField";

const ReferenceFormField: FunctionComponent = () => {
  const { control } = useFormContext<Reference>();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="reference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reference</FormLabel>
            <FormControl>
              <Input placeholder="Refenrece" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* <FormField
        control={control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>End</FormLabel>
            <FormControl>
              <Input placeholder="End" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}

      {/* <IdentifierFormField /> */}

      <FormField
        control={control}
        name="display"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Display</FormLabel>
            <FormControl>
              <Input placeholder="Display" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ReferenceFormField;
