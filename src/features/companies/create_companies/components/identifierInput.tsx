import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const IdentifierInput = () => {
    return (
      <div className=" my-5 mx-10 border-2 border-black rounded" >
        <Label className="mx-2 my-2">Identificador</Label>
        <div className="flex flex-row mx-2 my-2">
            <Input placeholder="Uso" type="text" className="mr-5"/>
            <Input placeholder="Sistema Ej(https://www.rues.org.co)" type="text" className="mr-5"/>
            <Input placeholder="NIT" type="text" className=""/>
        </div>
  
      </div>
    );
};

export default IdentifierInput;