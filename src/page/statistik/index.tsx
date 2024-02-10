import { Anchor, Breadcrumbs, Button, Modal } from '@mantine/core';
import React, { useEffect } from 'react';
import SearchInput from '../../components/uiComponents/inputComponents/SearchInput';
import { FaPlus, FaUpload } from 'react-icons/fa';
import {
  DeleteStatistikTanamanById,
  GetStatistikTanamanAll,
  UploadStatistikTanaman
} from '../../infrastucture/statistic';
import Table from '../../components/table/Table';
import { PaginatedRespApiData } from '../../types/paginatedRespApi';
import { TDataTanaman, TTableDataTanaman } from '../../types/dataTanaman';
import { ColumnDef } from '@tanstack/react-table';
import { Link, useLocation } from 'react-router-dom';
import { ImPencil } from 'react-icons/im';
import { IoEyeOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import { TKelompokTani } from '../../types/kelompokTani';
import { SearchPoktan } from '../../infrastucture/searchApi';
import { FaCheckDouble } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../infrastucture/redux/state/stateSlice';
import { RootState } from '../../infrastucture/redux/store';

const breadcrumbItems = [
  { title: 'Dashboard', href: '/' },
  { title: 'Statistik' },
  { title: 'Tabel Statistik' }
].map((item, index) => (
  <Anchor href={item.href} key={index} className="text-white opacity-50">
    {item.title}
  </Anchor>
));

const columns: ColumnDef<TTableDataTanaman>[] = [
  {
    accessorKey: 'no',
    header: 'No',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'fk_kelompokId',
    header: 'No. Poktan',
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
    accessorKey: 'createdAt',
    header: 'Tanggal Dibuat',
    cell: (props) => (
      <span>{`${new Date(props.getValue() as string).toLocaleDateString('id-ID')}`}</span>
    )
  },
  {
    accessorKey: 'prakiraanBulanPanen',
    header: 'Prakiraan Bulan Panen',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'actions',
    header: 'Aksi',
    cell: (props) => props.row.original.actions
  }
];

const filterDataPoktan = (data: TKelompokTani[]) => {
  return data.map((item) => ({
    ...item,
    value: item.id.toString(),
    label: `${item.gapoktan} - ${item.namaKelompok}`
  }));
};

const loadOptions = (
  inputValue: string,
  callback: (
    options: (TKelompokTani & {
      value: string;
      label: string;
    })[]
  ) => void
) => {
  setTimeout(async () => {
    const data = await SearchPoktan(inputValue);
    callback(filterDataPoktan(data ?? []));
  }, 1000);
};

export default function Index() {
  const [dataTable, setDataTable] = React.useState<
    PaginatedRespApiData<TTableDataTanaman> | undefined
  >();
  const [resp, setResp] = React.useState<PaginatedRespApiData<TDataTanaman> | undefined>();
  const [poktan, setPoktan] = React.useState<TKelompokTani>();
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<TDataTanaman | undefined>();

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 10;

  const searchQuery = searchParams.get('search_query') ?? '';
  const sortKey = searchParams.get('sort_key') ?? '';
  const sortType = searchParams.get('sort_type') ?? '';

  const user = useSelector((state: RootState) => state.state.user);
  // console.log(user?.peran)
  useEffect(() => {
    GetStatistikTanamanAll(poktan?.id, {
      page: Number(page),
      limit: Number(limit),
      search: searchQuery,
      sortBy: sortKey,
      sortType: sortType as '' | 'ASC' | 'DESC'
    }).then((res) => {
      setResp(res?.data);
    });
  }, [poktan, page, limit, searchQuery, sortKey, sortType]);

  useEffect(() => {
    if (resp) {
      setDataTable({
        ...resp,
        data: resp.data.map((item, index) => ({
          ...item,
          no: resp.from + index,
          actions: (
            <div className="flex gap-4">
              <Link to={`/statistik/${item.id}`}>
                <div className="flex h-7 w-7 items-center justify-center bg-green-500">
                  <IoEyeOutline className="h-6 w-6 text-white" />
                </div>
              </Link>
              {user?.peran !== 'operator poktan' && (
                <Link to={`/statistik/edit/${item.id}`}>
                  <div className="flex h-7 w-7 items-center justify-center bg-yellow-500">
                    <ImPencil className="h-[18px] w-[18px] text-white" />
                  </div>
                </Link>
              )}
              {user?.peran !== 'penyuluh' && (
                <Link to={`/statistik/${item.id}/realisasi`}>
                  <div className="flex h-7 w-7 items-center justify-center bg-gray-500">
                    <FaCheckDouble className="h-[18px] w-[18px] text-white" />
                  </div>
                </Link>
              )}
              {user?.peran === 'operator super admin' && (
                <button
                  onClick={() => {
                    setShowModalDelete(true);
                    setSelectedData(item);
                  }}>
                  <div className="flex h-7 w-7 items-center justify-center bg-red-500">
                    <MdDeleteOutline className="h-6 w-6 text-white" />
                  </div>
                </button>
              )}
            </div>
          )
        }))
      });
    }
  }, [resp]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files) return;

    const file = event.target.files[0];
    UploadStatistikTanaman(file).then(() => {
      window.location.reload();
    });
  }

  return (
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <h3 className="text-white text-2xl font-bold mt-4">TABEL DATA STATISTIK PERTANIAN</h3>
      <SearchInput
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onChange={(value) => {
          setPoktan(value as TKelompokTani);
        }}
        value={poktan}
        isClearable
      />
      <div className="relative bg-white bg-opacity-20 mt-6 p-4 flex items-center w-full">
        <h3 className="text-white text-2xl font-bold mx-auto">TABEL DATA STATISTIK PERTANIAN</h3>
        <div className="absolute right-4 flex gap-2 items-center justify-center">
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx,.xls"
          />
          <Link
            to="/statistik/tambah"
            className="rounded-md bg-[#86BA34] text-white py-1.5 px-4 h-9 flex items-center">
            <FaPlus />
          </Link>
          <Button
            className="bg-[#F29D0E]"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}>
            <FaUpload />
            <span className="ml-2">Upload File</span>
          </Button>
        </div>
      </div>
      <Table
        data={dataTable}
        columns={columns}
        exportUrl="/statistik/export"
        withPaginationCount
        withPaginationControl
      />
      <Modal opened={showModalDelete} onClose={() => setShowModalDelete(false)} centered>
        Apakah Kamu Yakin Akan Menghapus Data Statistik Pertanian ini (ID: {selectedData?.id})?
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <Button
            color="cyan"
            style={{
              color: 'white',
              backgroundColor: '#303A47',
              marginRight: 8
            }}
            onClick={() => setShowModalDelete(false)}>
            Cancel
          </Button>
          <Button
            color="cyan"
            style={{ color: 'white', backgroundColor: 'blue' }}
            type="submit"
            onClick={() => {
              if (!selectedData) return;
              setShowModalDelete(false);
              DeleteStatistikTanamanById(selectedData.id).then(() => {
                GetStatistikTanamanAll().then((res) => {
                  setResp(res?.data);
                });
              });
            }}>
            Hapus
          </Button>
        </div>
      </Modal>
    </div>
  );
}
