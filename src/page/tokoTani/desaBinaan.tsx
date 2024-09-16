import React from 'react';
import { TDesaBinaan, TPenyuluh, TTableDesaBinaan } from '../../types/petani';
import Table from '../../components/table/Table';
import { ColumnDef } from '@tanstack/react-table';
import { PaginatedRespApiData } from '../../types/paginatedRespApi';

const columns: ColumnDef<TTableDesaBinaan>[] = [
  {
    accessorKey: 'no',
    header: 'No',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'desa.nama',
    header: 'Desa',
    cell: (props) => <span>{`${props.getValue() ?? '-'}`}</span>
  },
  {
    accessorKey: 'desa.kecamatan.nama',
    header: 'Kecamatan',
    cell: (props) => <span>{`${props.getValue() ?? '-'}`}</span>
  }
];

export default function DesaBinaan({ penyuluh }: { penyuluh: TPenyuluh }) {
  const [dataTable] = React.useState<PaginatedRespApiData<TTableDesaBinaan> | undefined>({
    data: penyuluh.desaBinaanData.map((desa: TDesaBinaan, index: number) => ({
      ...desa,
      no: index + 1,
      actions: <></>
    })),
    total: penyuluh.desaBinaanData.length,
    currentPages: 1,
    limit: penyuluh.desaBinaanData.length,
    maxPages: 1,
    from: 1,
    to: penyuluh.desaBinaanData.length,
    sortBy: 'id',
    sortType: 'ASC'
  });

  return <Table columns={columns} data={dataTable} />;
}
