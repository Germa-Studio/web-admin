// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import { Anchor, Breadcrumbs } from '@mantine/core';
import { getLogActivity } from '../../infrastucture/logActivity';
import { PaginatedRespApiData } from '../../types/paginatedRespApi';
import { DataPerson } from '../../@types/toko';
import { useLocation } from 'react-router-dom';
import Table from '../../components/table/Table';

const breadcrumbItems = [{ title: 'Dashboard', href: '/' }, { title: 'Log Aktivitas' }].map(
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
  }
];

const activityType = [
  {
    type: 'CREATE',
    message: 'Menambahkan data '
  },
  {
    type: 'EDIT',
    message: 'Mengubah data '
  },
  {
    type: 'DELETE',
    message: 'Menghapus data '
  },
  {
    type: 'DELETE PERMANENT',
    message: 'Menghapus permanen data '
  },
  {
    type: 'REGISTER',
    message: 'Mendaftar sebagai '
  }
];

const LogActivity = () => {
  const [dataTable, setDataTable] = useState<
    | PaginatedRespApiData<{
        no: number;
        nama: string;
        role: string;
        aktivitas: string;
        date: string;
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
    getLogActivity(page, limit).then((data) => {
      setResp(data);
    });
  }, [page, limit]);

  useEffect(() => {
    if (resp) {
      setDataTable({
        ...resp,
        data: resp.data.map((item, index) => {
          const msg = activityType.find((type) => type.type === item.activity)?.message;
          const itemDetailArr = item.detail.split(' ');
          const itemDetailFirst = itemDetailArr.slice(0, itemDetailArr.length - 1).join(' ');
          const msg2 = itemDetailArr[1]
            ? itemDetailFirst + ' dengan id: ' + itemDetailArr[itemDetailArr.length - 1]
            : itemDetailFirst + '';

          const dateArr = item.createdAt.split('T');
          const date = dateArr[0];
          const time = dateArr[1].split('.')[0];

          return {
            no: resp.from + index,
            nama: item.tbl_akun.nama,
            role: item.tbl_akun.peran,
            aktivitas: msg + msg2,
            date: `${date} ${time}`
          };
        })
      });
    }
  }, [resp]);

  return (
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <h3 className="text-white text-2xl font-bold mt-4">Log Aktivitas</h3>
      <Table data={dataTable} columns={columns} withPaginationCount withPaginationControl />
    </div>
  );
};

export default LogActivity;
