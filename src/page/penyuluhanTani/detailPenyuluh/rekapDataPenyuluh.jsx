import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import Table from '@/components/table/Table';
import { getDaftarPenyuluh, DeleteDaftarPenyuluh, UploadDataPenyuluh } from '@/infrastruture';
import { Text, Button, Modal, Anchor, Breadcrumbs } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import SearchInput from '../../../components/uiComponents/inputComponents/SearchInput';
import { ImPencil } from 'react-icons/im';
import { IoEyeOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';

const breadcrumbItems = [
  { title: 'Dashboard', href: '/' },
  { title: 'Data Penyuluh' },
  { title: 'Tabel Penyuluh' }
].map((item, index) => (
  <Anchor href={item.href} key={index} className="text-white opacity-50">
    {item.title}
  </Anchor>
));

const columns = [
  {
    accessorKey: 'no',
    header: 'No',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'nik',
    header: 'Nip Penyuluh',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'nama',
    header: 'Nama Penyuluh',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'noTelp',
    header: 'Kontak Penyuluh',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    header: 'Kecamatan Binaan',
    accessorFn: (row) => row.kecamatanBinaanData.map((item) => item.kecamatan.nama).join(', '),
    cell: (props) => <span>{`${props.getValue() ?? '-'}`}</span>
  },
  {
    header: 'Desa Binaan',
    accessorFn: (row) => row.desaBinaanData.map((item) => item.desa.nama).join(', '),
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'actions',
    header: 'Aksi',
    cell: (props) => props.row.original.actions
  }
];

const RekapDataPenyuluh = () => {
  const [modalDeleteData, setModalDeleteData] = useState(false);
  const [resp, setResp] = useState();
  const [dataTable, setDataTable] = useState();
  const fileInputRef = useRef();
  const location = useLocation();
  const user = useSelector((state) => state.state.user);
  const searchParams = new URLSearchParams(location.search);

  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 10;

  useEffect(() => {
    getDaftarPenyuluh(page, limit).then((data) => {
      setResp(data);
    });
  }, [limit, page]);

  const handleDeleteUser = (ids) => {
    DeleteDaftarPenyuluh(ids);
  };

  useEffect(() => {
    if (resp) {
      console.log({ resp });

      setDataTable({
        ...resp,
        data: resp.data.map((item, index) => ({
          ...item,
          no: resp.from + index,
          actions: (
            <div className="flex gap-4">
              <Link to={`/data-penyuluh/detail/${item.id}`}>
                <div className="flex h-7 w-7 items-center justify-center bg-green-500">
                  <IoEyeOutline className="h-6 w-6 text-white" />
                </div>
              </Link>
              <Link to={`/data-penyuluh/${item.id}`}>
                <div className="flex h-7 w-7 items-center justify-center bg-yellow-500">
                  <ImPencil className="h-[18px] w-[18px] text-white" />
                </div>
              </Link>
              {user?.peran === 'operator poktan' && (
                <button
                  onClick={() => {
                    setModalDeleteData(item?.id);
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
  }, [resp, user?.peran]);

  function handleFileChange(event) {
    if (!event.target.files) return;

    const file = event.target.files[0];

    UploadDataPenyuluh(file).then(() => {
      window.location.reload();
    });
  }
  return (
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <h3 className="text-white text-2xl font-bold mt-4">TABEL DATA PENYULUH</h3>
      <SearchInput placeholder="Cari NIK PENYULUH" />
      <div className="relativemt-6 mt-4 flex items-center w-full">
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
                handleDeleteUser(modalDeleteData);
                setModalDeleteData(false);
              }}>
              Delete
            </Button>
          </div>
        </Modal>
        {/* ... (previous code) */}
        <div className="rounded-lg w-full">
          <div className="relative bg-[#136B09] p-4 flex w-full justify-between rounded-t-lg shadow-lg">
            <h3 className="text-white text-2xl font-bold px-3">DATA TABEL PENYULUH</h3>
            <div className="flex gap-4 items-center">
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx,.xls"
              />
              <Link to={`/data-penyuluh/tambah`}>
                <button className="ms-5 rounded-md bg-[#86BA34] text-white p-1 px-5 w-30 h-10">
                  <FontAwesomeIcon className="text-xl" icon={faPlus} />
                </button>
              </Link>
              <Button
                className="bg-[#F29D0E]"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}>
                <FontAwesomeIcon className="text-xl" icon={faUpload} />
                {/* <faUpload /> */}
                <span className="ml-2">Upload File</span>
              </Button>
            </div>
          </div>
          <Table data={dataTable} columns={columns} withPaginationCount withPaginationControl />
        </div>
      </div>
    </div>
  );
};

export default RekapDataPenyuluh;
