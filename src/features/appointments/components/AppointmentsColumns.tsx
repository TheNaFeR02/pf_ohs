import { ColumnDef } from "@tanstack/react-table";
import { BundleEntry } from "@/types/Bundle";
import { Appointment } from "@/types/Appointment";
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
import { deleteAppointment } from "@/features/appointments/server/deleteAppointment";

interface AppointmentsColumnsProps {
  data: BundleEntry<Appointment>[];
  setData: (data: BundleEntry<Appointment>[]) => void;
  tableTitle: string;
}

const AppointmentsColumns = (
  props: AppointmentsColumnsProps
): ColumnDef<BundleEntry<Appointment>>[] => [
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
          href={`/appointments/${row.original.resource?.id}`}
        >
          {row.original.resource?.id}
        </Link>
      );
    },
  },
  {
    accessorKey: "resource.description",
    id: "description",
    accessorFn: (row) => row.resource?.description ?? "No description",
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
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "resource.start",
    id: "start",
    header: "Start",
    cell: ({ row }) => {
      const date = new Date(row.original.resource?.start ?? "");
      const time = new Date(row.original.resource?.start ?? "");
      if (isNaN(date.getTime()) || isNaN(time.getTime())) {
        return "No date";
      }
      return date.toLocaleDateString() + " " + time.toLocaleTimeString();
    },
  },
  {
    accessorKey: "resource.end",
    id: "end",
    header: "End",
    cell: ({ row }) => {
      const date = new Date(row.original.resource?.end ?? "");
      const time = new Date(row.original.resource?.end ?? "");
      if (isNaN(date.getTime()) || isNaN(time.getTime())) {
        return "No date";
      }
      return date.toLocaleDateString() + " " + time.toLocaleTimeString();
    },
  },
  {
    accessorKey: "resource.participant",
    id: "participantActorDisplay",
    header: "Participants Actor",
    cell: ({ row }) => {
      return row.original.resource?.participant
        ?.map((participant) => participant.actor?.reference ?? "No reference")
        .join(", ");
    },
  },
  {
    accessorKey: "resource.participant",
    id: "participantStatus",
    header: "Participants Status",
    cell: ({ row }) => {
      return row.original.resource?.participant
        ?.map((participant) => participant.status)
        .join(", ");
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
    header: "",
    id: "Start Encounter",
    cell: ({ row }) => {
      return (
        <Link href={`/encounters/create/${row.original.resource?.id}`}>
          <Button variant="secondary">Start Encounter</Button>
        </Link>
      );
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
            <Link href={`/appointments/edit/${row.original.resource?.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <Link href={`/appointments/${row.original.resource?.id}`}>
              <DropdownMenuItem>See preview</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <RowDeleteAlertDialog
              id={row.original.resource?.id ?? ""}
              data={props.data}
              setData={props.setData}
              tableTitle={props.tableTitle}
              deleteFunction={deleteAppointment}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default AppointmentsColumns;
