import { ColumnDef } from "@tanstack/react-table";
import { BundleEntry } from "@/types/Bundle";
import { QuestionnaireResponse } from "@/types/QuestionnaireResponse";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Patientget from "@/features/patients/components/Patientget";

interface QuestionnaireResponsesColumnsProps {
  data: BundleEntry<QuestionnaireResponse>[];
  setData: (data: BundleEntry<QuestionnaireResponse>[]) => void;
  tableTitle: string;
}

const QuestionnaireResponsesColumns = (
  props: QuestionnaireResponsesColumnsProps
): ColumnDef<BundleEntry<QuestionnaireResponse>>[] => [
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
          href={`/encounters/${row.original.resource?.id}`}
        >
          {row.original.resource?.id}
        </Link>
      );
    },
  },
  {
    accessorKey: "resource.status",
    id: "status",
    header: "Status",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
            <Link href={`/encounters/edit/${row.original.resource?.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <Link href={`/encounters/${row.original.resource?.id}`}>
              <DropdownMenuItem>See preview</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <RowDeleteAlertDialog
              id={row.original.resource?.id ?? ""}
              resourceType={"QuestionnaireResponse"}
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

export default QuestionnaireResponsesColumns;
