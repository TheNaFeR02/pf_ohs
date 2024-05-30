import { ColumnDef } from "@tanstack/react-table";
import { BundleEntry } from "@/types/Bundle";
import { Practitioner } from "@/types/Practitioner";
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
import RowDeleteAlertDialog from "@/components/DataTable/RowDeleteAlertDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteResource } from "@/server/deleteResource";
import Image from "next/image";

interface PractitionersColumnsProps {
  data: BundleEntry<Practitioner>[];
  setData: (data: BundleEntry<Practitioner>[]) => void;
  tableTitle: string;
}

const PractitionersColumns = (
  props: PractitionersColumnsProps
): ColumnDef<BundleEntry<Practitioner>>[] => [
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
          href={`/practitioners/${row.original.resource?.id}`}
        >
          {row.original.resource?.id}
        </Link>
      );
    },
  },
  {
    accessorKey: "resource.name.0.given.0",
    id: "Name",
    cell: ({ row }) => {
      const imageData = row.original.resource?.photo?.[0]?.data ?? "";
      const imageSrc = imageData ? `data:image/jpeg;base64,${imageData}` : "/default-avatar.png"; // Usar una imagen por defecto si no hay datos
      return (
        <div className="flex items-center space-x-2">
          <Image
            src={imageSrc}
            alt="Profile"
            className="h-8 w-8 rounded-full"
            width={32}
            height={32}
          />
          <span>
            {row.original.resource?.name?.[0]?.given?.[0] ?? ""}{" "}
            {row.original.resource?.name?.[0]?.family ?? ""}
          </span>
        </div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "resource.active",
    id: "active",
    header: "Active",
    // active is a boolean, so we can use the default filterFn
    
    filterFn: (row, id, value) => {
      return (
        row.original.resource?.active?.toString() === value.toString()
      );
      
    },
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
    accessorKey: "resource.telecom.0.value",
    header: "Phone",
    id: "Phone",
  },
  {
    accessorKey: "resource.telecom.1.value",
    header: "Email",
    id: "Email",
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
            <Link href={`/practitioners/edit/${row.original.resource?.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <Link href={`/practitioners/${row.original.resource?.id}`}>
              <DropdownMenuItem>See preview</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <RowDeleteAlertDialog
              id={row.original.resource?.id ?? ""}
              resourceType={"Practitioner"}
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

export default PractitionersColumns;
