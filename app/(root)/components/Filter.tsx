import { Column, Header } from "@tanstack/react-table";
import { Tcolumns } from "../page";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { tableData } from "@/lib/tableData";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {Slider} from "@mui/material";

type Props = {
  column: Column<Tcolumns, unknown>;
};
// declare module "@tanstack/react-table" {
//   interface ColumnMeta<TData extends RowData, TValue> {
//     filterVariant?: "text" | "range" | "select";
//   }
// }
function Filter({ column }: Props) {

  const categoryArr = tableData.map((item) => item.category);
  const subcategoryArr = tableData.map((item) => item.subcategory);
  const categoryOptions = categoryArr
    .filter((item, index) => categoryArr.indexOf(item) === index)
    .map((item) => ({
      value: item,
      label: item,
    }));
  const subcategoryOptions = subcategoryArr
    .filter((item, index) => subcategoryArr.indexOf(item) === index)
    .map((item) => ({
      value: item,
      label: item,
    }));
  
  // @ts-ignore
  const { filterVariant } = column.columnDef;
  const columnFilterValue = column.getFilterValue();
//text
  return filterVariant === "text" ? (
    <div
      className="
          flex
          flex-col
          gap-3
          rounded-md
          bg-slate-300

          "
    >
      <Label htmlFor="Name">Name</Label>
      <Input
        value={(columnFilterValue ?? "") as string}
        placeholder="full name"
        onChange={(e) => column.setFilterValue(e.target.value)}
      />
    </div>
  ) : //categorySelect
  filterVariant === "categorySelect" ? (
    <div>
      {" "}
      <Select
        onChange={(selected) => {
          column.setFilterValue(
            selected ? selected.map((option) => option.value) : []
          );
        }}
        isMulti
        options={categoryOptions}
      />{" "}
    </div>
  ) : filterVariant === "subcategorySelect" ? (
    <div>
      <Select
        onChange={(selected) => {
          column.setFilterValue(
            selected ? selected.map((option) => option.value) : []
          );
        }}
        isMulti
        options={subcategoryOptions}
      />{" "}
    </div>
  ) : filterVariant === "createdAtDateRange" ? (
    <div>
      <Popover>
        <h1 className="text-sm">CreatedAt</h1>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className="w-[240px] pl-3 text-left font-normal"
          >
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  ) : filterVariant === "updatedAtDateRange" ? (
    <div>
      <Popover>
        <h1 className="text-sm">UpdatedAt</h1>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className="w-[240px] pl-3 text-left font-normal"
          >
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  ) : filterVariant === "priceNumberRange" ? (
    <div>
      <Slider
        disableSwap
        getAriaLabel={() => "Temperature range"}
        // value={value}
        // onChange={handleChange}
        // getAriaValueText={valuetext}
        valueLabelDisplay="auto"
      />
    </div>
  ) : filterVariant === "sale_priceNumberRange" ? (
    <div>
      <Slider
        disableSwap
        getAriaLabel={() => "Temperature range"}
        // value={value}
        // onChange={handleChange}
        // getAriaValueText={valuetext}
        valueLabelDisplay="auto"
      />
    </div>
  ) : null;
}

export default Filter;
