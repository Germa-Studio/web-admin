import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import Table from '@/components/table/Table';
import { Modal, Text, Button, Breadcrumbs, Anchor } from '@mantine/core';
import { GetListTanaman, DeleteTanamanPetani, UploadTanamanPetani } from '@/infrastruture';
import { Link, useLocation } from 'react-router-dom';
import SearchInput from '../../../../components/uiComponents/inputComponents/SearchInput';
import { ImPencil } from 'react-icons/im';
import { IoEyeOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
// import { TPetani } from "../../../../types/petani";
import { SearchPetani } from '../../../../infrastucture/searchApi';
// import { postLogActivity } from '../../../../infrastucture/logActivity';
import { setUser } from '../../../../infrastucture/redux/state/stateSlice';
// import { RootState } from './infrastucture/redux/store';
import { useDispatch, useSelector } from 'react-redux';

const breadcrumbItems = [
  { title: 'Dashboard', href: '/' },
  { title: 'Data Petani' },
  { title: 'Tabel Petani' }
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

export default function DetailRekapPetani() {
  // const [datas, setDatas] = useState([]);
  const [modalDeleteData, setModalDeleteData] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState();
  const [resp, setResp] = useState();
  const [petani, setPetani] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.state.user);
  const fileInputRef = useRef();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 10;
  useEffect(() => {
    GetListTanaman(page, limit, petani?.id).then((data) => {
      setResp(data);
      // setLoading(false);
    });
  }, [page, limit, petani]);

  const handleDeleteTanaman = (ids) => {
    DeleteTanamanPetani(ids);
    // delay 6 seconds
    setTimeout(() => {
      window.location.reload();
    });
    // window.location.reload();
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
              <Link to={`/tanaman-petani/detail/${item.id}`}>
                <div className="flex h-7 w-7 items-center justify-center bg-green-500">
                  <IoEyeOutline className="h-6 w-6 text-white" />
                </div>
              </Link>
              <Link to={`/tanaman-petani/edit/${item.id}`}>
                <div className="flex h-7 w-7 items-center justify-center bg-yellow-500">
                  <ImPencil className="h-[18px] w-[18px] text-white" />
                </div>
              </Link>
              {user?.peran === 'operator super admin' && (
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
  }, [resp]);

  // const handleFilterChange = (e, column) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [column]: e.target.value
  //   }));
  // };

  function handleFileChange(event) {
    if (!event.target.files) return;

    const file = event.target.files[0];
    // console.log(file);
    UploadTanamanPetani(file).then(() => {
      window.location.reload();
    });
  }

  return (
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <h3 className="text-white text-2xl font-bold mt-4">TABEL DATA TANAMAN PETANI</h3>
      <SearchInput
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onChange={(value) => {
          setPetani(value);
        }}
        value={petani}
        isClearable
        placeholder="Cari NIK PETANI"
      />
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
              handleDeleteTanaman(modalDeleteData);
              setModalDeleteData(false);
            }}>
            Delete
          </Button>
        </div>
      </Modal>
      <div className="rounded-lg w-full mt-5">
        <div className="relative bg-[#136B09] p-4 flex w-full justify-between rounded-t-lg shadow-lg">
          <h3 className="text-white text-2xl font-bold px-3">DATA TABEL TANAMAN PETANI</h3>
          <div className="flex gap-4 items-center">
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".xlsx,.xls"
            />
            <Link to={`/tanaman-petani/add`}>
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
        <Table data={dataTable} columns={columns} withPaginationCount withPaginationControl />
      </div>
    </div>
  );
}
