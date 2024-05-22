import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useMemo, useState } from "react"
import { Patient, patientSchema } from "@/types/Patient"
import { useRouter } from "next/navigation";
import { getResource } from "@/server/getResource";
import { updateResource } from "@/server/updateResource";
import { DataTable } from "@/components/DataTable/DataTable";
import { BundleEntry } from "@/types/Bundle";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getpatientsbyorg } from "@/server/getpatientsbyorg"

export function Dashboardpatient({ id }: { id: string }) {
  const router = useRouter();
  const defaultPhoto =
  "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";
  const form = useForm<Patient>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      resourceType: "Patient",
      active: true,
      name: [{ family: "Garcia", given: ["Fernando", "Acuña"] }],
      telecom: [
        {
          system: "phone",
          value: "3114002600",
        },
        {
          system: "email",
          value: "acunafer.02@gmail.com",
        },
      ],
      gender: "male",
      birthDate: new Date(),
      address: [
        {
          text: "Calle 64 # 45 - 23",
          city: "Barranquilla",
          district: "Atlántico",
          country: "Colombia",
        },
      ],
      photo: [
        {
          data: defaultPhoto,
        },
      ],
      contact: [
        {
          name: {
            family: "Barbosa",
            given: ["Dayanna"],
          },
          telecom: [
            {
              system: "phone",
              value: "3004595355",
            },
            {
              system: "email",
              value: "dayannamin0903@gmail.com",
            },
          ],
          address: {
            text: "Calle 50 # 27 -48",
            city: "Barranquilla",
            district: "Atlántico",
            country: "170",
          },
          gender: "female",
        },
      ], //use field array
      managingOrganization: {
        reference: "/Organization/55",
        display: "Medicina Laboral de la Costa IPS S.A.S.",
      },
    },
  });

  try {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getResource({
            id: id,
            resourceType: "Patient",
            schema: patientSchema,
          });
          console.log(data);
          if (data !== null) {
            form.reset(data);
          }
        } catch (error) {
          console.error("Error fetching organization data:", error);
        }
      };

      fetchData();
    }, [form, id]);
  } catch (error) {
    console.error("Error fetching organization data:", error);
  }

  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contact",
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link href="#" className="hover:text-foreground">
                Dashboard
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Patient Name
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{form.getValues("name")?.[0]?.given?.join(" ") + " " + form.getValues("name")?.[0]?.family}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Patient Name
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{control._defaultValues.managingOrganization?.display}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gender | Birthdate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{control._defaultValues.gender + " | " +
    (control._defaultValues.birthDate !== undefined
      ? new Date(control._defaultValues.birthDate).toLocaleDateString()
      : "No birth date available")}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Patient</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{control._defaultValues.active ? "Active" : "Inactive"}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Other contact details</CardTitle>
                <CardDescription>
                secondary contacts.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {/*parte de contact telecom*/}
                <p className="mb-2">Contact Information Telecom</p>
              <Table className="mb-5">
                <TableHeader>
                  <TableRow>
                    <TableHead>Given</TableHead>
                    <TableHead>Family</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
              {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell >
                        <div className="font-medium">{field.name?.given}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.name?.family}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/*parte de contact name*/}
              <p className="mb-2">Contact Information Name</p>
              <Table className="mb-5">
                <TableHeader>
                  <TableRow>
                    <TableHead>Phone contact</TableHead>
                    <TableHead>Email contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <div className="font-medium">{field.telecom?.[0]?.value}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.telecom?.[1]?.value}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/*parte de contact address*/}
              <p className="mb-2">Contact Information Address</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Address</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Country</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <div className="font-medium">{field.address?.text}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.address?.city}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.address?.district}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.address?.country}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Contact Information Patient</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
            <Avatar className="hidden h-9 w-9 sm:flex">
                    {/* Puedes modificar esto según cómo obtengas la imagen del paciente */}
                    <AvatarImage src={`data:image/png;base64,${control._defaultValues.photo?.[0]?.data}`} alt="Avatar" />
                    <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        {control._defaultValues.telecom?.[0]?.system 
          ? `${control._defaultValues.telecom[0].system}: ${control._defaultValues.telecom[0].value}` 
          : 'No telecom information available'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Telecom Information
                    </p>
                    </div>
                    <div className="ml-auto font-medium">{/* Puedes poner el importe aquí */}</div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        {control._defaultValues.telecom?.[1]?.system 
          ? `${control._defaultValues.telecom[1].system}: ${control._defaultValues.telecom[1].value}` 
          : 'No telecom information available'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Telecom Information
                    </p>
                    </div>
                    <div className="ml-auto font-medium">{/* Puedes poner el importe aquí */}</div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        {control._defaultValues.address?.[0]?.text}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Address Information
                    </p>
                    </div>
                    <div className="ml-auto font-medium">{/* Puedes poner el importe aquí */}</div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        {control._defaultValues.address?.[0]?.city}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        City
                    </p>
                    </div>
                    <div className="ml-auto font-medium">{/* Puedes poner el importe aquí */}</div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        {control._defaultValues.address?.[0]?.district}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        District
                    </p>
                    </div>
                    <div className="ml-auto font-medium">{/* Puedes poner el importe aquí */}</div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        {control._defaultValues.address?.[0]?.country}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Country
                    </p>
                    </div>
                    <div className="ml-auto font-medium">{/* Puedes poner el importe aquí */}</div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                    {control._defaultValues.maritalStatus?.coding?.[0]?.display !== undefined 
  ? control._defaultValues.maritalStatus?.coding?.[0]?.display 
  : 'No definido'}

                    </p>
                    <p className="text-sm text-muted-foreground">
                        Maritial status
                    </p>
                    </div>
                    <div className="ml-auto font-medium">{/* Puedes poner el importe aquí */}</div>
                </div>
            </CardContent>
            </Card>
        </div>
      </main>
    </div>
  )
}

export default Dashboardpatient
