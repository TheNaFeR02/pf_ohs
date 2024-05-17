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
import { Organization } from "@/types/Organization";
import { BundleEntry } from "@/types/Bundle";
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
import { ListFilter, PlusCircle, File, Search } from "lucide-react";
import Link from "next/link";
import Concept from "@/types/Concept";

const booleanObj: Concept[] = [
  // {
  //   code: "true",
  //   display: "Active",
  // },
  // {
  //   code: "false",
  //   display: "Inactive",
  // },
];

interface OrganizationsDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: ReturnType<typeof useReactTable<BundleEntry<Organization>>>;
}
function OrganizationTableView<TData, TValue>({
  columns,
  table,
}: OrganizationsDataTableProps<TData, TValue>) {
  return (
    <Tabs
      defaultValue="all"
      value={
        (table.getColumn("Active".toString())?.getFilterValue() as string) ??
        "all"
      }
    >
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger
            value="all"
            onClick={() => table.getColumn("Active")?.setFilterValue(null)}
          >
            All
          </TabsTrigger>
          {booleanObj.map((status) => (
            <TabsTrigger
              key={status.code}
              value={status.code}
              onClick={() =>
                table
                  .getColumn("Active")
                  ?.setFilterValue(status.code == "true" ? true : false)
              }
            >
              {status.display}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="flex items-center gap-2 ml-auto ">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search in organizations..."
            className="w-full rounded-lg bg-background md:w-[200px] lg:w-[336px]"
            onChange={(e) => table.setGlobalFilter(e.target.value)}
          />
        </div>
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
                checked={!table.getColumn("Active")?.getFilterValue()}
                onClick={() => table.getColumn("Active")?.setFilterValue(null)}
              >
                All
              </DropdownMenuCheckboxItem>
              {booleanObj.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status.code}
                  checked={
                    status.code ===
                    (table.getColumn("Active")?.getFilterValue() as string)
                  }
                  onClick={() => {
                    table.getColumn("Active")?.setFilterValue(status.code);
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
          <Link href="/organizations/create">
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Organization
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <TabsContent
        value={(table.getColumn("Active")?.getFilterValue() as string) ?? "all"}
      >
        <Card>
          <CardHeader>
            <CardTitle>Organizations</CardTitle>
            <CardDescription>
              Manage your organizations and view their details.
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

export default OrganizationTableView;
