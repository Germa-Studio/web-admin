import { useState, useEffect } from 'react';
import {
  Anchor,
  Breadcrumbs,
  Button,
  Image,
  Modal,
  NumberInput,
  Radio,
  Select,
  Tabs,
  Text,
  TextInput
} from '@mantine/core';
import Table from '@/components/table/Table';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
// import React, { useEffect } from "react";
// import SearchInput from "../../../../components/uiComponents/inputComponents/SearchInput";
import SearchInput from '../../../../components/uiComponents/inputComponents/SearchInput';
import { FaRegRectangleList } from 'react-icons/fa6';
// import { GetStatistikTanamanAll } from "../../infrastucture";
import { IoImageOutline } from 'react-icons/io5';
import { SearchPetani } from '../../../../infrastucture/searchApi';
import {
  GetListTanaman,
  GetTanamanPetaniById,
  UpdateTanamanPetani,
  DeleteTanamanPetani
} from '../../../../infrastucture/index';
import { ImPencil } from 'react-icons/im';
import { IoEyeOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import Loading from '../../../../components/loading';
import LoadingAnimation from '../../../../components/loading';
import {
  komoditasSemusim,
  komoditasTahunan,
  tanamanPangan,
  tanamanPerkebunan
} from '../../../../types/const';

const breadcrumbItems = [
  { title: 'Dashboard', href: '/' },
  { title: 'Data Tanaman Petani' },
  { title: 'Edit' }
].map((item, index) => (
  <Anchor href={item.href} key={index} className="text-white opacity-50">
    {item.title}
  </Anchor>
));

const filterDataPetani = (data) => {
  return data.map((item) => ({
    ...item,
    value: item.id.toString(),
    label: `${item.nik} - ${item.nama}`
  }));
};

const loadOptions = (inputValue, callback) => {
  setTimeout(async () => {
    const data = await SearchPetani(inputValue);
    callback(filterDataPetani(data || []));
  }, 1000);
};

const columns = [
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
    header: 'Jenis Komoditas',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'statusKepemilikanLahan',
    header: 'Status Lahan',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'prakiraanBulanPanen',
    header: 'Prakiraan Panen',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'actions',
    header: 'Aksi',
    cell: (props) => props.row.original.actions
  }
];

