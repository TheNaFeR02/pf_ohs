import { ColumnDef, flexRender, useReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Questionnaire } from "../../../types/Questionnaire";
import { BundleEntry } from "../../../types/Bundle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter, PlusCircle, File } from "lucide-react";
import { statusObj } from "@/constants/statusCodeDisplay";
import { useState } from "react";

interface QuestionnairesDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: ReturnType<typeof useReactTable<BundleEntry<Questionnaire>>>;
}
function QuestionnaireTableView<TData, TValue>({
  columns,
  table,
}: QuestionnairesDataTableProps<TData, TValue>) {
  return (
    <Tabs
      defaultValue="all"
      value={(table.getColumn("Status")?.getFilterValue() as string) ?? "all"}
    >
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger
            value="all"
            onClick={() => table.getColumn("Status")?.setFilterValue(null)}
          >
            All
          </TabsTrigger>
          {statusObj.map((status) => (
            <TabsTrigger
              key={status.code}
              value={status.code}
              onClick={() =>
                table.getColumn("Status")?.setFilterValue(status.code)
              }
            >
              {status.display}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={!table.getColumn("Status")?.getFilterValue()}
                onClick={() => table.getColumn("Status")?.setFilterValue(null)}
              >
                All
              </DropdownMenuCheckboxItem>
              {statusObj.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status.code}
                  checked={
                    status.code ===
                    (table.getColumn("Status")?.getFilterValue() as string)
                  }
                  onClick={() => {
                    table.getColumn("Status")?.setFilterValue(status.code);
                  }}
                >
                  {status.display}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div>
      </div>
      <TabsContent
        value={(table.getColumn("Status")?.getFilterValue() as string) ?? "all"}
      >
        <Card>
          <CardHeader>
            <CardTitle>Questionnaires</CardTitle>
            <CardDescription>
              Manage your questionnaires and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="flex-1 text-xs text-muted-foreground">
              Showing{" "}
              <strong>{table.getFilteredSelectedRowModel().rows.length}</strong>{" "}
              of <strong>{table.getFilteredRowModel().rows.length}</strong>{" "}
              row(s) selected.
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default QuestionnaireTableView;
