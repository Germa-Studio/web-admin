import { RowData, Table, flexRender } from '@tanstack/react-table';
import React from 'react';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortKey = searchParams.get('sortBy');
  const sortType = searchParams.get('sortType');
  const perPage = searchParams.get('limit');
  const searchQuery = searchParams.get('search');

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
                'group py-3 pr-3 text-left text-sm font-semibold sm:text-base',
                !omitSort && header.column.getCanSort() ? 'pl-4' : 'pl-[30px]'
              )}>
              {header.isPlaceholder ? null : (
                <div
                  className={clsx(
                    'relative flex items-center gap-2 py-1',
                    !omitSort && header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                  )}
                  onClick={() => {
                    if (omitSort) return;
                    if (['no', 'actions'].includes(header.column.id)) return;
                    navigate(
                      `${
                        location.pathname
                      }?page=${1}&limit=${perPage}&search=${searchQuery}&sortBy=${
                        header.column.id
                      }&sortType=${
                        sortKey === header.column.id ? (sortType === 'asc' ? 'desc' : 'asc') : 'asc'
                      }`
                    );
                  }}>
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
