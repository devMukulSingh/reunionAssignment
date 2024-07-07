import { Input } from "@/components/ui/input";
import { Tcolumns } from "../page";
import { ChangeEvent, useState } from "react";
import { tableData } from "@/lib/tableData";
import ToggleColumnVisibility from "./ToggleColumnVisibility";
import ToggleSort from "./ToggleSort";
import ToggleFilters from "./ToggleFilters";
import ToggleGrouping from "./ToggleGrouping";
import { X } from "lucide-react";
import { Table } from "@tanstack/react-table";

type Props = {
  table:Table<Tcolumns>
  data: Tcolumns[];
  setData: (data: Tcolumns[]) => void;
};

const Header = ({ data, setData,table }: Props) => {
  const [query, setQuery] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLocaleLowerCase();
    setQuery(query.trimStart());
    if (query.trimStart() !== "") {
      const filtered = tableData.filter((d) =>
        d.name.toLowerCase().includes(query)
      );
      setData(filtered);
    } else setData(tableData);
  };
  return (
    <div className="flex justify-end h-20 ">
      <div
        className="
        text-neutral-500
        flex 
        items-center
        gap-5"
      >
        <div
          className="
        w-[15rem]
        px-3
        items-center
        flex
        justify-between
        border
        rounded-md
        "
        >
          <Input
            value={query}
            onChange={handleChange}
            className="
            h-10 
            focus-visible:ring-offset-0
            focus:ring-0
            focus-visible:ring-0
            border-0    
            "
            placeholder="Search"
          />
          <X
            onClick={() => {
              setQuery("");
              setData(tableData);
            }}
            size={20}
            className="cursor-pointer"
          />
        </div>
        <ToggleColumnVisibility table={table}/>
        <ToggleSort table={table}/>
        <ToggleFilters table={table}/>
        <ToggleGrouping table={table}/>
      </div>
    </div>
  );
};

export default Header;
