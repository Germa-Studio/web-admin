import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import Table from '@/components/table/Table';
import { GetDaftarTani, DeleteDaftarTani, UploadDataPetani } from '@/infrastruture';
import { Text, Button, Modal, Anchor, Breadcrumbs, Tooltip } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { ImPencil } from 'react-icons/im';
import { IoEyeOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { FaCheckDouble } from 'react-icons/fa6';
import { VerifyingUser } from '../../../infrastucture';
import SearchInput from '../../../components/uiComponents/inputComponents/searchInput';

const breadcrumbItems = [
  { title: 'Dashboard', href: '/' },
  { title: 'Data Petani' },
  { title: 'Tabel Petani' }
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
    header: 'NIK Petani',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'nama',
    header: 'Nama Petani',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'noTelp',
    header: 'Kontak Petani',
    cell: (props) => <span>{`${props.getValue() ?? '-'}`}</span>
  },
  {
    accessorKey: 'kecamatanData.nama',
    header: 'Kecamatan',
    cell: (props) => <span>{`${props.getValue() ?? '-'}`}</span>
  },
  {
    accessorKey: 'desaData.nama',
    header: 'Desa',
    cell: (props) => <span>{`${props.getValue() ?? '-'}`}</span>
  },
  {
    accessorKey: 'dataPenyuluh.nama',
    header: 'Pembina',
    cell: (props) => <span>{`${props.getValue() ?? '-'}`}</span>
  },
  {
    accessorKey: 'actions',
    header: 'Aksi',
    cell: (props) => props.row.original.actions
  }
];

const RekapPetani = () => {
  const user = useSelector((state) => state.state.user);
  const [modalDeleteData, setModalDeleteData] = useState(false);
  const [resp, setResp] = useState();
  const [dataTable, setDataTable] = useState();
  const fileInputRef = useRef();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 10;
  const verified = searchParams.get('verified') ?? '';

  useEffect(() => {
    GetDaftarTani(page, limit, verified).then((data) => {
      setResp(data);
    });
  }, [limit, page, verified]);

  const handleDeleteUser = (ids) => {
    DeleteDaftarTani(ids);
  };

  function handleFileChange(event) {
    if (!event.target.files) return;

    const file = event.target.files[0];
    UploadDataPetani(file).then(() => {
      window.location.reload();
    });
  }

  useEffect(() => {
    if (resp) {
      setDataTable({
        ...resp,
        data: resp.data.map((item, index) => ({
          ...item,
          no: resp.from + index,
          actions: (
            <div className="flex gap-4">
              <Link to={`/data-tani/detail/${item.id}`}>
                <div className="flex h-7 w-7 items-center justify-center bg-green-500">
                  <IoEyeOutline className="h-6 w-6 text-white" />
                </div>
              </Link>
              <Link to={`/rekap-data-tani/edit/${item.id}`}>
                <div className="flex h-7 w-7 items-center justify-center bg-yellow-500">
                  <ImPencil className="h-[18px] w-[18px] text-white" />
                </div>
              </Link>
              {user?.peran === 'operator super admin' && (
                <>
                  <Tooltip
                    label={item?.tbl_akun?.isVerified ? 'Sudah Terverifikasi' : 'Verifikasi'}>
                    <button
                      onClick={() => {
                        VerifyingUser(item?.tbl_akun?.id);
                      }}
                      className="flex h-7 w-7 items-center justify-center bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={item?.tbl_akun?.isVerified}>
                      <FaCheckDouble className="h-6 w-6 text-white" />
                    </button>
                  </Tooltip>
                  <button
                    onClick={() => {
                      setModalDeleteData(item?.id);
                    }}>
                    <div className="flex h-7 w-7 items-center justify-center bg-red-500">
                      <MdDeleteOutline className="h-6 w-6 text-white" />
                    </div>
                  </button>
                </>
              )}
            </div>
          )
        }))
      });
    }
  }, [resp, user?.peran]);

  return (
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <h3 className="text-white text-2xl font-bold mt-4">TABEL DATA PETANI</h3>
      <SearchInput placeholder="Cari NIK PETANI / POKTAN" />
      <div className="relativemt-6 mt-4 flex items-center w-full">
        <Modal
          opened={modalDeleteData}
          onClose={() => setModalDeleteData(false)}
          withCloseButton={false}
          centered>
          <Text>Apakah Kamu Yakin Akan Menghapus Data Ini ?</Text>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 20
            }}>
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
        <div className="rounded-lg w-full">
          <div className="relative bg-[#136B09] p-4 flex w-full justify-between rounded-t-lg shadow-lg">
            <h3 className="text-white text-2xl font-bold px-3">DATA TABEL PETANI</h3>
            <div className="flex gap-4 items-center">
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx,.xls"
              />
              <Link to={`/data-tani/tambah`}>
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
                <span className="ml-2">Upload File</span>
              </Button>
            </div>
          </div>
          <div className="pt-0">
            <Table data={dataTable} columns={columns} withPaginationCount withPaginationControl />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekapPetani;
