"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import IdentifierInput from "@/features/companies/create_companies/components/identifierInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import AliasInput from "./alias";

const OrganizationInput = () => {
  return (
    <div className="border-2 border-black rounded my-4 mx-6">
      <div className="my-2 mx-2" >

        <Input placeholder="Tipo de recurso" type="text" />
        <IdentifierInput />
        <Label htmlFor="terms1" className="my-2 mr-1">Activo</Label>
        <Checkbox id="terms1"/>
        <Input placeholder="Nombre organización" type="text" className="my-2"/>
        <AliasInput />
      </div>
    </div>
  );
};

export default OrganizationInput;
