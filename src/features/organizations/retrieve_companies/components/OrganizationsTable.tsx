"use client";
import React, { useEffect, useState, useMemo } from "react";
import { getOrganizations } from "@/features/organizations/server/getOrganizations";
import OrganizationsColumns from "@/features/organizations/retrieve_companies/components/OrganizationsColumns";
import { Bundle, BundleEntry } from "@/types/Bundle";
import OrganizationsTableView from "@/features/organizations/retrieve_companies/components/OrganizationsTableView";
import { Organization } from "@/types/Organization";
import {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";


function OrganizationsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Bundle>();
  const [entryData, setEntryData] = useState<BundleEntry<Organization>[]>([]);

  const columns = useMemo(
    () => OrganizationsColumns({ data: entryData, setData: setEntryData }),
    [entryData]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrganizations();
        setData(res);
        setEntryData(res.entry || []);
      } catch (error) {
        console.error("Error fetching questionnaires:", error);
      }
    };
    fetchData();
  }, []);

  const table = useReactTable({
    data: entryData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return <OrganizationsTableView columns={columns} table={table} />;
}

export default OrganizationsTable;

