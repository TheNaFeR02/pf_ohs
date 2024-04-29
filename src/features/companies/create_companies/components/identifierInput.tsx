import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const IdentifierInput = () => {
    return (
      <Card className="my-5">
        <CardHeader>
          <CardTitle>Identificador</CardTitle>
          <CardDescription>Ingrese la información de la organización</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-row mx-2 my-2">
                <Input placeholder="Uso" type="text" className="mr-5"/>
                <Input placeholder="Sistema Ej(https://www.rues.org.co)" type="text" className="mr-5"/>
                <Input placeholder="NIT" type="text" className=""/>
            </div>
        </CardContent>
      </Card>
    );
};

export default IdentifierInput;