"use client";
import React, { FunctionComponent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Control, useFieldArray, useFormContext } from "react-hook-form";
import { CodeableConcept } from "@/types/CodeableConcept";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import CodingFormField from "@/features/practitioners/components/Other/CodingFromField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ItemsFormField from "@/features/questionnaire_creator/components/ItemsFormField";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import IdentifierFormField from "./IdentifierFormField";

interface CodeableConceptFormFieldProps {
  control: Control<any>;
}
function CodeableConceptFormField({ control }: CodeableConceptFormFieldProps) {
  const {
    fields: codingFields,
    append: codingAppend,
    remove: codingRemove,
  } = useFieldArray({
    control,
    name: "coding",
  });

  const addNewCoding = () => {
    codingAppend({
      system: "",
      version: "",
      code: "",
      display: "",
      userSelected: false,
    });
  };

  const removeCoding = (index: number) => {
    codingRemove(index);
  };

  return (
    <div className="space-y-4">
      <Accordion type="multiple">
        <AccordionItem value="Codeable Concept">
          <AccordionTrigger>Codeable Concept</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="space-y-4">
                {/* Codings */}
                <Accordion type="multiple">
                  <AccordionItem value="identifier">
                    <div className="flex justify-between items-center">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => addNewCoding()}
                      >
                        <PlusIcon />
                      </Button>
                      <div>
                        <AccordionTrigger>Codings</AccordionTrigger>
                      </div>
                    </div>
                    <AccordionContent>
                      <div className="grid gap-4 grid-cols-1 ">
                        {codingFields.map((coding, index) => (
                          <Accordion
                            type="multiple"
                            defaultValue={[coding.id]}
                            key={coding.id}
                          >
                            <AccordionItem value={coding.id}>
                              <AccordionContent>
                                <CodingFormField
                                  control={control}
                                  index={index}
                                  codingFields={codingFields}
                                  addNewCoding={addNewCoding}
                                  removeCoding={removeCoding}
                                />
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <FormField
                  control={control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Text</FormLabel>
                      <FormControl>
                        <Input placeholder="Text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default CodeableConceptFormField;
