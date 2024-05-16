"use client";
import React, { useEffect, useState, useMemo } from "react";
import { getPatients } from "@/features/patients/server/getPatients";
import PatientsColumns from "@/features/patients/components/PatientsColumns";
import { Bundle, BundleEntry } from "@/types/Bundle";
import PatientsTableView from "@/features/patients/components/PatientsTableView";
import { Patient } from "@/types/Patient";
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

function PatientsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Bundle>();
  const [entryData, setEntryData] = useState<BundleEntry<Patient>[]>([]);

  const columns = useMemo(
    () => PatientsColumns({ data: entryData, setData: setEntryData }),
    [entryData]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPatients();
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
  return (
    <div>
      {data?.total && <p>Total: {data.total}</p>}
      <PatientsTableView columns={columns} table={table} />
    </div>
  );
}

export default PatientsTable;
