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
import { GetPeran, UbahPeran } from '../../infrastucture';
import { Select } from '@mantine/core';
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
    accessorKey: 'nama',
    header: 'Nama User',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'peran',
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
  const [userData, setUserData] = useState({ id: null, nama: '', peran: '' }); // State for user data
  const fileInputRef = useRef();
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.state.user);
  const [filter, setFilter] = useState('role')
  const location = useLocation();
  const chooseBase = 'rounded-ss-xl rounded-se-xl w-[50%] text-center h-fit py-2 w-[100%] min-w-8 font-bold text-white transition-all bg-orange-primary hover:bg-green-sidebar-hover duration-200 ease-in-out'
  const chooseActive = 'rounded-ss-xl rounded-se-xl w-[50%] text-center h-12 w-[100%] min-w-8 font-bold text-white transition-all bg-[#307B28] hover:bg-green-sidebar-hover duration-200 ease-in-out'
  // const [resp, setResp] = useState();
  // const [dataTable, setDataTable] = useState();
  const searchParams = new URLSearchParams(location.search);
  const [dataTable, setDataTable] = useState();
  const [resp, setResp] = useState();
  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 10;
  useEffect(() => {
    GetPeran(page, limit).then((data) => {
      setResp(data);
      // console.log(data);
    })
  }, [limit, page]);

  const handleEditUser = (id) => {
    // Find the item in resp.data that matches the provided id
    const selectedItem = resp.data.find((item) => item.id === id);
    if (selectedItem) {
      // Set the user data based on the selected item
      setUserData({ id: id, nama: selectedItem.nama, peran: selectedItem.peran, email: selectedItem.email }); // Change userID to id
      setModalKelolaData(true);
    } else {
      console.error('User data not found');
    }
  };  

  const handleSaveUser = async () => {
    try {
      console.log('user id: ', userData.id);
      if (userData.id) {
        await UbahPeran(userData.id, { roles: userData.peran, id: userData.id });
        setModalKelolaData(false);
      } else {
        console.error('User ID is undefined');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };
  

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
                  // setModalKelolaData(item?.id);
                  handleEditUser(item?.id);
                  console.log(item?.id);
                }}>
                <div className="flex h-7 w-7 items-center justify-center bg-yellow-500">
                  <ImPencil className="h-[18px] w-[18px] text-white" />
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
              opened={modalKelolaData}
              onClose={() => setModalKelolaData(false)}
              withCloseButton={false}
              centered
            >
              <Text>Akses User</Text>
              <div className='mt-2' style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Non-editable fields */}
                {/* <TextInput
                  id="nama"
                  name="nama"
                  label="Nama"
                  value={userData.nama}
                  readOnly
                />
                <TextInput
                  id="email"
                  name="email"
                  label="Email"
                  value={userData.email}
                  isDisabled
                  readOnly
                /> */}
                <Text>{userData.nama}</Text>
                <Text>{userData.email}</Text>
                {/* Editable field with dropdown for Peran */}
                <Select
                  data={['petani', 'penyuluh', 'operator poktan', 'operator admin', 'operator super admin']}
                  value={userData.peran}
                  onChange={(value) => setUserData({ ...userData, peran: value })}
                  placeholder="Pilih Peran"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                <Button
                  color="cyan"
                  style={{ color: 'white', backgroundColor: '#303A47', marginRight: 8 }}
                  onClick={() => setModalKelolaData(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="cyan"
                  style={{ color: 'white', backgroundColor: 'green' }}
                  type="submit"
                  onClick={handleSaveUser}
                >
                  Simpan
                </Button>
              </div>
            </Modal>
        </div>
    )
}