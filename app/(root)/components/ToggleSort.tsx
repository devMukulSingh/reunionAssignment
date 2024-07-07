import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BiSort } from "react-icons/bi";
import { Tcolumns } from "../page";
import { Table } from "@tanstack/react-table";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  table:Table<Tcolumns>
}

const ToggleSort = ({
  table
}:Props) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <BiSort className="cursor-pointer" size={20} />
        </SheetTrigger>
        <SheetContent 
          className="flex flex-col gap-10"
          side={"right"}>
            <h1 className="text-xl font-medium">
              Sorting Options
            </h1>
          <div className="flex flex-col gap-2">
            {table.getAllLeafColumns().map((column) => (
              <div 
              onClick={ () => column.toggleSorting()}
              className="
              flex 
              gap-2 
              items-center 
              border 
              rounded-sm 
              py-4 
              px-3
              cursor-pointer
              ">
                <h1 className="font-medium">
                {column.id}
                </h1>
                <BiSort className="text-neutral-400" size={20}/>
              </div>
            ))}
          </div>
          <Button 
            onClick={ () => table.resetSorting()}
            className="py-6 rounded-sm ring-2" variant={"outline"}>
            Clear Sort
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ToggleSort;
