import {
  ColumnDef,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { PaginatedRespApiData } from "../../types/paginatedRespApi";
import { useSearchParams } from "react-router-dom";
import TBody from "./TBody";
import THead from "./THead";
import clsx from "clsx";
import { PaginationControl, PaginationCount } from "./Pagination";
import { IoMdAdd } from "react-icons/io";
import { RiTableLine } from "react-icons/ri";

type TableProps<T extends object> = {
  data: PaginatedRespApiData<T> | undefined;
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  omitSort?: boolean;
  withFilter?: boolean;
  withPaginationControl?: boolean;
  withPaginationCount?: boolean;
  withButton?: boolean;
  buttonText?: string;
  buttonHref?: string;
  filter?: string[];
} & React.ComponentPropsWithoutRef<"div">;

export default function Table<T extends object>({
  className,
  columns,
  data,
  isLoading,
  omitSort = false,
  withFilter = false,
  withPaginationCount = false,
  withPaginationControl = false,
  withButton = false,
  buttonText = "Tambah",
  buttonHref = "/",

  filter = [],
  ...rest
}: TableProps<T>) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchParams] = useSearchParams();

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  React.useEffect(() => {
    table.setPageSize(Number(searchParams.get("limit") ?? 10));
  }, [searchParams, table]);

  return (
    <div className={clsx("flex flex-col mt-6", className)} {...rest}>
      <div className="flex flex-col items-end gap-y-3 sm:flex-row sm:justify-between">
        <span className="text-cwhite flex items-center gap-1 whitespace-nowrap text-white">
          <div>Showing</div>
          <strong>
            {data?.data.length} of {data?.total}
          </strong>
          <div>entries</div>
        </span>
        {/* {filter.length > 0 &&
          filter.map((col, idx) => {
            const column = table.getColumn(col);
            const lowerCase = col.toLowerCase();
            const title =
              lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
            if (col) {
              return <MultiFilter key={idx} column={column} title={title} />;
            } else null;
          })} */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            {withPaginationCount && (
              <PaginationCount respData={data} className="w-[109px]" />
            )}
            {withPaginationCount && (
              <button className="flex w-[109px] justify-center rounded-[10px] bg-neutral-200">
                <div className="flex items-center gap-1.5 text-neutral-900">
                  <RiTableLine />
                  <p>Column</p>
                </div>
              </button>
            )}
            {/* {withPaginationCount && (
              <CSVLink data={respData?.data.data ?? []}>
                <button className="flex w-[109px] justify-center rounded-[10px] bg-neutral-200">
                  <div className="flex items-center gap-1.5 text-neutral-900">
                    <PiArchiveBoxBold />
                    <p>Export</p>
                  </div>
                </button>
              </CSVLink>
            )} */}
          </div>
          {/* <div>
            {withFilter && <Filter table={table} className="w-[378px]" />}
          </div> */}
        </div>
      </div>
      {withButton && (
        <div>
          <a
            href={buttonHref}
            className="bg-color-3 rounded-[10px] px-6 py-2.5"
          >
            <div className="flex items-center justify-center gap-1 text-white">
              <IoMdAdd className="h-6 w-6" />
              <p className="text-sm">{buttonText}</p>
            </div>
          </a>
        </div>
      )}
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <THead
                table={table}
                data={data}
                omitSort={omitSort}
                className="rounded-xl text-white"
              />
              <TBody table={table} isLoading={isLoading} />
            </table>
          </div>
        </div>
      </div>
      {withPaginationControl && <PaginationControl respData={data} />}
    </div>
  );
}
