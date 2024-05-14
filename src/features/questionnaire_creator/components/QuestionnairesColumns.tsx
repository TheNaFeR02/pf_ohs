"use client";
import { ColumnDef } from "@tanstack/react-table";
import { BundleEntry } from "../../../types/Bundle";
import { Questionnaire } from "../../../types/Questionnaire";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteQuestionnaire } from "@/features/questionnaire_creator/server/deleteQuestionnaire";
import { useToast } from "@/components/ui/use-toast";

interface QuestionnairesColumnsProps {
  data: BundleEntry<Questionnaire>[];
  setData: (data: BundleEntry<Questionnaire>[]) => void;
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
    header: "Title",
  },
  {
    accessorKey: "resource.status",
    header: "Status",
    id: "Status",
    cell: ({ row }) => {
      return (
        <Badge variant="outline">
          {row.original.resource?.status.toUpperCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "resource.subjectType",
    id: "Subject Type",
    header: "Subject Type",
    cell: ({ row }) => {
      return row.original.resource?.subjectType ?? "No Subject type";
    },
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
            <DropdownMenuSeparator />
            <Link href={`/questionnaires/${row.original.resource?.id}`}>
              <DropdownMenuItem>See preview</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DeleteAlertDialog
              id={row.original.resource?.id ?? ""}
              data={props.data}
              setData={props.setData}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default QuestionnairesColumns;

interface deleteAlertProps {
  id: string;
  data: BundleEntry<Questionnaire>[];
  setData: (data: BundleEntry<Questionnaire>[]) => void;
}

function DeleteAlertDialog({ id, data, setData }: deleteAlertProps) {
  const { toast } = useToast();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              try {
                toast({
                  title: `Questionnaire ${id} deleted`,
                  description: "The questionnaire has been deleted",
                  variant: "destructive",
                });
                deleteQuestionnaire(id ?? "");
                const dataCopy = [...data];
                setData(dataCopy);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
