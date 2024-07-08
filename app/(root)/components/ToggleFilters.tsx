import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Table } from "@tanstack/react-table";
import { FiFilter } from "react-icons/fi";
import { Tcolumns, Ttable } from "../page";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChangeEvent, ChangeEventHandler } from "react";
import Filter from "./Filter";
import { MRT_TableHeadCellFilterContainer } from "material-react-table";

type Props = {
  table: Ttable
};

const ToggleFilters = ({ table }: Props) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <FiFilter className="cursor-pointer" size={20} />
        </SheetTrigger>
        <SheetContent side={"right"} className="flex flex-col gap-5">
          <h1 className="text-xl font-medium">Filters</h1>
          {table.getLeafHeaders().map((header) =>(
              // <Filter column={header.column} />
              <MRT_TableHeadCellFilterContainer
                key={header.id}
                header={header}
                table={table}
                in
              />
            )
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ToggleFilters;
