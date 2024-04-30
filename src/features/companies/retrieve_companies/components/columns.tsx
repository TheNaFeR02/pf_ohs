"use client"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
  } from "@tanstack/react-table"
import { Organization } from "@/features/companies/types/organization"
import { Name } from "../../types/name"

  
  // // This type is used to define the shape of our data.
  // // You can use a Zod schema here if you want.
  // export type Payment = {
  //   id: string
  //   amount: number
  //   status: "pending" | "processing" | "success" | "failed"
  //   email: string
  // }
  
  export const columns: ColumnDef<Organization>[] = [
    {
      accessorKey: "name",
      header: "Nombre de la organización",
    },
    {
      accessorKey: "active",
      header: "Activo",
    },    
  ]
  