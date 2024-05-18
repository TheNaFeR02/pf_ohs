"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableOptions } from "@/components/DataTable/DataTableOptions";
import { DataTableFacetedFilter } from "@/components/DataTable/DataTableFacetedFilters";
import Concept from "@/types/Concept";

type Filter = {
  columnId: string;
  options: Concept[];
};
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters: Filter[];
  addButton: {
    href: string;
    label: string;
  };
}

export function DataTableToolbar<TData>({
  table,
  filters,
  addButton,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {filters &&
          filters.map((filter) => (
            <DataTableFacetedFilter
              key={filter.columnId}
              column={table.getColumn(filter.columnId)}
              title={filter.columnId}
              options={filter.options.map((option) => ({
                label: option.display,
                value: option.code,
              }))}
            />
          ))}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableOptions table={table} addButton={addButton} />
    </div>
  );
}
