"use client";
import React, { FunctionComponent } from "react";
import { Input } from "@/components/ui/input";
import { Control, useFormContext } from "react-hook-form";
import { Period } from "@/types/Period";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import IdentifierFormField from "./IdentifierFormField";

interface PeriodFormFieldProps {
  control: Control<any>;
}

function PeriodFormField({ control }: PeriodFormFieldProps) {
  return (
    <div className="space-y-4">
      {/* Period */}
      <Accordion type="multiple">
        <AccordionItem value="period">
          <AccordionTrigger>Period</AccordionTrigger>
          <AccordionContent>
            <Card className="pt-4">
              <CardContent className="space-y-4">
                <FormField
                  control={control}
                  name="start"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          placeholder="Start"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="end"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          placeholder="End"
                          {...field}
                        />
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

export default PeriodFormField;
