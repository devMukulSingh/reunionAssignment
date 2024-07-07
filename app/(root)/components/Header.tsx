import { Input } from "@/components/ui/input";
import { Eye, X } from "lucide-react";
import { BiSort } from "react-icons/bi";
import { BsStack } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { Tcolumns } from "../page";
import { ChangeEvent, useState } from "react";
import { tableData } from "@/lib/tableData";

type Props = {
    data:Tcolumns[]
    setData : (data:Tcolumns[]) => void
}

const Header = ({
    data,
    setData
}:Props) => {
    const [query, setQuery] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLocaleLowerCase();
        setQuery(query.trimStart());
        if(query.trimStart()!==""){
            const filtered = tableData.filter( d => d.name.toLowerCase().includes(query));
            setData(filtered);
        }
        else setData(tableData) 
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
            onChange={ handleChange}
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
            onClick={() =>{ 
                setQuery("")
                setData(tableData)
            }}
            size={20} 
            className="cursor-pointer" />
        </div>
        <Eye size={20} />
        <BiSort size={20} />
        <FiFilter size={20} />
        <BsStack size={20} />
      </div>
    </div>
  );
};

export default Header;
