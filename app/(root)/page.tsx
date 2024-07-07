"use client";
import { Button } from "@/components/ui/button";
import { tableData } from "@/lib/tableData";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Filter, SortAsc } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { BiSort } from "react-icons/bi";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export type Tcolumns = {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  sale_price?: number | undefined;
};

const fallbackData = [];
export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const columns: ColumnDef<Tcolumns>[] = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        size: 200,
      },
      {
        header: "Name",
        size: 600,
        accessorKey: "name",
      },
      {
        header: "Category",
        size: 400,
        accessorKey: "category",
      },
      {
        header: "Subcategory",
        size: 400,
        accessorKey: "subcategory",
      },
      {
        header: "Created At",
        size: 300,
        accessorKey: "createdAt",
        cell: ({ cell, row }) => format(row.original.createdAt, "MM/dd/yyyy"),
      },
      {
        header: "Updated At",
        size: 300,
        accessorKey: "updatedAt",
        cell: ({ cell, row }) => format(row.original.updatedAt, "MM/dd/yyyy"),
      },
      {
        header: "Price",
        size: 200,
        accessorKey: "price",
      },
      {
        header: "Sale Price",
        size: 200,
        accessorKey: "sale_price",
        cell: ({ row }) =>
          row.original?.sale_price ? row.original?.sale_price : 0,
      },
    ],
    []
  );

  const [data, setData] = useState(() => tableData);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  console.log(pagination.pageIndex);
  if (!isMounted) return null;
  
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="md:w-4/5 w-full h-4/5 text-sm flex flex-col gap-5">
        <table className=" ">
          <thead className=" border-t border-b h-10 px-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <th
                    style={{ width: `${header.getSize()}px` }}
                    key={header.id}
                    className="relative"
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex gap-2 items-center justify-center">
                        {header.column.columnDef.header}
                        <BiSort size={20} className="text-neutral-300" />
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table.getRowModel().rows.map((row) => (
              <tr style={{ padding: 20 }} key={row.id} className="h-10 ">
                {row.getVisibleCells().map((cell) => (
                  <td
                    style={{ textAlign: "center" }}
                    key={cell.id}
                    className=""
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination className=" justify-center gap-10">
          <PaginationContent>
            <Button
              variant={"ghost"}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </Button>
            {/* <div className="space-x-2"> */}
            {[1, 2, 3, 4, 5].map((page, index) => (
              <PaginationItem className="cursor-pointer" key={index}>
                <PaginationLink
                  onClick={() => table.setPageIndex(page - 1)}
                  className={`
                      ring-1 ring-neutral-300 
                      ${
                        table.getState().pagination.pageIndex === page - 1
                          ? "bg-neutral-100"
                          : ""
                      }
                      `}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            {/* </div> */}

            <PaginationEllipsis />
            <PaginationItem className="cursor-pointer">
              <PaginationLink
                className={`
                      ring-1 ring-neutral-300 
                      ${
                        table.getState().pagination.pageIndex === pagination.pageSize-1
                          ? "bg-neutral-100"
                          : ""
                      }
                      `}
                onClick={() => table.lastPage()}
                isActive
              >
                {table.getPageCount()}
              </PaginationLink>
            </PaginationItem>
            <Button
              variant={"ghost"}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </Button>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}
