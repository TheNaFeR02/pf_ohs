"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BundleEntry } from "@/types/Bundle";
import { Patient } from "@/types/Patient";
import Link from "next/link";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteResource } from "@/server/deleteResource";
import RowDeleteAlertDialog from "@/components/DataTable/RowDeleteAlertDialog";

interface PatientsColumnsProps {
  data: BundleEntry<Patient>[];
  setData: (data: BundleEntry<Patient>[]) => void;
  tableTitle: string;
}

const PatientsColumns = (
  props: PatientsColumnsProps
): ColumnDef<BundleEntry<Patient>>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "resource.id",
    id: "ID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Link
          className="text-blue-600 hover:underline"
          href={`/patients/get/${row.original.resource?.id}`}
        >
          {row.original.resource?.id}
        </Link>
      );
    },
  },
  {
    accessorKey: "resource.name.0.given.0",
    id: "Name",
    header: "Name",
  },
  {
    accessorKey: "resource.name.0.family",
    header: "Last name",
    id: "Last name",
  },
  {
    accessorKey: "resource.telecom.0.value",
    id: "Phone",
    header: "Phone",
  },
  {
    accessorKey: "resource.meta.versionId",
    header: "Version",
    id: "Version",
  },
  {
    accessorKey: "resource.gender",
    header: "Gender",
    id: "Gender",
  },
  {
    accessorKey: "resource.birthDate",
    header: "Birth Date",
    id: "Birth Date",
    cell: ({ row }) => {
      return new Date(
        row.original.resource?.birthDate ?? ""
      ).toLocaleDateString();
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/patients/edit/${row.original.resource?.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href={`/patients/get/${row.original.resource?.id}`}>
              <DropdownMenuItem>See preview</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <RowDeleteAlertDialog
              id={row.original.resource?.id ?? ""}
              resourceType="Patient"
              data={props.data}
              setData={props.setData}
              tableTitle={props.tableTitle}
              deleteFunction={deleteResource}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default PatientsColumns;
