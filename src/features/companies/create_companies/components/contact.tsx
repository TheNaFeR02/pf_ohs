import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContactInput = () => {
  const [contacts, setContacts] = useState([{ id: 1 }]);

  const addContact = () => {
    const newId = contacts.length + 1;
    setContacts([...contacts, { id: newId }]);
  };

  const removeContact = (idToRemove: number) => {
    setContacts(contacts.filter(contact => contact.id !== idToRemove));
  };

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Contacto</CardTitle>
        <CardDescription>
          Ingrese la información de contacto de la organización
        </CardDescription>
      </CardHeader>
      <CardContent>
        {contacts.map((contact, index) => (
          <div key={contact.id}>
            <Label htmlFor={`contact-${contact.id}-telecom`} className="my-2 mr-1">
              Telecom
            </Label>
            <div className="flex flex-row mx-2 my-2">
              <Input
                id={`contact-${contact.id}-telecom`}
                placeholder="Sistema Ej(celular)"
                type="text"
                className="mr-5"
              />
              <Input
                id={`contact-${contact.id}-numero`}
                placeholder="Numero"
                type="text"
                className="mr-5"
              />
              <Input
                id={`contact-${contact.id}-uso`}
                placeholder="Tipo de uso"
                type="text"
                className=""
              />
            </div>
            <Label htmlFor={`contact-${contact.id}-direccion`} className="my-2 mr-1">
              Dirección
            </Label>
            <div className="flex flex-row mx-2 my-2">
              <Input
                id={`contact-${contact.id}-uso-direccion`}
                placeholder="Tipo de uso"
                type="text"
                className="mr-5"
                />
              <Input
                id={`contact-${contact.id}-direccion`}
                placeholder="Dirección"
                type="text"
                className="mr-5"
                />
              <Input
                id={`contact-${contact.id}-ciudad`}
                placeholder="Ciudad"
                type="text"
                className="mr-5"
                />
              <Input
                id={`contact-${contact.id}-codigo-postal`}
                placeholder="Codigo postal"
                type="text"
                className="mr-5"
                />
              <Input
                id={`contact-${contact.id}-pais`}
                placeholder="País"
                type="text"
                className=""
                />
            </div>
            {index !== 0 && ( // Agrega un botón de eliminación solo para contactos adicionales
              <Button onClick={() => removeContact(contact.id) } className="ml-2 my-1 mx-2 bg-red-500 text-white rounded hover:bg-red-700">Eliminar contacto</Button>
            )}
          </div>
          
        ))}
        <Button onClick={addContact} className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 mx-4 rounded mt-2" >Agregar otro contacto</Button>
      </CardContent>
    </Card>
  );
};

export default ContactInput;
