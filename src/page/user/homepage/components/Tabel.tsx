import React, { useEffect } from 'react';
import { TTableTanamanPetani, TTanamanPetani } from '../../../../types/tanamanPetani';
import { PaginatedRespApiData } from '../../../../types/paginatedRespApi';
import Table from '../../../../components/table/Table';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<TTableTanamanPetani>[] = [
  {
    accessorKey: 'no',
    header: 'No',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'kategori',
    header: 'Kategori Tanaman',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'komoditas',
    header: 'Komoditas',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'luasLahan',
    header: 'Luas Lahan',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'periodeBulanTanam',
    header: 'Bulan Tanam',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'periodeMusimTanam',
    header: 'Musim Tanam',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'prakiraanBulanPanen',
    header: 'Prakiraan Bulan Panen',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'prakiraanLuasPanen',
    header: 'Prakiraan Luas Panen',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'prakiraanProduksiPanen',
    header: 'Prakiraan Produksi Panen',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'statusKepemilikanLahan',
    header: 'Status Kepemilikan Lahan',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'createdAt',
    header: 'Ditambahkan pada',
    cell: (props) => (
      <span>{`${new Date((props.getValue() as string) ?? '').toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })}`}</span>
    )
  }
];

export default function Tabel({ apiData }: { apiData: TTanamanPetani[] }) {
  const [dataTable, setDataTable] = React.useState<
    PaginatedRespApiData<TTableTanamanPetani> | undefined
  >();

  useEffect(() => {
    if (apiData) {
      setDataTable({
        total: 5,
        currentPages: 1,
        limit: 5,
        maxPages: 1,
        from: 1,
        to: 1,
        sortBy: 'no',
        sortType: 'ASC',
        data: apiData.map((item, index) => ({
          no: index + 1,
          ...item
        }))
      });
    }
  }, [apiData]);

  return (
    <div className="flex justify-center pt-12 w-full">
      <div className="container rounded-lg">
        <div className="pt-10">
          <div className="text-center text-lg font-semibold !capitalize">
            5 data terbaru statistik pertumbuhan pertanian
          </div>
          <Table data={dataTable} columns={columns} />
        </div>
      </div>
    </div>
  );
}
