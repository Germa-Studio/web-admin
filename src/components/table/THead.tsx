import { RowData, Table, flexRender } from '@tanstack/react-table';
import React from 'react';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';

type THeadProps<T extends RowData> = {
  className?: string;
  omitSort: boolean;
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function THead<T extends RowData>({
  className,
  omitSort,
  table,
  ...rest
}: THeadProps<T>) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortKey = searchParams.get('sortBy');
  const sortType = searchParams.get('sortType');

  return (
    <thead
      className={clsx('text-typo-white bg-[#079073] border-b border-[#079073]', className)}
      {...rest}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              scope="col"
              className={clsx(
                'group py-3 pr-3 text-left text-sm md:font-semibold sm:text-base',
                !omitSort && header.column.getCanSort() ? 'pl-4' : 'pl-[30px]'
              )}>
              {header.isPlaceholder ? null : (
                <div className={clsx('relative flex items-center gap-2 py-1')}>
                  <p className="text-sm" color="white">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </p>
                  {['no', 'actions'].includes(header.column.id) ? null : !omitSort &&
                    header.column.getCanSort() &&
                    sortKey === header.column.id ? (
                    sortType === 'desc' ? (
                      <VscTriangleDown className="fill-typo w-2" />
                    ) : (
                      <VscTriangleUp className="fill-typo w-2" />
                    )
                  ) : null}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
