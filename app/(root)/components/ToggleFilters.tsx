"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Table } from "@tanstack/react-table";
import { FiFilter } from "react-icons/fi";
import { Tcolumns, Ttable } from "../page";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import Filter from "./Filter";
import { MRT_TableHeadCellFilterContainer } from "material-react-table";
import { X } from "lucide-react";

type Props = {
  table: Ttable;
  openSidebar: boolean;
  setOpenSidebar: (openSidebar: boolean) => void;
};

const ToggleFilters = ({ table, openSidebar, setOpenSidebar }: Props) => {
  return (
    <>
      <div className="fixed right-0 top-0 w-[25rem] shadow-lg h-screen bg-white p-5 border z-40">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium">Filters</h1>
            <X
              onClick={() => setOpenSidebar(false)}
              size={20}
              className="cursor-pointer"
            />
          </div>
          {table.getLeafHeaders().map((header) => (
            // <Filter column={header.column} />
            <MRT_TableHeadCellFilterContainer
              key={header.id}
              header={header}
              table={table}
              in
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ToggleFilters;
