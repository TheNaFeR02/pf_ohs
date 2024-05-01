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
  
  
  export const columns: ColumnDef<Organization>[] = [
    
    {
      accessorKey: "id",
      header: "Id",
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
      enableHiding: false,
      cell: ({ row }) => {  
        const orga = row.original
        const handleDeleteOrganization = () => {
          deleteOrganizationById(orga.id || "");
          window.location.reload();
        };
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
              <DropdownMenuSeparator />
              <DropdownMenuItem>Actualizar organizacion</DropdownMenuItem>
              <DropdownMenuItem onClick={()=> handleDeleteOrganization()} >Eliminar organizacion</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  