"use client";
import { tableData } from "@/lib/tableData";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import PaginationComp from "./components/PaginationComp";
import TableComp from "./components/TableComp";
import Header from "./components/Header";

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

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  if (!isMounted) return null;
  
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="md:w-4/5 w-full h-4/5 text-sm flex flex-col gap-5">
          <Header data={data} setData={setData}/>
          <TableComp table={table}/>
          <PaginationComp table={table}/>
      </div>
    </main>
  );
}
