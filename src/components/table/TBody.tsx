import clsx from 'clsx';
import { RowData, Table, flexRender } from '@tanstack/react-table';
import React from 'react';

type TBodyProps<T extends RowData> = {
  className?: string;
  table: Table<T>;
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function TBody<T extends RowData>({
  className,
  isLoading,
  table,
  ...rest
}: TBodyProps<T>) {
  return (
    <tbody className={clsx('divide-typo-divider divide-y bg-white', className)} {...rest}>
      {isLoading ? (
        <tr>
          <td
            className="text-typo-icon col-span-full truncate whitespace-nowrap px-3 py-3 text-center"
            colSpan={table.getAllColumns().length}>
            Loading...
          </td>
        </tr>
      ) : table.getRowModel().rows.length == 0 ? (
        <tr>
          <td
            className="text-typo-icon col-span-full truncate whitespace-nowrap px-3 py-3 text-center"
            colSpan={table.getAllColumns().length}>
            No Data
          </td>
        </tr>
      ) : (
        table.getRowModel().rows.map((row, index) => (
          <tr key={row.id} className={clsx(index % 2 === 0 ? 'bg-white' : 'bg-neutral-200')}>
            {row.getVisibleCells().map((cell) => {
              return (
                <td
                  key={cell.id}
                  className="truncate whitespace-nowrap px-3 py-2 text-sm"
                  style={{ maxWidth: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        ))
      )}
    </tbody>
  );
}
