import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Eye } from "lucide-react";
import React, { useState } from "react";
import { Tcolumns } from "../page";
import { Table } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
type Props = {
  table: Table<Tcolumns>;
};
const ToggleColumnVisibility = ({ table }: Props) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
      <SheetTrigger asChild>
        <Eye className="cursor-pointer" size={20} />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-8 " side={"right"}>
        <h1 className="text-xl font-medium">Show/hide Columns</h1>
        <div className="flex flex-col gap-2 overflow-auto h-[85vh] ">
          {table.getAllLeafColumns().map((column) => (
            <div className="flex items-center justify-between border rounded-sm py-4 px-3">
              <Label htmlFor={column.id}>{column.id}</Label>
              <Switch
                checked={column.getIsVisible()}
                onCheckedChange={() => column.toggleVisibility()}
                color="blue"
                className="bg-blue-600"
                id={column.id}
              />
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <Button
              onClick={ () => table.resetColumnVisibility()} 
              variant={"outline"}>Show all columns</Button>
            <Button
              onClick = { () => setOpenSidebar(false) } 
              className="bg-blue-600 hover:bg-blue-500">Apply</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ToggleColumnVisibility;
