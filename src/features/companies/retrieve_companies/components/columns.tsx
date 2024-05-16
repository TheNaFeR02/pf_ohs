"use client";
import { Organization } from "@/features/companies/types/organization";
import { ColumnDef } from "@tanstack/react-table";

import DataTableRowActions from "./DataTableRowActions";

interface columnsProps {
  onEdit: (organization: Organization) => void;
  onDelete: (organization: Organization) => void;
}
export const columns = ({
  onEdit,
  onDelete,
}: columnsProps): ColumnDef<Organization>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "resourceType",
    header: "Tipo de recurso",
  },
  {
    accessorKey: "name",
    header: "Nombre de la organización",
  },
  {
    accessorKey: "active",
    header: "Activo",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
    size: 50,
  },
];
