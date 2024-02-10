import React, { useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Modal, Text, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IoEyeOutline } from 'react-icons/io5';
import { ImPencil } from 'react-icons/im';
import { MdDeleteOutline } from 'react-icons/md';
import { TableTokoTani, TokoTani } from '../../@types/toko';
import { PaginatedRespApiData } from '../../types/paginatedRespApi';
import { deleteTokoTani, getTokoTani } from '../../infrastucture/toko';
import Table from '../../components/table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../infrastucture/redux/state/stateSlice';
import { RootState } from '../../infrastucture/redux/store';

const columns: ColumnDef<TableTokoTani>[] = [
  {
    accessorKey: 'no',
    header: 'No',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    header: 'Nama',
    accessorFn: (row) => row.tbl_akun?.nama,
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    header: 'Peran',
    accessorFn: (row) => row.tbl_akun?.peran,
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'namaProducts',
    header: 'Nama Produk',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'stok',
    header: 'Stok',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'satuan',
    header: 'Satuan',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'harga',
    header: 'Harga',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'deskripsi',
    header: 'Deskripsi',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'status',
    header: 'Status Produk',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'actions',
    header: 'Aksi',
    cell: (props) => props.row.original.actions
  }
];

function TokoPetani() {
  const [selectedId, setSelectedId] = React.useState<number | undefined>(undefined);
  const [modalDeleteData, setModalDeleteData] = React.useState(false);
  const [dataTable, setDataTable] = React.useState<
    PaginatedRespApiData<TableTokoTani> | undefined
  >();
  const user = useSelector((state: RootState) => state.state.user);
  // console.log(user?.peran)
  const [resp, setResp] = React.useState<PaginatedRespApiData<TokoTani> | undefined>();

  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    getTokoTani().then((res) => {
      setResp(res.data);
      // setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (resp) {
      setDataTable({
        ...resp,
        data: resp.data.map((item, index) => ({
          ...item,
          no: resp.from + index,
          actions: (
            <div className="flex gap-4">
              <Link to={`/toko-tani/${item.id}`}>
                <div className="flex h-7 w-7 items-center justify-center bg-green-500">
                  <IoEyeOutline className="h-6 w-6 text-white" />
                </div>
              </Link>
              <Link to={`/toko-tani/edit/${item.id}`}>
                <div className="flex h-7 w-7 items-center justify-center bg-yellow-500">
                  <ImPencil className="h-[18px] w-[18px] text-white" />
                </div>
              </Link>
              {user?.peran !== 'penyuluh' && (<button
                onClick={() => {
                  setModalDeleteData(true);
                  setSelectedId(item.id);
                }}>
                <div className="flex h-7 w-7 items-center justify-center bg-red-500">
                  <MdDeleteOutline className="h-6 w-6 text-white" />
                </div>
              </button>)}
            </div>
          )
        }))
      });
    }
  }, [resp]);

  const handleDelete = () => {
    if (selectedId) deleteTokoTani(selectedId);
  };

  return (
    <div>
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
              handleDelete();
              setModalDeleteData(false);
            }}>
            Delete
          </Button>
        </div>
      </Modal>
      <Table
        withButton
        buttonHref="/toko-tani/tambah"
        buttonText="Tambah Produk"
        data={dataTable}
        columns={columns}
        withPaginationCount
        withPaginationControl
      />
    </div>
  );
}

export default TokoPetani;
