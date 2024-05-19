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
import { getpatientsbyorg } from "../../server/getpatientsbyorg"
import { Patient } from "@/types/Patient"
import { useRouter } from "next/navigation";
import { getResource } from "@/server/getResource";
import { updateResource } from "@/server/updateResource";
import { DataTable } from "@/components/DataTable/DataTable";
import { BundleEntry } from "@/types/Bundle";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Organization, organizationSchema } from "@/types/Organization";

export function Dashboard({ id }: { id: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof organizationSchema>>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      resourceType: "Organization",
      identifier: [
        {
          use: "",
          system: "",
          value: "",
        },
      ],
      active: false,
      name: "",
      alias: ["", "", ""],
      contact: [
        {
          telecom: [
            {
              system: "",
              value: "",
              use: "",
            },
          ],
          name: {
            use: "",
            text: "",
            family: "",
            given: [""],
            prefix: [""],
          },
          address: {
            use: "",
            line: [""],
            city: "",
            postalCode: "",
            country: "",
          },
        },
      ],
    },
  });
  try {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getResource({
            id: id,
            resourceType: "Organization",
            schema: organizationSchema,
          });
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

  const {
    fields: identifierFields,
    append: appendIdentifier,
    remove: removeIdentifier,
  } = useFieldArray({
    control,
    name: "identifier",
  });

  const {
    fields: contactFields,
    append: contactAppend,
    remove: contactRemove,
  } = useFieldArray({
    control,
    name: "contact",
  });

  // Table patients in organization

  const [entryData, setEntryData] = useState<BundleEntry<Patient>[]>([]);

  const tableHeader = {
    title: "Patients",
    description: "Patients in this organization.",
  };

  const addButton = {
    href: "/patients/create",
    label: "Create patient",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getpatientsbyorg({ resourceType: "Patient", id});
        setEntryData(res.entry || []);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };
    fetchData();
  }, []);
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
                Organization Name
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{control._defaultValues.name}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Patients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{entryData.length}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aliases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{control._defaultValues.alias && control._defaultValues.alias
    .filter(alias => alias && alias.trim() !== "") // Filtra los alias que no estén vacíos
    .join(", ")}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Organization</CardTitle>
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
                <CardTitle>Organization Details</CardTitle>
                <CardDescription>
                  Data from the organization.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
            {/*parte de identifier*/}
                <p className="mb-2">Identifier</p>
              <Table className="mb-5">
                <TableHeader>
                  <TableRow>
                    <TableHead>Use</TableHead>
                    <TableHead>System</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {identifierFields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <div className="font-medium">{field.use}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.system}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.value}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/*parte de contact telecom*/}
                <p className="mb-2">Contact Information Telecom</p>
              <Table className="mb-5">
                <TableHeader>
                  <TableRow>
                    <TableHead>Use</TableHead>
                    <TableHead>System</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {contactFields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <div className="font-medium">{field.telecom && field.telecom[0] && field.telecom[0].use}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.telecom && field.telecom[0] && field.telecom[0].system}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.telecom && field.telecom[0] && field.telecom[0].value}</div>
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
                    <TableHead>Use</TableHead>
                    <TableHead>Text</TableHead>
                    <TableHead>Family</TableHead>
                    <TableHead>Given</TableHead>
                    <TableHead>Prefix</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {contactFields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <div className="font-medium">{field.name?.use}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.name?.text}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.name?.family}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.name?.given}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.name?.prefix}</div>
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
                    <TableHead>Use</TableHead>
                    <TableHead>Line</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Postal Code</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {contactFields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <div className="font-medium">{field.address?.use}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.address?.line}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.address?.city}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.address?.country}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{field.address?.postalCode}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Patients</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {entryData.map((patient) => (
                <div key={patient.resource?.id} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                    {/* Puedes modificar esto según cómo obtengas la imagen del paciente */}
                    <AvatarImage src="/avatars/05.png" alt="Avatar" />
                    <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        {/* Puedes ajustar esto según cómo obtengas el nombre del paciente */}
                        {`${patient.resource?.name?.[0]?.given?.join(" ") || ""} ${patient.resource?.name?.[0]?.family || ""}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {/* Puedes ajustar esto según cómo obtengas el correo electrónico del paciente */}
                        {patient.resource?.telecom?.find((contact) => contact.system === "email")?.value || ""}
                    </p>
                    </div>
                    <div className="ml-auto font-medium">{/* Puedes poner el importe aquí */}</div>
                </div>
                ))}
            </CardContent>
            </Card>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
