"use client";
import React, { FunctionComponent } from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Appointment, appointmentSchema } from "@/types/Appointment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const AppointmentFormField: FunctionComponent = () => {
  
  const { control, watch, setValue } = useFormContext<Appointment>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participant",
  });

  const appendParticipant = () => {
    append({
      type: [],
      actor: {
        reference: "",
      },
      required: "required",
      status: "accepted",
      period: {
        start: "",
        end: "",
      },
    });
  };

  const removeParticipant = (index: number) => {
    remove(index);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "proposed",
                    "pending",
                    "booked",
                    "arrived",
                    "fulfilled",
                    "cancelled",
                    "noshow",
                    "entered-in-error",
                    "checked-in",
                    "waitlist",
                  ].map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input placeholder="Description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="cancelationReason.text"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cancelation Reason</FormLabel>
            <FormControl>
              <Input placeholder="Cancelation Reason" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="priority"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Priority</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Priority" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="start"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Start</FormLabel>
            <FormControl>
              <Input type="datetime-local" {...field} />
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
              <Input type="datetime-local" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="minutesDuration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Minutes Duration</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Minutes Duration" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="comment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Comment</FormLabel>
            <FormControl>
              <Input placeholder="Comment" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="patientInstruction"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Patient Instruction</FormLabel>
            <FormControl>
              <Input placeholder="Patient Instruction" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="created"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Created</FormLabel>
            <FormControl>
              <Input type="datetime-local" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="button" onClick={() => appendParticipant()}>
        Add Participant
      </Button>
      <FormField
        control={control}
        name="participant"
        render={(field) => (
          <FormItem>
            {field.fieldState.error && (
              <div className="text-[0.8rem] font-medium text-destructive">
                At least one participant is required{" "}
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        {fields.map((participant, index) => (
          <div key={participant.id} className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Participant {index + 1}</h2>
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeParticipant(index)}
              >
                Remove Participant
              </Button>
            </div>
            <FormField
              control={control}
              name={`participant.${index}.type.0.text`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`participant.${index}.actor.reference`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Actor</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`participant.${index}.required`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Required</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select required" />
                      </SelectTrigger>
                      <SelectContent>
                        {["required", "optional", "information-only"].map(
                          (required) => (
                            <SelectItem key={required} value={required}>
                              {required}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`participant.${index}.status`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "accepted",
                          "declined",
                          "tentative",
                          "needs-action",
                        ].map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`participant.${index}.period.start`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`participant.${index}.period.end`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
          </div>
        ))}
      </div>
      <FormField
        control={control}
        name="requestedPeriod.0.start"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Requested Period</FormLabel>
            <FormControl>
              <Input type="datetime-local" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AppointmentFormField;
