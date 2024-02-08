import { RowData } from '@tanstack/react-table';
import React from 'react';
import { PaginatedRespApiData } from '../../types/paginatedRespApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import clsx from 'clsx';

type PaginationProps<T extends RowData> = {
  respData: PaginatedRespApiData<T> | undefined;
} & React.ComponentPropsWithoutRef<'div'>;

export function PaginationCount<T extends RowData>({ respData }: PaginationProps<T>) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const searchQuery = searchParams.get('search_query') ?? '';
  const sortKey = searchParams.get('sort_key') ?? '';
  const sortType = searchParams.get('sort_type') ?? '';

  return (
    <div className="flex">
      <select
        className="w-full rounded-lg border-none bg-neutral-200"
        value={respData?.limit ?? 10}
        onChange={(e) => {
          navigate(
            `${location.pathname}?page=${1}&limit=${e.target.value}&search_query=${searchQuery}&sort_key=${sortKey}&sort_type=${sortType}`
          );
        }}>
        {[5, 10, 15, 20, 25].map((pageSize) => (
          <option key={pageSize} value={pageSize} className="text-sm text-neutral-900">
            {pageSize} Entries
          </option>
        ))}
      </select>
    </div>
  );
}

export function PaginationControl<T extends RowData>({ respData }: PaginationProps<T>) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const pageIndex = respData?.currentPages ?? 1;
  const pageCount = respData?.maxPages ?? 1;
  const perPage = respData?.limit ?? 10;

  const searchQuery = searchParams.get('search_query') ?? '';
  const sortKey = searchParams.get('sort_key') ?? '';
  const sortType = searchParams.get('sort_type') ?? '';

  const paginationControl = BuildPaginationControl(pageIndex, pageCount);

  const arrowBtn =
    'flex justify-center items-center bg-color-3 disabled:text-gray-600 text-gray-400 disabled:hover:bg-color-0 h-[40px] w-[40px] border-[1px] border-[#E4E7EB] drop-shadow hover:text-white active:border-[#E4E7EB] disabled:brightness-100 disabled:cursor-not-allowed rounded-md';
  const getButtonClass = (pageNumber: string | number) => {
    let baseClass =
      'border-[1px] border-[#E4E7EB] w-10 h-10 rounded-md drop-shadow active:border-[#E4E7EB] hover:bg-green-secondary hover:text-white active:bg-green-primary disabled:brightness-100';
    if (typeof pageNumber == 'number') {
      if (pageIndex === pageNumber) {
        baseClass += ' bg-green-primary text-white ';
      } else {
        baseClass += ' bg-[#ffffff] ';
      }
      if (pageNumber >= pageCount) {
        baseClass +=
          ' disabled:bg-white disabled:hover:bg-white disabled:text-[#D1D5DC] disabled:hover:text-[#D1D5DC]';
      }
    }
    return baseClass;
  };

  return (
    <div className="font-epliogue flex items-center justify-center gap-x-2 py-6 text-base font-medium text-[#687083]">
      <button
        onClick={() => {
          navigate(
            `${location.pathname}?page=${
              pageIndex - 1
            }&limit=${perPage}&search_query=${searchQuery}&sort_key=${sortKey}&sort_type=${sortType}`
          );
        }}
        disabled={pageIndex === 1}
        className={arrowBtn}>
        <FaChevronLeft />
      </button>
      {paginationControl.map((page, index) => (
        <button
          key={index}
          onClick={() => {
            if (page !== '...')
              navigate(
                `${location.pathname}?page=${page}&limit=${perPage}&search_query=${searchQuery}&sort_key=${sortKey}&sort_type=${sortType}`
              );
          }}
          disabled={index >= pageCount}
          className={clsx(getButtonClass(page), 'text-neutral-800 hover:text-neutral-800')}>
          {page}
        </button>
      ))}
      <button
        onClick={() => {
          navigate(
            `${location.pathname}?page=${
              pageIndex + 1
            }&limit=${perPage}&search_query=${searchQuery}&sort_key=${sortKey}&sort_type=${sortType}`
          );
        }}
        disabled={pageIndex >= pageCount}
        className={arrowBtn}>
        <FaChevronRight />
      </button>
    </div>
  );
}

export function BuildPaginationControl(currentPage: number, pageCount: number, delta = 1) {
  const rangeWithDots: (number | string)[] = [];

  if (isNaN(pageCount) || pageCount === 0) {
    return []; // Return an empty array when pageCount is NaN or 0
  }

  const range = [...Array(pageCount)]
    .map((_, i) => i + 1)
    .map((page) => {
      if (
        Math.abs(page - 1) <= delta ||
        Math.abs(pageCount - page) <= delta ||
        Math.abs(currentPage - page) <= delta
      )
        return page;

      return -1;
    })
    .filter((page) => page !== -1);

  range.forEach((page, i) => {
    const previousPage = range[i - 1];
    if (page - previousPage > 1) rangeWithDots.push('...');
    rangeWithDots.push(page);
  });

  return rangeWithDots;
}
