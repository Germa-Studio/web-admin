import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Table from '@/components/table/Table';
import { GetDataKelompok, UploadKelompok, DeleteKelompok } from '@/infrastruture';
import { Button, Anchor, Breadcrumbs, Modal } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { ImPencil } from 'react-icons/im';
import { MdDeleteOutline } from 'react-icons/md';

const breadcrumbItems = [
  { title: 'Dashboard', href: '/' },
  { title: 'Data Kelompok' },
  { title: 'Tabel Daftar Kelompok' }
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
    accessorKey: 'id',
    header: 'ID Kelompok',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'gapoktan',
    header: 'Gapoktan',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'namaKelompok',
    header: 'Nama Kelompok',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'desaData.nama',
    header: 'Desa',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'kecamatanData.nama',
    header: 'Kecamatan',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'actions',
    header: 'Aksi',
    cell: (props) => props.row.original.actions
  }
];

const IndexKelompok = () => {
  const [resp, setResp] = useState();
  const [dataTable, setDataTable] = useState();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedData, setSelectedData] = useState();

  const fileInputRef = useRef();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 10;

  useEffect(() => {
    GetDataKelompok(page, limit)
      .then((res) => {
        if (res) {
          setResp(res);
          console.log(res);
        } else {
          console.log('Response is undefined');
        }
      })
      .catch((error) => {
        console.error('API call failed:', error);
      });
  }, [page, limit]);
  function handleFileChange(event) {
    if (!event.target.files) return;

    const file = event.target.files[0];
    UploadKelompok(file).then(() => {
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
              <Link to={`/list-kelompok/edit/${item.id}`}>
                <div className="flex h-7 w-7 items-center justify-center bg-yellow-500">
                  <ImPencil className="h-[18px] w-[18px] text-white" />
                </div>
              </Link>
              <button
                onClick={() => {
                  setShowModalDelete(true);
                  setSelectedData(item);
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
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <h3 className="text-white text-2xl font-bold mt-4">DATA KELOMPOK</h3>
      <div className="relativemt-6 mt-4 flex items-center w-full">
        <div className="rounded-lg w-full">
          <div className="relative bg-[#136B09] p-4 flex w-full justify-between rounded-t-lg shadow-lg">
            <h3 className="text-white text-2xl font-bold px-3">TABEL DATA KELOMPOK</h3>
            <div className="flex gap-4 items-center">
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx,.xls"
              />
              {/* <Link to={`/list-operator/tambah`}>
                <button className="ms-5 rounded-md bg-[#86BA34] text-white p-1 px-5 w-30 h-10">
                  <FontAwesomeIcon className="text-xl" icon={faPlus} />
                </button>
              </Link> */}
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
          <div className="pt-0">
            <Table data={dataTable} columns={columns} withPaginationCount withPaginationControl />
          </div>
        </div>
      </div>
      <Modal opened={showModalDelete} onClose={() => setShowModalDelete(false)} centered>
        Apakah Kamu Yakin Akan Menghapus Data Kelompok Pertanian ini (ID: {selectedData?.id})?
        <br />
        Data yang sudah dihapus tidak dapat dikembalikan.
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
              DeleteKelompok(selectedData.id).then(() => {
                GetDataKelompok(page, limit).then((res) => {
                  setResp(res);
                });
              });
            }}>
            Hapus
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default IndexKelompok;
