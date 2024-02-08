import { Anchor, Breadcrumbs } from '@mantine/core';
import React, { useEffect } from 'react';
import { FaPlus, FaUserCheck, FaUserXmark } from 'react-icons/fa6';
import { RiArticleLine } from 'react-icons/ri';
import { LuNewspaper } from 'react-icons/lu';
import SearchInput from '../components/uiComponents/inputComponents/SearchInput';
import { TKelompokTani } from '../types/kelompokTani';
import { SearchPoktan } from '../infrastucture/searchApi';
import { PaginatedRespApiData } from '../types/paginatedRespApi';
import { TDataTanaman, TTableDataTanaman } from '../types/dataTanaman';
import { DeleteStatistikTanamanById, GetStatistikTanamanAll } from '../infrastucture/statistic';
import { Link } from 'react-router-dom';
import { IoEyeOutline } from 'react-icons/io5';
import { ImPencil } from 'react-icons/im';
import { MdDeleteOutline, MdOutlineTipsAndUpdates } from 'react-icons/md';
import { ColumnDef } from '@tanstack/react-table';
import Table from '../components/table/Table';
import { GetDashboardInfo } from '../infrastucture/dashboard';

const breadcrumbItems = [{ title: 'Dashboard', href: '/' }].map((item, index) => (
  <Anchor href={item.href} key={index} className="text-white opacity-50">
    {item.title}
  </Anchor>
));

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

export default function Dashboard() {
  const [dataTable, setDataTable] = React.useState<
    PaginatedRespApiData<TTableDataTanaman> | undefined
  >();
  const [resp, setResp] = React.useState<PaginatedRespApiData<TDataTanaman> | undefined>();
  const [poktan, setPoktan] = React.useState<TKelompokTani>();
  const [dashboardData, setDashboardData] = React.useState({
    verifiedPetani: 0,
    unverifiedPetani: 0,
    berita: 0,
    artikel: 0,
    tips: 0
  });

  useEffect(() => {
    GetStatistikTanamanAll(poktan?.id, {
      page: 1,
      limit: 10,
      search: '',
      sortType: 'ASC',
      sortBy: ''
    }).then((res) => {
      setResp(res?.data);
    });
  }, [poktan]);

  useEffect(() => {
    GetDashboardInfo().then((res) => {
      setDashboardData(res);
    });
  }, []);

  useEffect(() => {
    if (resp) {
      setDataTable({
        ...resp,
        data: resp.data.map((item, index) => ({
          ...item,
          no: index + 1,
          actions: (
            <div className="flex gap-4">
              <Link to={`/statistik/${item.id}`}>
                <div className="flex h-7 w-7 items-center justify-center bg-green-500">
                  <IoEyeOutline className="h-6 w-6 text-white" />
                </div>
              </Link>
              <Link to={`/statistik/${item.id}`}>
                <div className="flex h-7 w-7 items-center justify-center bg-yellow-500">
                  <ImPencil className="h-[18px] w-[18px] text-white" />
                </div>
              </Link>
              <button
                onClick={() => {
                  DeleteStatistikTanamanById(item.id).then(() => {
                    GetStatistikTanamanAll().then((res) => {
                      setResp(res?.data);
                    });
                  });
                }}>
                <div className="flex h-7 w-7 items-center justify-center bg-red-500">
                  <MdDeleteOutline className="h-6 w-6 text-white" />
                </div>
              </button>
            </div>
          )
        }))
      });
    }
  }, [resp]);
  return (
    <div className="h-screen">
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <h3 className="text-white text-2xl font-bold my-4">Dashboard</h3>
      <div className="grid gap-8 grid-cols-2">
        <div className="rounded-lg bg-[#3B5D38] p-6">
          <h4 className="text-white text-xl font-bold">Statistik</h4>
          <div className="rounded-lg bg-[#E3EAE2] mt-4 grid grid-cols-3">
            <Link
              className="w-full h-full py-4 px-8 hover:bg-[#C6D4C4] hover:text-white transition-all rounded-l-lg flex flex-col cursor-pointer text-[#3B5D38] justify-between items-center"
              to="/info-tani?category=berita">
              <LuNewspaper size={40} />
              <div className="flex items-center flex-col justify-center text-lg">
                <h5 className="font-bold text-center">Berita</h5>
                <p className="font-semibold">{dashboardData.berita}</p>
              </div>
            </Link>
            <Link
              className="w-full h-full py-4 px-8 hover:bg-[#C6D4C4] hover:text-white transition-all flex flex-col cursor-pointer text-[#3B5D38] justify-between items-center"
              to="/info-tani?category=artikel">
              <RiArticleLine size={40} />
              <div className="flex items-center flex-col justify-center text-lg">
                <h5 className="font-bold text-center">Artikel</h5>
                <p className="font-semibold">{dashboardData.artikel}</p>
              </div>
            </Link>
            <Link
              className="w-full h-full py-4 px-8 hover:bg-[#C6D4C4] hover:text-white transition-all rounded-r-lg flex flex-col cursor-pointer text-[#3B5D38] justify-between items-center"
              to="/info-tani?category=tips">
              <MdOutlineTipsAndUpdates size={40} />
              <div className="flex items-center flex-col justify-center text-lg">
                <h5 className="font-bold text-center">Tips</h5>
                <p className="font-semibold">{dashboardData.tips}</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="rounded-lg bg-[#E3EAE2] p-6">
          <h4 className="text-[#3B5D38] text-xl font-bold">Notifikasi</h4>
          <div className="rounded-lg bg-[#E3EAE2] mt-4 grid grid-cols-2 gap-6">
            <div className="w-full h-full py-4 px-8 bg-[#3B5D38] hover:bg-[#598C54] transition-all rounded-lg flex cursor-pointer text-white justify-center items-center relative">
              <Link
                className="flex items-center flex-col justify-center"
                to="/data-tani/rekap-petani?verified=true">
                <FaUserCheck size={40} />
                <h5 className="font-semibold text-center">Petani sudah verifikasi</h5>
              </Link>
              <div className="absolute border-4 border-[#E3EAE2] bg-[#3B5D38] h-10 w-10 -top-4 -right-4 flex items-center justify-center rounded-full">
                {dashboardData.verifiedPetani}
              </div>
            </div>
            <div className="w-full h-full py-4 px-8 bg-[#3B5D38] hover:bg-[#598C54] transition-all rounded-lg flex cursor-pointer text-white justify-center items-center relative">
              <Link
                className="flex items-center flex-col justify-center"
                to="/data-tani/rekap-petani?verified=false">
                <FaUserXmark size={40} />
                <h5 className="font-semibold text-center">Petani belum verifikasi</h5>
              </Link>
              <div className="absolute border-4 border-[#E3EAE2] bg-[#3B5D38] h-10 w-10 -top-4 -right-4 flex items-center justify-center rounded-full">
                {dashboardData.unverifiedPetani}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchInput
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onChange={(value) => {
          setPoktan(value as TKelompokTani);
        }}
        value={poktan}
        isClearable
        className="mt-8"
      />
      <div className="relative bg-white bg-opacity-20 mt-6 p-4 flex items-center w-full">
        <h3 className="text-white text-2xl font-bold mx-auto">TABEL DATA STATISTIK PERTANIAN</h3>
        <Link to="/statistik/tambah" className="absolute right-4 text-[#0FA958] text-xl">
          <FaPlus />
        </Link>
      </div>
      <Table data={dataTable} columns={columns} />
    </div>
  );
}
