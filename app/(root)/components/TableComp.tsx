import { flexRender, Table } from "@tanstack/react-table";
import React, { useState } from "react";
import { Tcolumns } from "../page";
import { BiSort } from "react-icons/bi";
type Props = {
  table: Table<Tcolumns>;
};
const TableComp = ({ table }: Props) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  return (
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
              <td style={{ textAlign: "center" }} key={cell.id} className="">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComp;
