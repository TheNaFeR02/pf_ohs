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

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const IdentifierInput = () => {
  const [position, setPosition] = React.useState("bottom")
    return (
      <Card className="my-5">
        <CardHeader>
          <CardTitle>Identificador</CardTitle>
          <CardDescription>Ingrese la información de la organización</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-row mx-2 my-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Seleccionar Uso</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                      <DropdownMenuRadioItem value="usual">Habitual</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="official">Oficial</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="temp">Temporal</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="secondary">Secundario</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="old">Viejo</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Input placeholder="Sistema Ej(https://www.rues.org.co)" type="text" className="ml-5 mr-5"/>
                <Input placeholder="NIT" type="text" className=""/>
            </div>
        </CardContent>
      </Card>
    );
};

export default IdentifierInput;