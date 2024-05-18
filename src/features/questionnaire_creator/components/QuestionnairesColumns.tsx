import { ColumnDef } from "@tanstack/react-table";
import { BundleEntry } from "@/types/Bundle";
import { Questionnaire } from "@/types/Questionnaire";
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

interface QuestionnairesColumnsProps {
  data: BundleEntry<Questionnaire>[];
  setData: (data: BundleEntry<Questionnaire>[]) => void;
  tableTitle: string;
}

const QuestionnairesColumns = (
  props: QuestionnairesColumnsProps
): ColumnDef<BundleEntry<Questionnaire>>[] => [
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
          href={`/questionnaires/${row.original.resource?.id}`}
        >
          {row.original.resource?.id}
        </Link>
      );
    },
  },
  {
    accessorKey: "resource.title",
    id: "Title",
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
    accessorKey: "resource.status",
    id: "status",
    header: "Status",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "resource.subjectType",
    id: "resource.subjectType",
    header: "subjectType",
  },
  {
    accessorKey: "resource.meta.versionId",
    header: "Version",
    id: "Version",
  },
  {
    accessorKey: "resource.date",
    header: "Creation Date",
    id: "Creation Date",
    cell: ({ row }) => {
      return new Date(row.original.resource?.date ?? "").toLocaleDateString();
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
            <Link href={`/questionnaires/edit/${row.original.resource?.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <Link href={`/questionnaires/${row.original.resource?.id}`}>
              <DropdownMenuItem>See preview</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <RowDeleteAlertDialog
              id={row.original.resource?.id ?? ""}
              data={props.data}
              setData={props.setData}
              tableTitle={props.tableTitle}
              
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default QuestionnairesColumns;

