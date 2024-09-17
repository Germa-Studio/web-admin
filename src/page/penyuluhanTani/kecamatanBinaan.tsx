import React from 'react';
import { TKecamatanBinaan, TPenyuluh, TTableKecamatanBinaan } from '../../types/petani';
import Table from '../../components/table/Table';
import { ColumnDef } from '@tanstack/react-table';
import { PaginatedRespApiData } from '../../types/paginatedRespApi';
import { Modal } from '@mantine/core';
import { TDataWilayahDetail } from '../../types/wilayah';
import { fecthKecamatan } from '../../infrastucture/daerah';
import { addKecamatanBinaan, deleteKecamatanBinaan } from '../../infrastucture/wilayahBinaan';
import { MdDeleteOutline } from 'react-icons/md';
import clsx from 'clsx';

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
  },
  {
    accessorKey: 'actions',
    header: 'Aksi',
    cell: (props) => props.row.original.actions
  }
];

export default function KecamatanBinaan({
  penyuluh,
  viewOnly = true,
  daftarKecamatan
}: {
  penyuluh: TPenyuluh;
  viewOnly: boolean;
  daftarKecamatan: TDataWilayahDetail[];
}) {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [selectedKecamatan, setSelectedKecamatan] = React.useState<string | number>('');
  const [dataTable] = React.useState<PaginatedRespApiData<TTableKecamatanBinaan> | undefined>({
    data: penyuluh.kecamatanBinaanData.map((kecamatan: TKecamatanBinaan, index: number) => ({
      ...kecamatan,
      no: index + 1,
      actions: (
        <button
          onClick={() => {
            setShowDeleteModal(true);
            setSelectedKecamatan(kecamatan.kecamatanId);
          }}>
          <div className="flex h-7 w-7 items-center justify-center bg-red-500">
            <MdDeleteOutline className="h-6 w-6 text-white" />
          </div>
        </button>
      )
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

  return (
    <>
      <button
        className={clsx(
          'text-white bg-blue-500 mt-4 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700',
          viewOnly && 'hidden'
        )}
        onClick={() => setShowAddModal(true)}>
        Tambah Kecamatan Binaan
      </button>
      <Table
        columns={viewOnly ? columns.filter((col) => col.accessorKey !== 'actions') : columns}
        data={dataTable}
      />
      <Modal
        opened={showAddModal}
        size="lg"
        onClose={() => setShowAddModal(false)}
        title="Tambah Kecamatan Binaan">
        <label
          htmlFor="kecamatan"
          className="peer-focus:font-medium text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          <strong>Kecamatan</strong> (Contoh: Karanganyar)
        </label>
        <select
          id="kecamatan"
          value={selectedKecamatan}
          onChange={(e) => setSelectedKecamatan(e.target.value)}
          className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none  dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer-placeholder-shown">
          <option disabled value="">
            Pilih Kecamatan
          </option>
          {daftarKecamatan?.map((item, i) => (
            <option value={item.id} key={i}>
              {item.nama}
            </option>
          ))}
        </select>
        <button
          className="text-white bg-blue-500 mt-4 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={() => {
            if (selectedKecamatan === '') return;
            addKecamatanBinaan(penyuluh.id, selectedKecamatan);
            setSelectedKecamatan('');
          }}>
          Tambah
        </button>
      </Modal>
      <Modal
        opened={showDeleteModal}
        size="lg"
        onClose={() => setShowDeleteModal(false)}
        title="Hapus Kecamatan Binaan">
        Apakah anda yakin untuk menghapus kecamatan binaan ini?
        <button
          className="flex items-center justify-center bg-red-500 px-2 py-1 text-white rounded-md mt-4"
          onClick={() => {
            console.log('data', penyuluh.id, selectedKecamatan);

            if (selectedKecamatan === '') return;
            deleteKecamatanBinaan(penyuluh.id, selectedKecamatan);
            setSelectedKecamatan('');
          }}>
          Hapus
        </button>
      </Modal>
    </>
  );
}
