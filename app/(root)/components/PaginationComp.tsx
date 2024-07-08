import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,

} from "@/components/ui/pagination";
import { Tcolumns, Ttable } from '../page';
import { Table } from '@tanstack/react-table';

type Props = {
  table:Ttable
};

const PaginationComp = ({
  table
}:Props) => {
  return (
    <Pagination className=" justify-center gap-10 mt-auto">
      <PaginationContent>
        <Button
          variant={"ghost"}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        {/* <div className="space-x-2"> */}
        {[1, 2, 3, 4, 5].map((page, index) => (
          <PaginationItem className="cursor-pointer" key={index}>
            <PaginationLink
              onClick={() => table.setPageIndex(page - 1)}
              className={`
                      ring-1 ring-neutral-300 
                      ${
                        table.getState().pagination.pageIndex === page - 1
                          ? "bg-neutral-100"
                          : ""
                      }
                      `}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* </div> */}

        <PaginationEllipsis />
        <PaginationItem className="cursor-pointer">
          <PaginationLink
            className={`
                      ring-1 ring-neutral-300 
                      ${
                        table.getState().pagination.pageIndex ===
                        table.getState().pagination.pageSize - 1
                          ? "bg-neutral-100"
                          : ""
                      }
                      `}
            onClick={() => table.lastPage()}
            isActive
          >
            {table.getPageCount()}
          </PaginationLink>
        </PaginationItem>
        <Button
          variant={"ghost"}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationComp;