"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Control, FieldArrayWithId, useFieldArray } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { TrashIcon } from "@radix-ui/react-icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { identifierUseObj } from "@/constants/identifierUseCodeDisplay";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PeriodFormField from "./PeriodFormField";
import CodeableConceptFormField from "./CodeableConceptFormField";

interface IdentifierFormFieldProps {
  index: number;
  identifierFields: FieldArrayWithId<any, "identifier", "id">[];
  control: Control<any>;
  addNewIdentifier: () => void;
  removeIdentifier: (index: number) => void;
}

function IdentifierFormField({
  index,
  identifierFields,
  control,
  addNewIdentifier,
  removeIdentifier,
}: IdentifierFormFieldProps) {
  return (
    <div className="space-y-4">
      <Accordion type="multiple">
        <AccordionItem value={identifierFields[index].id}>
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeIdentifier(index)}
            >
              <TrashIcon color="red" />
            </Button>
            <div>
              <AccordionTrigger>Identifier {index}</AccordionTrigger>
            </div>
          </div>
          <AccordionContent>
            <FormField
              control={control}
              name={`identifier.${index}.use`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Use</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Use" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {identifierUseObj.map((use) => (
                        <SelectItem key={use.code} value={use.code}>
                          {use.display}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CodeableConceptFormField control={control} />
            
            <FormField
              control={control}
              name={`identifier.${index}.system`}
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
              name={`identifier.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input placeholder="Value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PeriodFormField control={control} />

            {/* Change for import component */}
            {/* <ReferenceFormField /> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default IdentifierFormField;
