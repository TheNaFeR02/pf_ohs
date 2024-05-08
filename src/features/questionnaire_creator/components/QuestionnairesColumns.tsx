"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Bundle, BundleEntry } from "@/features/questionnaire_creator/types/Bundle";
import { Questionnaire } from "@/types/Questionnaire";
const QuestionnairesColumns: ColumnDef<BundleEntry>[] = [
  {
    accessorKey: "resource.id",
    header: "ID",
  },
  {
    accessorKey: "resource.title",
    header: "Title",
  },
  {
    accessorKey: "resource.status",
    header: "Status",
    cell: ({ row }) => {
      {row.original.request?.method
        ? row.original.request.method
        : "GET"}
    }
  },
  {
    accessorKey: "resource.subjectType",
    header: "Subject Type",
  },
  {
    accessorKey: "resource.meta.versionId",
    header: "Version",
  },
  {
    accessorKey: "resource.date",
    header: "Creation Date",
  },
  {
    accessorKey: "resource.meta.lastUpdated",
    header: "Last Updated",
  },
];

export default QuestionnairesColumns;
