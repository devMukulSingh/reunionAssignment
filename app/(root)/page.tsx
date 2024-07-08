"use client";
import { tableData } from "@/lib/tableData";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import PaginationComp from "./components/PaginationComp";
// import TableComp from "./components/TableComp";
import Header from "./components/Header";
import {
  MaterialReactTable,
  MRT_Table,
  MRT_TableInstance,
  useMaterialReactTable,
    type MRT_ColumnDef,
} from "material-react-table";

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

export type Ttable = MRT_TableInstance<Tcolumns>
export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const categoryArr = tableData.map(item => item.category);
  const categoryOptions = categoryArr.filter( (item,index) => categoryArr.indexOf(item) === index)
    const subcategoryArr = tableData.map((item) => item.subcategory);
    const subcategoryOptions = subcategoryArr.filter(
      (item, index) => subcategoryArr.indexOf(item) === index
    );

  const columns = useMemo<MRT_ColumnDef<Tcolumns>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        size: 100,
        filterVariant: "text",
      },
      {
        header: "Name",
        accessorKey: "name",
        size: 200,
        filterVariant: "text",
      },
      {
        header: "Category",
        accessorKey: "category",
        size: 150,
        filterVariant: "multi-select",
        filterSelectOptions: categoryOptions,
      },
      {
        header: "Subcategory",
        accessorKey: "subcategory",
        size: 150,
        filterVariant: "multi-select",
        enableColumnFilter: true,
        enableColumnFilterModes: true,
        filterSelectOptions: subcategoryOptions,
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        size: 100,
        filterVariant: "date-range",
        Cell: ({ row }) => format(row.original.createdAt, "MM/dd/yyyy"),
      },
      {
        header: "Updated At",
        accessorKey: "updatedAt",
        // accessorFn : (originalRow) => format(originalRow.updatedAt, "MM/dd/yyyy"),
        size: 100,
        filterVariant: "date-range",
        Cell: ({ row, cell }) => format(row.original.updatedAt, "MM/dd/yyyy"),
      },
      {
        header: "Price",
        accessorKey: "price",
        size: 100,
        // filterFn: "between",
        filterVariant: "range-slider",
      },
      {
        header: "Sale Price",
        accessorKey: "sale_price",
        filterFn: "between",
        size: 100,
        filterVariant: "range-slider",
        Cell: ({ row }) =>
          row.original?.sale_price ? row.original?.sale_price : 0,
      },
    ],
    []
  );
  const [data, setData] = useState(() => tableData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
    state: {
      columnFilters,
    },
    filterFns: {},
    enableSorting: true,
    enableFilters: true,
    enablePagination: true,
    columnFilterDisplayMode: "custom",
    enableFacetedValues: true,
    enableColumnFilters:true,
  });
  if (!isMounted) return null;
  
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="md:w-4/5 w-full h-4/5 text-sm flex flex-col gap-5">
        <Header data={data} setData={setData} table={table} />
        <MRT_Table table={table} />
        <PaginationComp table={table} />
      </div>
    </main>
  );
}