export default function DetailDataTanaman() {
  const [statusKepemilikanLahan, setStatusKepemilikanLahan] = useState('');
  const [luasLahan, setLuasLahan] = useState();
  const [kategori, setKategori] = useState('');
  const [jenis, setJenis] = useState('');
  const [komoditas, setKomoditas] = useState('');
  const [periodeMusimTanam, setPeriodeMusimTanam] = useState('');
  const [periodeBulanTanam, setPeriodeBulanTanam] = useState('');
  const [prakiraanLuasPanen, setPrakiraanLuasPanen] = useState();
  const [prakiraanProduksiPanen, setPrakiraanProduksiPanen] = useState(0);
  const [prakiraanBulanPanen, setPrakiraanBulanPanen] = useState('');

  const [modalDeleteData, setModalDeleteData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState();
  const [resp, setResp] = useState();
  const [tanaman, setTanaman] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  const location = useLocation();
  // const history = useHistory();

  // useEffect(() => {
  const searchParams = new URLSearchParams(location.search);

  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 10;

  useEffect(() => {
    GetTanamanPetaniById(id).then((data) => {
      setTanaman(data.data);
    });
  }, [id]);

  useEffect(() => {
    setStatusKepemilikanLahan(tanaman?.statusKepemilikanLahan);
    setLuasLahan(tanaman?.luasLahan);
    setKategori(tanaman?.kategori);
    setJenis(tanaman?.jenis);
    setKomoditas(tanaman?.komoditas);
    setPeriodeMusimTanam(tanaman?.periodeMusimTanam);
    setPeriodeBulanTanam(tanaman?.periodeBulanTanam);
    setPrakiraanLuasPanen(tanaman?.prakiraanLuasPanen);
    setPrakiraanProduksiPanen(tanaman?.prakiraanProduksiPanen);
    setPrakiraanBulanPanen(tanaman?.prakiraanBulanPanen);
  }, [tanaman]);

  useEffect(() => {
    GetListTanaman(
      page,
      limit,
      tanaman?.fk_petaniId
      // search,
      // sortKey,
      // sortType
    ).then((data) => {
      setResp(data);
      setLoading(false);
    });
  }, [page, limit, tanaman]);

  useEffect(() => {
    // console.log(dataTable)
  }, [dataTable]);
  useEffect(() => {
    if (resp) {
      setDataTable({
        ...resp,

        data: resp.data.map((item, index) => ({
          ...item,
          no: resp.from + index,
          actions: (
            <div className="flex gap-4">
              <Link to={`/tanaman-petani/edit/${item.id}`}>
                <div className="flex h-7 w-7 items-center justify-center bg-green-500">
                  <IoEyeOutline className="h-6 w-6 text-white" />
                </div>
              </Link>
              <Link to={`/tanaman-petani/edit/${item.id}`}>
                <div className="flex h-7 w-7 items-center justify-center bg-yellow-500">
                  <ImPencil className="h-[18px] w-[18px] text-white" />
                </div>
              </Link>
              <button
                onClick={() => {
                  setModalDeleteData(item?.id);
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
  const handleDeleteTanaman = (ids) => {
    DeleteTanamanPetani(ids);
    // delay 6 seconds
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      statusKepemilikanLahan,
      luasLahan,
      kategori,
      jenis,
      komoditas,
      periodeMusimTanam,
      periodeBulanTanam,
      prakiraanLuasPanen,
      prakiraanProduksiPanen,
      prakiraanBulanPanen,
      fk_petaniId: tanaman?.fk_petaniId
    };
    // console.log(data)
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // console.log({formData})
    UpdateTanamanPetani(id, data).then(() => setLoading(false));
    window.history.push('/tanaman-petani');
  };

  return (
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <h3 className="text-white text-2xl font-bold mt-4">TABEL DATA TANAMAN PERTANIAN</h3>
      <SearchInput
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        isDisabled
        value={tanaman?.dataPetani?.nama}
        // isClearable
        placeholder={`${tanaman?.dataPetani?.nik} - ${tanaman?.dataPetani?.nama}`}
      />
      <Modal
        opened={modalDeleteData}
        onClose={() => setModalDeleteData(false)}
        withCloseButton={false}
        centered>
        <Text>Apakah Kamu Yakin Akan Menghapus Data Ini ?</Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <Button
            color="cyan"
            style={{
              color: 'white',
              backgroundColor: '#303A47',
              marginRight: 8
            }}
            onClick={() => setModalDeleteData(false)}>
            Cancel
          </Button>
          <Button
            color="cyan"
            style={{ color: 'white', backgroundColor: 'red' }}
            type="submit"
            onClick={() => {
              handleDeleteTanaman(modalDeleteData);
              setModalDeleteData(false);
            }}>
            Delete
          </Button>
        </div>
      </Modal>
      <div className="bg-[#D9D9D9] rounded-lg">
        <div className="relative bg-[#136B09] mt-6 p-4 flex w-full justify-between rounded-t-lg shadow-lg">
          <h3 className="text-white text-2xl font-bold">MENAMPILKAN DATA PETANI</h3>
        </div>
        <div className="grid grid-cols-5 gap-8 p-6">
          <div className="col-span-2">
            <span className="flex items-center gap-2">
              <IoImageOutline /> Menampilkan Gambar
            </span>
            <Image
              radius="md"
              rounded="md"
              width={300} // Set the width of the image
              height={200} // Set the height of the image
              src={
                'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png'
              }
            />
          </div>
          <div className="col-span-3 grid grid-cols-2 gap-4">
            <TextInput label="NIK" disabled value={tanaman?.dataPetani?.nik} />
            <TextInput label="Nama Petani" disabled value={tanaman?.dataPetani?.nama} />
            <TextInput label="Desa Domisili" disabled value={tanaman?.dataPetani?.desa} />
            <TextInput
              label="Nama Gapoktan"
              disabled
              value={tanaman?.dataPetani?.kelompok?.gapoktan}
            />
            <TextInput
              label="Nama Kelompok"
              disabled
              value={tanaman?.dataPetani?.kelompok?.namaKelompok}
            />
            <TextInput
              label="Nama Penyuluh"
              disabled
              value={tanaman?.dataPetani?.dataPenyuluh?.nama}
            />
          </div>
        </div>
      </div>
      {tanaman?.fk_petaniId ? (
        <form className="bg-[#D9D9D9] rounded-lg" onSubmit={(e) => handleSubmit(e)} method="PUT">
          {loading && <Loading />}
          {/* <div className="bg-[#D9D9D9] rounded-lg"> */}
          <div className="relative bg-[#136B09] mt-6 p-4 flex w-full justify-between rounded-t-lg shadow-lg items-center">
            <h3 className="text-white text-2xl font-bold">MASUKKAN DATA TANAMAN</h3>
            {/* <button className="flex px-4 py-2 gap-4 bg-[#F29D0E] rounded-lg items-center justify-center text-xl text-white active:bg-[#F29D0E] active:shadow-md active:translate-y-1">
                <FaUpload />
                <span>UPLOAD FILE </span>
              </button> */}
          </div>
          <div className="grid grid-cols-2 gap-8 p-6">
            <div className="flex flex-col gap-4 justify-between flex-1">
              <div className="bg-white rounded-lg p-4">
                <p>STATUS KEPEMILIKAN LAHAN</p>
                <Select
                  className="mt-2"
                  placeholder="Status Tanah"
                  value={statusKepemilikanLahan}
                  data={['MILIK SENDIRI', 'TANAH SEWA']}
                  disabled
                  onChange={(value) => setStatusKepemilikanLahan(value)}
                />
              </div>
              <div className="bg-white rounded-lg p-4">
                <p>
                  Luas Lahan Tanam (M<sup>2</sup>)
                </p>
                <NumberInput
                  placeholder="Luas Lahan Tanaman"
                  disabled
                  min={0}
                  value={Number(luasLahan)}
                  onChange={(value) => setLuasLahan(value)}
                />
              </div>
              <div className="bg-white rounded-lg p-4">
                <p>Kategori Tanaman</p>
                <div className="rounded-lg shadow-lg p-4">
                  <Radio.Group
                    className="[&>*]:mt-1 first:mt-0"
                    value={kategori}
                    onChange={(value) => setKategori(value)}>
                    <Radio disabled label="Tanaman Pangan" value="TANAMAN PANGAN" />
                    <Radio disabled label="Tanaman Perkebunan" value="TANAMAN PERKEBUNAN" />
                    <Radio disabled label="Tanaman Holtikultura" value="TANAMAN HOLTIKULTURA" />
                    {kategori && kategori.toLowerCase() === 'tanaman holtikultura' && (
                      <Radio.Group
                        className="ml-8 [&>*]:mt-1"
                        value={jenis}
                        onChange={(value) => setJenis(value)}>
                        <Radio disabled label="Jenis Buah" value="BUAH" />
                        <Radio disabled label="Jenis Sayur" value="SAYUR" />
                      </Radio.Group>
                    )}
                  </Radio.Group>
                </div>
                <p className="mt-4">Komoditas Tanaman</p>
                <Tabs defaultValue="semusim" disabled>
                  <Tabs.List>
                    <Tabs.Tab disabled value="semusim">
                      Semusim
                    </Tabs.Tab>
                    <Tabs.Tab disabled value="tahunan">
                      Tahunan
                    </Tabs.Tab>
                  </Tabs.List>

                  {/* {periodeMusimTanam?.toLowerCase === 'tanaman semusim' ? ( */}
                  <Tabs.Panel value="semusim">
                    <Select
                      className="mt-2"
                      placeholder="Jenis Hasil Panen"
                      data={
                        kategori?.toUpperCase() === 'TANAMAN PANGAN'
                          ? tanamanPangan
                          : kategori?.toUpperCase() === 'TANAMAN PERKEBUNAN'
                            ? tanamanPerkebunan
                            : komoditasSemusim
                      }
                      value={komoditas}
                      disabled
                      onChange={(value) => setKomoditas(value)}
                    />
                  </Tabs.Panel>
                  {/* ) : ( */}
                  <Tabs.Panel value="tahunan">
                    <Select
                      className="mt-2"
                      placeholder="Jenis Hasil Panen"
                      data={
                        kategori?.toUpperCase() === 'TANAMAN PANGAN'
                          ? tanamanPangan
                          : kategori?.toUpperCase() === 'TANAMAN PERKEBUNAN'
                            ? ['Perkebunan Tembakau', 'Perkebunan Tebu'].map((buah) => `${buah}`)
                            : komoditasTahunan.map((buah) => `${buah}`)
                      }
                      value={komoditas}
                      onChange={(value) => setKomoditas(value)}
                    />
                  </Tabs.Panel>
                  {/* )} */}
                </Tabs>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-between flex-1">
              <div className="relative">
                <div className="relative">
                  {/* <div className="absolute w-full h-full bg-[#545454] z-50 rounded-lg bg-opacity-75 flex items-center justify-center text-[#888888] font-bold text-4xl cursor-default">
                      DISABLED
                    </div> */}
                  <div className="bg-[#136B09] text-xl text-white font-bold py-2 px-6 flex w-fit justify-between rounded-t-lg shadow-lg items-center">
                    DATA TANAMAN
                  </div>
                  <div className="bg-white rounded-lg p-4 rounded-tl-none flex gap-1 flex-col">
                    <p>PERIODE MUSIM TANAM</p>
                    <Select
                      value={periodeMusimTanam}
                      disabled
                      placeholder="-Periode Musim Tanam-"
                      data={['Tanaman Semusim', 'Tanaman Tahunan']}
                      onChange={(value) => setPeriodeMusimTanam(value)}
                    />
                    <p>PERIODE BULAN TANAM</p>
                    <Select
                      placeholder="-Periode Bulan Tanam-"
                      disabled
                      data={[
                        'Januari',
                        'Februari',
                        'Maret',
                        'April',
                        'Mei',
                        'Juni',
                        'Juli',
                        'Agustus',
                        'September',
                        'Oktober',
                        'November',
                        'Desember'
                      ]}
                      value={periodeBulanTanam}
                      onChange={(value) => setPeriodeBulanTanam(value)}
                    />
                  </div>
                </div>
                <div className="bg-[#136B09] mt-4 text-xl text-white font-bold py-2 px-6 flex w-fit justify-between rounded-t-lg shadow-lg items-center">
                  Prakiraan Panen
                </div>
                <div className="bg-white rounded-lg p-4 rounded-tl-none flex gap-1 flex-col ">
                  <p>PRAKIRAAN LUAS PANEN (HA)</p>
                  <NumberInput
                    disabled
                    placeholder="Prakiraan Luas Panen"
                    // min={0}
                    value={Number(prakiraanLuasPanen)}
                    onChange={(value) => setPrakiraanLuasPanen(value)}
                  />
                  <p>PRAKIRAAN HASIL PANEN (TON)</p>
                  <NumberInput
                    disabled
                    placeholder="Prakiraan Hasil Panen"
                    min={0}
                    value={Number(prakiraanProduksiPanen)}
                    onChange={(value) => setPrakiraanProduksiPanen(value)}
                  />
                  <p>PRAKIRAAN BULAN PANEN</p>
                  <Select
                    disabled
                    placeholder="-Periode Bulan Panen-"
                    data={[
                      'Januari',
                      'Februari',
                      'Maret',
                      'April',
                      'Mei',
                      'Juni',
                      'Juli',
                      'Agustus',
                      'September',
                      'Oktober',
                      'November',
                      'Desember'
                    ]}
                    value={prakiraanBulanPanen}
                    onChange={(value) => setPrakiraanBulanPanen(value)}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className="flex px-6 pb-6 justify-end gap-4">
            <Button
              type="button"
              className="bg-blue-500"
              onClick={() => {
                navigate('/tanaman-petani');
              }}>
              Kembali
            </Button>
          </div>
          {loading && <LoadingAnimation />}
        </form>
      ) : (
        <div className="relative bg-yellow-500 mt-6 p-4 flex w-full justify-center rounded-lg shadow-lg items-center">
          <h3 className="text-white text-2xl font-bold text-center">CARI PETANI TERLEBIH DAHULU</h3>
        </div>
      )}
      <div className="relative bg-white bg-opacity-20 mt-6 p-4 flex items-center w-full">
        <h3 className="text-white text-2xl font-bold mx-auto">TABEL DATA TANAMAN PERTANIAN</h3>
        <button className="absolute right-4 text-[#0FA958] text-xl">
          <FaRegRectangleList />
        </button>
      </div>
      <Table data={dataTable} columns={columns} withPaginationCount withPaginationControl />
    </div>
  );
}

// export default TambahDataTani;
