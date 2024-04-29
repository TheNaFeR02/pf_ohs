"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import IdentifierInput from "@/features/companies/create_companies/components/identifierInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import AliasInput from "./alias";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ContactInput from "./contact";

const OrganizationInput = () => {
  return (
    <Card className="m-5">
      <CardHeader>
        <CardTitle>Crear compañia</CardTitle>
        <CardDescription>Ingrese la información de la compañia</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="my-4 mx-6">
          <div className="my-2 mx-2" >

            <Input placeholder="Tipo de recurso" type="text" />
            <IdentifierInput />
            <Label htmlFor="terms1" className="my-2 mr-1">Activo</Label>
            <Checkbox id="terms1"/>
            <Input placeholder="Nombre organización" type="text" className="my-2"/>
            <AliasInput />
            <ContactInput/>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationInput;
