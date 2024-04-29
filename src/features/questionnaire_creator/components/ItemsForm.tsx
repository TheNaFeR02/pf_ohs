"use client";
import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useItemsForm from "./useItemsForm";
import ItemsFormField from "./ItemsFormField";

const ItemsForm = () => {
  const { handleSubmit, methods } = useItemsForm();

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit}>
        <ItemsFormField prefix="item" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ItemsForm;