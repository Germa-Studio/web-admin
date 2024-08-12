import React, { useEffect } from 'react';
import { TTableTanamanPetani, TTanamanPetani } from '../../../../types/tanamanPetani';
import { PaginatedRespApiData } from '../../../../types/paginatedRespApi';
import Table from '../../../../components/table/Table';
import { ColumnDef } from '@tanstack/react-table';
import { GetTopTanmanPetani } from '../../../../infrastucture';

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
  // {
  //   accessorKey: 'luasLahan',
  //   header: 'Luas Lahan',
  //   cell: (props) => <span>{`${props.getValue()}`}</span>
  // },
  {
    accessorKey: 'periodeBulanTanam',
    header: 'Bulan Tanam',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  // {
  //   accessorKey: 'periodeMusimTanam',
  //   header: 'Musim Tanam',
  //   cell: (props) => <span>{`${props.getValue()}`}</span>
  // },
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
  // {
  //   accessorKey: 'statusKepemilikanLahan',
  //   header: 'Status Kepemilikan Lahan',
  //   cell: (props) => <span>{`${props.getValue()}`}</span>
  // },
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
  },
  // Nama Kelompok Tani, Daerah (Kecamatan), Nomor WA/ Nomor HP petani
  {
    accessorKey: 'dataPetani.kelompok.namaKelompok',
    header: 'Nama Kelompok Tani',
    cell: (props) => <span>{`${props.getValue() ?? '-'}`}</span>
  },

  {
    accessorKey: 'dataPetani.kelompok.desa',
    header: 'Daerah (Kecamatan)',
    cell: (props) => <span>{`${props.getValue() ?? '-'}`}</span>
  },

  {
    accessorKey: 'dataPetani.noTelp',
    header: 'Nomor WA/ Nomor HP Petani',
    cell: (props) => <span>{`${props.getValue() ?? '-'}`}</span>
  }
];

export default function Tabel() {
  const searchParams = new URLSearchParams(location.search);

  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 10;

  const [dataTable, setDataTable] = React.useState<
    PaginatedRespApiData<TTableTanamanPetani> | undefined
  >();

  useEffect(() => {
    GetTopTanmanPetani(page, limit).then((res) => {
      setDataTable({
        ...res,
        data: res.data.map((item: TTanamanPetani, index: number) => ({
          no: index + 1,
          ...item
        }))
      });
    });
    // setDataTable({
    //   total: 5,
    //   currentPages: 1,
    //   limit: 5,
    //   maxPages: 1,
    //   from: 1,
    //   to: 1,
    //   sortBy: 'no',
    //   sortType: 'ASC',
    //   data: apiData.map((item, index) => ({
    //     no: index + 1,
    //     ...item
    //   }))
    // });
  }, [page, limit]);

  return (
    <div className="flex justify-center pt-12 w-full">
      <div className="container rounded-lg">
        <div className="pt-10">
          <div className="text-center text-lg lg:text-xl font-semibold !capitalize">
            Menampilkan {dataTable?.from}-{dataTable?.to} Tertinggi produk komoditas
          </div>
          <Table data={dataTable} columns={columns} withPaginationCount withPaginationControl />
        </div>
      </div>
    </div>
  );
}
