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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const ContactInput = () => {
  const [contacts, setContacts] = useState([{ id: 1 }]);

  const addContact = () => {
    const newId = contacts.length + 1;
    setContacts([...contacts, { id: newId }]);
  };

  const removeContact = (idToRemove: number) => {
    setContacts(contacts.filter(contact => contact.id !== idToRemove));
  };

  const [positionsystem, setPositionsystem] = React.useState("bottom")
  const [positionusetypetel, setPositionusetypetel] = React.useState("bottom")
  const [positionusetypedir, setPositionusetypedir] = React.useState("bottom")
  const [positionusetypename, setPositionusetypename] = React.useState("bottom")


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
            <DropdownMenu key={`contact-${contact.id}-system`} >
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Seleccionar Sistema</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" >
                    <DropdownMenuRadioGroup value={positionsystem} onValueChange={setPositionsystem} >
                      <DropdownMenuRadioItem value="phone">Teléfono</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="fax">Fax</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="email">Email</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="pager">Buscapersonar - Pager</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="url">URL</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="sms">Sms</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="other">Otro</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              <Input
                id={`contact-${contact.id}-numero`}
                placeholder="Numero"
                type="text"
                className="ml-10 mr-10"
              />
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Seleccionar Uso</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" >
                    <DropdownMenuRadioGroup value={positionusetypetel} onValueChange={setPositionusetypetel} >
                      <DropdownMenuRadioItem value="home">Casa</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="work">Trabajo</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="temp">Temporal</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="old">Viejo</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="billing">Facturación</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Label htmlFor={`contact-${contact.id}-direccion`} className="my-2 mr-1">
              Dirección
            </Label>
            <div className="flex flex-row mx-2 my-2">
            <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Seleccionar Uso</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" >
                    <DropdownMenuRadioGroup value={positionusetypedir} onValueChange={setPositionusetypedir} >
                      <DropdownMenuRadioItem value="home">Casa</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="work">Trabajo</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="temp">Temporal</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="old">Viejo</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="billing">Facturación</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              <Input
                id={`contact-${contact.id}-direccion`}
                placeholder="Dirección"
                type="text"
                className="ml-5 mr-5"
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
            <Label htmlFor={`contact-${contact.id}-direccion`} className="my-2 mr-1">
              Nombre Persona
            </Label>
            <div className="flex flex-row mx-2 my-2">
            <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Seleccionar Uso</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" >
                    <DropdownMenuRadioGroup value={positionusetypename} onValueChange={setPositionusetypename} >
                      <DropdownMenuRadioItem value="usual">Usual</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="official">Oficial</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="temp">Temporal</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="nickname">Apodo</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="anonymous">Anonimo</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="old">Viejo</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="maiden">Doncella</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              <Input
                id={`contact-${contact.id}-fullname`}
                placeholder="Nombre"
                type="text"
                className="ml-5 mr-5"
                />
              <Input
                id={`contact-${contact.id}-surname`}
                placeholder="Apellido"
                type="text"
                className="mr-5"
                />
              <Input
                id={`contact-${contact.id}-given`}
                placeholder="Segundo nombre"
                type="text"
                className="mr-5"
                />
              <Input
                id={`contact-${contact.id}-prefix`}
                placeholder="Prefijo"
                type="text"
                className=""
                />
            </div>
            {index !== 0 && (
              <Button onClick={() => removeContact(contact.id) } className="ml-2 my-1 mx-2 bg-red-500 text-white rounded hover:bg-red-700">
                Eliminar contacto
              </Button>
            )}
          </div>
          
        ))}
        {contacts.length < 3 && (
        <Button onClick={addContact} className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 mx-4 rounded mt-2" >
          Agregar otro contacto
        </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactInput;
