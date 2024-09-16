import React from 'react';
import { TKecamatanBinaan, TPenyuluh, TTableKecamatanBinaan } from '../../types/petani';
import Table from '../../components/table/Table';
import { ColumnDef } from '@tanstack/react-table';
import { PaginatedRespApiData } from '../../types/paginatedRespApi';

const columns: ColumnDef<TTableKecamatanBinaan>[] = [
  {
    accessorKey: 'no',
    header: 'No',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'kecamatan.nama',
    header: 'Kecamatan',
    cell: (props) => <span>{`${props.getValue() ?? '-'}`}</span>
  }
];

export default function KecamatanBinaan({ penyuluh }: { penyuluh: TPenyuluh }) {
  const [dataTable] = React.useState<PaginatedRespApiData<TTableKecamatanBinaan> | undefined>({
    data: penyuluh.kecamatanBinaanData.map((kecamatan: TKecamatanBinaan, index: number) => ({
      ...kecamatan,
      no: index + 1,
      actions: <></>
    })),
    total: penyuluh.kecamatanBinaanData.length,
    currentPages: 1,
    limit: penyuluh.kecamatanBinaanData.length,
    maxPages: 1,
    from: 1,
    to: penyuluh.kecamatanBinaanData.length,
    sortBy: 'id',
    sortType: 'ASC'
  });

  return <Table columns={columns} data={dataTable} />;
}
