"use client";
import { Organization } from "@/types/Organization";
import { ColumnDef } from "@tanstack/react-table";
import { BundleEntry } from "@/types/Bundle";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import RowDeleteAlertDialog from "@/components/DataTable/RowDeleteAlertDialog";
import { deleteResource } from "@/server/deleteResource";

interface OrganizationColumnsProps {
  data: BundleEntry<Organization>[];
  setData: (data: BundleEntry<Organization>[]) => void;
  tableTitle: string;
}

const OrganizationsColumns = (
  props: OrganizationColumnsProps
): ColumnDef<BundleEntry<Organization>>[] => [
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
          href={`/organizations/${row.original.resource?.id}`}
        >
          {row.original.resource?.id}
        </Link>
      );
    },
  },
  {
    accessorKey: "resource.name",
    id: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "resource.active",
    header: "Status",
    id: "Active",
    cell: ({ row }) => {
      return (
        <Badge
          variant={row.original.resource?.active ? "default" : "secondary"}
        >
          {row.original.resource?.active ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "resource.meta.versionId",
    header: "Version",
    id: "Version",
  },
  {
    accessorKey: "resource.meta.lastUpdated",
    header: "Last Updated",
    id: "Last Updated",
    cell: ({ row }) => {
      return new Date(
        row.original.resource?.meta?.lastUpdated ?? ""
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
            <Link href={`/organizations/edit/${row.original.resource?.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href={`/organizations/${row.original.resource?.id}`}>
              <DropdownMenuItem>See preview</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <RowDeleteAlertDialog
              id={row.original.resource?.id ?? ""}
              resourceType="Organization"
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
export default OrganizationsColumns;
