// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import { Anchor, Breadcrumbs, Button, Modal, Text } from '@mantine/core';
import { DataPerson } from '../../@types/toko';
import { PaginatedRespApiData } from '../../types/paginatedRespApi';
import {
  deleteTrashActivity,
  getTrashActivity,
  restoreTrashActivity
} from '../../infrastucture/logActivity';
import { MdDeleteOutline, MdOutlineRestore } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import Table from '../../components/table/Table';

const breadcrumbItems = [{ title: 'Dashboard', href: '/' }, { title: 'Data Sampah' }].map(
  (item, index) => (
    <Anchor href={item.href} key={index} className="text-white opacity-50">
      {item.title}
    </Anchor>
  )
);

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
    accessorKey: 'role',
    header: 'Role User',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'aktivitas',
    header: 'Aktivitas User',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'actions',
    header: 'Action',
    cell: (props) => props.row.original.actions
  }
];

const DataSampah = () => {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const [modalDeleteData, setModalDeleteData] = useState(false);
  const [modalRestoreData, setModalRestoreData] = useState(false);
  const [dataTable, setDataTable] = useState<
    | PaginatedRespApiData<{
        no: number;
        nama: string;
        role: string;
        aktivitas: string;
        date: string;
        actions: JSX.Element;
      }>
    | undefined
  >();
  const [resp, setResp] = useState<
    | PaginatedRespApiData<{
        id: number;
        user_id: number;
        activity: string;
        detail: string;
        tbl_akun: DataPerson;
        createdAt: string;
      }>
    | undefined
  >();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 10;

  useEffect(() => {
    getTrashActivity(page, limit).then((data) => {
      setResp(data);
      // console.log('hehe', data);
    });
  }, [page, limit]);

  useEffect(() => {
    if (resp) {
      setDataTable({
        ...resp,
        data: resp.data.map((item, index) => {
          const msg = 'Menghapus data ';
          const itemDetailArr = item.detail.split(' ');
          // get and join all item detail except the last one
          const itemDetailFirst = itemDetailArr.slice(0, itemDetailArr.length - 1).join(' ');
          const msg2 = itemDetailArr[1]
            ? itemDetailFirst + ' dengan id: ' + itemDetailArr[itemDetailArr.length - 1]
            : itemDetailFirst + '';

          return {
            no: index + 1,
            nama: item.tbl_akun.nama,
            role: item.tbl_akun.peran,
            aktivitas: msg + msg2,
            date: item.createdAt.split('T')[0],
            actions: (
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setModalRestoreData(true);
                    setSelectedId(item.id);
                  }}>
                  <div className="flex h-7 w-7 items-center justify-center bg-blue-500">
                    <MdOutlineRestore className="h-6 w-6 text-white" />
                  </div>
                </button>
                <button
                  onClick={() => {
                    setModalDeleteData(true);
                    setSelectedId(item.id);
                  }}>
                  <div className="flex h-7 w-7 items-center justify-center bg-red-500">
                    <MdDeleteOutline className="h-6 w-6 text-white" />
                  </div>
                </button>
              </div>
            )
          };
        })
      });
    }
  }, [resp]);

  const handleDelete = () => {
    if (selectedId) deleteTrashActivity(selectedId);
  };

  const handleRestore = () => {
    if (selectedId) {
      restoreTrashActivity(selectedId);
    }
  };

  return (
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <h3 className="text-white text-2xl font-bold mt-4">Data Sampah</h3>
      <Table data={dataTable} columns={columns} withPaginationCount withPaginationControl />
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
      <Modal
        opened={modalRestoreData}
        onClose={() => setModalRestoreData(false)}
        withCloseButton={false}
        centered>
        <Text>Apakah Kamu Yakin Akan Mengembalikan Data Ini ?</Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <Button
            color="cyan"
            style={{
              color: 'white',
              backgroundColor: '#303A47',
              marginRight: 8
            }}
            onClick={() => setModalRestoreData(false)}>
            Cancel
          </Button>
          <Button
            color="cyan"
            style={{ color: 'white', backgroundColor: 'blue' }}
            type="submit"
            onClick={() => {
              handleRestore();
              setModalRestoreData(false);
            }}>
            Restore
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DataSampah;
