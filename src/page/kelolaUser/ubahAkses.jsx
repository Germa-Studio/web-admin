import { useState, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import Table from '@/components/table/Table';
// import { getDaftarPenyuluh, DeleteDaftarPenyuluh, UploadDataPenyuluh } from '@/infrastruture';
// import ExcelComponent from '../../../components/exelComponent';
import { Text, Button, Modal, Anchor, Breadcrumbs } from '@mantine/core';
// import LoadingAnimation from '../../../components/loadingSession';
import { Link, useLocation } from 'react-router-dom';
import SearchInput from '../../components/uiComponents/inputComponents/SearchInput';
import TextInput from '../../components/uiComponents/inputComponents/textInput';
import { ImPencil } from 'react-icons/im';
import { IoEyeOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import HakAkses from './component/hakAkses';

const breadcrumbItems = [
  { title: 'Dashboard', href: '/' },
  { title: 'Data Penyuluh' },
  { title: 'Hak Akses' }
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
    header: 'NIK User',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'nama',
    header: 'Nama User',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'akses',
    header: 'Akses User',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'actions',
    header: 'Aksi',
    cell: (props) => props.row.original.actions
  }
];

export default function UbahAkses(){
    const [modalDeleteData, setModalDeleteData] = useState(false);
    const [modalKelolaData, setModalKelolaData] = useState(false);
  const fileInputRef = useRef();
  const [filter, setFilter] = useState('role')
  const location = useLocation();
  const chooseBase = 'rounded-ss-xl rounded-se-xl w-[50%] text-center h-fit py-2 w-[100%] min-w-8 font-bold text-white transition-all bg-orange-primary hover:bg-green-sidebar-hover duration-200 ease-in-out'
const chooseActive = 'rounded-ss-xl rounded-se-xl w-[50%] text-center h-12 w-[100%] min-w-8 font-bold text-white transition-all bg-[#307B28] hover:bg-green-sidebar-hover duration-200 ease-in-out'

  const searchParams = new URLSearchParams(location.search);

  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 10;

  const data = {data: [
    {
        no: 1,
        nik: 381234567897,
        nama: "zo",
        akses: "admin"
    },
    {
        no: 2,
        nik: 381234567897,
        nama: "zo",
        akses: "admin"
    },
    {
        no: 3,
        nik: 381234567897,
        nama: "zo",
        akses: "admin"
    },
    {
        no: 4,
        nik: 381234567897,
        nama: "zo",
        akses: "admin"
    },
  ]}

  const [dataTable, setDataTable] = useState();
  const [resp, setResp] = useState(data);
//   berguna

  useEffect(() => {
    // getDaftarPenyuluh(page, limit).then((data) => {
      setResp(data);
    // });
  }, [limit, page]);

useEffect(() => {
    if (resp) {
      setDataTable({
        ...resp,
        data: resp.data.map((item, index) => ({
          ...item,
          no: resp.from + index,
          actions: (
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setModalKelolaData(item?.id);
                }}>
                <div className="flex h-7 w-7 items-center justify-center bg-green-500">
                  <IoEyeOutline className="h-6 w-6 text-white" />
                </div>
              </button>
              <button
                onClick={() => {
                  setModalKelolaData(item?.id);
                }}>
                <div className="flex h-7 w-7 items-center justify-center bg-yellow-500">
                  <ImPencil className="h-[18px] w-[18px] text-white" />
                </div>
              </button>
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

    const handleDeleteUser = (ids) => {
    // DeleteDaftarPenyuluh(ids);
  };

  const handleKelolaUser = (ids) => {

  };

  const setAkses = (e) => {

  };
  

  useEffect(() => {
    if (resp) {
      
    }
  }, [resp]);

  const handleClick = (e) => {
    setFilter(e.target.value);
    };


    return(
        <div>
            <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
            <h3 className="text-white text-2xl font-bold mt-4">KELOLA AKSES USER</h3>
            <div className='bg-white mt-4 rounded-lg p-7'>
                <div className='flex h-12 items-end'>
                    <button
                    className={clsx(filter === 'role' ? chooseActive : chooseBase)} 
                    onClick={handleClick}
                    value={'role'}>
                        Ganti Role
                    </button>
                    <button
                    className={clsx(filter === 'akses' ? chooseActive : chooseBase)} 
                    onClick={handleClick}
                    value={'akses'}>
                        Kelola Akses
                    </button>
                </div>
                <div className='rounded-es-lg rounded-ee-lg p-4 drop-shadow-xl border border-solid border-gray-400'>
                    { filter==='role' && 
                        <div>
                            <SearchInput placeholder="Cari NIK User" />
                            <Table data={dataTable} columns={columns} withPaginationCount withPaginationControl />
                        </div>
                    }
                    { filter==='akses' && <HakAkses/>}
                </div>
            </div>
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
            <Modal
                opened={modalKelolaData}
                onClose={() => setModalKelolaData(false)}
                withCloseButton={false}
                centered>
                <Text>Akses User</Text>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                    <TextInput
                        id="nama"
                        name="nama"
                        label="Nama"
                        value={data.data.nama}
                        disabled
                    />
                    <select
                        id="akses"
                        name="akses"
                        label="Akses"
                        value={data.data.akses}
                        onChange={setAkses}>
                        <option value="publish">Petani</option>
                        <option value="draft">Penyuluh</option>
                        <option value="publish">Operator Poktan</option>
                        <option value="draft">Operator Admin</option>
                        <option value="draft">Operator Super Admin</option>
                    </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                    <Button
                    color="cyan"
                    style={{
                        color: 'white',
                        backgroundColor: '#303A47',
                        marginRight: 8
                    }}
                    onClick={() => setModalKelolaData(false)}>
                    Cancel
                    </Button>
                    <Button
                    color="cyan"
                    style={{ color: 'white', backgroundColor: 'green' }}
                    type="submit"
                    onClick={() => {
                        handleKelolaUser(modalKelolaData);
                        setModalKelolaData(false);
                    }}>
                    Simpan
                    </Button>
                </div>
            </Modal>
        </div>
    )
}