"use client"
import { Organization } from "@/features/companies/types/organization"
import { Name } from "../../types/name"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { deleteOrganizationById } from "@/features/companies/services/deleteCompanies"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import DataTableRowActions from "./DataTableRowActions"
   
  interface columnsProps {
    onEdit: (organization: Organization) => void
    onDelete: (organization: Organization) => void
  }
  export const columns= ({onEdit,onDelete}: columnsProps): ColumnDef<Organization>[] => [
    
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
      cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete}/>,
      size: 50,
      },
  ]
  