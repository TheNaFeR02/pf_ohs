"use client";
import React, { FunctionComponent } from "react";
import { Input } from "@/components/ui/input";
import { Control, FieldArrayWithId, useFormContext } from "react-hook-form";
import { Coding } from "@/types/Coding";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Resource } from "@/types/Resource";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { identifierUseObj } from "@/constants/identifierUseCodeDisplay";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import CodeableConceptFormField from "./CodeableConceptFormField";
import PeriodFormField from "./PeriodFormField";

interface CodingFormFieldProps {
  index: number;
  codingFields: FieldArrayWithId<any, "coding", "id">[];
  control: Control<any>;
  addNewCoding: () => void;
  removeCoding: (index: number) => void;
}

function CodingFormField({
  index,
  codingFields,
  control,
  addNewCoding,
  removeCoding,
}: CodingFormFieldProps) {

  return (
    <div className="space-y-4">
      <Accordion type="multiple">
        <AccordionItem value={codingFields[index].id}>
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeCoding(index)}
            >
              <TrashIcon color="red" />
            </Button>
            <div>
              <AccordionTrigger>Coding {index}</AccordionTrigger>
            </div>
          </div>
          <AccordionContent>
            <FormField
              control={control}
              name={`coding.${index}.system`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>System</FormLabel>
                  <FormControl>
                    <Input placeholder="System URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`coding.${index}.version`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Version</FormLabel>
                  <FormControl>
                    <Input placeholder="Version" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`coding.${index}.code`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`coding.${index}.display`}
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

            <FormField
              control={control}
              name={`coding.${index}.userSelected`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>user Selected?</FormLabel>

                  <FormMessage />
                </FormItem>
              )}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default CodingFormField;
