import React, { FunctionComponent, forwardRef } from "react";
import useItemsFormField from "./useItemsFormField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

interface ItemsFormFieldProps {
  prefix?: string;
}

const ItemsFormField: FunctionComponent<ItemsFormFieldProps> = ({
  prefix = "",
}) => {
  const {
    fields,
    register,
    addNewItem,
    removeItem,
    linkIdInputPath,
    textInputPath,
    typeInputPath,
  } = useItemsFormField(prefix);

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="space-x-8">
          <Input {...register(linkIdInputPath)} placeholder="linkId" />
          <Input {...register(textInputPath)} placeholder="text" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup {...register(typeInputPath)}>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="integer">Integer</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* <Button onClick={adsdNewItem}>+</Button> */}
          <Button variant="destructive" onClick={() => removeItem(index)}>
            -
          </Button>
          <ItemsFormField prefix={`${prefix}items.${index}.`} />
        </div>
      ))}
      <Button onClick={addNewItem}>+</Button>
    </div>
  );
};

export default ItemsFormField;
