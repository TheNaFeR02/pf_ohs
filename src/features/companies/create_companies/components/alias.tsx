import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AliasInput = () => {
  const [aliases, setAliases] = useState([""]);

  const handleAddAlias = () => {
    if (aliases.length < 3) {
      setAliases([...aliases, ""]);
    }
  };

  const handleRemoveAlias = (index: number) => {
    const newAliases = [...aliases];
    newAliases.splice(index, 1);
    setAliases(newAliases);
  };

  const handleAliasChange = (index: number, value: string) => {
    const newAliases = [...aliases];
    newAliases[index] = value;
    setAliases(newAliases);
  };

  return (
    <div className="flex">
      {aliases.map((alias, index) => (
        <div key={index} className="flex items-center">
          <Input
            placeholder="Alias"
            type="text"
            value={alias}
            onChange={(e) => handleAliasChange(index, e.target.value)}
            className="my-2 w-23"
          />
          <Button
            onClick={() => handleRemoveAlias(index)}
            className="ml-2 my-1 mx-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Eliminar
          </Button>
        </div>
      ))}
      {aliases.length < 3 && (
        <Button
          onClick={handleAddAlias}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 mx-4 rounded mt-2"
        >
          Agregar Alias
        </Button>
      )}
    </div>
  );
};

export default AliasInput;
